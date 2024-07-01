import { Player, computerMove } from "./utility.js";
import { strikeBoard, firstBoard, drawGrids } from "./board-component.js";
import {
  dragShips,
  randomlyPlaceShips,
} from "./place-ship-page/ship-position.js";

let count = 3;
let winnerMsg = [];
/*
*GameFlow - object that has 3 methods one to change player turn,second to create board using player info, 
*           third to update board state
*GameFlow().printBoard(player) - draw board using player hit,miss and ship position array,
 return 10 x 10 board one with ship shown, the other without the ship unless it hit to show the opponent striking state on the board. 
*/

function GameFlow(playerOne, playerTwo) {
  let isGameEnd = false;
  const players = [playerOne, playerTwo];
  let activePlayer = players[0];
  const changeTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getPlayer = () => activePlayer;
  const printBoard = () => {
    const player = getPlayer();
    const missStrikes = player.board.missedShots;
    const hitStrikes = player.board.hitShots;
    const allTheShips = player.board.shipsPositions;
    const shipBoardState = firstBoard(allTheShips, hitStrikes, missStrikes);
    const strikeBoardState = strikeBoard(allTheShips, hitStrikes, missStrikes);
    const updateSunkShip = player.board.sunkShips();
    return {
      shipBoardState,
      strikeBoardState,
      updateSunkShip,
    };
  };

  const printNewBoard = () => {
    //draw current player board state using opponent hit and miss
    //then draw striking board using current player hit and miss on opponent board
    changeTurn();
    const opponentName = getPlayer().name;
    const opponentPlayerShipState = printBoard(getPlayer()).updateSunkShip;
    const opponentStrikeBoard = printBoard(getPlayer()).strikeBoardState;
    changeTurn();
    const currentPlayerShipBoard = printBoard(getPlayer()).shipBoardState;
    const currentPlayerShipState = printBoard(getPlayer()).updateSunkShip;
    const currentPlayerName = getPlayer().name;
    return {
      opponentName,
      currentPlayerName,
      currentPlayerShipBoard,
      opponentStrikeBoard,
      opponentPlayerShipState,
      currentPlayerShipState,
    };
  };
  const playerRound = (player, clickedNum) => {
    if (isGameEnd === true) {
      return;
    }
    const coordinate = player.board.coordinatesHashMap.get(Number(clickedNum));
    //attack opponent board by changing turn to gt opponent board
    changeTurn();
    getPlayer().board.receiveAttack(coordinate);
    declareWinner(getPlayer());
    changeTurn();
    declareWinner(player);
    printNewBoard();
    //announce winner if it found
    if (winnerMsg.length > 0) {
      winnerModal(winnerMsg.pop());
      const modal = document.querySelector("[data-winner-modal]");
      modal.showModal();
      isGameEnd = true;
      playerOne = null;
      playerTwo = null;
      winnerMsg = [];
    } else {
      changeTurn();
    }
    //store winner message when state change in the above when we change turns
    function declareWinner(player) {
      if (winner(player) === undefined) return;
      else {
        winnerMsg.push(winner(player));
      }
    }
    //function return string to declare who won and lost if the game end
    function winner(player) {
      // game ends when player method isSunk() return true
      const firstPlayerSunkShips = playerOne.board.isSunk();
      const secondPlayerSunkShips = playerTwo.board.isSunk();
      const playerOneName = playerOne.name;
      const playerTwoName = playerTwo.name;
      let msg;
      if (firstPlayerSunkShips === false && secondPlayerSunkShips === false)
        return msg;
      else if (firstPlayerSunkShips === true && player.name === playerOneName) {
        msg = `${playerTwoName} won 🎉`;
      } else if (
        firstPlayerSunkShips === true &&
        player.name === playerOneName
      ) {
        msg = `${playerOneName} lost`;
      } else if (
        secondPlayerSunkShips === true &&
        player.name === playerOneName
      ) {
        msg = `${playerOneName} won 🎉`;
      } else if (
        secondPlayerSunkShips === true &&
        player.name === playerTwoName
      ) {
        msg = `${playerTwoName} lost`;
      }
      return msg;
    }
  };

  return {
    getPlayer,
    playerRound,
    printNewBoard,
    isGameEnd,
  };
}
// function that update the screen using game flow function
function screenController(playerOne, playerTwo, soloPlayer, isGameEnd) {
  const game = GameFlow(playerOne, playerTwo, isGameEnd);
  const turn = document.querySelector(".player-turn");
  const playerOneShipsBoard = document.querySelector(".board-one");
  const playerOneStrikeBoard = document.querySelector(".board-two");
  const firstPlayerShips = document.querySelector(".player-one-mini-ships");
  const secondPlayerShips = document.querySelector(".player-two-mini-ships");
  firstPlayerShips.textContent = "";
  secondPlayerShips.textContent = "";
  //const playerOneFirstChar = playerOne.name.charAt(0);
  //const playerTwoFirstChar = playerTwo.name.charAt(0);

  const updateScreen = () => {
    const playerOneFirstChar = playerOne.name.charAt(0);
    const playerTwoFirstChar = playerTwo.name.charAt(0);
    if (game.isGameEnd === true) {
      return;
    }
    //method to change and update player fleet based on current player for the mini fleet
    const buildDashboard = () => {
      if (game.getPlayer().name === playerOne.name) {
        drawMiniShips(firstPlayerShips, playerOneFirstChar);
        drawMiniShips(secondPlayerShips, playerTwoFirstChar);
      } else {
        drawMiniShips(firstPlayerShips, playerTwoFirstChar);
        drawMiniShips(secondPlayerShips, playerOneFirstChar);
      }
    };
    buildDashboard();

    turn.textContent = `${game.getPlayer().name}'s turn`;
    playerOneShipsBoard.textContent = "";
    playerOneStrikeBoard.textContent = "";

    //grab all mini ship by using player name
    const playerOneDashBoard = document.querySelector(`.${playerOneFirstChar}`);
    const PlayerOneMiniShips =
      playerOneDashBoard.querySelectorAll(".mini-ship-size");
    const playerTwoDashBoard = document.querySelector(`.${playerTwoFirstChar}`);
    const playerTwoMiniShips =
      playerTwoDashBoard.querySelectorAll(".mini-ship-size");
    //update mini ships if it hit
    const playerOneSunkShips = game.printNewBoard().currentPlayerShipState;
    const playerTwoSunkShips = game.printNewBoard().opponentPlayerShipState;
    //method to update ships based on current player
    const updateDashBoard = () => {
      if (game.getPlayer.name === playerOne.name) {
        updateMiniShips(PlayerOneMiniShips, playerOneSunkShips, "red");
        updateMiniShips(playerTwoMiniShips, playerTwoSunkShips, "red");
      } else {
        updateMiniShips(PlayerOneMiniShips, playerOneSunkShips, "red");
        updateMiniShips(playerTwoMiniShips, playerTwoSunkShips, "red");
      }
    };
    updateDashBoard();
    //update the boards
    playerOneShipsBoard.appendChild(
      game.printNewBoard().currentPlayerShipBoard
    );
    playerOneStrikeBoard.appendChild(game.printNewBoard().opponentStrikeBoard);
    if (soloPlayer === false) {
      countdownModal(`Pass the device to ${game.getPlayer().name}`);
    }
    fixTypo(playerOne.name, playerTwo.name);
  };
  function clickHandler(e) {
    const player = game.getPlayer();
    game.playerRound(player, e);
    updateScreen();
  }

  playerOneStrikeBoard.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    const player = game.getPlayer();
    //check clicked cell is free
    if (index === undefined || e.target.hasChildNodes() === true) return;
    clickHandler(index);
    updateScreen();
    //for solo player
    if (
      player.name !== "ai" &&
      player.name === "you" &&
      e.target.hasChildNodes() !== true
    ) {
      game.playerRound(player, computerMove(player));
      updateScreen();
    }
  });
  //initial render
  updateScreen();
}
//intro page
function introPage() {
  const pageHolder = document.createElement("div");
  pageHolder.setAttribute("class", "intro-page");
  const header = document.createElement("div");
  header.setAttribute("class", "logo-holder");
  const title = document.createElement("h1");
  title.textContent = "BattleShip";

  const btnHolder = document.createElement("div");
  btnHolder.setAttribute("class", "game-options");
  const singlePlayerBtn = document.createElement("button");
  singlePlayerBtn.textContent = "single-player";
  singlePlayerBtn.setAttribute("class", "single-player-btn");
  singlePlayerBtn.classList.add("game-option-btns");
  const multiPlayerBtn = document.createElement("button");
  multiPlayerBtn.textContent = "You vs Friend";
  multiPlayerBtn.setAttribute("class", "multi-players-btn");
  multiPlayerBtn.classList.add("game-option-btns");
  header.appendChild(title);
  btnHolder.appendChild(singlePlayerBtn);
  btnHolder.appendChild(multiPlayerBtn);
  pageHolder.appendChild(header);
  pageHolder.appendChild(btnHolder);
  return pageHolder;
}

