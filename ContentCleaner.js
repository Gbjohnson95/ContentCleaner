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

            // Get the bad elements
            var bs    = ciframe[0].contentWindow.document.querySelectorAll("b");
            var is    = ciframe[0].contentWindow.document.querySelectorAll("i");
            var divs  = ciframe[0].contentWindow.document.querySelectorAll("div:not([class]):not([id])");
            var bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
            var spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
            var as    = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])");
            
            // Fix the bad elements
            $(bs).contents().unwrap().wrap('<strong/>');
            $(is).contents().unwrap().wrap('<em/>');
            $(divs).contents().unwrap().wrap('<p/>');
            $(bolds).contents().unwrap().wrap('<strong/>');
            $(spans).contents().unwrap();
            $(as).attr("target","_blank");

            // Report back
            var numfixes =  bs.length + is.length + divs.length + bolds.length + spans.length + as.length;
            if (numfixes > 0) {
                alert("Number of <b>s fixed: " + bs.length 
                      + "\nNumber of <i>s fixed: " + is.length
                      + "\nNumber of <div>s replaced: " + divs.length
                      + "\nNumber of bolded <span>s replaced: " + bolds.length
                      + "\nNumber of <span>s removed: " + spans.length 
                      + "\nNumber of Bad <a>s targets fixed: " + as.length);
            } else {
                alert("Nothing fixed");
            }
        }
    }
});
