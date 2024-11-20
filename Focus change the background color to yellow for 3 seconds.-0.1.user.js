// ==UserScript==
// @name         Focus change the background color to yellow for 3 seconds.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       kubuntek
// @match        https://boardgamearena.com/*yatzy*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        console.log('initial log entry.');
        // Step 1: Create a MutationObserver
        const observerCallback = (mutations) => {
            mutations.forEach(mutation => {
                // Check if the mutation type is characterData or childList
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    const cell = mutation.target; // The <td> element that changed
                    const cellValue = cell.textContent || cell.innerText; // Get the current text content

                    // Step 2: Check if the cell value contains '+'
                    if (!cellValue.includes('+') && cellValue.length > 0) {
                        // Change background color to yellow if '+' is not present
                        cell.style.backgroundColor = 'yellow';
                        // Step 3: Set a timeout to change it back after 3 seconds
                        setTimeout(() => {
                            cell.style.backgroundColor = ''; // Reset background color
                        }, 3000); // 3000 milliseconds = 3 seconds
                    } else {
                        // Optionally reset background color if '+' is present
                        //                         cell.style.backgroundColor = '';
                    }
                }
            });
        };

        // Step 2: Create an instance of MutationObserver
        const observer = new MutationObserver(observerCallback);

        // Step 3: Select all existing <td> elements with class 'score_cell_class'
        const scoreCells = document.querySelectorAll('#scoring_chart');

        // Step 4: Configure the observer options
        const config = {
            childList: true, // Observe direct children
            characterData: true, // Observe changes to text content
            subtree: true
        };

        // Step 5: Start observing each <td>
        scoreCells.forEach(td => {
            observer.observe(td, config);
        });



    });
})();