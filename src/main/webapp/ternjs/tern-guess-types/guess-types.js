(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("tern/lib/infer"), require("tern/lib/tern"), require("acorn/dist/acorn"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["tern/lib/infer", "tern/lib/tern", "acorn/dist/acorn"], mod);
  mod(tern, tern, acorn);
})(function(infer, tern, acorn) {
  "use strict";
  
  var guessTypes = Object.create(null);
  tern.registerGuessType = function(name, guessType) {
    guessTypes[name] = guessType;
  };
  
  var getGuessType = tern.getGuessType = function(name) {
    if (!name) return null;
    return guessTypes[name];
  }
  
  function ternError(msg) {
    var err = new Error(msg);
    err.name = "TernError";
    return err;
  }
  
  tern.registerPlugin("guess-types", function(server, options) {
    return {};
  });  
  
  function init(quessTypes, type) {
    var argType = infer.toString(type);
    quessTypes[argType] = [];
    if (argType == "bool") {
      quessTypes[argType].push("true");
      quessTypes[argType].push("false");
    } else if (argType == "string") {
      quessTypes[argType].push("\"\"");
      quessTypes[argType].push("''");
    }
    return argType;
  }
  
  tern.defineQueryType("guess-types", {
    takesFile: true,
    run: function(server, query, file) {
      if (query.end == null) throw ternError("missing .query.end field");
      if (query.property == null) throw ternError("missing .query.property field");
      var wordStart = tern.resolvePos(file, query.end), text = file.text, quessTypes = {};
      while (wordStart && acorn.isIdentifierChar(text.charCodeAt(wordStart - 1))) --wordStart;
      
      function gather(prop, obj, depth, addInfo) {
    	  var val = obj.props[prop];
          infer.resetGuessing();
          var type = infer.toString(val.getType());
          addValueType(type, prop);
      }
      
      function setArgType(arg) {
        var argTypes = "";
        if (arg.types) {
          // argument types is an array of types
          for (var j = 0; j < arg.types.length; j++) {
            var type = arg.types[j];
            var argType = init(quessTypes, type);
            if (j > 0) argTypes += "|";
            argTypes += argType;
          }
        } else {
          // one type
          argTypes = init(quessTypes, arg.getType ? arg.getType() : arg);
        }
        quessTypes.args.push(argTypes);
      }
      
      function addValueType(type, value) {
        var guessType = quessTypes[type];
        if (guessType) guessType.push(value);
      }
      
      var prop = null;
      var exprAt = infer.findExpressionAround(file.ast, null, wordStart, file.scope);
      if (exprAt && exprAt.node.object) {
    	exprAt.node = exprAt.node.object;
        var objType = infer.expressionType(exprAt);
        if (objType && objType.getType && objType.getType()) {
          prop = objType.getType().hasProp ? objType.getType().hasProp(query.property) : objType.getType().proto.hasProp(query.property);
        }
      } else {
        prop = file.scope.hasProp(query.property);    	  
      }
      
      if (prop && prop.getFunctionType) {
    	quessTypes.args = [];
      	var fnType = prop.getFunctionType(), args = fnType.args;
      	for (var i = 0; i < args.length; i++) {
          var arg = args[i], guessType = fnType.guessType && fnType.guessType(arg, i, file);
          if (guessType) {
            var type = guessType.type;
            setArgType(type);
            quessTypes[type] = guessType.completions;            
          } else {
            setArgType(arg);            
          }
        }
      	infer.forAllLocalsAt(file.ast, wordStart, file.scope, gather);
      }
        
      return quessTypes;
    }
  });
  
  
})  