// ==UserScript==
// @name        ContentCleaner
// @version     1
// @author      Grant Johnson
// @description Flags common mistakes
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @require     http://code.jquery.com/jquery-latest.js
// @run-at      document-end
// ==/UserScript==
window.addEventListener("load", function () {
    ciframe = document.getElementsByTagName('iframe');
    dctitle = document.querySelector("h1[class*='d2l-page-title']"); // Get the page title.
    if (dctitle.textContent == "Edit HTML File") { // If the page is editable, run.
        if (ciframe.length > 0) { // When the frame with the frame with the iframe loads
            var bs = ciframe[0].contentWindow.document.querySelectorAll("b");
            $(bs).contents().unwrap().wrap('<strong/>');
            var is = ciframe[0].contentWindow.document.querySelectorAll("i");
            $(is).contents().unwrap().wrap('<em/>');
            var divs = ciframe[0].contentWindow.document.querySelectorAll("div:not([class]):not([id])");
            $(divs).contents().unwrap().wrap('<p/>');
            var bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
            $(bolds).contents().unwrap().wrap('<strong/>');
            var spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
            $(spans).contents().unwrap();
        }
    }

});
