import { Player } from "./utility";
import { strikeBoard, firstBoard } from "./bn";
import { introPage } from "./first-page/first-page.js";
import { dragShips } from "./place-ship-page/ship-position.js";

//
//const ships = [carrier, submarine, battleShip, destroyer, patrol];
//let playerOne = Player("kings", ships);
//let playerTwo = Player("cold", ships);
//function that place ships randomly
let count = 3;
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
  console.log(playerOne);
  console.log(playerTwo);
  const players = [playerOne, playerTwo];
  let activePlayer = players[0];
  const changeTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getPlayer = () => activePlayer;

  const printBoard = (player) => {
    const missStrikes = player.board.missedShots;
    const hitStrikes = player.board.hitShots;
    const allTheShips = player.board.shipsPositions;
    const allCoordinateHashmap = player.board.coordinatesHashmap;
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
    //changeTurn();

    changeTurn();
    const shipBoard = printBoard(getPlayer()).shipBoardState;
    const secondPlayerShipState = printBoard(getPlayer()).updateSunkShip;
    const playerTwoName = getPlayer().name;
    changeTurn();
    const playerOneName = getPlayer().name;
    const firstPlayerShipState = printBoard(getPlayer()).updateSunkShip;
    const strikeBoard = printBoard(getPlayer()).strikeBoardState;

    return {
      playerOneName,
      playerTwoName,
      shipBoard,
      strikeBoard,
      firstPlayerShipState,
      secondPlayerShipState,
    };
  };
  const playerRound = (player, clickedNum) => {
    const coordinate = player.board.coordinatesHashMap.get(Number(clickedNum));
    console.log(player);
    player.board.receiveAttack(coordinate);
    printNewBoard();
    changeTurn();
  };

  return {
    getPlayer,
    playerRound,
    printNewBoard,
  };
}
/**
 * function that update the screen using game flow function
 */
function screenController(playerOne, playerTwo) {
  const game = GameFlow(playerOne, playerTwo);
  const turn = document.querySelector(".player-turn");
  const playerOneShipsBoard = document.querySelector(".board-one");
  const playerOneStrikeBoard = document.querySelector(".board-two");
  const firstPlayerShips = document.querySelector(".player-one-mini-ships");
  const secondPlayerShips = document.querySelector(".player-two-mini-ships");
  firstPlayerShips.textContent = "";
  secondPlayerShips.textContent = "";
  drawMiniShips(firstPlayerShips, playerOne.name);
  drawMiniShips(secondPlayerShips, playerTwo.name);

  const updateScreen = () => {
    playerOneShipsBoard.textContent = "";
    playerOneStrikeBoard.textContent = "";
    turn.textContent = `${game.getPlayer().name}`;
    const playerOneName = game.printNewBoard().playerOneName;
    const playerTwoName = game.printNewBoard().playerTwoName;

    const playerOneDashBoard = document.querySelector(`.${playerOneName}`);
    const PlayerOneMiniShips =
      playerOneDashBoard.querySelectorAll(".mini-ship-size");
    const playerTwoDashBoard = document.querySelector(`.${playerTwoName}`);
    const playerTwoMiniShips =
      playerTwoDashBoard.querySelectorAll("mini-ship-size");
    console.log(game.printNewBoard().firstPlayerShipState);
    console.log(game.printNewBoard().secondPlayerShipState);

    updateMiniShips(
      PlayerOneMiniShips,
      game.printNewBoard().secondPlayerShipState,
      "red"
    );

    updateMiniShips(
      playerTwoMiniShips,
      game.printNewBoard().firstPlayerShipState,
      "red"
    );

    console.log(game.printNewBoard().secondPlayerShipState);
    console.log(game.printNewBoard().firstPlayerShipState);

    playerOneShipsBoard.appendChild(game.printNewBoard().shipBoard);
    // playerTwoShipsBoard.appendChild(game.printNewBoard().shipBoard);
    // playerOneStrikeBoard.appendChild(game.printNewBoard().strikeBoard);
    playerOneStrikeBoard.appendChild(game.printNewBoard().strikeBoard);
  };
  function clickHandler(e) {
    const player = game.getPlayer();
    game.playerRound(player, e);
    updateScreen();
  }

  playerOneStrikeBoard.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    console.log(index);
    clickHandler(index);
  });
  //initial render
  updateScreen();
}
//screenController();
function drawFirstPage() {
  const pageContainer = document.querySelector("[data-page-container]");
  pageContainer.appendChild(introPage());
  const logoDiv = document.querySelector(".logo-holder");
  const tittle = document.querySelector("h1");
  //setTimeout(() => {
  tittle.classList.add("logo");
  logoDiv.classList.add("header");
  //}, 0);
}
//draw ship placment page
function templateShipGrid(element) {
  const secondPage = document.createElement("div");

  const strategyBoard = document.createElement("div");
  strategyBoard.classList.add("board-container");
  strategyBoard.appendChild(drawGrids());
  const btns = document.createElement("div");

  //strategyBoard.classList.add("container-holder");
  const template = `
   <div class="ships-container" data-ships-container>
    <div class="all-ships"></div>
  </div>
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
function secondPlayerShipPlacement(element) {
  element.textContent = "";
  element.appendChild(secondPlayerTemplate());
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
function countDownPage() {
  const passScreen = document.querySelector(".pass-screen");
  const dialogHolder = document.createElement("div");
  dialogHolder.classList.add("modal-holder");
  const modal = ` <dialog data-countdown>
      <div class="holder">
        <div class="msg-text" data-msg>pass the device</div>
        <div class="counter">
          <div class="counter-board" data-count-down></div>
        </div>
      </div>
    </dialog>`;
  dialogHolder.innerHTML = modal;
  passScreen.appendChild(dialogHolder);
}
function countdownModal() {
  countDownPage();
  const dialog = document.querySelector("[data-countdown]");
  countdown(dialog);
}
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
    updateCountdownUI(dialog);
    count--;
    setTimeout(countdown, 1000);
  }
}
//function to daraw mini ships to show ship  sunk state by creating class name using player name to update
function drawMiniShips(ele, player) {
  const miniFleets = `
  <div class="fleet-holder ${player}">
    <div>${player}</div>
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
        ship.style.backgroundColor = color;
      }
    });
  });
}
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
};
