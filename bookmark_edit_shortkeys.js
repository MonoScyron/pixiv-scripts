// ==UserScript==
// @name         Pixiv Edit Bookmark Shortkeys
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      1.1.0
// @description  Adds several shortkeys to the edit bookmark page, binds ctrl-enter to save & return to artwork, and binds esc to remove bookmark and return to artwork.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/bookmark_edit_shortkeys.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/bookmark_edit_shortkeys.js
// @match        https://www.pixiv.net/bookmark_add*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.body.addEventListener("keydown", onkeydown);

    const listItems = document.querySelector("ul.list-items.tag-cloud:not(ul.work)");
    var selectedTagLi = null;
    var selectedTagVar = 0;

    onkeydown = function(e) {
        let workID = window.location.href.split("&").pop().split("=").pop();
        if(e.ctrlKey && e.key == 'Enter') {
            document.querySelector("input._button-large").click();
            returnToWork(workID);
        }
        else if(e.key == 'Escape') {
            document.querySelector("input.remove").click();
            returnToWork(workID);
        }
        else if(e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Enter') {
            if(selectedTagLi == null) {
                selectedTagLi = listItems.firstChild;
                selectedTagLi.firstChild.setAttribute("style", "border: 1.5px solid white !important;");
            }
            else if(e.key == 'ArrowLeft') {
                selectPrevTag();
            }
            else if(e.key == 'ArrowRight') {
                selectNextTag();
            }
            else if(e.key == 'Enter') {
                listItems.childNodes.item(selectedTagVar).firstChild.click();
            }
        }
    }

    function returnToWork(workID) {
        var del = setInterval(() => {
            clearInterval(del);
            window.location.href = "https://www.pixiv.net/en/artworks/" + workID;
        }, 500);
    }

    function selectNextTag() {
        listItems.childNodes.item(selectedTagVar).firstChild.removeAttribute("style");

        selectedTagVar++;
        if(selectedTagVar >= listItems.childNodes.length) {
            selectedTagVar = 0;
        }

        listItems.childNodes.item(selectedTagVar).firstChild.setAttribute("style", "border: 1.5px solid white !important;");
    }

    function selectPrevTag() {
        listItems.childNodes.item(selectedTagVar).firstChild.removeAttribute("style");

        selectedTagVar--;
        if(selectedTagVar < 0) {
            selectedTagVar = listItems.childNodes.length - 1;
        }

        listItems.childNodes.item(selectedTagVar).firstChild.setAttribute("style", "border: 1.5px solid white !important;");
    }
})();