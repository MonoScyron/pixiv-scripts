// ==UserScript==
// @name         Pixiv Up Arrow Exit Read
// @namespace    https://github.com/MonoScyron/pixiv-scripts
// @version      1.1.4
// @description  Binds up arrow to exit "reading works" when at page 1 of "reading works".
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/up-arrow-exit-read.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/up-arrow-exit-read.js
// @match        https://www.pixiv.net/*/
// @match        https://www.pixiv.net/*/users/*
// @match        https://www.pixiv.net/*/artworks/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var exit = false;

    document.addEventListener("keydown", (e) => {
        if(window.location.href.indexOf("#") >= 0) {
            if(e.key == "ArrowUp") {
                var val = document.querySelector("div.sc-1oz5uvo-0.bFxHZI");
                if(val.scrollTop == 0) {
                    if(exit) {
                        exit = false;
                        document.querySelector("div.gtm-manga-viewer-close-icon").click();
                    }
                    else
                        exit = true;
                }
                else
                    exit = false;
            }
            else
                exit = false
        }
    });
})();