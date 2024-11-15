// ==UserScript==
// @name         Terraforming Mars - interactive card board
// @namespace    http://tampermonkey.net/
// @version      2024-11-15
// @description  try to take over the world!
// @author       kubuntek
// @match        https://boardgamearena.com/*terraformingmars*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=boardgamearena.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the page to load
    window.addEventListener('load', function() {
        // Select the div you want to move
        let allPlayers = document.querySelector('#players_area'); // Change '#myDiv' to the appropriate selector for your div
        let mainArea = document.querySelector('#main_area'); // Change '#myDiv' to the appropriate selector for your div
        // Use querySelectorAll to select all divs with IDs that start with "player_area_"
        let playerBoards = document.querySelectorAll('div[id^="player_area_"]');
        // Convert the NodeList to an array (if needed)
        // Filter the elements to include only those with an ID length of 18 characters
        let divArray = Array.from(playerBoards).filter(div => div.id.length === 18);
        console.log("Players count: " + divArray.length);

        let newDiv = document.createElement('div');
        newDiv.id = 'player_new_boards';
        // Add content or attributes to the new div
        newDiv.style.backgroundColor = 'lightblue'; // Example styling
        newDiv.style.padding = '10px'; // Example styling
        newDiv.style.position = "absolute";
        newDiv.style.top = "80";          // Set top to 0
        newDiv.style.left = "0";         // Set left to 0
        newDiv.style.zIndex = "1000";    // Optional: Set z-index to ensure it stays on top
        // Insert the new div as the first child of the parent div
        mainArea.insertBefore(newDiv, mainArea.firstChild);

        let mapMiddle = document.querySelector('#map_middle');
        mapMiddle.style.right = 300;
        mapMiddle.style.top = 80;

        let playerDynamicBoard = document.createElement('div');
        playerDynamicBoard.id = 'player_new_board';
        playerDynamicBoard.style.backgroundColor = 'red'; // Example styling
        playerDynamicBoard.style.padding = '10px'; // Example styling
        newDiv.appendChild(playerDynamicBoard);

        for(let i = divArray.length-1; i >= 0; i--) {
            let playerDiv = document.createElement('div');
            playerDiv.textContent = i+1 + ' player';
            playerDiv.addEventListener('click', function() {
                playerDynamicBoard.innerHTML = "";
                playerDynamicBoard.appendChild(divArray[i]);
            });
            newDiv.insertBefore(playerDiv, newDiv.firstChild);
        }

        let hideDiv = document.createElement('div');
        hideDiv.textContent = 'hide board';
        hideDiv.addEventListener('click', function() {
            playerDynamicBoard.innerHTML = "";
        });
        newDiv.insertBefore(hideDiv, newDiv.firstChild);

        // newDiv.appendChild(divArray[2]);


    });
})();