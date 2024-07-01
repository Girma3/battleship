import "./style.css";
import "./place-ship-page/ships.css";
import { Player } from "./utility.js";
import { randomlyPlaceShips } from "./place-ship-page/ship-position.js";
import {
  screenController,
  drawFirstPage,
  shipsPlacement,
  randomPlacement,
  dragShips,
  countdownModal,
  formTemplate,
} from "./dom-component.js";

const pageContainer = document.querySelector("[data-page-container]");
const boardWrapper = document.querySelector(".game-wrapper");
drawFirstPage();
boardWrapper.style.display = "none";
let playerOneName;
let playerTwoName;
let firstPlayer;
let secondPlayer;
//store players object in hashmap
const hashmap = new Map();
let soloPlayer = false;
pageContainer.addEventListener("click", (e) => {
  if (e.target.matches(".multi-players-btn")) {
    soloPlayer = false;
    boardWrapper.style.display = "none";
    formTemplate(pageContainer);
  }
  if (e.target.matches("[data-submit-name]")) {
    e.preventDefault();
    const playerOne = document.querySelector("[data-player-one]");
    const playerTwo = document.querySelector("[data-player-two");
    //avoid space for creating class  later for fleet dash board
    playerOneName = playerOne.value.replace(/\s/g, "");
    playerTwoName = playerTwo.value.replace(/\s/g, "");
    //return if players name same and empty
    if (
      playerOneName === "" ||
      playerTwoName === "" ||
      (playerOneName === playerTwoName) === true
    ) {
      return;
    }
    firstPlayer = Player(playerOneName);
    secondPlayer = Player(playerTwoName);
    countdownModal(`${playerOneName} set the ships`);
    shipsPlacement(pageContainer);
  }
  if (e.target.matches("[data-random-btn")) {
    putShips();
  }
  if (e.target.matches("[data-drop-btn]")) {
    dragAndDrop();
  }
  if (e.target.matches(".play-btn")) {
    pageContainer.textContent = "";
    boardWrapper.style.display = "block";
    if (soloPlayer === false) {
      countdownModal(`${playerTwoName} set the ships`);
      boardWrapper.style.display = "none";
    }
    shipsPlacement(pageContainer);

    if (soloPlayer === true && hashmap.size === 0) {
      //randomly place ai ships
      randomlyPlaceShips(secondPlayer);
      hashmap.set(playerOneName, firstPlayer);
      hashmap.set(playerTwoName, secondPlayer);
    }

    if (
      hashmap.get(playerTwoName) !== undefined &&
      hashmap.get(playerOneName) !== undefined
    ) {
      const playerOne = hashmap.get(playerOneName);
      const playerTwo = hashmap.get(playerTwoName);
      screenController(playerOne, playerTwo, soloPlayer);
      boardWrapper.style.display = "block";
      pageContainer.textContent = "";
    }
    if (hashmap.size === 0) {
      hashmap.set(playerOneName, firstPlayer);
    }
    if (hashmap.size > 0) {
      hashmap.set(playerTwoName, secondPlayer);
    }
  }
  if (e.target.matches(".single-player-btn")) {
    soloPlayer = true;
    playerOneName = "you";
    playerTwoName = "ai";
    firstPlayer = Player(playerOneName);
    secondPlayer = Player(playerTwoName);
    countdownModal("set the ships");
    shipsPlacement(pageContainer);
    boardWrapper.style.display = "none";
  }
});
const winnerMsg = document.querySelector(".winner-msg");
winnerMsg.addEventListener("click", (e) => {
  if (e.target.matches(".rematch-btn")) {
    //reset the player and dom element
    const modal = document.querySelector("[data-winner-modal]");
    const boards = document.querySelectorAll(".grid");
    const turnDiv = document.querySelector(".player-turn");
    const dashBoard = document.querySelectorAll(".mini-dash-board");
    const winnerDivHolder = document.querySelector(".winner-holder");
    const winnerMsg = document.querySelector(".winner-board");
    firstPlayer = null;
    secondPlayer = null;
    hashmap.clear();
    firstPlayer = Player(playerOneName);
    secondPlayer = Player(playerTwoName);
    isGameEnd = false;
    boards.textContent = "";
    turnDiv.textContent = "";
    dashBoard.forEach((div) => {
      div.textContent = "";
    });
    boards.forEach((board) => {
      board.textContent = "";
    });
    winnerMsg.textContent = "";
    winnerDivHolder.style.display = "none";
    firstPlayer = Player(playerOneName);
    secondPlayer = Player(playerTwoName);
    modal.close();
    pageContainer.textContent = "";
    shipsPlacement(pageContainer);
  }
});
//drag and drop ship based on solo or multi player
function dragAndDrop() {
  const shipsContainer = document.querySelector("[data-ships-container]");
  shipsContainer.style.display = "flex";
  if (hashmap.size < 1) {
    if (firstPlayer.board.shipsPositions.length > 0) {
      reposition();
    }
    dragShips(firstPlayer, firstPlayer.board.shipsArray);
  }
  if (hashmap.size > 1) {
    if (secondPlayer.board.shipsPositions.length > 0) {
      reposition();
    }
    dragShips(secondPlayer, secondPlayer.board.shipsArray);
  }
}
function reposition() {
  if (firstPlayer.board.shipsPositions.length > 0) {
    const xo = Player(playerOneName, firstPlayer.shipsArray);
    // firstPlayer = null;
    firstPlayer = xo;
  }
  if (secondPlayer.board.shipsPositions.length > 0) {
    const xo = Player(playerTwoName, secondPlayer.shipsArray);
    //secondPlayer = null;
    secondPlayer = xo;
  }
}
function putShips() {
  const shipsContainer = document.querySelector("[data-ships-container]");
  shipsContainer.style.display = "none";
  if (hashmap.size < 1) {
    reposition();
    randomPlacement(firstPlayer);
  } else if (hashmap.size > 0) {
    reposition();
    randomPlacement(secondPlayer);
  }
}
