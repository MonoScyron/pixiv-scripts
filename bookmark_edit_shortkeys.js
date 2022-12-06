// ==UserScript==
// @name         Pixiv Edit Bookmark Shortkeys
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      0.1
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

    onkeydown = function(e) {
        if(e.ctrlKey && e.key == 'Enter') {
            // TODO: Handle save bookmarks & return to artwork (instead of going to bookmarks page)
        }
        else if(e.key == 'ArrowLeft') {
            // TODO: Handle move tag highlight one to the left. If no tag highlighted, highlight first tag
        }
        else if(e.key == 'ArrowRight') {
            // TODO: Handle move tag highlight one to the right. If no tag highlighted, highlight first tag
        }
        else if(e.key == 'Enter') {
            // TODO: Handle clicking highlighted tag
        }
    }
})();