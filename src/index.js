import "./style.css";
import "./first-page/first-page.css";
import "./place-ship-page/ships.css";
import "./pass-device/pass-screen.css";
import { Ship, GameBoard, Player } from "./utility.js";
import {
  screenController,
  drawFirstPage,
  shipsPlacement,
  drawGrids,
  randomizeShips,
  randomPlacement,
  ships,
  drawBoard,
  countDown,
  counter,
} from "./dom-stuff.js";

const singlePlayer = document.querySelector(
  "[data-game-option='single-player-btn]"
);
const multiPlayers = document.querySelector(
  "[data-game-option='multi-players-btn]"
);
const placeShipPage = document.querySelector(".ships-grid");
const firstPage = document.querySelector(".first-page");

drawFirstPage();
console.log("wait");

let playerOne;
let playerTwo;
const players = [];
let count = 4;
//setTimeout(() => {
const multiPlayerBtn = document.querySelector(".multi-players-btn");

console.log(multiPlayerBtn);
multiPlayerBtn.addEventListener("click", (e) => {
  firstPage.style.display = "none";

  shipsPlacement(placeShipPage);
  const shipBoard = document.querySelector(".board-container");
  const playBtn = document.querySelector(".play-btn");
  drawBoard(shipBoard);
  putShips("girma");
  function putShips(name) {
    const randomizeBtn = document.querySelector("[data-random-btn]");
    randomizeBtn.addEventListener("click", () => {
      const xo = Player(name, ships);
      //const kdot = Player("kdot", ships);
      //const players = [xo, kdot];
      const newPlayer = xo;
      console.log(newPlayer);
      randomPlacement(newPlayer);
      console.log(newPlayer);
      // playerOne = newPlayer;
      playBtn.addEventListener("click", () => {
        const passScreen = document.querySelector(".pass-screen");
        players.push(newPlayer);
        countDown(passScreen);
        const dialog = document.querySelector("[data-countdown]");
        // dialog.showModal();
        countdown(dialog);
        //repeat
        //xo = null
        drawBoard(shipBoard);

        console.log(players);
        //dialog.close();
      });
    });
  }
  //shipsPlacement(placeShipPage);
  //drawBoard(shipBoard);
  console.log(players);
});
// Initialize count outside the function

function updateCountdownUI() {
  document.querySelector("[data-count-down]").textContent = count;
  const dialog = document.querySelector("[data-countdown]");
  if (count === 0) {
    dialog.close();
  } else {
    dialog.showModal();
  }
}

function countdown(dialog) {
  if (count >= 0) {
    updateCountdownUI(dialog); // Update UI
    count--;
    setTimeout(countdown, 1000);
  }
}

// Call the countdown function to start

//shipBoard.appendChild(drawGrids());
//randomizeShips(newPlayer);
/*
const playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", () => {
  newPlayer = getPlayer(newPlayer);
  console.log(newPlayer);
  
});
*/
//}, 0);

//screenController();

//draw the bard for players
/*
const firstBoards = document.querySelector(".board-one");
const secondBoards = document.querySelector(".board-two");
const thirdBoards = document.querySelector(".board-three");
const fourthBoards = document.querySelector(".board-four");
const playerOneName = document.querySelector(".player-one");
const playerTwoName = document.querySelector(".player-two");

firstBoards.appendChild(drawBoard("gridOne"));
secondBoards.appendChild(drawBoard("gridTwo"));
thirdBoards.appendChild(drawBoard("gridThree"));
fourthBoards.appendChild(drawBoard("gridFour"));
const screen = controller();
//screen.playerOneShips;
//thirdBoard.appendChild(screen.secondBoard);
//fourthBoard.appendChild(screen.strikeBoardTwo);
secondBoards.addEventListener("click", (e) => {
  const index = e.target.dataset.gridTwo;
  const turn = 1;
  attack(index, turn);
});
fourthBoards.addEventListener("click", (e) => {
  const index = e.target.dataset.gridFour;
  const turn = 2;
  attack(index, turn);
});
//secondBoard.appendChild(drawBoard());
const firstPlayer = ("me");
const secondPlayer = playGame("king");
playerOne.textContent = "";
playerTwo.textContent = "king";

//secondBoard.appendChild(drawBoard());
*/
