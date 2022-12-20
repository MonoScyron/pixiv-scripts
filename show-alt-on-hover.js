// ==UserScript==
// @name         Pixiv Show Alt on Hover
// @namespace    https://github.com/MonoScyron/PixivScripts
// @version      0.0.1-a
// @description  Adds the alt of works as a tooltip to their previews.
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/show-alt-on-hover.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/PixivScripts/main/show-alt-on-hover.js
// @match        https://www.pixiv.net/en/artworks/*
// @match        https://www.pixiv.net/en/tags/*
// @match        https://www.pixiv.net/en/users/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ? Consider injecting alt directly to preview (no need to hover to show)
    // ? Consider splitting this script into multiple, one for each matched page (if too difficult to scrape w/ 1 algo)

    // ! No need to add alt of novels    
    // TODO: On header load, scrape alt of header works and add them as tooltips to the work previews
    // TODO: On footer load, scrape alt of footer works and add them as tooltips to the work previews
    // TODO: Scrape alt of /tags/* page and add them as tooltips to the work previews
    // TODO: Scrape alt of /users/* page and add them as tooltips to the work previews
})();