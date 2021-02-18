// ==UserScript==
// @name         xilinxAskQuarkForums
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Lucas Bonaudi
// @match        *://forums.xilinx.com/*
// @grant        GM_addStyle
// ==/UserScript==
(function() {
    'use strict';

    $(document).ready(function() {
        let btnContainer = $('.lia-quilt-layout-forum-topic-message-support').first().find('.lia-quilt-column-message-header-right').find('.lia-quilt-column-alley-right')
        let button = $('<button class="button">ASK Quark</button>');

        button.click(function () {
            let urlForumString = window.location.href;
            let positionLastSlash = urlForumString.lastIndexOf("/");
            let caseID = urlForumString.substr(positionLastSlash + 1, 40).trim();
            let subject = $('.lia-message-subject').first().text().trim();
            let desc = $('#bodyDisplay .lia-message-body-content').html().replace(/&nbsp;/g,'\n').replace(/<\s*br[^>]?>/g,'\n').replace(/<\s*\/p[^>]?>/g,'\n').replace(/(<([^>]+)>)/g, "").trim()
            let maxLength = 2048;
            let categories = '';
            let categoriesWithLink = document.getElementById('list').querySelectorAll('ul li a');
            for (var i=0; i<categoriesWithLink.length; i++) {
                categories += categoriesWithLink[i].innerText + ',';
            };
            let categoriesWithSpan = document.getElementById('list').querySelectorAll('ul li span');
            categories += categoriesWithSpan[categoriesWithSpan.length - 1].innerText;

            if(desc.length > maxLength)
                desc = desc.substring(0, maxLength)

            var urlString = "https://xilinx.quark.ai/support";
            //var urlString = "http://localhost:9001/support";
            var parameters =
                "?subject=" + encodeURIComponent(subject) +
                "&ds=xilinx" +
                "&desc=" + encodeURIComponent(desc) +
                "&qMode=Ticket" +
                "&url=" + encodeURIComponent(window.location.href) +
                "&categories=" + encodeURIComponent(categories) +
                "&caseid=" + encodeURIComponent(caseID);



            var encodedURL = urlString + parameters;
            //console.log('this is the url', encodedURL);
            window.open(encodedURL, "_ask");
        });

        btnContainer.append(button);
    })
})();

GM_addStyle ( `
    .button {
        background-color: orange;
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
    }
` );