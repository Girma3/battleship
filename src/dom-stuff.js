import { Player } from "./utility";
import { strikeBoard, firstBoard } from "./bn";
import { dragShips } from "./place-ship-page/ship-position.js";

let count = 3;
let winnerMsg = [];

function initialBoard(player) {
  player.board.shipsArray.forEach((ship) => {
    player.board.placeRandom(ship);
  });
  console.log(player);
  return player;
}

//const placePlayerOneSHip = initialBoard(playerOne);
//const placePlayerTwoShip = initialBoard(playerTwo);
/*
*GameFlow - object that has 3 methods one to change player turn ,,second to create board using player info, 
*           third to update board state
*GameFlow().printBoard(player) - draw board using player hit,miss and ship position array,
 return 10 x 10 board one with ship shown the other without the ship to show the opponent striking state on the board. 
*/

function GameFlow(playerOne, playerTwo) {
  let isGameEnd = false;
  console.log(playerOne);
  console.log(playerTwo);
  console.log(isGameEnd);
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
    console.log(clickedNum);
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
    //printNewBoard();

    if (winnerMsg.length > 0) {
      console.log(winnerMsg);
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

    function declareWinner(player) {
      if (winner(player) === undefined) return;
      else {
        winnerMsg.push(winner(player));
      }
    }
    function winner(player) {
      //if sunk ship array equal to players all ship array length the game ends
      const firstPlayerSunkShips = playerOne.board.isSunk();
      const secondPlayerSunkShips = playerTwo.board.isSunk();
      const playerOneName = playerOne.name;
      const playerTwoName = playerTwo.name;
      const allShips = player.board.shipsArray.length;
      let msg;
      if (firstPlayerSunkShips === false && secondPlayerSunkShips === false)
        return msg;
      else if (firstPlayerSunkShips === true && player.name === playerOneName) {
        msg = `${playerTwoName}  won 🎉`;
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
/**
 * function that update the screen using game flow function
 */
function screenController(playerOne, playerTwo, soloPlayer) {
  const game = GameFlow(playerOne, playerTwo);
  const turn = document.querySelector(".player-turn");
  const playerOneShipsBoard = document.querySelector(".board-one");
  const playerOneStrikeBoard = document.querySelector(".board-two");
  const firstPlayerShips = document.querySelector(".player-one-mini-ships");
  const secondPlayerShips = document.querySelector(".player-two-mini-ships");
  firstPlayerShips.textContent = "";
  secondPlayerShips.textContent = "";

  const updateScreen = () => {
    if (game.isGameEnd === true) {
      return;
    }
    drawMiniShips(firstPlayerShips, playerOne.name);
    drawMiniShips(secondPlayerShips, playerTwo.name);
    playerOneShipsBoard.textContent = "";
    playerOneStrikeBoard.textContent = "";
    turn.textContent = `${game.getPlayer().name} turn`;
    const playerOneName = game.printNewBoard().currentPlayerName;
    const playerTwoName = game.printNewBoard().opponentName;
    const playerOneSunkShips = game.printNewBoard().currentPlayerShipState;
    const playerTwoSunkShips = game.printNewBoard().opponentPlayerShipState;

    const playerOneDashBoard = document.querySelector(`.${playerOneName}`);
    const PlayerOneMiniShips =
      playerOneDashBoard.querySelectorAll(".mini-ship-size");
    const playerTwoDashBoard = document.querySelector(`.${playerTwoName}`);
    const playerTwoMiniShips =
      playerTwoDashBoard.querySelectorAll(".mini-ship-size");
    updateMiniShips(PlayerOneMiniShips, playerOneSunkShips, "red");
    updateMiniShips(playerTwoMiniShips, playerTwoSunkShips, "red");
    playerOneShipsBoard.appendChild(
      game.printNewBoard().currentPlayerShipBoard
    );
    playerOneStrikeBoard.appendChild(game.printNewBoard().opponentStrikeBoard);
    if (soloPlayer === false) {
      countdownModal(`Pass the device to ${game.getPlayer().name}`);
    }
  };
  function clickHandler(e) {
    const player = game.getPlayer();
    game.playerRound(player, e);
    updateScreen();
  }

  playerOneStrikeBoard.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    const player = game.getPlayer();
    console.log(index);
    console.log(e.target.hasChildNodes());
    //check clicked cell is free
    if (index === undefined || e.target.hasChildNodes() === true) return;
    clickHandler(index);
    updateScreen();
    //for solo player
    if (player.name !== "ai" && player.name === "you") {
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
//screenController();
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
function templateShipGrid(element) {
  const secondPage = document.createElement("div");
  const strategyBoard = document.createElement("div");
  strategyBoard.classList.add("board-container");
  strategyBoard.appendChild(drawGrids());
  const btns = document.createElement("div");

  //strategyBoard.classList.add("container-holder");
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
//
function drawGrids() {
  const grid = document.createElement("div");
  grid.classList.add("board");
  for (let i = 0; i < 100; i++) {
    const button = document.createElement("button");
    button.dataset.index = i;
    button.classList.add("grid-cell");
    grid.appendChild(button);
  }
  return grid;
}
function shipsPlacement(element) {
  element.textContent = "";
  element.appendChild(templateShipGrid());
}

function drawBoard(element) {
  element.appendChild(drawGrids());
}

function randomPlacement(newPlayer) {
  const container = document.querySelector(".board-container");
  const playBtn = document.querySelector(".play-btn");
  const shipsContainer = document.querySelector("[data-ships-container]");
  shipsContainer.style.display = "none";
  if (newPlayer.board.shipsPositions.length === 0) {
    const setShipsPlace = initialBoard(newPlayer);
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
    const setShipsPlace = initialBoard(newPlayer);
    const shipsCoordinates = newPlayer.board.shipsPositions;
    const hits = newPlayer.board.hitShots;
    const missed = newPlayer.board.missedShots;
    container.textContent = "";
    container.appendChild(firstBoard(shipsCoordinates, hits, missed));
    playBtn.style.display = "block";
  }
}
//countdown page
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
const pickedNum = [];
function computerMove(player) {
  return computerSlot();
  function computerSlot() {
    const nextHits = [];
    const hits = player.board.hitShots;
    const lastHit = hits[hits.length - 1];
    let neighborSlots = [];
    if (hits.length > 0) {
      hits.forEach((hit) => {
        adjacentSlot(hit);
        validSpot();
      });

      //if better slot are already picked tun to random spot
      if (nextHits.length === 0) {
        const move = randomSpot();
        pickedNum.push(move);
        return move;
      } else {
        let nextTry = nextHits[nextHits.length - 1];
        pickedNum.push(nextTry);
        nextTry = null;
        return nextHits.pop();
      }
    } else if (nextHits.length === 0 && hits.length === 0) {
      const move = randomSpot();
      pickedNum.push(move);
      return move;
    }

    //method that verify adjacent slot is not picked already and put the new one in the queue
    function validSpot() {
      if (neighborSlots.length === 0) return;
      const allSpots = player.board.inverseHashMap;
      neighborSlots.forEach((coordinate) => {
        //turn coordinate to number using hasmap
        const spot = allSpots.get(coordinate.toString());
        if (pickedNum.includes(spot) === false) {
          nextHits.push(spot);
        }
      });
      neighborSlots = [];
    }
    //method that generate neighbor spot from given coordinate
    function adjacentSlot(hit) {
      const x = hit[0];
      const y = hit[1];
      if (x + 1 < 10) {
        neighborSlots.push([x + 1, y]);
      }
      if (x - 1 >= 0) {
        neighborSlots.push([x - 1, y]);
      }
      if (y + 1 < 10) {
        neighborSlots.push([x, y + 1]);
      }
      if (y - 1 >= 0) {
        neighborSlots.push([x, y - 1]);
      }
    }
    //method return random number from 0 to 100
    function randomSpot() {
      let move;
      do {
        move = Math.floor(Math.random() * 100);
      } while (pickedNum.includes(move));
      return move;
    }
  }
}
//pick random number from board

export {
  screenController,
  drawFirstPage,
  initialBoard,
  templateShipGrid,
  shipsPlacement,
  drawGrids,
  countdownModal,
  randomPlacement,
  drawBoard,
  dragShips,
  formTemplate,
  introPage,
};
