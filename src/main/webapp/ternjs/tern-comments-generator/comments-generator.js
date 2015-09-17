(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(exports, require("tern/lib/infer"), require("tern/lib/tern"), require("acorn/dist/walk"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["exports", "tern/lib/infer", "tern/lib/tern", "acorn/dist/walk"], mod);
  mod(root.tern || (root.tern = {}), tern, tern, acorn.walk);
})(this, function(exports, infer, tern, walk) {
  "use strict";

  tern.registerPlugin("comments-generator", function(server, options) {
  
  });  
  
  tern.defineQueryType("comments", {
    takesFile: true,
    run: function(server, query, file) {
      try {
        var comments, start, wordStart = tern.resolvePos(file, query.end) + 1;
        var exprAt = infer.findExpressionAround(file.ast, null, wordStart, file.scope, "FunctionDeclaration");
        if (exprAt && exprAt.state && exprAt.state.fnType) {
          var fnType = exprAt.state.fnType;
          comments = fnComments(fnType);
          start = exprAt.node.start;
        }
        return comments ? {"comments": comments, "start": tern.outputPos(query, file, start)} : {}
      } catch(err) {
        console.error(err.stack);
        return {};
      }
    }
  });
  
  
  function fnComments(fnType) {
    var argsName = fnType.argNames, t, c = "/**";
    if (argsName) {
      c += "\n";
      for (var i = 0; i < argsName.length; i++) {
        if (i > 0) c += "\n"; 
        c+= "\t";
        c+= "@param ";
        t = getTypeName(fnType.args[i]);
        if (t) {
          c+= "{";
          c+= t;
          c+= "}";
          c+= " ";
        }
        c+= argsName[i];
      }
    }
    if (fnType.retval) {
      c += "\n";
      c += "\t";
      c+= "@returns ";
      var t = getTypeName(fnType.retval);
      if (t) {
        c+= "{";
        c+= t;
        c+= "}";
      }
    }
    c+= "\n";
    c+= "**/";
    c+= "\n";
    return c;
  }
  
  function getTypeName(type) {
    if (!type) return;
    if (type.types) {
      // multiple types
      var types = type.types, s = "";
      for (var i = 0; i < types.length; i++) {
        if (i > 0) s +="|";
        var t = getTypeName(types[i]);
        if (t) s+= t;
      }
      return s == "" ? null : s; 
    }
    if (type.name) {
      return toJSDocType(type.name);
    }
    return (type.proto) ? toJSDocType(type.proto.name) : null;
  }
  
  function toJSDocType(ternType) {
    switch(ternType) {
      case "string":
        return "String";
      case "number":
        return "Number";
      case "bool":
        return "Boolean";        
    }
    return ternType;
  }
  
})  