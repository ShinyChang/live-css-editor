"use strict";
chrome.devtools.panels.elements.createSidebarPane("LiveCSS",
    function(sidebar) {
        // sidebar initialization code here
        sidebar.setPage('editor.html');
        sidebar.setHeight("300px");
    });
