// ==UserScript==
// @name         Pixiv Like-Love Shortkey
// @namespace    https://github.com/MonoScyron/pixiv-scripts
// @version      1.3.1
// @description  Links the "like" and "bookmark" button to alt-ctrl-s, also enters bookmark edit. Links "like" only to ctrl-s.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/like-love_shortkey.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/like-love_shortkey.js
// @match        https://www.pixiv.net/*/
// @match        https://www.pixiv.net/*/users/*
// @match        https://www.pixiv.net/*/artworks/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    if(document.body != null) {
        document.body.addEventListener("keydown", onkeydown);
    }

    onkeydown = function(e) {
        if(e.ctrlKey && e.altKey && e.key == 's') {
            e.preventDefault();

            likeWork();

            var loveBtn = document.querySelector("button.gtm-main-bookmark");
            if(loveBtn != null && loveBtn.getAttribute("disabled") == null) {
                console.log("Bookmarking...");
                loveBtn.click();

                console.log("Entering bookmark...");
                let workID = window.location.href.split("/").pop();
                let bookmarkLink = "/bookmark_add.php?type=illust&illust_id=" + workID;
                setTimeout(() => {
                    window.location.href = bookmarkLink;
                }, 500);
            }
        }
        else if(e.ctrlKey && e.key == 's') {
            e.preventDefault();
            likeWork();
        }
    }

    function likeWork() {
        var likeBtn = document.querySelector("button[class^='style_button']");
        if(likeBtn != null && likeBtn.getAttribute("disabled") == null) {
            console.log("Liking work...");
            likeBtn.click();
        }
    }
})();