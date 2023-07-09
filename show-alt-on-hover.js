// ==UserScript==
// @name         Pixiv Show Alt on Hover (WIP)
// @namespace    https://github.com/MonoScyron/pixiv-scripts
// @version      0.1.4
// @description  Adds the alt of works as a tooltip to their previews.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/show-alt-on-hover.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/pixiv-scripts/main/show-alt-on-hover.js
// @match        https://www.pixiv.net/*/artworks/*
// @match        https://www.pixiv.net/*/tags/*
// @match        https://www.pixiv.net/*/users/*
// @match        https://www.pixiv.net/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // ? Consider injecting alt directly to preview (no need to hover to show)
    // ? Consider splitting this script into multiple, one for each matched page (if too difficult to scrape w/ 1 algo)

    console.log("Script: Loaded")

    let root = document.querySelector("div#root");
    if(root != null) {
        console.log("Script: Begin observing mutations")
        const config = {attributes: false, childList: true, subtree: true};
        const observer = new MutationObserver(callback);
        observer.observe(root, config);
    }

    /**
     * Callback function to execute when mutations are observerd.
     * @param {Array<MutationRecord>} mList
     * @param {MutationObserver} observer
     */
    function callback(mList, observer) {
        for(const m of mList) {
            if(m.type === "childList") {
                // ! No need to add alt of novels (Thankfully pixiv doesn't mix the two)

                let target = m.target;

                // On header load, scrape alt of header works and add them as tooltips to the work previews
                // TODO: Script tries to grab alts too early and gets null
                if(target.nodeName === "ASIDE" && target.classList.contains("sc-1nr368f-7") && target.classList.contains("hdvpLU")) {
                    console.log(`Script: Adding alts to header...`);
                    target.querySelector("nav.sc-x0j4pn-0.gbvtwZ").childNodes.forEach((n) => {
                        addTitle(n);
                    });
                }

                // On footer load, scrape alt of footer works and add them as tooltips to the work previews
                if(target.nodeName === "DIV" && target.classList.contains("sc-rp5asc-9") && target.classList.contains("cYUezH")) {
                    console.log("Script: Adding alts to a footer work...");
                }
                // TODO: Scrape alt of /tags/* (works search) page and add them as tooltips to the work previews
                // TODO: Scrape alt of /users/* (users) page and add them as tooltips to the work previews
                // TODO: Scrape alt of /*/ (home) page and add them as tooltips to the work previews
            }
        }

        /**
         * @param {HTMLElement} n
         */
        function addTitle(n) {
            n = n.querySelector('img');
            if(n != null) {
                let alt = n.getAttribute("alt");
                console.log(`Script: ${alt}`)
                n.setAttribute("title", alt);
            }
        }
    }
})();