function drawFirstPage() {
  const pageContainer = document.querySelector("[data-page-container]");
  pageContainer.appendChild(introPage());
  const logoDiv = document.querySelector(".logo-holder");
  const tittle = document.querySelector("h1");
  setTimeout(() => {
    tittle.classList.add("logo");
    logoDiv.classList.add("header");
  }, 0);
}
//draw ship placement page
function templateShipGrid() {
  const secondPage = document.createElement("div");
  const strategyBoard = document.createElement("div");
  strategyBoard.classList.add("board-container");
  strategyBoard.appendChild(drawGrids());
  const btns = document.createElement("div");
  const template = `
  <div class="ships-container" data-ships-container></div>
    <div class="place-ships-btns">
    <button
      aria-label="place ships by dragging"
      class="drag-btn"
      data-drop-btn
    >
      Drag & Drop ships
    </button>
    <button
      aria-label="place ships randomly"
      class="randomize-btn"
      data-random-btn
    >
      Randomize
    </button>
    <button class="play-btn">Play</button>
    </div>
 `;
  btns.innerHTML = template;
  secondPage.appendChild(strategyBoard);
  secondPage.appendChild(btns);
  return secondPage;
}
//function to attach ship template to dom
function shipsPlacement(element) {
  element.textContent = "";
  element.appendChild(templateShipGrid());
}
//
function randomPlacement(newPlayer) {
  const container = document.querySelector(".board-container");
  const playBtn = document.querySelector(".play-btn");
  const shipsContainer = document.querySelector("[data-ships-container]");
  shipsContainer.style.display = "none";
  if (newPlayer.board.shipsPositions.length === 0) {
    const setShipsPlace = randomlyPlaceShips(newPlayer);
    const ships = newPlayer.board.shipsPositions;
    const hits = newPlayer.board.hitShots;
    const missed = newPlayer.board.missedShots;
    container.textContent = "";
    container.appendChild(firstBoard(ships, hits, missed));
    playBtn.style.display = "block";
  } else {
    const keepName = newPlayer.name;
    newPlayer = null;
    newPlayer = Player(keepName, ships);
    const setShipsPlace = randomlyPlaceShips(newPlayer);
    const shipsCoordinates = newPlayer.board.shipsPositions;
    const hits = newPlayer.board.hitShots;
    const missed = newPlayer.board.missedShots;
    container.textContent = "";
    container.appendChild(firstBoard(shipsCoordinates, hits, missed));
    playBtn.style.display = "block";
  }
}
//countdown page that accept message and hide other content
function countDownPage(msg) {
  const passScreen = document.querySelector(".pass-screen");
  const template = ` 
     <div class="msg-text" data-msg>${msg}</div>
      <div class="counter">
        <div class="counter-board" data-count-down></div>
      </div>`;
  passScreen.innerHTML = template;
}
function countdownModal(msg) {
  const passScreen = document.querySelector(".pass-screen");
  if (count < 0) {
    count = 3;
  }
  countDownPage(msg);
  countdown();
}
function updateCountdownUI() {
  const passScreen = document.querySelector(".pass-screen");
  document.querySelector("[data-count-down]").textContent = count;
  if (count === 0) {
    passScreen.textContent = "";
    passScreen.style.display = "none";
  } else {
    passScreen.style.display = "flex";
  }
}

