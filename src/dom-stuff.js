import { Ship, Player } from "./utility";
import { strikeBoard, firstBoard } from "./bn";
import { introPage } from "./first-page/first-page.js";

const carrier = Ship("carrier", 5);
const battleShip = Ship("battleShip", 4);
const destroyer = Ship("destroyer", 3);
const submarine = Ship("submarine", 3);
const patrol = Ship("patrol", 2);
//
const ships = [carrier, submarine, battleShip, destroyer, patrol];
const playerOne = Player("kings", ships);
const playerTwo = Player("cold", ships);
//function that place ships randomly
function initialBoard(player) {
  ships.forEach((ship) => {
    player.board.placeRandom(ship);
  });
  return player;
}

//countdown 3sec to pass device
function passDevice() {
  setTimeout(() => {}, timeout);
}
//const placePlayerOneSHip = initialBoard(playerOne);
//const placePlayerTwoShip = initialBoard(playerTwo);
/*
*GameFlow - object that has 3 methods one to change player turn ,,second to create board using player info, 
*           third to update board state
*GameFlow().printBoard(player) - draw board using player hit,miss and ship position array,
 return 10 x 10 board one with ship shown the other without the ship to show the opponent striking state on the board. 
*/

function GameFlow() {
  const placePlayerOneSHip = initialBoard(playerOne);
  const placePlayerTwoShip = initialBoard(playerTwo);
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
    return {
      shipBoardState,
      strikeBoardState,
    };
  };
  const printNewBoard = () => {
    //draw current player board state using opponent hit and miss
    //then draw striking board using current player hit and miss on opponent board
    changeTurn();
    const shipBoard = printBoard(getPlayer()).shipBoardState;
    changeTurn();
    const strikeBoard = printBoard(getPlayer()).strikeBoardState;

    return {
      shipBoard,
      strikeBoard,
    };
  };
  const playerRound = (player, clickedNum) => {
    const coordinate = player.board.coordinatesHashMap.get(Number(clickedNum));
    player.board.receiveAttack(coordinate);
    printNewBoard();
    changeTurn();
  };

  printNewBoard();
  return {
    getPlayer,
    playerRound,
    printNewBoard,
  };
}
/**
 * function that update the screen using game flow function
 */
function screenController() {
  const game = GameFlow();
  const turn = document.querySelector(".player-turn");
  const playerOneShipsBoard = document.querySelector(".board-one");
  const playerOneStrikeBoard = document.querySelector(".board-two");
  const playerTwoShipsBoard = document.querySelector(".board-three");
  const playerTwoStrikeBoard = document.querySelector(".board-four");
  const updateScreen = () => {
    playerOneShipsBoard.textContent = "";
    playerOneStrikeBoard.textContent = "";
    playerTwoShipsBoard.textContent = "";
    playerTwoStrikeBoard.textContent = "";
    //render
    turn.textContent = `${game.getPlayer().name}`;

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
    console.log(e.target);
    clickHandler(index);
  });
  playerTwoStrikeBoard.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    console.log(e.target);
    clickHandler(index);
  });
  //initial render
  updateScreen();
}
//screenController();
function drawFirstPage() {
  const firstPageDiv = document.querySelector("[data-first-page]");
  firstPageDiv.appendChild(introPage());
  const logoDiv = document.querySelector(".logo-holder");
  const tittle = document.querySelector("h1");
  //setTimeout(() => {
  tittle.classList.add("logo");
  logoDiv.classList.add("header");
  //}, 0);
}
//draw ship placment page
function templateShipGrid(element) {
  const template = `
  <div class="board-container"></div>
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
  <button class="play-btn">Play</button>
  `;
  element.innerHTML = template;
  //return divHolder;
}
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
  templateShipGrid(element);
}
function drawBoard(element) {
  element.textContent = "";
  element.appendChild(drawGrids());
}

function randomizeShips(newPlayer) {
  const container = document.querySelector(".board-container");
  const randomizeBtn = document.querySelector("[data-random-btn]");
  const shipsContainer = document.querySelector("[data-ships-container]");
  //const playBtn = document.querySelector(".play-btn");
  //playBtn.style.display = "none";

  randomizeBtn.addEventListener("click", () => {
    if (newPlayer.board.shipsPositions.length === 0) {
      const setShipsPlace = initialBoard(newPlayer);
      const ships = newPlayer.board.shipsPositions;
      const hits = newPlayer.board.hitShots;
      const missed = newPlayer.board.missedShots;
      container.textContent = "";
      container.appendChild(firstBoard(ships, hits, missed));
      console.log(newPlayer);

      playBtn.style.display = "block";
      playBtn.addEventListener("click", () => {});
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
      console.log(newPlayer);

      playBtn.style.display = "flex";
      playBtn.addEventListener("click", () => {});
    }
  });
}

function randomPlacement(newPlayer) {
  const container = document.querySelector(".board-container");

  //const shipsContainer = document.querySelector("[data-ships-container]");
  if (newPlayer.board.shipsPositions.length === 0) {
    const setShipsPlace = initialBoard(newPlayer);
    const ships = newPlayer.board.shipsPositions;
    const hits = newPlayer.board.hitShots;
    const missed = newPlayer.board.missedShots;
    container.textContent = "";
    container.appendChild(firstBoard(ships, hits, missed));
    console.log(newPlayer);
    return newPlayer;
    //playBtn.style.display = "block";
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
    console.log(newPlayer);
    return newPlayer;
    //playBtn.style.display = "flex";
  }
}
function countDown(element) {
  const modal = ` <dialog data-countdown>
      <div class="holder">
        <div class="msg-text" data-msg>pass the device</div>
        <div class="counter">
          <div class="counter-board" data-count-down></div>
        </div>
      </div>
    </dialog>`;
  element.innerHTML = modal;
}

function counter(dialog) {
  let count = 4;
  const countdown = (document.querySelector("[data-count-down]").textContent =
    count);
  count = count - 1;
  dialog.showModal();
  if (count >= 0) {
    setTimeout(counter, 1000);
  } else {
    clearTimeout(counter);
    dialog.close();
  }
}
export {
  screenController,
  drawFirstPage,
  initialBoard,
  templateShipGrid,
  shipsPlacement,
  drawGrids,
  randomizeShips,
  countDown,
  ships,
  counter,
  randomPlacement,
  drawBoard,
};
