// ==UserScript==
// @name         Pixiv Show Alt on Hover
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      0.0.2-a
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
/* Header tooltip text */
.tooltip-header .tooltiptext-header {
    display: inline-block;
    visibility: hidden;
    width: 130px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 3px;
    border-radius: 6px;

    /* Position the tooltip text */
    position: relative;
    bottom: -5%;
    left: 50%;
    margin-left: -65px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.1s;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip-header:hover .tooltiptext-header {
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

    // ! No need to add alt of novels (Thankfully pixiv doesn't mix the two)

    // On header load, scrape alt of header works and add them as tooltips to the work previews
    // TODO: Make this less scuffed via mutation listeners maybe???
    var headerInt = setInterval(() => {
        var headerWorks = document.querySelectorAll("div.sc-x0j4pn-1.kJvGKk");
        if(headerWorks != null && headerWorks.length > 0) {
            clearInterval(headerInt);

            console.log("Adding alt text to header...");
            headerWorks.forEach((e) => {
                console.log(e);
                addHeaderTooltip(e);
            });
        }
    }, 100);

    // TODO: On footer load, scrape alt of footer works and add them as tooltips to the work previews

    // TODO: Scrape alt of /tags/* page and add them as tooltips to the work previews

    // TODO: Scrape alt of /users/* page and add them as tooltips to the work previews

    // TODO: Scrape alt of /*/ page and add them as tooltips to the work previews

    /**
     * Takes a work preview in the header and adds its alt attribute as a tooltip under it.
     * @param {HTMLDivElement} workPreview Preview of the artwork
     */
    function addHeaderTooltip(workPreview) {
        const img = getImageChild(workPreview);
        if(img == null)
            return;

        const alt = img.getAttribute("alt");
        if(alt != null) {
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltiptext-header';
            tooltip.innerHTML = alt;

            workPreview.classList.add('tooltip-header');
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
        while(ret.nodeName != 'IMG') {
            ret = ret.firstChild;
        }
        return ret;
    }
})();