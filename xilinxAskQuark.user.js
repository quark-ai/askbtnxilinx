// ==UserScript==
// @name         xilinxAskQuark
// @namespace    https://xilinx.quark.ai/
// @version      0.1
// @description  Browser based integration with quark webapp.
// @author       Quark.ai
// @match       http://uat-compass.xilinx.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    $(document).ready(function() {
        let btnContainerSelector = '#s_S_A4_div > form > div > span > table:nth-child(4) > tbody > tr > td:nth-child(12)';

        waitForKeyElements(btnContainerSelector, function() {
            let btnContainer = $(btnContainerSelector);
            let button = $('<button class="button">ASK</button>');

            button.click(function () {
                let subject = $('#a_4 > div > table > tbody > tr:nth-child(4) > td:nth-child(3) > div > input').val();
                let desc = $('#cke_493_contents > iframe').contents().find('body').text().trim();
                let device = $('#a_4 > div > table > tbody > tr:nth-child(5) > td:nth-child(3) > div > input').val();
                let maxLength = 2048;

                if(desc.length > maxLength)
                    desc = desc.substring(0, maxLength)

                var urlString = "https://xilinx.quark.ai/support";
                var parameters =
                    "?subject=" + encodeURIComponent(subject) +
                    "&ds=xilinx" +
                    "&desc=" + encodeURIComponent(desc) +
                    "&qMode=Ticket";

                var encodedURL = urlString + parameters;
                window.open(encodedURL, "_ask");
            });

            btnContainer.append(button);
        });
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
        float: right;
    }
` );
