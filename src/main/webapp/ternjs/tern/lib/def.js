// Type description parser

// Type description JSON files (such as ecma5.json and browser.json)
// are used to
//
// A) describe types that come from native code

// B) to cheaply load the types for big libraries, or libraries that
//    can't be inferred well

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return exports.init = mod;
  if (typeof define == "function" && define.amd) // AMD
    return define({init: mod});
  tern.def = {init: mod};
})(function(exports, infer) {
  "use strict";

  function hop(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var TypeParser = exports.TypeParser = function(spec, start, base, forceNew) {
    this.pos = start || 0;
    this.spec = spec;
    this.base = base;
    this.forceNew = forceNew;
  };
  TypeParser.prototype = {
    eat: function(str) {
      if (str.length == 1 ? this.spec.charAt(this.pos) == str : this.spec.indexOf(str, this.pos) == this.pos) {
        this.pos += str.length;
        return true;
      }
    },
    word: function(re) {
      var word = "", ch, re = re || /[\w$]/;
      while ((ch = this.spec.charAt(this.pos)) && re.test(ch)) { word += ch; ++this.pos; }
      return word;
    },
    error: function() {
      throw new Error("Unrecognized type spec: " + this.spec + " (at " + this.pos + ")");
    },
    parseFnType: function(name, top) {
      var args = [], names = [];
      if (!this.eat(")")) for (var i = 0; ; ++i) {
        var colon = this.spec.indexOf(": ", this.pos), argname, aval;
        if (colon != -1) {
          argname = this.spec.slice(this.pos, colon);
          if (/^[$\w?]+$/.test(argname))
            this.pos = colon + 2;
          else
            argname = null;
        }
        names.push(argname);
        args.push(this.parseType());
        if (!this.eat(", ")) {
          this.eat(")") || this.error();
          break;
        }
      }
      var retType, computeRet, fn;
      if (this.eat(" -> ")) {
        if (top && this.spec.indexOf("!", this.pos) > -1) {
          retType = infer.ANull;
          computeRet = this.parseRetType();
        } else retType = this.parseType();
      } else retType = infer.ANull;
      if (top && (fn = this.base))
        infer.Fn.call(this.base, name, infer.ANull, args, names, retType);
      else
        fn = new infer.Fn(name, infer.ANull, args, names, retType);
      if (computeRet) fn.computeRet = computeRet;
      return fn;
    },
    parseType: function(name, top) {
      if (this.eat("fn(")) {
        return this.parseFnType(name, top);
      } else if (this.eat("[")) {
        var inner = this.parseType();
        this.eat("]") || this.error();
        if (top && this.base) {
          infer.Arr.call(this.base, inner);
          return this.base;
        }
        return new infer.Arr(inner);
      } else if (this.eat("+")) {
        var path = this.word(/[\w$<>\.!]/);
        var base = parsePath(path + ".prototype");
        if (!(base instanceof infer.Obj)) base = parsePath(path);
        if (!(base instanceof infer.Obj)) return base;
        if (top && this.forceNew) return new infer.Obj(base);
        return infer.getInstance(base);
      } else if (this.eat("?")) {
        return infer.ANull;
      } else {
        var spec = this.word(/[\w$<>\.!]/), cx = infer.cx();
        switch (spec) {
        case "number": return cx.num;
        case "string": return cx.str;
        case "bool": return cx.bool;
        case "<top>": return cx.topScope;
        }
        if (cx.localDefs && spec in cx.localDefs) return cx.localDefs[spec];
        return parsePath(spec);
      }
    },
    parseBaseRetType: function() {
      if (this.eat("[")) {
        var inner = this.parseRetType();
        this.eat("]") || this.error();
        return function(self, args) { return new infer.Arr(inner(self, args)); };
      } else if (this.eat("!")) {
        var arg = this.word(/\d/);
        if (arg) {
          arg = Number(arg);
          return function(self, args) {return args[arg] || infer.ANull;};
        } else if (this.eat("this")) {
          return function(self) {return self;};
        } else if (this.eat("custom:")) {
          var fname = this.word(/[\w$]/);
          return customFunctions[fname] || function() { return infer.ANull; };
        } else this.error();
      }
      var t = this.parseType();
      return function(){return t;};
    },
    extendRetType: function(base) {
      var propName = this.word(/[\w<>$!]/) || this.error();
      if (propName == "!ret") return function(self, args) {
        var lhs = base(self, args);
        if (lhs.retval) return lhs.retval;
        var rv = new infer.AVal;
        lhs.propagate(new infer.IsCallee(infer.ANull, [], null, rv));
        return rv;
      };
      return function(self, args) {return base(self, args).getProp(propName);};
    },
    parseRetType: function() {
      var tp = this.parseBaseRetType();
      while (this.eat(".")) tp = this.extendRetType(tp);
      return tp;
    }
  }

  function parseType(spec, name, base, forceNew) {
    var type = new TypeParser(spec, null, base, forceNew).parseType(name, true);
    if (/^fn\(/.test(spec)) for (var i = 0; i < type.args.length; ++i) (function(i) {
      var arg = type.args[i];
      if (arg instanceof infer.Fn && arg.args.length) addEffect(type, function(_self, fArgs) {
        var fArg = fArgs[i];
        if (fArg) fArg.propagate(new infer.IsCallee(infer.cx().topScope, arg.args, null, infer.ANull));
      });
    })(i);
    return type;
  }

  function addEffect(fn, handler, replaceRet) {
    var oldCmp = fn.computeRet, rv = fn.retval;
    fn.computeRet = function(self, args) {
      var handled = handler(self, args);
      var old = oldCmp ? oldCmp(self, args) : rv;
      return replaceRet ? handled : old;
    };
  }

  var parseEffect = exports.parseEffect = function(effect, fn) {
    if (effect.indexOf("propagate ") == 0) {
      var p = new TypeParser(effect, 10);
      var getOrigin = p.parseRetType();
      if (!p.eat(" ")) p.error();
      var getTarget = p.parseRetType();
      addEffect(fn, function(self, args) {
        getOrigin(self, args).propagate(getTarget(self, args));
      });
    } else if (effect.indexOf("call ") == 0) {
      var andRet = effect.indexOf("and return ", 5) == 5;
      var p = new TypeParser(effect, andRet ? 16 : 5);
      var getCallee = p.parseRetType(), getSelf = null, getArgs = [];
      if (p.eat(" this=")) getSelf = p.parseRetType();
      while (p.eat(" ")) getArgs.push(p.parseRetType());
      addEffect(fn, function(self, args) {
        var callee = getCallee(self, args);
        var slf = getSelf ? getSelf(self, args) : infer.ANull, as = [];
        for (var i = 0; i < getArgs.length; ++i) as.push(getArgs[i](self, args));
        var result = andRet ? new infer.AVal : infer.ANull;
        callee.propagate(new infer.IsCallee(slf, as, null, result));
        return result;
      }, andRet);
    } else if (effect.indexOf("custom ") == 0) {
      var customFunc = customFunctions[effect.slice(7).trim()];
      if (customFunc) addEffect(fn, customFunc);
    } else if (effect.indexOf("copy ") == 0) {
      var p = new TypeParser(effect, 5);
      var getFrom = p.parseRetType();
      p.eat(" ");
      var getTo = p.parseRetType();
      addEffect(fn, function(self, args) {
        var from = getFrom(self, args), to = getTo(self, args);
        from.forAllProps(function(prop, val, local) {
          if (local && prop != "<i>")
            to.propagate(new infer.PropHasSubset(prop, val));
        });
      });
    } else {
      throw new Error("Unknown effect type: " + effect);
    }
  };

  var currentTopScope;

  var parsePath = exports.parsePath = function(path) {
    var cx = infer.cx(), cached = cx.paths[path], origPath = path;
    if (cached != null) return cached;
    cx.paths[path] = infer.ANull;

    var base = currentTopScope || cx.topScope;

    if (cx.localDefs) for (var name in cx.localDefs) {
      if (path.indexOf(name) == 0) {
        if (path == name) return cx.paths[path] = cx.localDefs[path];
        if (path.charAt(name.length) == ".") {
          base = cx.localDefs[name];
          path = path.slice(name.length + 1);
          break;
        }
      }
    }

    var isdate = /^Date.prototype/.test(path);
    var parts = path.split(".");
    for (var i = 0; i < parts.length && base != infer.ANull; ++i) {
      var prop = parts[i];
      if (prop.charAt(0) == "!") {
        if (prop == "!proto") {
          base = (base instanceof infer.Obj && base.proto) || infer.ANull;
        } else {
          var fn = base.getFunctionType();
          if (!fn) {
            base = infer.ANull;
          } else if (prop == "!ret") {
            base = fn.retval.getType() || infer.ANull;
          } else {
            var arg = fn.args[Number(prop.slice(1))];
            base = (arg && arg.getType()) || infer.ANull;
          }
        }
      } else if (base instanceof infer.Obj) {
        var propVal = base.props[prop];
        if (!propVal || propVal.isEmpty())
          base = infer.ANull;
        else
          base = propVal.types[0];
      }
    }
    // Uncomment this to get feedback on your poorly written .json files
    // if (base == infer.ANull) console.log("bad path: " + path + " (" + cx.curOrigin + ")");
    cx.paths[origPath] = base == infer.ANull ? null : base;
    return base;
  };

  function emptyObj(ctor) {
    var empty = Object.create(ctor.prototype);
    empty.props = Object.create(null);
    empty.isShell = true;
    return empty;
  }

  function isSimpleAnnotation(spec) {
    if (!spec["!type"]) return false;
    for (var prop in spec)
      if (prop != "!type" && prop != "!doc" && prop != "!url")
        return false;
    return true;
  }

  function passOne(base, spec, path) {
    if (!base) {
      var tp = spec["!type"];
      if (tp) {
        if (/^fn\(/.test(tp)) base = emptyObj(infer.Fn);
        else if (tp.charAt(0) == "[") base = emptyObj(infer.Arr);
        else throw new Error("Invalid !type spec: " + tp);
      } else if (spec["!stdProto"]) {
        base = infer.cx().protos[spec["!stdProto"]];
      } else {
        base = emptyObj(infer.Obj);
      }
      base.name = path;
    }

    for (var name in spec) if (hop(spec, name) && name.charCodeAt(0) != 33) {
      var inner = spec[name];
      if (typeof inner == "string" || isSimpleAnnotation(inner)) continue;
      var prop = base.defProp(name);
      passOne(prop.getType(), inner, path ? path + "." + name : name).propagate(prop);
    }
    return base;
  }

  function passTwo(base, spec, path) {
    if (base.isShell) {
      delete base.isShell;
      var tp = spec["!type"];
      if (tp) {
        parseType(tp, path, base);
      } else {
        var proto = spec["!proto"] && parseType(spec["!proto"]);
        infer.Obj.call(base, proto instanceof infer.Obj ? proto : true, path);
      }
    }

    var effects = spec["!effects"];
    if (effects && base instanceof infer.Fn) for (var i = 0; i < effects.length; ++i)
      parseEffect(effects[i], base);

    for (var name in spec) if (hop(spec, name) && name.charCodeAt(0) != 33) {
      var inner = spec[name], known = base.defProp(name), innerPath = path ? path + "." + name : name;
      var type = known.getType();
      if (typeof inner == "string") {
        if (type) continue;
        parseType(inner, innerPath).propagate(known);
      } else {
        if (!isSimpleAnnotation(inner)) {
          passTwo(type, inner, innerPath);
        } else if (!type) {
          parseType(inner["!type"], innerPath, null, true).propagate(known);
          type = known.getType();
        } else continue;
        var doc = inner["!doc"], url = inner["!url"];
        if (doc) {
          if (type && type instanceof infer.Obj) type.doc = doc;
          known.doc = doc;
        }
        if (url) {
          if (type && type instanceof infer.Obj) type.url = url;
          known.url = url;
        }
      }
    }
  }

  function doLoadEnvironment(data, scope) {
    var cx = infer.cx();

    infer.addOrigin(cx.curOrigin = data["!name"] || "env#" + cx.origins.length);
    cx.loading = data;
    cx.localDefs = cx.definitions[cx.curOrigin] = Object.create(null);

    passOne(scope, data);

    var def = data["!define"];
    if (def) {
      for (var name in def) {
        var spec = def[name];
        cx.localDefs[name] = typeof spec == "string" ? parsePath(spec) : passOne(null, spec, name);
      }
      for (var name in def) {
        var spec = def[name];
        if (typeof spec != "string") passTwo(cx.localDefs[name], def[name], name);
      }
    }

    passTwo(scope, data);

    cx.curOrigin = cx.loading = cx.localDefs = null;
  }

  exports.load = function(data, scope) {
    if (!scope) scope = infer.cx().topScope;
    var oldScope = currentTopScope;
    currentTopScope = scope;
    try {
      doLoadEnvironment(data, scope);
    } finally {
      currentTopScope = oldScope;
    }
  };

  // Used to register custom logic for more involved effect or type
  // computation.
  var customFunctions = Object.create(null);
  infer.registerFunction = function(name, f) { customFunctions[name] = f; };

  var _constraints;
  function constraints() {
    if (_constraints) return _constraints;
    _constraints = {};
    _constraints.IsCreated = infer.constraint("created, target, spec", {
      addType: function(tp) {
        if (tp instanceof infer.Obj && this.created++ < 5) {
          var derived = new infer.Obj(tp), spec = this.spec;
          if (spec instanceof infer.AVal) spec = spec.getType();
          if (spec instanceof infer.Obj) for (var prop in spec.props) {
            var cur = spec.props[prop].types[0];
            var p = derived.defProp(prop);
            if (cur && cur instanceof infer.Obj && cur.props.value) {
              var vtp = cur.props.value.getType();
              if (vtp) p.addType(vtp);
            }
          }
          this.target.addType(derived)
        }
      }
    });
    _constraints.IsBound = infer.constraint("args, target", {
      addType: function(tp) {
        if (!(tp instanceof infer.Fn)) return;
        var cut = Math.max(0, this.args.length - 1);
        this.target.addType(new infer.Fn(tp.name, this.args[0] || infer.ANull,
                                         tp.args.slice(cut), tp.argNames.slice(cut), tp.retval));
      }
    });
    return _constraints;
  }

  infer.registerFunction("Object_create", function(self, args, argNodes) {
    if (argNodes.length && argNodes[0].type == "Literal" && argNodes[0].value == null)
      return new infer.Obj();

    var result = new infer.AVal;
    if (args[0]) args[0].propagate(new (constraints().IsCreated)(0, result, args[1]));
    return result;
  });

  infer.registerFunction("Function_bind", function(self, args) {
    var result = new infer.AVal;
    self.propagate(new (constraints().IsBound)(args, result));
    return result;
  });

  return exports;
});