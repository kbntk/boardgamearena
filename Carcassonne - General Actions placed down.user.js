// ==UserScript==
// @name         Carcassonne - General Actions placed down
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kubuntek
// @match        https://boardgamearena.com/*carcassonne*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=boardgamearena.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        // Create a MutationObserver to watch for changes in the observed div
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'subtree' || mutation.type === 'characterData') {
                    console.log('Change detected!');

                    duplicate(); // Call function to duplicate the div on change
                }
            }
        });

        let pageTitleDownDiv = document.createElement('div');
        pageTitleDownDiv.id = 'page-title-down';
        pageTitleDownDiv.textContent = 'click action_confirm';
        pageTitleDownDiv.addEventListener('click', function() {
            const actionConfirm = document.getElementById('action_confirm');
            actionConfirm.click();
        });
        document.addEventListener("mousedown", function(event) {
            // Check if the middle mouse button (button 1) was clicked
            if (event.button === 1) {
            const actionConfirm = document.getElementById('action_confirm');
            actionConfirm.click();
            }
        });
        let footerDiv = document.getElementById('carcafooter');

        footerDiv.insertBefore(pageTitleDownDiv, footerDiv.firstChild);

                const observedDiv = document.getElementById('action_confirm');
                observer.observe(observedDiv, {
                    childList: true,   // Observe direct children
                    subtree: true,     // Observe all descendants
                    characterData: true // Observe changes to text content
                });

    });

    function duplicate() {
        const pageTitleDownDiv = document.getElementById('page-title-down');
        let pageTitleDiv = document.getElementById('action_confirm');
        let pageTitleCloneDiv = pageTitleDiv.cloneNode(true);
        pageTitleDownDiv.innerHTML = '';

        pageTitleDownDiv.appendChild(pageTitleCloneDiv);
    }
})();