// ==UserScript==
// @name         Pixiv Edit Bookmark Shortkeys
// @namespace    https://github.com/MonoScyron/pixiv-scripts
// @version      1.2.0
// @description  Causes the remove and edit bookmark buttons to redirect back to their artwork. Binds ctrl-enter to the edit bookmark button and esc to the remove bookmark button. Also allows navigation of the tag list via arrow and enter.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/bookmark_edit_shortkeys.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/bookmark_edit_shortkeys.js
// @match        https://www.pixiv.net/bookmark_add*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if(document.body != null) {
        document.body.addEventListener("keydown", onkeydown);
    }

    const listItems = document.querySelector("ul.list-items.tag-cloud:not(ul.work)");
    const editBtn = document.querySelector("input._button-large");
    const removeBtn = document.querySelector("input.remove");

    editBtn.onclick = returnToWork;
    removeBtn.onclick = returnToWork;

    var selectedTagLi = null;
    var selectedTagVar = 0

    onkeydown = function(e) {
        if(e.ctrlKey && e.key == 'Enter') {
            editBtn.click();
        }
        else if(e.key == 'Escape') {
            removeBtn.click();
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

    function returnToWork() {
        let workID = window.location.href.split("&").pop().split("=").pop();
        setTimeout(() => {
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