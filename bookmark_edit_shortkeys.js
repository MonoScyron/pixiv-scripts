// ==UserScript==
// @name         Pixiv Edit Bookmark Shortkeys
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      0.2
// @description  Adds several shortkeys to the edit bookmark page + binds ctrl-enter to save & return to artwork
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
        if(e.ctrlKey && e.key == 'Enter') {
            // TODO: Handle save bookmarks & return to artwork (instead of going to bookmarks page)
            document.querySelector("input._button-large").click();
        }
        else if(e.key == 'ArrowLeft') {
            if(selectedTagLi == null) {
                selectedTagLi = listItems.firstChild;
                selectedTagLi.firstChild.setAttribute("style", "border: 1.5px solid white !important;");
            }
            else {
                selectPrevTag();
            }
        }
        else if(e.key == 'ArrowRight') {
            if(selectedTagLi == null) {
                selectedTagLi = listItems.firstChild;
                selectedTagLi.firstChild.setAttribute("style", "border: 1.5px solid white !important;");
            }
            else {
                selectNextTag();
            }
        }
        else if(e.key == 'Enter') {
            listItems.childNodes.item(selectedTagVar).firstChild.click();
        }
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