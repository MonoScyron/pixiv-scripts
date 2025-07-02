// ==UserScript==
// @name         Pixiv Edit Bookmark Shortkeys
// @namespace    https://github.com/MonoScyron/pixiv-scripts
// @version      1.3.2
// @description  Causes the remove and edit bookmark buttons to redirect back to their artwork. Binds ctrl-enter to the edit bookmark button and esc to the remove bookmark button. Also allows navigation of the tag list via arrow and enter.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/bookmark-edit-shortkeys.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/bookmark-edit-shortkeys.js
// @match        https://www.pixiv.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    if(!window.location.href.includes('bookmark_add')) {
        console.log('not running shortkey script');
        return;
    }

    const SELECTED_STYLE_CLASS = 'shortkey-selected';
    const SELECTED_STYLE_NODE = document.createElement('style')
    SELECTED_STYLE_NODE.innerHTML = `.${SELECTED_STYLE_CLASS} { border: 1.5px solid black !important;`
    document.head.appendChild(SELECTED_STYLE_NODE);

    if(document.body != null) {
        document.body.addEventListener("keydown", onkeydown);
    }

    // switch to private bookmark
    document.querySelector('input[name="restrict"][value="1"]').checked = true;

    const listItems = document.querySelector("ul.list-items.tag-cloud:not(ul.work)");
    const editBtn = document.querySelector("input._button-large");
    const removeBtn = document.querySelector("input.remove");

    window.addEventListener('beforeunload', function(e) {
        console.log('Redirecting to original work...');
        returnToWork();
    });

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
                selectedTagLi.firstChild.classList.add(SELECTED_STYLE_CLASS);
            }
            else if(e.key == 'ArrowLeft') {
                selectPrevTag();
            }
            else if(e.key == 'ArrowRight') {
                selectNextTag();
            }
            else if(e.key == 'Enter') {
                listItems.childNodes.item(selectedTagVar).firstChild.click();
                listItems.childNodes.item(selectedTagVar).firstChild.classList.add(SELECTED_STYLE_CLASS);
            }
        }
    }

    function returnToWork() {
        let workID = window.location.href.split("&").pop().split("=").pop();
        setTimeout(() => {
            window.location.href = "https://www.pixiv.net/en/artworks/" + workID;
        }, 750);
    }

    function selectNextTag() {
        listItems.childNodes.item(selectedTagVar).firstChild.classList.remove(SELECTED_STYLE_CLASS);

        selectedTagVar++;
        if(selectedTagVar >= listItems.childNodes.length) {
            selectedTagVar = 0;
        }

        listItems.childNodes.item(selectedTagVar).firstChild.classList.add(SELECTED_STYLE_CLASS);
    }

    function selectPrevTag() {
        listItems.childNodes.item(selectedTagVar).firstChild.classList.remove(SELECTED_STYLE_CLASS);

        selectedTagVar--;
        if(selectedTagVar < 0) {
            selectedTagVar = listItems.childNodes.length - 1;
        }

        listItems.childNodes.item(selectedTagVar).firstChild.classList.add(SELECTED_STYLE_CLASS);
    }
})();