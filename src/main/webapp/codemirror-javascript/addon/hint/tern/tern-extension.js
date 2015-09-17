(function() {
  "use strict";

  var defaultServer = null, defs = [];
  var Pos = CodeMirror.Pos;
  var cls = "CodeMirror-Tern-";
  
  function TernState(cm, options) {
    this.options = options;
  }

  function parseOptions(options) {
    if (options instanceof Function)
      return {
        getText : options
    };
    return options;
  }

  function load(file, c) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", file, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4)
        c(xhr.responseText, xhr.status);
    };
  }

  CodeMirror.tern = {};
  CodeMirror.tern.addDef = function(def) {
    if (typeof def == "string") {
      load(def, function(json) {
        defs.push(JSON.parse(json));
      });
    } else {
      defs.push(def);
    }
  }

  CodeMirror.ternHint = function(cm, c) {
    var server = getServer(cm);
    function c1(data) {
      // add info method to the Tern completion
      var completions = data.list;
      for ( var i = 0; i < completions.length; i++) {
        var completion = completions[i];
        var text = getText(completion.data);
        // override display text to display signature of fn
        completion.displayText = text;
        // override text with hint function to insert fn with () and params
        completion.text = null;
        completion.hint = function(cm, data, completion) {
          var from = Pos(data.from.line, data.from.ch);
          var to = Pos(data.to.line, data.to.ch);
          var ternCompletion = completion.data;
          var template = getInsertTemplate(ternCompletion, server, cm, from);
          template.insert(cm, data);
        };
      }
      if (CodeMirror.templatesHint) {
        // templates
        var processTemplates = true;
        var from = data.from, to = data.to, token = cm.getRange(from, to);
        if (token == '' && !(from.line == 0 && from.ch == 0)) {
          // don't display templates if the before char is '.'
          var beforeChar = cm.getRange(Pos(from.line, from.ch - 1), from);
          processTemplates = (beforeChar != '.');
        }
        if (processTemplates) {
          CodeMirror.templatesHint.getCompletions(cm, completions, token);
        }
      }
      c(data);
    }    
    return server.getHint(cm, c1);
  }

  CodeMirror.tern.showType = function(cm) {
    var server = getServer(cm);
    server.showType(cm);
  }

  CodeMirror.tern.jumpToDef = function(cm) {
    var server = getServer(cm);
    server.jumpToDef(cm);
  }

  CodeMirror.tern.jumpBack = function(cm) {
    var server = getServer(cm);
    server.jumpBack(cm);
  }

  CodeMirror.tern.rename = function(cm) {
    var server = getServer(cm);
    server.rename(cm);
  }

  function fileFilter(value, docName, doc) {
    var cm = doc.cm;
    var state = cm.state.ternExt;
    if (state && state.options.getText) {
      return state.options.getText(cm);
    }
    return doc.getValue();
  }

  function getServer(cm) {
    if (defaultServer == null) {
      var plugins = {};
      var state = cm.state.ternExt;
      if (state && state.options.plugins) {
        plugins = state.options.plugins;
      }
      defaultServer = new CodeMirror.TernServer({
        defs : defs,
        plugins: plugins,
        fileFilter : fileFilter,
        completionTip : function(data) {
          if (data.info)
            return data.info(data);
          if (data.doc)
            return data.doc;
        }
      });
    }
    return defaultServer;
  }
  
  CodeMirror.tern.getServer = getServer;

  function startsWith(str, token) {
    return str && str.slice(0, token.length).toUpperCase() == token.toUpperCase();
  }

  function getText(completion) {
    var text = completion.displayName || completion.name;
    var type = completion.type;
    var returnType = null;
    if (startsWith(type, 'fn(')) {
      var bracket = 0;
      var afterStartFn = type.substring(2, type.length);
      var i = 0;
      for (i = 0; i < afterStartFn.length; i++) {
        var c = afterStartFn.charAt(i);
        if (c == '(') {
          bracket++;
        } else if (c == ')') {
          bracket--;
        }
        text += c;
        if (bracket == 0)
          break;
      }
      var afterEndFn = afterStartFn.substring(i + 1, afterStartFn.length);
      var returnTypeIndex = afterEndFn.lastIndexOf(' -> ');
      if (returnTypeIndex != -1) {
        returnType = afterEndFn.substring(returnTypeIndex + 4,
            afterEndFn.length);
      }
    } else {
      returnType = type;
    }
    if (returnType) {
      text += ' -> ' + returnType;
    }
    return text;
  }

  function getGuessType(ts, cm, from, property) {
    if (!ts.server.plugins["guess-types"]) return;
    var guess;
    ts.request(cm, {type: "guess-types", end: from, property: property}, function(error, data) {
      if (error) return showError(ts, cm, error);
      guess = data;
    });
    return guess;
  }
  
  function getInsertTemplate(completion, server, cm, from) {
    var tokens = [completion.name];

    var type = completion.type;
    var firstParam = null, currentParam = null, typeParsing = false, optionalParam = false;
    if (startsWith(type, 'fn(')) {      
      // try to call tern guess type
      var guessType = getGuessType(server, cm, from, completion.name);      
      tokens.push('(');
      var bracket = 0;
      var afterStartFn = type.substring(2, type.length);
      var i = 0, nbVar = 0;
      for (i = 0; i < afterStartFn.length; i++) {
        var c = afterStartFn.charAt(i);
        switch (c) {
        case '(':
          bracket++;
          break;
        case ')':
          bracket--;
          break;
        default:
          if (bracket == 1) {
            if (typeParsing) {
              if (c == ',')
                typeParsing = false;
            } else {
              if (currentParam == null) {
                if (c != ' ' && c != '?') {
                  currentParam = c;
                }
              } else {
                if (c == ':') {
                  typeParsing = true;
                  if(!optionalParam) {
                    if (firstParam == null) {
                      firstParam = currentParam;
                    } else {
                      tokens.push(', ');
                    }                    
                    var list, argTypes = guessType && guessType.args && guessType.args[nbVar++];
                    if (argTypes) {
                      list = [];
                      var types = argTypes.split("|");
                      for (var j = 0; j < types.length; j++) {
                        var type = types[j], className = type ? typeToIcon(type) : null, l = guessType[type];
                        if (l) {
                          for (var k = 0; k < l.length; k++) {
                            list.push({"text": l[k], "type": type, "className": className});
                          }
                        }
                      }
                    }
                    tokens.push({variable: currentParam, list: list});
                  }
                  currentParam = null;
                  optionalParam = false;
                } else {
                  if (c != ' ' && c != '?') {
                    currentParam += c;
                  } else if(c == '?') {
                    optionalParam = true;
                  }
                }
              }
            }
          }
        }
        if (bracket == 0)
          break;
      }
      tokens.push(')');
    }
    tokens.push({cursor: true});
    return new CodeMirror.templatesHint.Template({tokens: tokens});
  }

  function typeToIcon(type) {
    var suffix;
    if (type == "?") suffix = "unknown";
    else if (type == "number" || type == "string" || type == "bool") suffix = type;
    else if (/^fn\(/.test(type)) suffix = "fn";
    else if (/^\[/.test(type)) suffix = "array";
    else suffix = "object";
    return cls + "completion " + cls + "completion-" + suffix;
  }
  
  CodeMirror.defineOption("ternWith", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      delete cm.state.ternExt;
    }

    if (val) {
      var state = cm.state.ternExt = new TernState(cm, parseOptions(val));
    }
  });

})();
