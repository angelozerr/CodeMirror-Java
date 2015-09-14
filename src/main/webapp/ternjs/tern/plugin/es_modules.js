(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"), require("acorn/dist/walk"), require("./modules"))
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern", "acorn/dist/walk", "./modules"], mod)
  mod(tern, tern, acorn.walk)
})(function(infer, tern, walk) {
  "use strict"

  function connectModule(file, out) {
    var modules = infer.cx().parent.mod.modules
    var outObj = null
    function exp(prop, type, originNode) {
      if (!outObj) {
        outObj = new infer.Obj(true)
        outObj.origin = file.name
        outObj.originNode = file.ast
        out.addType(outObj)
      }
      type.propagate(outObj.defProp(prop, originNode))
    }

    walk.simple(file.ast, {
      ImportDeclaration: function(node) {
        var input = modules.resolveModule(node.source.value, file.name)
        for (var i = 0; i < node.specifiers.length; i++) {
          var spec = node.specifiers[i]
          var aval = file.scope.getProp(spec.local.name)
          if (spec.type == "ImportNamespaceSpecifier") {
            input.propagate(aval)
          } else {
            var propName = spec.type == "ImportDefaultSpecifier" ? "default" : spec.imported.name
            input.getProp(propName).propagate(aval)
          }
        }
      },
      ExportAllDeclaration: function(node) {
        var input = modules.resolveModule(node.source.value, file.name)
        input.forAllProps(function(prop, val, local) {
          if (local) exp(prop, val, val.originNode)
        })
      },
      ExportDefaultDeclaration: function(node) {
        var decl = node.declaration.id || node.declaration
        exp("default", infer.expressionType({node: decl, state: file.scope}), decl)
      },
      ExportNamedDeclaration: function(node) {
        var decl = node.declaration
        if (decl) {
          if (decl.type == "VariableDeclaration") {
            for (var i = 0; i < decl.declarations.length; ++i) {
              var cur = decl.declarations[i]
              if (cur.id.type == "Identifier")
                exp(cur.id.name, file.scope.getProp(cur.id.name), cur.id)
            }
          } else {
            exp(decl.id.name, file.scope.getProp(decl.id.name), decl.id)
          }
        }
        if (node.specifiers.length) {
          var src = node.source ? modules.resolveModule(node.source.value, file.name) : file.scope
          for (var i = 0; i < node.specifiers.length; i++) {
            var spec = node.specifiers[i]
            exp(spec.exported.name, src.getProp(spec.local.name), spec.local)
          }
        }
      }
    })
  }

  function isModuleName(node) {
    if (node.type != "Literal" || typeof node.value != "string") return

    var decl = infer.findExpressionAround(node.sourceFile.ast, null, node.end, null, function(_, node) {
      return node.type == "ImportDeclaration" || /Export(All|Named)Declaration/.test(node.type)
    })
    if (!decl || decl.node.source != node) return
    return node.value
  }

  function isImport(node) {
    if (node.type != "Identifier") return
    var imp = infer.findExpressionAround(node.sourceFile.ast, null, node.end, null, "ImportDeclaration")
    if (!imp) return
    var specs = imp.node.specifiers
    for (var i = 0; i < specs.length; i++) {
      var spec = specs[i]
      if (spec.local != node) continue
      var result = {name: imp.node.source.value, prop: null}
      if (spec.type == "ImportDefaultSpecifier") result.prop = "default"
      else if (spec.type == "ImportSpecifier") result.prop = spec.imported.name
      return result
    }
  }

  tern.registerPlugin("es_modules", function(server) {
    server.loadPlugin("modules")
    server.mod.modules.on("getExports", connectModule)
    server.mod.modules.modNameTests.push(isModuleName)
    server.mod.modules.importTests.push(isImport)
  })
})
