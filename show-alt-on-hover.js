// ==UserScript==
// @name         Pixiv Show Alt on Hover
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      0.1.1-a
// @description  Adds the alt of works as a tooltip to their previews.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/show-alt-on-hover.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/show-alt-on-hover.js
// @match        https://www.pixiv.net/*/artworks/*
// @match        https://www.pixiv.net/*/tags/*
// @match        https://www.pixiv.net/*/users/*
// @match        https://www.pixiv.net/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

const tooltipStyleCSS = `
/* Position tooltip text */
.tooltiptext-over {
    bottom: 110%;
}

.tooltiptext-under {
    top: 110%;
}

.tooltiptext-overlay {
    top: 15%;
}

/* General formatting for tooltip text */
.tooltiptext {
    display: inline-block;
    visibility: hidden;
    width: 145%;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 3px;
    border-radius: 6px;
    z-index: 1;

    /* Position tooltip */
    position: absolute;
    left: -25%;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.1s;
}

/* General formatting for tooltip */
.tooltip {
    position: relative;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
`;

(function() {
    'use strict';

    // ? Consider injecting alt directly to preview (no need to hover to show)
    // ? Consider splitting this script into multiple, one for each matched page (if too difficult to scrape w/ 1 algo)

    // Inject tooltip style into document
    const tooltipStyle = document.createElement('style');
    tooltipStyle.id = "userscript-tooltip-style";
    tooltipStyle.innerHTML = tooltipStyleCSS;
    document.head.appendChild(tooltipStyle);

    var root = document.querySelector("div#root");
    if(root != null) {
        const config = { attributes: false, childList: true, subtree: true };
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
            if(m.type == "childList") {
                // ! No need to add alt of novels (Thankfully pixiv doesn't mix the two)

                var target = m.target;

                // On header load, scrape alt of header works and add them as tooltips to the work previews
                if(target.nodeName == "ASIDE" && target.classList.contains("sc-1nr368f-7") && target.classList.contains("hdvpLU")) {
                    console.log("Script: Adding alts to header...");
                    target.querySelector("nav.sc-x0j4pn-0.gbvtwZ").childNodes.forEach((n) => {
                        addTooltipUnder(n);
                    });
                }

                // On footer load, scrape alt of footer works and add them as tooltips to the work previews
                // TODO: Stop footer nav container from automatically expanding when adding alt tooltips
                if(target.nodeName == "DIV" && target.classList.contains("sc-rp5asc-9") && target.classList.contains("cYUezH")) {
                    console.log("Script: Adding alts to a footer work...");
                    // * This doesn't work yet!
                    // addTooltipUnder(target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
                }

                // TODO: Scrape alt of /tags/* (works search) page and add them as tooltips to the work previews
                // TODO: Scrape alt of /users/* (users) page and add them as tooltips to the work previews
                // TODO: Scrape alt of /*/ (home) page and add them as tooltips to the work previews
            }
        }
    }

    /**
     * Takes a work preview and overlays its alt attribute as a tooltip over the preview.
     * @param {HTMLDivElement} workPreview Preview of artwork in footer
     */
    function addTooltipOverlay(workPreview) {
        const img = getImageChild(workPreview);
        if(img == null)
            return;

        const alt = img.getAttribute("alt");
        if(alt != null) {
            const tooltip = document.createElement('span');
            tooltip.className = "tooltiptext tooltiptext-overlay";
            tooltip.innerHTML = alt;

            workPreview.classList.add("tooltip");
            workPreview.appendChild(tooltip);
        }
    }

    /**
     * Takes a work preview and adds its alt attribute as a tooltip above it.
     * @param {HTMLDivElement} workPreview Preview of artwork in footer
     */
    function addTooltipAbove(workPreview) {
        const img = getImageChild(workPreview);
        if(img == null)
            return;

        const alt = img.getAttribute("alt");
        if(alt != null) {
            const tooltip = document.createElement('span');
            tooltip.className = "tooltiptext tooltiptext-over";
            tooltip.innerHTML = alt;

            workPreview.classList.add("tooltip");
            workPreview.appendChild(tooltip);
        }
    }

    /**
     * Takes a work preview and adds its alt attribute as a tooltip under it.
     * @param {HTMLDivElement} workPreview Preview of artwork in header
     */
    function addTooltipUnder(workPreview) {
        if(workPreview.childNodes.length >= 2)
            return;

        const img = getImageChild(workPreview);
        if(img == null)
            return;

        const alt = img.getAttribute("alt");
        if(alt != null) {
            const tooltip = document.createElement('span');
            tooltip.className = "tooltiptext tooltiptext-under";
            tooltip.innerHTML = alt;

            workPreview.classList.add("tooltip");
            workPreview.appendChild(tooltip);
        }
    }

    /**
     * Takes an html element and searches through its first child elements until an img element is found.
     * @param {HTMLElement} element Element to get img child element from
     * @returns HTMLImageElement or null if no img element is found
     */
    function getImageChild(element) {
        var ret = element;
        while(ret != null && ret.nodeName != 'IMG') {
            ret = ret.firstChild;
        }
        return ret;
    }
})();