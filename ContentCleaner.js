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
    ciframe = document.getElementsByTagName('iframe'); // Gets the Content iframe
    dctitle = document.querySelector("h1[class*='d2l-page-title']"); // Get the page title.
    if (dctitle.textContent == "Edit HTML File") { // If the page is editable, run.
        if (ciframe.length > 0) { // When the frame with the frame with the iframe loads
            var bs = ciframe[0].contentWindow.document.querySelectorAll("b"); // Gets <b> tags from the iframe
            $(bs).contents().unwrap().wrap('<strong/>'); // Converts <b>s to <strong>s
            var is = ciframe[0].contentWindow.document.querySelectorAll("i"); // Gets <i> tags from the iframe
            $(is).contents().unwrap().wrap('<em/>'); // Replaces <i>s with <em>s
            var divs = ciframe[0].contentWindow.document.querySelectorAll("div:not([class]):not([id])"); // Gets empty <div>s from the iframe
            $(divs).contents().unwrap().wrap('<p/>'); // Replaces <div>s with <p>s
            var bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']"); // Gets bolded <span>s from the iframe
            $(bolds).contents().unwrap().wrap('<strong/>'); // Replaces bolded <span>s with <strong>s
            var spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])"); // Gets <span>s from the iframe
            $(spans).contents().unwrap(); // Removes remaining <span>s
        }
    }

});