function countdown() {
  if (count >= 0) {
    updateCountdownUI();
    count--;
    setTimeout(countdown, 1000);
  }
}
//function to draw mini ships to show ship  sunk state by creating class name using player name to update
function drawMiniShips(ele, player) {
  const miniFleets = `
  <div class="fleet-holder ${player}">
    <div class="mini-ship-owner">${player}</div>
<div class="mini-carrier  mini-ship-size" data-name='carrier'></div>
<div class="mini-battleShip  mini-ship-size" data-name='battleShip'></div>
<div class="same-size-ships">
  <div class="mini-destroyer  mini-ship-size" data-name='destroyer'></div>
  <div class="mini-submarine mini-ship-size" data-name='submarine'></div>
</div>
<div class="mini-patrol mini-ship-size" data-name='patrol'></div>
</div>`;
  ele.innerHTML = miniFleets;
}
//function accept mini ships divs, sunk ship names as an array and change color of divs using dataset same as ship name

function updateMiniShips(shipsDiv, sunkShipArray, color) {
  if (sunkShipArray.length === 0) return;
  shipsDiv.forEach((ship) => {
    sunkShipArray.forEach((sunkShip) => {
      if (ship.dataset.name === sunkShip) {
        ship.style.backgroundColor = `${color}`;
      }
    });
  });
}
function winnerModal(msg) {
  const winnerDiv = document.querySelector("[data-winner]");
  const holder = document.createElement("div");
  const template = `  <dialog data-winner-modal class="winner-modal">
  <div class="winner-holder">
    <div class="winner-board" data-winner>${msg}</div>
    <button class="rematch-btn" data-rematch-btn>Rematch</button>
  </div>
</dialog>`;
  winnerDiv.textContent = "";
  holder.innerHTML = template;
  winnerDiv.appendChild(holder);
}

