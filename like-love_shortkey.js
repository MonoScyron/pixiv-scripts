// ==UserScript==
// @name         Pixiv Like-Love Shortkey
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      1.2.1
// @description  Links the "like" and "bookmark" button to alt-ctrl-s (Private bookmark). Links "like" only to ctrl-s.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/like-love_shortkey.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/like-love_shortkey.js
// @match        https://www.pixiv.net/*/artworks/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
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
                console.log("Accessing menu...");

                document.querySelector("button.l6avS_e._1W1yk-M").click();

                var del1 = setInterval(() => {
                    var loveBtnMenu = document.querySelector("li.sc-1o8nozx-2.bmbKoQ");
                    if(loveBtnMenu != null && loveBtnMenu.getAttribute("disabled") != "") {
                        console.log("Bookmarking work...");

                        clearInterval(del1);
                        loveBtnMenu.click();

                        var del2 = setInterval(() => {
                            var editBtn = document.querySelector("a.sc-d98f2c-0.sc-1ij5ui8-1.RICfj");
                            if(editBtn != null) {
                                console.log("Editing bookmark...");

                                clearInterval(del2);
                                editBtn.click();
                            }
                        }, 10);
                    }
                }, 10);
            }
        }
        else if(e.ctrlKey && e.key == 's') {
            e.preventDefault();
            likeWork();
        }
    }

    function likeWork() {
        var likeBtn = document.querySelector("button._35vRH4a");
        if(likeBtn != null && likeBtn.getAttribute("disabled") == null) {
            console.log("Liking work...");
            likeBtn.click();
        }
    }
})();