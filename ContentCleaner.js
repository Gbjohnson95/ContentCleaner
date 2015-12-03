// ==UserScript==
// @name        ContentCleaner
// @version     2.0
// @author      Grant Johnson
// @description Flags common mistakes
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @require     http://code.jquery.com/jquery-latest.js
// @run-at      document-end
// ==/UserScript==

window.addEventListener("load", function () {
    ciframe = document.getElementsByTagName('iframe');
    dctitle = document.querySelector("h1[class*='d2l-page-title']");
    if (dctitle.textContent == "Edit HTML File") {
        if (ciframe.length > 0) {
            var bs    = ciframe[0].contentWindow.document.querySelectorAll("b");
            var is    = ciframe[0].contentWindow.document.querySelectorAll("i");
            var divs  = ciframe[0].contentWindow.document.querySelectorAll("div:not([id])");
            var bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
            var spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
            var as    = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])");
            var empty = ciframe[0].contentWindow.document.querySelectorAll("p:empty, strong:empty, em:empty, a:empty");
            var numfixes =  bs.length + is.length + divs.length + bolds.length + spans.length + as.length + empty.length;
            $( "input[name='topicTitle']" ).after( '<button type="button" id="fixstuff" style="margin-right: 10px" >Fix ' + numfixes + ' issues</button>' );
            document.getElementById("fixstuff").addEventListener("click", function(){
                // <b> tags turn into <strong> tags
                $(bs).contents().unwrap().wrap('<strong/>');
                // <i> tags turn into <em> tags
                $(is).contents().unwrap().wrap('<em/>');
                // <div> tags turn into <p> tags
                $(divs).contents().unwrap().wrap('<p/>');
                // <span> with bolds turn into <strong> tags
                $(bolds).contents().unwrap().wrap('<strong/>');
                // <span> tags get ripped out
                $(spans).contents().unwrap();
                // all links get target="_blank"
                $(as).attr("target","_blank");
                // any empty <p> <strong> <em> and <a> tags get ripped out
                $(empty).remove();
                // Report back
                if (numfixes > 0) {
                    alert("Number of <b>s fixed: "              + bs.length 
                          + "\nNumber of <i>s fixed: "              + is.length
                          + "\nNumber of <div>s replaced: "         + divs.length
                          + "\nNumber of bolded <span>s replaced: " + bolds.length
                          + "\nNumber of <span>s removed: "         + spans.length 
                          + "\nNumber of Bad <a>s targets fixed: "  + as.length
                          + "\nNumber of empty Elements removed: "  + empty.length);
                } else {
                    alert("Nothing fixed");
                }
            });
        }
    }
});