//form to accept players name
function formTemplate(ele) {
  const template = ` <form for="player-name">
<div class="input-holder">
  <input
    type="text"
    id="player-one-name"
    class="player-name-input"
    data-player-one
    required
  />
  <label for="player-one-name" class="player-one-label"
    >Player-One-Name:</label
  >
</div>
<div class="input-holder">
  <input
    type="text"
    id="player-two-name"
    class="player-name-input"
    data-player-two
    required
  />
  <label for="player-two-name" class="player-two-label" data-playerTwo
    >Player Two Name:</label
  >
</div>
<button data-submit-name class="submit-btn" >Start</button>
</form>`;
  ele.innerHTML = template;
}

//fix grammer
function fixTypo(playerOneName, playerTwoName) {
  const miniShipBoard = document.querySelectorAll(".mini-ship-owner");
  const turn = document.querySelector(".player-turn");
  const divArray = [...miniShipBoard];
  divArray[0].style.color = "#00ff3e";
  divArray[1].style.color = "#1fd1ce";
  if (playerOneName !== "you") {
    divArray[0].textContent = `${playerOneName}'s fleet`;
    divArray[1].textContent = `${playerTwoName}'s fleet`;
  } else if (playerOneName === "you") {
    divArray[0].textContent = `${playerOneName}'re fleet`;
    divArray[1].textContent = `${playerTwoName}'s fleet`;
    turn.textContent = `You're turn`;
  }
}

export {
  screenController,
  templateShipGrid,
  shipsPlacement,
  dragShips,
  countdownModal,
  randomPlacement,
  drawFirstPage,
  introPage,
  formTemplate,
};
