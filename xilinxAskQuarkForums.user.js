// ==UserScript==
// @name         xilinxAskQuarkSupportForums
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Lucas Bonaudi
// @match        *://support.xilinx.com/*
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==
waitForKeyElements('.cuf-feedItemHeader.cuf-media.l-first', function () {
    let btnContainer = $('.cuf-feedItemHeader.cuf-media.l-first');
    let button = $('<button id="askQuarkButton" class="button" role="button">ASK Quark</button>');

    btnContainer.append(button);
    document.getElementById("askQuarkButton").addEventListener(
        "click", ButtonClickAction, false
    );
});

function ButtonClickAction(zEvent) {
    let urlForumString = window.location.href;
    let positionLastSlash = urlForumString.lastIndexOf("/");
    let caseID = urlForumString.substring(positionLastSlash - 18, positionLastSlash).trim();
    let subject = $('.cuf-body.cuf-questionTitle.forceChatterFeedBodyQuestionWithoutAnswer').first().text().trim();
    let desc = $('.cuf-feedBodyText.forceChatterMessageSegments.forceChatterFeedBodyText .feedBodyInner').html().replace(/&nbsp;/g, '\n').replace(/<\s*br[^>]?>/g, '\n').replace(/<\s*\/p[^>]?>/g, '\n').replace(/(<([^>]+)>)/g, "").trim()
    let maxLength = 2048;

    if (desc.length > maxLength)
        desc = desc.substring(0, maxLength)

    var urlString = "https://xilinx.quarkai.app";
    var parameters = "?subject=" + subject + "&desc=" + desc + "&caseid=" + caseID;

    var encodedURL = urlString + parameters;
    window.open(encodedURL, "_ask");
}

GM_addStyle(`
    .button {
        background-color: #f26202;
        border: none;
        color: white;
        padding: 8px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 10px;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        font-weight: bold;
        top: 10px;
        left: 85%;
        position: absolute;
    }
` );