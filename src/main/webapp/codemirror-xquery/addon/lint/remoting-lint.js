CodeMirror.remotingValidator = function(cm, updateLinting, options) {

  function addAnnotation(error, found) {
    var startLine = error.startLine;
    var startChar = error.startChar;
    var endLine = error.endLine;
    var endChar = error.endChar;
    var message = error.message;
    found.push({
      from : CodeMirror.Pos(startLine, startChar),
      to : CodeMirror.Pos(endLine, endChar),
      message : message
    });
  }

  var code = cm.getValue();
  var mode = cm.getMode().name;
  var url = options.url;
  jQuery.ajax({
    type : 'POST',
    url : url,
    data : {
      "mode" : mode,
      "code" : code
    },
    async : true,
    success : function(data, textStatus, jqXHR) {
      if (data) {
        var found = [];

        if (data.annotations) {
          data = data.annotations;
        }

        if (data.length || data.length == 0) {
          for ( var i = 0; i < data.length; i++) {
            var error = data[i];
            addAnnotation(error, found);
          }
        } else {
          addAnnotation(data, found);
        }
      }
      updateLinting(cm, found);
    },
    error : function(jqXHR, textStatus, errorThrown) {
      updateLinting(cm, []);
      //alert(errorThrown)
    }
  });

};
