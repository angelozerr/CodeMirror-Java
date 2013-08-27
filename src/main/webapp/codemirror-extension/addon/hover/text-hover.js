(function() {
  "use strict";

  function showTooltip(e, content) {
    var tt = document.createElement("div");
    tt.className = "CodeMirror-hover-tooltip";
    if (typeof content == "string") {
    	content = document.createTextNode(content);
    }     
    tt.appendChild(content);
    document.body.appendChild(tt);

    function position(e) {
      if (!tt.parentNode) return CodeMirror.off(document, "mousemove", position);
      tt.style.top = Math.max(0, e.clientY - tt.offsetHeight - 5) + "px";
      tt.style.left = (e.clientX + 5) + "px";
    }
    CodeMirror.on(document, "mousemove", position);
    position(e);
    if (tt.style.opacity != null) tt.style.opacity = 1;
    return tt;
  }
  function rm(elt) {
    if (elt.parentNode) elt.parentNode.removeChild(elt);
  }
  function hideTooltip(tt) {
    if (!tt.parentNode) return;
    if (tt.style.opacity == null) rm(tt);
    tt.style.opacity = 0;
    setTimeout(function() { rm(tt); }, 600);
  }

  function showTooltipFor(e, content, node, state) {
    if (state.node != node) return;
    var tooltip = showTooltip(e, content);
    function hide() {
      CodeMirror.off(node, "mouseout", hide);
      CodeMirror.off(node, "click", hide);
      node.className = node.className.substring(0, node.className.length
          - ' CodeMirror-hover'.length);
      if (tooltip) { hideTooltip(tooltip); if (state.node === node) state.node = node; tooltip = null; }
    }
    var poll = setInterval(function() {
      if (tooltip) for (var n = node;; n = n.parentNode) {
        if (n == document.body) return;
        if (!n) { hide(); break; }
      }
      if (!tooltip) return clearInterval(poll);
    }, 400);
    CodeMirror.on(node, "mouseout", hide);
    CodeMirror.on(node, "click", hide);
  }

  function TextHoverState(cm, options) {
    this.options = options;
    this.timeout = null;
    this.onMouseOver = function(e) { onMouseOver(cm, e); };
  }

  function parseOptions(cm, options) {
    if (options instanceof Function) return {getTextHover: options};
    if (!options || options === true) options = {};
    if (!options.getTextHover) options.getTextHover = cm.getHelper(CodeMirror.Pos(0, 0), "textHover");
    if (!options.getTextHover) throw new Error("Required option 'getTextHover' missing (text-hover addon)");
    return options;
  }
  
  function onMouseOver(cm, e) {
    var node = e.target || e.srcElement;
    if (node) {
      var state = cm.state.textHover;
      state.node = node;
      var content = state.options.getTextHover(cm, node, e);
      if (content) {
        node.className += ' CodeMirror-hover'
        //clearTimeout(state.timeout);
        //state.timeout = setTimeout(function() {showTooltipFor(e, content, node, state);}, 300);
        showTooltipFor(e, content, node, state);
      }
    }
  }
  
  function optionHandler(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      CodeMirror.off(cm.getWrapperElement(), "mouseover", cm.state.textHover.onMouseOver);
      delete cm.state.textHover;
    }

    if (val) {
      var state = cm.state.textHover = new TextHoverState(cm, parseOptions(cm, val));
      CodeMirror.on(cm.getWrapperElement(), "mouseover", state.onMouseOver);
    }
  }

  function isTokenType(type, typeToSearch) {
    if (!type)
      return false;
    return type.indexOf(typeToSearch) != -1;
  }
  CodeMirror.isTokenType = isTokenType;

  function findTokenAt(cm, pos, types) {
    var type = cm.getTokenTypeAt(pos);
    if (type) {
      if (!types)
        return cm.getTokenAt(pos);
      for ( var j = 0; j < types.length; j++) {
        if (isTokenType(type, types[j])) {
          return cm.getTokenAt(pos);
        }
      }
    }
  }

  // When the mouseover fires, the cursor might not actually be over
  // the character itself yet. These pairs of x,y offsets are used to
  // probe a few nearby points when no suitable marked range is found.
  var nearby = [ 0, 0, 0, 5, 0, -5, 5, 0, -5, 0 ];

  CodeMirror.defineExtension("findTokenAt", function(e, types) {
    var cm = this;
    for ( var i = 0; i < nearby.length; i += 2) {
      var pos = cm.coordsChar({
        left : e.clientX + nearby[i],
        top : e.clientY + nearby[i + 1]
      });
      var token = findTokenAt(cm, pos, types);
      if (token) return token;
    }
  });

  CodeMirror.defineOption("textHover", false, optionHandler); // deprecated
  
})();