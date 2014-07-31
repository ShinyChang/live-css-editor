"use strict";
var textarea = $('#editor')[0];
var editor = CodeMirror.fromTextArea(textarea, {
    className: "css-editor",
    mode: "css",
    keyMap: "sublime",
    matchBrackets: true,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    autofocus: true,
    styleActiveLine: true
});
editor.setSize('100%', '100%');

$(editor.display.wrapper).addClass('live-css-editor');
editor.on('change', function() {
    chrome.devtools.inspectedWindow.eval(
        "var __live_css_edit__ = document.querySelectorAll('#__live_css_edit__')[0];\
       if(!__live_css_edit__) {\
          __live_css_edit__ = document.createElement('style');\
          __live_css_edit__.setAttribute('id', '__live_css_edit__');\
          document.querySelectorAll('body')[0].appendChild(__live_css_edit__);\
       }\
       var __live_css_edit_style__ = '"
       + btoa(editor.getValue())
       + "'; __live_css_edit__.innerHTML = atob(__live_css_edit_style__);");
});

chrome.devtools.inspectedWindow.eval(
    "document.querySelectorAll('#__live_css_edit__')[0].innerHTML", function(res) {
        editor.setValue(res || "");
        editor.focus();
    }
);