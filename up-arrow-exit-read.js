// ==UserScript==
// @name         Pixiv Up Arrow Exit Read
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      1.0.1
// @description  Binds up arrow to exit "reading works" when at page 1 of "reading works".
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/up-arrow-exit-read.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/up-arrow-exit-read.js
// @match        https://www.pixiv.net/*/artworks/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var exit = false;

    document.addEventListener("keydown", (e) => {
        if(window.location.href.indexOf("#") >= 0 && e.key == "ArrowUp") {
            var val = document.querySelector("input.gtm-manga-viewer-change-page");
            if(val.getAttribute("value") == "1") {
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
    });
})();