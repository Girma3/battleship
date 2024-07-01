/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board-component.js":
/*!********************************!*\
  !*** ./src/board-component.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.drawGrids = drawGrids;
exports.firstBoard = firstBoard;
exports.strikeBoard = strikeBoard;
//function draw ships with hit and miss for the owner
function firstBoard(shipCoordinate, hit, miss) {
  // Create a 2D grid of cells
  const cells = [];
  for (let i = 0; i < 10; i++) {
    cells[i] = [];
    for (let j = 0; j < 10; j++) {
      cells[i][j] = "";
    }
  }
  // Mark the coordinates on the grid
  for (const [a, b] of shipCoordinate) {
    cells[a][b] = "ship";
  }
  for (const [x, y] of hit) {
    if (cells[x][y] === "ship") {
      cells[x][y] = "hit";
    }
  }
  for (const [x, y] of miss) {
    if (cells[x][y] !== "ship") {
      cells[x][y] = "miss";
    }
  }
  // Create a container for the grid
  const grids = document.createElement("div");
  grids.classList.add("board");
  // Create buttons for each cell
  for (let i = 0; i < 100; i++) {
    const button = document.createElement("button");
    button.textContent = cells[Math.floor(i / 10)][i % 10];
    button.dataset.index = i;
    button.classList.add("grid-cell");
    if (cells[Math.floor(i / 10)][i % 10] === "ship") {
      button.textContent = "";
      button.classList.add("ship");
      const dot = document.createElement("button");
      dot.classList.add("target-dot");
      dot.style.backgroundColor = "#4b2929";
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "hit") {
      button.textContent = "";
      button.classList.add("ship");
      const dot = document.createElement("button");
      dot.classList.add("target-dot");
      dot.classList.add("hit-strike");
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "miss") {
      button.textContent = "";
      const dot = document.createElement("button");
      dot.classList.add("missed-strike");
      button.appendChild(dot);
    }
    grids.appendChild(button);
  }
  return grids;
}
//function  draw miss and hit and revel ship if it hit used to
//show for opponent by hiding ships when it render first
function strikeBoard(shipCoordinate, hit, miss) {
  // Create a 2D grid of cells
  const cells = [];
  for (let i = 0; i < 10; i++) {
    cells[i] = [];
    for (let j = 0; j < 10; j++) {
      cells[i][j] = "";
    }
  }
  // mark the coordinates on the grid
  for (const [a, b] of shipCoordinate) {
    cells[a][b] = "ship";
  }
  for (const [x, y] of hit) {
    if (cells[x][y] === "ship") {
      cells[x][y] = "hit";
    }
  }
  for (const [x, y] of miss) {
    if (cells[x][y] !== "ship") {
      cells[x][y] = "miss";
    }
  }
  // Create a container for the grid
  const grids = document.createElement("div");
  grids.classList.add("board");
  // Create buttons for each cell
  for (let i = 0; i < 100; i++) {
    const button = document.createElement("button");
    button.textContent = cells[Math.floor(i / 10)][i % 10];
    button.dataset.index = i;
    button.classList.add("grid-cell");
    if (cells[Math.floor(i / 10)][i % 10] === "hit") {
      button.textContent = "";
      button.classList.add("ship");
      const dot = document.createElement("button");
      dot.classList.add("target-dot");
      dot.style.backgroundColor = "red";
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "miss") {
      button.textContent = "";
      const dot = document.createElement("button");
      dot.classList.add("missed-strike");
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "ship") {
      button.textContent = "";
    }
    grids.appendChild(button);
  }
  return grids;
}
//draw 10 X 10 board
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

/***/ }),

/***/ "./src/dom-component.js":
/*!******************************!*\
  !*** ./src/dom-component.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.countdownModal = countdownModal;
Object.defineProperty(exports, "dragShips", ({
  enumerable: true,
  get: function () {
    return _shipPosition.dragShips;
  }
}));
exports.drawFirstPage = drawFirstPage;
exports.formTemplate = formTemplate;
exports.introPage = introPage;
exports.randomPlacement = randomPlacement;
exports.screenController = screenController;
exports.shipsPlacement = shipsPlacement;
exports.templateShipGrid = templateShipGrid;
var _utility = __webpack_require__(/*! ./utility.js */ "./src/utility.js");
var _boardComponent = __webpack_require__(/*! ./board-component.js */ "./src/board-component.js");
var _shipPosition = __webpack_require__(/*! ./place-ship-page/ship-position.js */ "./src/place-ship-page/ship-position.js");
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
    const shipBoardState = (0, _boardComponent.firstBoard)(allTheShips, hitStrikes, missStrikes);
    const strikeBoardState = (0, _boardComponent.strikeBoard)(allTheShips, hitStrikes, missStrikes);
    const updateSunkShip = player.board.sunkShips();
    return {
      shipBoardState,
      strikeBoardState,
      updateSunkShip
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
      currentPlayerShipState
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
      if (winner(player) === undefined) return;else {
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
      if (firstPlayerSunkShips === false && secondPlayerSunkShips === false) return msg;else if (firstPlayerSunkShips === true && player.name === playerOneName) {
        msg = `${playerTwoName} won 🎉`;
      } else if (firstPlayerSunkShips === true && player.name === playerOneName) {
        msg = `${playerOneName} lost`;
      } else if (secondPlayerSunkShips === true && player.name === playerOneName) {
        msg = `${playerOneName} won 🎉`;
      } else if (secondPlayerSunkShips === true && player.name === playerTwoName) {
        msg = `${playerTwoName} lost`;
      }
      return msg;
    }
  };
  return {
    getPlayer,
    playerRound,
    printNewBoard,
    isGameEnd
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
    const PlayerOneMiniShips = playerOneDashBoard.querySelectorAll(".mini-ship-size");
    const playerTwoDashBoard = document.querySelector(`.${playerTwoFirstChar}`);
    const playerTwoMiniShips = playerTwoDashBoard.querySelectorAll(".mini-ship-size");
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
    playerOneShipsBoard.appendChild(game.printNewBoard().currentPlayerShipBoard);
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
  playerOneStrikeBoard.addEventListener("click", e => {
    const index = e.target.dataset.index;
    const player = game.getPlayer();
    //check clicked cell is free
    if (index === undefined || e.target.hasChildNodes() === true) return;
    clickHandler(index);
    updateScreen();
    //for solo player
    if (player.name !== "ai" && player.name === "you" && e.target.hasChildNodes() !== true) {
      game.playerRound(player, (0, _utility.computerMove)(player));
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
  strategyBoard.appendChild((0, _boardComponent.drawGrids)());
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
    const setShipsPlace = (0, _shipPosition.randomlyPlaceShips)(newPlayer);
    const ships = newPlayer.board.shipsPositions;
    const hits = newPlayer.board.hitShots;
    const missed = newPlayer.board.missedShots;
    container.textContent = "";
    container.appendChild((0, _boardComponent.firstBoard)(ships, hits, missed));
    playBtn.style.display = "block";
  } else {
    const keepName = newPlayer.name;
    newPlayer = null;
    newPlayer = (0, _utility.Player)(keepName, ships);
    const setShipsPlace = (0, _shipPosition.randomlyPlaceShips)(newPlayer);
    const shipsCoordinates = newPlayer.board.shipsPositions;
    const hits = newPlayer.board.hitShots;
    const missed = newPlayer.board.missedShots;
    container.textContent = "";
    container.appendChild((0, _boardComponent.firstBoard)(shipsCoordinates, hits, missed));
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
  shipsDiv.forEach(ship => {
    sunkShipArray.forEach(sunkShip => {
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

/***/ }),

/***/ "./src/place-ship-page/ship-position.js":
/*!**********************************************!*\
  !*** ./src/place-ship-page/ship-position.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.dragShips = dragShips;
exports.drawGrids = drawGrids;
exports.randomlyPlaceShips = randomlyPlaceShips;
var _utility = __webpack_require__(/*! ../utility */ "./src/utility.js");
function rePosition(player, shipsArray, ship) {
  //if the ship is length 2 buts it's position property
  // contain more than 2 coordinate remove those except the last two and update
  const allShipPositions = player.board.shipsPositions;
  const cellsToRemoved = shipsArray.slice(0, shipsArray.length - ship.length);
  cellsToRemoved.forEach(cell => {
    allShipPositions.forEach(coordinate => {
      if (coordinate.toString() === cell.toString()) {
        //update obj
        allShipPositions.splice(allShipPositions.indexOf(coordinate), 1);
        shipsArray.splice(shipsArray.indexOf(cell), 1);
      }
    });
  });
}
function placePlayerShipHorizontal(player, index, ship) {
  const coordinates = player.board.coordinatesHashMap;
  const convertIndex = coordinates.get(Number(index));
  const shipCells = player.board.placeVertical(convertIndex, ship);
  const takenCells = ship.positions;
  if (ship.positions.length === 0) {
    //occupied return null
    if (shipCells === null) {
      player.board.placeRandom(ship);
    }
  } else {
    rePosition(player, takenCells, ship);
  }
}
function placePlayerShipVertical(player, index, ship) {
  const coordinates = player.board.coordinatesHashMap;
  const convertIndex = coordinates.get(Number(index));
  const takenCells = ship.positions;
  if (ship.positions.length === 0) {
    player.board.placeHorizontal(convertIndex, ship);
  } else {
    rePosition(player, takenCells, ship);
  }
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
function allowDrop(e) {
  e.preventDefault();
}
function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
}
function drop(e, newPlayer) {
  const ships = newPlayer.board.shipsArray;
  const index = e.target.dataset.index;
  //if the ship is over on the top of another ship it return undefined
  if (index == undefined) {
    return;
  } else {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const dragged = document.getElementById(data);
    const shipDirection = getShipDirectionClass(dragged, data);
    const shipIndex = whichShipClicked(ships, data);
    e.target.appendChild(dragged);
    if (shipDirection === "horizontal") {
      placePlayerShipHorizontal(newPlayer, index, ships[shipIndex]);
    } else if (shipDirection === "vertical") {
      placePlayerShipVertical(newPlayer, index, ships[shipIndex]);
    }
  }
}

// put ship direction class at last and to change it to horizontal or vertical
function getShipDirectionClass(element, name) {
  const shipName = name;
  const allClassName = element.className.split(" ");
  const directionClass = allClassName[allClassName.length - 1].split("-");
  const shipDirection = directionClass[1];
  return shipDirection;
}
//flip the ship direction on click if it is valid
function flip(e, newPlayer) {
  const ships = newPlayer.board.shipsArray;
  const ship = e.target;
  const shipName = e.target.id;
  const shipDirection = getShipDirectionClass(ship, shipName);
  const index = whichShipClicked(ships, shipName);
  if (shipDirection === "horizontal") {
    const result = positionTempShip(ships, index, "vertical", newPlayer);
    if (result === true) {
      ship.classList.remove(`${shipName}-horizontal`);
      ship.classList.add(`${shipName}-vertical`);
    }
  } else if (shipDirection === "vertical") {
    const result = positionTempShip(ships, index, "horizontal", newPlayer);
    if (result === true) {
      ship.classList.remove(`${shipName}-vertical`);
      ship.classList.add(`${shipName}-horizontal`);
    }
  }

  //function accept ships array, index  of the ship,flip direction and player  to replicate that ship in
  //different positions(direction) and return boolean for each position and flip for valid direction
  function positionTempShip(ships, index, direction, player) {
    const firstCoordinate = ships[index].positions[0];
    const tempShip = (0, _utility.Ship)(ships[index].shipName, ships[index].length);
    const tempShips = [];
    tempShips.push(tempShip);
    const tempBoard = (0, _utility.GameBoard)(tempShip);
    if (direction === "horizontal") {
      tempBoard.placeVertical(firstCoordinate, tempShip);
    } else if (direction === "vertical") {
      tempBoard.placeHorizontal(firstCoordinate, tempShip);
    }
    //check the new position except the first coordinate
    const result = isCoordinateFree(tempShip.positions.slice(1), player.board.shipsPositions);
    if (result === true) {
      //update ship position in ship and player object
      const newPosition = tempShip.positions;
      removeCoordinate(ships[index].positions, player.board.shipsPositions);
      ships[index].positions = [];
      ships[index].positions = newPosition;
      newPosition.forEach(coordinate => {
        player.board.shipsPositions.push(coordinate);
      });
    }
    return result;
  }
}
//get specific ship from ships object array
function whichShipClicked(array, shipName) {
  let index = null;
  array.forEach(ship => {
    if (ship.shipName.toString() === shipName.toString() === true) {
      index = array.indexOf(ship);
      return index;
    }
  });
  return index;
}
//remove coordinate for flip ships
function removeCoordinate(shipPosition, takenPositions) {
  shipPosition.forEach(position => {
    takenPositions.forEach(coordinate => {
      if (coordinate.toString() === position.toString()) {
        takenPositions.splice(takenPositions.indexOf(coordinate), 1);
      }
    });
  });
}
//check the cell is free
function isCoordinateFree(shipPosition, takenPositions) {
  let result = true;
  shipPosition.forEach(cell => {
    takenPositions.forEach(coordinate => {
      if (cell.toString() === coordinate.toString()) {
        result = false;
        return result;
      }
    });
  });
  return result;
}
//draw dragged and dropped ships to initialize, it use ship object properties
function drawShips(ships) {
  const divHolder = document.createElement("div");
  divHolder.setAttribute("class", "drop-ships");
  divHolder.style.display = "flex";
  ships.forEach(ship => {
    const div = document.createElement("div");
    div.setAttribute("id", `${ship.shipName}`);
    div.dataset.length = `${ship.length}`;
    div.classList.add("ship");
    div.classList.add("ship-size");
    div.classList.add(`${ship.shipName}-horizontal`);
    div.setAttribute("draggable", "true");
    divHolder.appendChild(div);
  });
  return divHolder;
}
function dragShips(newPlayer, ships) {
  const container = document.querySelector(".board-container");
  const shipsContainer = document.querySelector("[data-ships-container]");
  const playBtn = document.querySelector(".play-btn");
  playBtn.style.display = "none";
  container.textContent = "";
  container.appendChild(drawGrids());
  shipsContainer.style.display = "flex";
  shipsContainer.textContent = "";
  shipsContainer.appendChild(drawShips(ships));
  shipsContainer.style.display = "flex";
  const shipsDiv = document.querySelectorAll(".ship");
  const squares = document.querySelectorAll(".grid-cell");
  shipsDiv.forEach(ship => {
    ship.addEventListener("dragstart", e => {
      drag(e);
    });
    ship.addEventListener("click", e => {
      flip(e, newPlayer);
    });
  });
  //drop zone or grid cells
  squares.forEach(square => {
    square.addEventListener("dragover", e => {
      allowDrop(e);
    });
    square.addEventListener("drop", e => {
      drop(e, newPlayer);
      const totalLength = newPlayer.board.shipsArray.reduce((total, ship) => {
        return total += ship.length;
      }, 0);
      //check all ship length sum is equal to total ship dropped and update player object
      if (newPlayer.board.shipsPositions.length === totalLength) {
        playBtn.style.display = "block";
      }
    });
  });
}
function randomlyPlaceShips(player) {
  player.board.shipsArray.forEach(ship => {
    player.board.placeRandom(ship);
  });
  return player;
}

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GameBoard = GameBoard;
exports.Player = Player;
exports.Ship = Ship;
exports.computerMove = computerMove;
exports.sum = sum;
//import { ships } from "./dom-stuff";

/**
 *ship  has name,length and hits,position as property and isSunk and hit as method
 *ship.position - is an array that hold coordinates of the ship.
 *ship.isSunk() - to check the ship is sunk or not return boolean
 *ship.hit(ship.hits) - increase ship hits on by one each time it is called.
 * @param {*} shipName
 * @param {*} length
 */
function Ship(shipName, length) {
  const hits = 0;
  function hit() {
    this.hits++;
  }
  function isSunk() {
    return length <= this.hits ? true : false;
  }
  return {
    shipName,
    length,
    hits,
    positions: [],
    hit,
    isSunk
  };
}
/**
 * GameBoard.createBoard - creates board with [x,y] coordinate based on row and column number 
 * and return board and two hashmap that contain number and corresponding coordinate(0, [0,0]) and the second one inverse ([0,0], 0).
 * 
 * GameBoard.position(array,length) - accept coordinate[x, y] and ship length then calculate the space the ship takes on 10 x 10 board and 
 * return array of coordinates.
 *
 * GameBoard.randomlyPosition(length) - accept ship length then return vertical or horizontal cell 
 * that the ship will takes coordinates as an array by calling it self recursively if the position occupied.
 * 
 * GameBoard.placeVertical && GameBoard. placeHorizontal - methods use to place ship manually by accepting coordinates([x,y] and ship) return array of coordinate the ship will take.
 * and update ships position and store coordinate to the ship.
 *  
 * GameBoard.receiveAttack - accept coordinate [x,y] ,check it is missed or hit shot ,report all the ship is sunk or not 
 * and call hit on specific ship if it is a hit. 

 */
function GameBoard(shipsArray) {
  const shipsPositions = [];
  const board = createBoard(10, 10);
  const coordinatesHashMap = board.allCoordinates;
  const inverseHashMap = board.inverseCoordinate;
  const missedShots = [];
  const hitShots = [];
  function createBoard(row, col) {
    const board = [];
    const allCoordinates = new Map();
    const inverseCoordinate = new Map();
    let k = 0;
    for (let i = 0; i < row; i++) {
      board[i] = [];
    }
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        board[x][y] = [x, y];
        allCoordinates.set(k, [x, y]);
        inverseCoordinate.set([x, y].toString(), k);
        k++;
      }
    }
    return {
      board,
      allCoordinates,
      inverseCoordinate
    };
  }
  function Position(coordinate, shipLength) {
    const horizontal = [];
    const vertical = [];
    const x = coordinate[0];
    const y = coordinate[1];
    //[x,y] = if x + length < length
    if (x + shipLength < 10 && y + shipLength < 10) {
      for (let i = 0; i < shipLength; i++) {
        horizontal.push([x + i, y]);
        vertical.push([x, y + i]);
      }
    } else if (x + shipLength >= 10 && y + shipLength >= 10) {
      for (let i = 0; i < shipLength; i++) {
        horizontal.push([x - i, y]);
        vertical.push([x, y - i]);
      }
    } else if (x + shipLength >= 10 && y + shipLength < 10) {
      for (let i = 0; i < shipLength; i++) {
        horizontal.push([x - i, y]);
        vertical.push([x, y + i]);
      }
    } else if (x + shipLength < 10 && y + shipLength >= 10) {
      for (let i = 0; i < shipLength; i++) {
        horizontal.push([x + i, y]);
        vertical.push([x, y - i]);
      }
    }
    return {
      horizontal,
      vertical
    };
  }
  function placeVertical(coordinate, ship) {
    const shipCells = Position(coordinate, ship.length).vertical;
    if (isCoordinateFree(shipCells, shipsPositions) === false) return null;
    twoDimensionArray(shipCells, shipsPositions);
    twoDimensionArray(shipCells, ship.positions);
    return shipCells;
  }
  function placeHorizontal(coordinate, ship) {
    const shipCells = Position(coordinate, ship.length).horizontal;
    if (isCoordinateFree(shipCells, shipsPositions) === false) return null;
    twoDimensionArray(shipCells, shipsPositions);
    twoDimensionArray(shipCells, ship.positions);
    return shipCells;
  }
  function randomFreeCoordinate() {
    const randomNum = randomCell(100);
    const relatedCoordinate = coordinatesHashMap.get(randomNum);
    if (shipsPositions.includes(relatedCoordinate) === false) {
      return relatedCoordinate;
    } else {
      return randomFreeCoordinate();
    }
  }
  function randomCell(num) {
    return Math.floor(Math.random() * num);
  }
  function isCoordinateFree(shipPosition, takenPositions) {
    let result = true;
    shipPosition.forEach(cell => {
      takenPositions.forEach(coordinate => {
        if (cell.toString() === coordinate.toString()) {
          result = false;
          return result;
        }
      });
    });
    return result;
  }
  function shipDirection() {
    const randomNum = Math.random() >= 0.5;
    return randomNum ? "horizontal" : "vertical";
  }
  function placeRandom(ship) {
    const newPosition = randomlyPosition(ship.length);
    newPosition.forEach(coordinate => {
      ship.positions.push(coordinate);
      shipsPositions.push(coordinate);
    });
    return newPosition;
  }
  function randomlyPosition(shipLength) {
    const side = shipDirection();
    if (side === "horizontal") {
      const coordinate = randomFreeCoordinate();
      const spaceTaken = Position(coordinate, shipLength).horizontal;
      const result = isCoordinateFree(spaceTaken, shipsPositions);
      if (result === true) {
        return spaceTaken;
      } else if (result === false) {
        return randomlyPosition(shipLength);
      }
    } else if (side === "vertical") {
      const coordinate = randomFreeCoordinate();
      const spaceTaken = Position(coordinate, shipLength).vertical;
      const result = isCoordinateFree(spaceTaken, shipsPositions);
      if (result === true) {
        return spaceTaken;
      } else if (result === false) {
        return randomlyPosition(shipLength);
      }
    }
  }
  //function to compare coordinate exist in array of coordinates  by changing them to string first return boolean

  function checkCoordinate(coordinate, array) {
    let result = false;
    array.forEach(position => {
      if (coordinate.toString() === position.toString()) {
        result = true;
        return result;
      }
    });
    return result;
  }
  function isHit(coordinate, array) {
    return checkCoordinate(coordinate, array);
  }
  function receiveAttack(coordinate) {
    if (isHit(coordinate, shipsPositions) === true) {
      shipsArray.forEach(ship => {
        if (checkCoordinate(coordinate, ship.positions) === true) {
          ship.hit();
          hitShots.push(coordinate);
          return;
        }
      });
    } else if (isHit(coordinate, shipsPositions) === false) {
      missedShots.push(coordinate);
      return;
    }
  }
  function isSunk() {
    return shipsPositions.length <= hitShots.length;
  }
  function twoDimensionArray(twoDimensionArray, oneDimensionArray) {
    twoDimensionArray.forEach(coordinate => {
      oneDimensionArray.push(coordinate);
    });
  }
  function sunkShips() {
    const result = [];
    shipsArray.forEach(ship => {
      if (ship.isSunk() === true) {
        result.push(ship.shipName);
      }
    });
    return result;
  }
  return {
    placeVertical,
    placeHorizontal,
    placeRandom,
    receiveAttack,
    isHit,
    isSunk,
    sunkShips,
    coordinatesHashMap,
    inverseHashMap,
    missedShots,
    hitShots,
    shipsPositions,
    shipsArray
  };
}
function Player(name) {
  const carrier = Ship("carrier", 5);
  const battleShip = Ship("battleShip", 4);
  const destroyer = Ship("destroyer", 3);
  const submarine = Ship("submarine", 3);
  const patrol = Ship("patrol", 2);
  const ships = [carrier, submarine, battleShip, destroyer, patrol];
  const board = GameBoard(ships);
  return {
    board,
    name
  };
}
//computer move function that return number not picked and try adjacent slot if it hit other ship
const pickedNum = [];
function computerMove(player) {
  return computerSlot();
  function computerSlot() {
    const nextHits = [];
    const hits = player.board.hitShots;
    let neighborSlots = [];
    if (hits.length > 0) {
      hits.forEach(hit => {
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
      neighborSlots.forEach(coordinate => {
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
function sum(a, b) {
  return a + b;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/place-ship-page/ships.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/place-ship-page/ships.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*body {
  display: flex;
  justify-content: center;
  background-color: rgb(3 30 70);
}*/
.board {
  display: grid;
  grid-template-columns: repeat(10, 6vmin);
  grid-template-rows: repeat(10, 6vmin);
  gap: 2px;
  padding: 0.2rem;
  background-color: black;
}
.board-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.place-ships-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 80%;
  margin: auto;
  margin-top: 2px;
}

.drag-btn,
.play-btn,
.next-btn,
.randomize-btn {
  padding: 0.6rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.2rem;
}
.play-btn,
.next-btn {
  display: none;
  box-shadow: -1px 0px 9px 3px #ff00d4;
}
.drag-btn:hover,
.randomize-btn:hover {
  color: beige;
  background-color: black;
}
.ships-container,
.drop-ships {
  display: none;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 2px;
  max-height: 200px;
}

.grid-cell {
  border: none;
  background-color: white;
}

.dragging {
  background-color: yellow;
}
.flex-horizontal {
  display: flex;
}
.flex-vertical {
  display: flex;
  flex-direction: column;
}
.submarine-horizontal {
  --width: 3;
}
.submarine-vertical {
  --height: 3;
}
.carrier-horizontal {
  --width: 5;
}
.carrier-vertical {
  --height: 5;
}
.patrol-horizontal {
  --width: 2;
}
.patrol-vertical {
  --height: 2;
}
.destroyer-horizontal {
  --width: 3;
}
.destroyer-vertical {
  --height: 3;
}
.battleShip-horizontal {
  --width: 4;
}
.battleShip-vertical {
  --height: 4;
}
.ship {
  width: 6vmin;
  height: 6vmin;
  background-color: rgb(0 203 54);
  border-radius: 0.2rem;
  cursor: grabbing;
}
.ship-size {
  width: calc(6vmin * var(--width, 1));
  height: calc(6vmin * var(--height, 1));
  position: relative;
  right: 4px;
  background-color: rgb(1, 147, 1);
}

.target-dot {
  aspect-ratio: 1;
  width: 0.8rem;
  border-radius: 50%;
}
.missed-strike {
  aspect-ratio: 1;
  width: 0.2rem;
  border-radius: 50%;
}
.missed-strike {
  background-color: blue;
  border: none;
}
.hit-strike {
  background-color: #f50000;
}
/*mini ships style*/
.fleet-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mini-ship-owner {
  font-size: 1.5rem;
}
.same-size-ships {
  display: flex;
  justify-content: center;
  width: 150px;
}
.mini-carrier {
  --width: 5;
}
.mini-battleShip {
  --width: 4;
}
.mini-destroyer {
  --width: 3;
}
.mini-submarine {
  --width: 3;
}
.mini-patrol {
  --width: 1.5;
}
.mini-ship-size {
  width: calc(40px * var(--width, 1));
  height: 20px;
  margin: 2px;
  background-color: rgb(166 198 165);
}
`, "",{"version":3,"sources":["webpack://./src/place-ship-page/ships.css"],"names":[],"mappings":"AAAA;;;;EAIE;AACF;EACE,aAAa;EACb,wCAAwC;EACxC,qCAAqC;EACrC,QAAQ;EACR,eAAe;EACf,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,UAAU;EACV,YAAY;EACZ,eAAe;AACjB;;AAEA;;;;EAIE,eAAe;EACf,eAAe;EACf,YAAY;EACZ,qBAAqB;AACvB;AACA;;EAEE,aAAa;EACb,oCAAoC;AACtC;AACA;;EAEE,YAAY;EACZ,uBAAuB;AACzB;AACA;;EAEE,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,kBAAkB;EAClB,QAAQ;EACR,iBAAiB;AACnB;;AAEA;EACE,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,wBAAwB;AAC1B;AACA;EACE,aAAa;AACf;AACA;EACE,aAAa;EACb,sBAAsB;AACxB;AACA;EACE,UAAU;AACZ;AACA;EACE,WAAW;AACb;AACA;EACE,UAAU;AACZ;AACA;EACE,WAAW;AACb;AACA;EACE,UAAU;AACZ;AACA;EACE,WAAW;AACb;AACA;EACE,UAAU;AACZ;AACA;EACE,WAAW;AACb;AACA;EACE,UAAU;AACZ;AACA;EACE,WAAW;AACb;AACA;EACE,YAAY;EACZ,aAAa;EACb,+BAA+B;EAC/B,qBAAqB;EACrB,gBAAgB;AAClB;AACA;EACE,oCAAoC;EACpC,sCAAsC;EACtC,kBAAkB;EAClB,UAAU;EACV,gCAAgC;AAClC;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;AACpB;AACA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,YAAY;AACd;AACA;EACE,yBAAyB;AAC3B;AACA,mBAAmB;AACnB;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,YAAY;AACd;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;EACE,YAAY;AACd;AACA;EACE,mCAAmC;EACnC,YAAY;EACZ,WAAW;EACX,kCAAkC;AACpC","sourcesContent":["/*body {\n  display: flex;\n  justify-content: center;\n  background-color: rgb(3 30 70);\n}*/\n.board {\n  display: grid;\n  grid-template-columns: repeat(10, 6vmin);\n  grid-template-rows: repeat(10, 6vmin);\n  gap: 2px;\n  padding: 0.2rem;\n  background-color: black;\n}\n.board-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.place-ships-btns {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  width: 80%;\n  margin: auto;\n  margin-top: 2px;\n}\n\n.drag-btn,\n.play-btn,\n.next-btn,\n.randomize-btn {\n  padding: 0.6rem;\n  font-size: 1rem;\n  border: none;\n  border-radius: 0.2rem;\n}\n.play-btn,\n.next-btn {\n  display: none;\n  box-shadow: -1px 0px 9px 3px #ff00d4;\n}\n.drag-btn:hover,\n.randomize-btn:hover {\n  color: beige;\n  background-color: black;\n}\n.ships-container,\n.drop-ships {\n  display: none;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: start;\n  gap: 2px;\n  max-height: 200px;\n}\n\n.grid-cell {\n  border: none;\n  background-color: white;\n}\n\n.dragging {\n  background-color: yellow;\n}\n.flex-horizontal {\n  display: flex;\n}\n.flex-vertical {\n  display: flex;\n  flex-direction: column;\n}\n.submarine-horizontal {\n  --width: 3;\n}\n.submarine-vertical {\n  --height: 3;\n}\n.carrier-horizontal {\n  --width: 5;\n}\n.carrier-vertical {\n  --height: 5;\n}\n.patrol-horizontal {\n  --width: 2;\n}\n.patrol-vertical {\n  --height: 2;\n}\n.destroyer-horizontal {\n  --width: 3;\n}\n.destroyer-vertical {\n  --height: 3;\n}\n.battleShip-horizontal {\n  --width: 4;\n}\n.battleShip-vertical {\n  --height: 4;\n}\n.ship {\n  width: 6vmin;\n  height: 6vmin;\n  background-color: rgb(0 203 54);\n  border-radius: 0.2rem;\n  cursor: grabbing;\n}\n.ship-size {\n  width: calc(6vmin * var(--width, 1));\n  height: calc(6vmin * var(--height, 1));\n  position: relative;\n  right: 4px;\n  background-color: rgb(1, 147, 1);\n}\n\n.target-dot {\n  aspect-ratio: 1;\n  width: 0.8rem;\n  border-radius: 50%;\n}\n.missed-strike {\n  aspect-ratio: 1;\n  width: 0.2rem;\n  border-radius: 50%;\n}\n.missed-strike {\n  background-color: blue;\n  border: none;\n}\n.hit-strike {\n  background-color: #f50000;\n}\n/*mini ships style*/\n.fleet-holder {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.mini-ship-owner {\n  font-size: 1.5rem;\n}\n.same-size-ships {\n  display: flex;\n  justify-content: center;\n  width: 150px;\n}\n.mini-carrier {\n  --width: 5;\n}\n.mini-battleShip {\n  --width: 4;\n}\n.mini-destroyer {\n  --width: 3;\n}\n.mini-submarine {\n  --width: 3;\n}\n.mini-patrol {\n  --width: 1.5;\n}\n.mini-ship-size {\n  width: calc(40px * var(--width, 1));\n  height: 20px;\n  margin: 2px;\n  background-color: rgb(166 198 165);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/graduate-v17-latin-regular.woff2 */ "./src/assets/fonts/graduate-v17-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/archivo-black-v21-latin-regular.woff2 */ "./src/assets/fonts/archivo-black-v21-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/nanum-gothic-coding-v21-latin-regular.woff2 */ "./src/assets/fonts/nanum-gothic-coding-v21-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/germania-one-v20-latin-regular.woff2 */ "./src/assets/fonts/germania-one-v20-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/share-tech-mono-v15-latin-regular.woff2 */ "./src/assets/fonts/share-tech-mono-v15-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/set-ships.jpg */ "./src/assets/images/set-ships.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/ships.jpg */ "./src/assets/images/ships.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-display: swap;
  font-family: "Graduate";
  font-style: normal;
  font-weight: 400;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("woff2");
}
/* archivo-black-regular - latin */
@font-face {
  font-display: swap;
  font-family: "Archivo Black";
  font-style: normal;
  font-weight: 400;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___})
    format("woff2");
}
/* nanum-gothic-coding-regular - latin */
@font-face {
  font-display: swap;
  font-family: "Nanum Gothic Coding";
  font-style: normal;
  font-weight: 300;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_2___})
    format("woff2");
}
/* germania-one-regular - latin */
@font-face {
  font-display: swap;
  font-family: "Germania One";
  font-style: normal;
  font-weight: 400;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_3___})
    format("woff2");
}
/* share-tech-mono-regular - latin */
@font-face {
  font-display: swap;
  font-family: "Share Tech Mono";
  font-style: normal;
  font-weight: 400;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_4___})
    format("woff2");
}
* {
  margin: 0;
}
body {
  width: 100vw;
  min-height: 100vh;
  background-color: #000000;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_5___});
  font-family: "Graduate", "Share Tech Mono", "Germania One", monospace, Arial,
    Helvetica, sans-serif;
  background-position: center;
  background-repeat: no-repeat;
  background-size: inherit;
}
button {
  cursor: pointer;
  letter-spacing: 1px;
}
/*intro page*/
.intro-page {
  display: flex;
  flex-direction: column;
  gap: 20%;
  background-color: black;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_6___});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.header {
  padding: 1.5rem;
  background-color: rgb(15, 15, 15);
  color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 2s;
}

.logo {
  font-family: "Archivo Black";
  letter-spacing: 0.3rem;
  font-size: 2.3rem;
  font-weight: 300;
  text-shadow: 0 1px blue;
  transition: all ease-in-out 2s;
}
.logo:hover {
  color: yellow;
  transform: scale(1.2);
}
.game-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.game-option-btns {
  padding: 1rem;
  border: 2px solid white;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: "Nanum Gothic Coding";
  text-shadow: -1px -2px 2px #0000007d;
  transition: all ease-in-out 1s;
  letter-spacing: 0.2rem;
}
.game-option-btns:hover {
  border: 2px solid rgb(0, 0, 0);
}
.multi-players-btn {
  background-color: rgb(203, 226, 4);
  color: rgb(0, 0, 0);
}
.single-player-btn {
  background-color: rgb(22, 145, 0);
  color: aliceblue;
}

/*ship placement page*/
.ships-grid {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(3 30 70);
}
.drag-btn,
.randomize-btn,
.play-btn {
  font-family: "Germania One";
}

.players-name {
  display: flex;
}
/* count down*/
.pass-screen {
  position: absolute;
  z-index: 1000;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  background-color: rgb(0, 0, 0);
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Graduate";
}
.counter {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  border-radius: 1rem;
  border: 0.2rem solid rgb(174, 0, 255);
  color: brown;
}
.counter-board {
  font-size: 4rem;
}
.msg-text {
  color: beige;
  font-size: 2rem;
  padding: 0.5rem;
}
/*players board,mini ships board*/

.players-board,
.mini-ship-holder {
  display: flex;
  justify-content: space-evenly;
  background-color: #292929;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.4rem;
}

/*winner modal*/
.winner-board {
  background-color: antiquewhite;
  padding: 1rem;
}
.winner-holder {
  box-shadow: -2px 0px 8px 3px #41cc2f;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
}
.winner-modal {
  border: none;
  width: 20%;
  padding: 0.5rem;
  border-radius: 0.4rem;
  box-shadow: -2px 0px 8px 3px #000000;
  position: relative;
  left: 30%;
}
.rematch-btn {
  border: 2px solid green;
  border-radius: 3px;
  padding: 0.3rem;
  font-weight: 500;
}
/*form style*/
input {
  font-family: "Germania One";
}
.player-name-input {
  border: none;
  padding: 0.9rem;
  border-radius: 0.2rem;
  background-color: antiquewhite;
}

.player-name-input:focus ~ .player-one-label {
  top: 0.3rem;
  left: 20%;
  color: #19d500;
}
.player-two-label,
.player-one-label {
  position: relative;
  bottom: 2.8rem;
  left: 1rem;
  color: #60635f;
  transition: all 2s;
}
.player-name-input:focus ~ .player-two-label {
  top: 20%;
  left: 20%;
  color: #19d500;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-color: rgb(39, 34, 34);
  opacity: 0.8;
  width: fit-content;
  padding: 2rem;
  margin: auto;
  margin-top: 1rem;
  border-radius: 1rem;
  height: 350px;
  color: antiquewhite;
  font-family: "Germania One", monospace;
}
.input-holder {
  display: flex;
  flex-direction: column;
}
.submit-btn {
  padding: 0.4rem;
  border-radius: 0.3rem;
  border: none;
  font-weight: 500;
  font-family: "Germania One";
}
.submit-btn:hover {
  background-color: yellow;
}
.player-turn {
  text-align: center;
  font-size: 1.5rem;
  color: aliceblue;
  background-color: #000000;
  opacity: 0.8;
  padding: 0.5rem;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-display: swap;\n  font-family: \"Graduate\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/graduate-v17-latin-regular.woff2\") format(\"woff2\");\n}\n/* archivo-black-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Archivo Black\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/archivo-black-v21-latin-regular.woff2\")\n    format(\"woff2\");\n}\n/* nanum-gothic-coding-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Nanum Gothic Coding\";\n  font-style: normal;\n  font-weight: 300;\n  src: url(\"./assets/fonts/nanum-gothic-coding-v21-latin-regular.woff2\")\n    format(\"woff2\");\n}\n/* germania-one-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Germania One\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/germania-one-v20-latin-regular.woff2\")\n    format(\"woff2\");\n}\n/* share-tech-mono-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Share Tech Mono\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/share-tech-mono-v15-latin-regular.woff2\")\n    format(\"woff2\");\n}\n* {\n  margin: 0;\n}\nbody {\n  width: 100vw;\n  min-height: 100vh;\n  background-color: #000000;\n  background-image: url(./assets/images/set-ships.jpg);\n  font-family: \"Graduate\", \"Share Tech Mono\", \"Germania One\", monospace, Arial,\n    Helvetica, sans-serif;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: inherit;\n}\nbutton {\n  cursor: pointer;\n  letter-spacing: 1px;\n}\n/*intro page*/\n.intro-page {\n  display: flex;\n  flex-direction: column;\n  gap: 20%;\n  background-color: black;\n  height: 100vh;\n  font-family: Arial, Helvetica, sans-serif;\n  background-image: url(\"./assets/images/ships.jpg\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n}\n.header {\n  padding: 1.5rem;\n  background-color: rgb(15, 15, 15);\n  color: aliceblue;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: all ease-in-out 2s;\n}\n\n.logo {\n  font-family: \"Archivo Black\";\n  letter-spacing: 0.3rem;\n  font-size: 2.3rem;\n  font-weight: 300;\n  text-shadow: 0 1px blue;\n  transition: all ease-in-out 2s;\n}\n.logo:hover {\n  color: yellow;\n  transform: scale(1.2);\n}\n.game-options {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 0.5rem;\n}\n.game-option-btns {\n  padding: 1rem;\n  border: 2px solid white;\n  border-radius: 0.3rem;\n  font-size: 1.2rem;\n  font-weight: 600;\n  font-family: \"Nanum Gothic Coding\";\n  text-shadow: -1px -2px 2px #0000007d;\n  transition: all ease-in-out 1s;\n  letter-spacing: 0.2rem;\n}\n.game-option-btns:hover {\n  border: 2px solid rgb(0, 0, 0);\n}\n.multi-players-btn {\n  background-color: rgb(203, 226, 4);\n  color: rgb(0, 0, 0);\n}\n.single-player-btn {\n  background-color: rgb(22, 145, 0);\n  color: aliceblue;\n}\n\n/*ship placement page*/\n.ships-grid {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: rgb(3 30 70);\n}\n.drag-btn,\n.randomize-btn,\n.play-btn {\n  font-family: \"Germania One\";\n}\n\n.players-name {\n  display: flex;\n}\n/* count down*/\n.pass-screen {\n  position: absolute;\n  z-index: 1000;\n  width: 100vw;\n  min-height: 100vh;\n  top: 0;\n  background-color: rgb(0, 0, 0);\n  display: none;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  font-family: \"Graduate\";\n}\n.counter {\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 30%;\n  border-radius: 1rem;\n  border: 0.2rem solid rgb(174, 0, 255);\n  color: brown;\n}\n.counter-board {\n  font-size: 4rem;\n}\n.msg-text {\n  color: beige;\n  font-size: 2rem;\n  padding: 0.5rem;\n}\n/*players board,mini ships board*/\n\n.players-board,\n.mini-ship-holder {\n  display: flex;\n  justify-content: space-evenly;\n  background-color: #292929;\n  flex-wrap: wrap;\n  align-items: center;\n  padding: 0.4rem;\n}\n\n/*winner modal*/\n.winner-board {\n  background-color: antiquewhite;\n  padding: 1rem;\n}\n.winner-holder {\n  box-shadow: -2px 0px 8px 3px #41cc2f;\n  border: none;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0.2rem;\n}\n.winner-modal {\n  border: none;\n  width: 20%;\n  padding: 0.5rem;\n  border-radius: 0.4rem;\n  box-shadow: -2px 0px 8px 3px #000000;\n  position: relative;\n  left: 30%;\n}\n.rematch-btn {\n  border: 2px solid green;\n  border-radius: 3px;\n  padding: 0.3rem;\n  font-weight: 500;\n}\n/*form style*/\ninput {\n  font-family: \"Germania One\";\n}\n.player-name-input {\n  border: none;\n  padding: 0.9rem;\n  border-radius: 0.2rem;\n  background-color: antiquewhite;\n}\n\n.player-name-input:focus ~ .player-one-label {\n  top: 0.3rem;\n  left: 20%;\n  color: #19d500;\n}\n.player-two-label,\n.player-one-label {\n  position: relative;\n  bottom: 2.8rem;\n  left: 1rem;\n  color: #60635f;\n  transition: all 2s;\n}\n.player-name-input:focus ~ .player-two-label {\n  top: 20%;\n  left: 20%;\n  color: #19d500;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3rem;\n  background-color: rgb(39, 34, 34);\n  opacity: 0.8;\n  width: fit-content;\n  padding: 2rem;\n  margin: auto;\n  margin-top: 1rem;\n  border-radius: 1rem;\n  height: 350px;\n  color: antiquewhite;\n  font-family: \"Germania One\", monospace;\n}\n.input-holder {\n  display: flex;\n  flex-direction: column;\n}\n.submit-btn {\n  padding: 0.4rem;\n  border-radius: 0.3rem;\n  border: none;\n  font-weight: 500;\n  font-family: \"Germania One\";\n}\n.submit-btn:hover {\n  background-color: yellow;\n}\n.player-turn {\n  text-align: center;\n  font-size: 1.5rem;\n  color: aliceblue;\n  background-color: #000000;\n  opacity: 0.8;\n  padding: 0.5rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/place-ship-page/ships.css":
/*!***************************************!*\
  !*** ./src/place-ship-page/ships.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ships_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./ships.css */ "./node_modules/css-loader/dist/cjs.js!./src/place-ship-page/ships.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ships_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/archivo-black-v21-latin-regular.woff2":
/*!****************************************************************!*\
  !*** ./src/assets/fonts/archivo-black-v21-latin-regular.woff2 ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fc847a1f8d3d31390e0a.woff2";

/***/ }),

/***/ "./src/assets/fonts/germania-one-v20-latin-regular.woff2":
/*!***************************************************************!*\
  !*** ./src/assets/fonts/germania-one-v20-latin-regular.woff2 ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "981e3f3a3623a1dc14c3.woff2";

/***/ }),

/***/ "./src/assets/fonts/graduate-v17-latin-regular.woff2":
/*!***********************************************************!*\
  !*** ./src/assets/fonts/graduate-v17-latin-regular.woff2 ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d69e883b487803d1d83f.woff2";

/***/ }),

/***/ "./src/assets/fonts/nanum-gothic-coding-v21-latin-regular.woff2":
/*!**********************************************************************!*\
  !*** ./src/assets/fonts/nanum-gothic-coding-v21-latin-regular.woff2 ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5caa9ab1f687daf30ec5.woff2";

/***/ }),

/***/ "./src/assets/fonts/share-tech-mono-v15-latin-regular.woff2":
/*!******************************************************************!*\
  !*** ./src/assets/fonts/share-tech-mono-v15-latin-regular.woff2 ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9dedd274c9f5d028700c.woff2";

/***/ }),

/***/ "./src/assets/images/set-ships.jpg":
/*!*****************************************!*\
  !*** ./src/assets/images/set-ships.jpg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9bafc32b7fc72f510e4f.jpg";

/***/ }),

/***/ "./src/assets/images/ships.jpg":
/*!*************************************!*\
  !*** ./src/assets/images/ships.jpg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7699682f09c633054012.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/


__webpack_require__(/*! ./style.css */ "./src/style.css");
__webpack_require__(/*! ./place-ship-page/ships.css */ "./src/place-ship-page/ships.css");
var _utility = __webpack_require__(/*! ./utility.js */ "./src/utility.js");
var _shipPosition = __webpack_require__(/*! ./place-ship-page/ship-position.js */ "./src/place-ship-page/ship-position.js");
var _domComponent = __webpack_require__(/*! ./dom-component.js */ "./src/dom-component.js");
const pageContainer = document.querySelector("[data-page-container]");
const boardWrapper = document.querySelector(".game-wrapper");
(0, _domComponent.drawFirstPage)();
boardWrapper.style.display = "none";
let playerOneName;
let playerTwoName;
let firstPlayer;
let secondPlayer;
//store players object in hashmap
const hashmap = new Map();
let soloPlayer = false;
pageContainer.addEventListener("click", e => {
  if (e.target.matches(".multi-players-btn")) {
    soloPlayer = false;
    boardWrapper.style.display = "none";
    (0, _domComponent.formTemplate)(pageContainer);
  }
  if (e.target.matches("[data-submit-name]")) {
    e.preventDefault();
    const playerOne = document.querySelector("[data-player-one]");
    const playerTwo = document.querySelector("[data-player-two");
    //avoid space for creating class  later for fleet dash board
    playerOneName = playerOne.value.replace(/\s/g, "");
    playerTwoName = playerTwo.value.replace(/\s/g, "");
    //return if players name same and empty
    if (playerOneName === "" || playerTwoName === "" || playerOneName === playerTwoName === true) {
      return;
    }
    firstPlayer = (0, _utility.Player)(playerOneName);
    secondPlayer = (0, _utility.Player)(playerTwoName);
    (0, _domComponent.countdownModal)(`${playerOneName} set the ships`);
    (0, _domComponent.shipsPlacement)(pageContainer);
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
      (0, _domComponent.countdownModal)(`${playerTwoName} set the ships`);
      boardWrapper.style.display = "none";
    }
    (0, _domComponent.shipsPlacement)(pageContainer);
    if (soloPlayer === true && hashmap.size === 0) {
      //randomly place ai ships
      (0, _shipPosition.randomlyPlaceShips)(secondPlayer);
      hashmap.set(playerOneName, firstPlayer);
      hashmap.set(playerTwoName, secondPlayer);
    }
    if (hashmap.get(playerTwoName) !== undefined && hashmap.get(playerOneName) !== undefined) {
      const playerOne = hashmap.get(playerOneName);
      const playerTwo = hashmap.get(playerTwoName);
      (0, _domComponent.screenController)(playerOne, playerTwo, soloPlayer);
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
    firstPlayer = (0, _utility.Player)(playerOneName);
    secondPlayer = (0, _utility.Player)(playerTwoName);
    (0, _domComponent.countdownModal)("set the ships");
    (0, _domComponent.shipsPlacement)(pageContainer);
    boardWrapper.style.display = "none";
  }
});
const winnerMsg = document.querySelector(".winner-msg");
winnerMsg.addEventListener("click", e => {
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
    firstPlayer = (0, _utility.Player)(playerOneName);
    secondPlayer = (0, _utility.Player)(playerTwoName);
    isGameEnd = false;
    boards.textContent = "";
    turnDiv.textContent = "";
    dashBoard.forEach(div => {
      div.textContent = "";
    });
    boards.forEach(board => {
      board.textContent = "";
    });
    winnerMsg.textContent = "";
    winnerDivHolder.style.display = "none";
    firstPlayer = (0, _utility.Player)(playerOneName);
    secondPlayer = (0, _utility.Player)(playerTwoName);
    modal.close();
    pageContainer.textContent = "";
    (0, _domComponent.shipsPlacement)(pageContainer);
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
    (0, _domComponent.dragShips)(firstPlayer, firstPlayer.board.shipsArray);
  }
  if (hashmap.size > 1) {
    if (secondPlayer.board.shipsPositions.length > 0) {
      reposition();
    }
    (0, _domComponent.dragShips)(secondPlayer, secondPlayer.board.shipsArray);
  }
}
function reposition() {
  if (firstPlayer.board.shipsPositions.length > 0) {
    const xo = (0, _utility.Player)(playerOneName, firstPlayer.shipsArray);
    // firstPlayer = null;
    firstPlayer = xo;
  }
  if (secondPlayer.board.shipsPositions.length > 0) {
    const xo = (0, _utility.Player)(playerTwoName, secondPlayer.shipsArray);
    //secondPlayer = null;
    secondPlayer = xo;
  }
}
function putShips() {
  const shipsContainer = document.querySelector("[data-ships-container]");
  shipsContainer.style.display = "none";
  if (hashmap.size < 1) {
    reposition();
    (0, _domComponent.randomPlacement)(firstPlayer);
  } else if (hashmap.size > 0) {
    reposition();
    (0, _domComponent.randomPlacement)(secondPlayer);
  }
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsU0FBU0EsVUFBVUEsQ0FBQ0MsY0FBYyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtFQUM3QztFQUNBLE1BQU1DLEtBQUssR0FBRyxFQUFFO0VBQ2hCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7SUFDM0JELEtBQUssQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUNiLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDM0JGLEtBQUssQ0FBQ0MsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDbEI7RUFDRjtFQUNBO0VBQ0EsS0FBSyxNQUFNLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLElBQUlQLGNBQWMsRUFBRTtJQUNuQ0csS0FBSyxDQUFDRyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsTUFBTTtFQUN0QjtFQUNBLEtBQUssTUFBTSxDQUFDQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxJQUFJUixHQUFHLEVBQUU7SUFDeEIsSUFBSUUsS0FBSyxDQUFDSyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO01BQzFCTixLQUFLLENBQUNLLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsR0FBRyxLQUFLO0lBQ3JCO0VBQ0Y7RUFDQSxLQUFLLE1BQU0sQ0FBQ0QsQ0FBQyxFQUFFQyxDQUFDLENBQUMsSUFBSVAsSUFBSSxFQUFFO0lBQ3pCLElBQUlDLEtBQUssQ0FBQ0ssQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtNQUMxQk4sS0FBSyxDQUFDSyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsTUFBTTtJQUN0QjtFQUNGO0VBQ0E7RUFDQSxNQUFNQyxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMzQ0YsS0FBSyxDQUFDRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFDNUI7RUFDQSxLQUFLLElBQUlWLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzVCLE1BQU1XLE1BQU0sR0FBR0osUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQy9DRyxNQUFNLENBQUNDLFdBQVcsR0FBR2IsS0FBSyxDQUFDYyxJQUFJLENBQUNDLEtBQUssQ0FBQ2QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUNBLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdERXLE1BQU0sQ0FBQ0ksT0FBTyxDQUFDQyxLQUFLLEdBQUdoQixDQUFDO0lBQ3hCVyxNQUFNLENBQUNGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUNqQyxJQUFJWCxLQUFLLENBQUNjLElBQUksQ0FBQ0MsS0FBSyxDQUFDZCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQ0EsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLE1BQU0sRUFBRTtNQUNoRFcsTUFBTSxDQUFDQyxXQUFXLEdBQUcsRUFBRTtNQUN2QkQsTUFBTSxDQUFDRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDNUIsTUFBTU8sR0FBRyxHQUFHVixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7TUFDNUNTLEdBQUcsQ0FBQ1IsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO01BQy9CTyxHQUFHLENBQUNDLEtBQUssQ0FBQ0MsZUFBZSxHQUFHLFNBQVM7TUFDckNSLE1BQU0sQ0FBQ1MsV0FBVyxDQUFDSCxHQUFHLENBQUM7SUFDekIsQ0FBQyxNQUFNLElBQUlsQixLQUFLLENBQUNjLElBQUksQ0FBQ0MsS0FBSyxDQUFDZCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQ0EsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRTtNQUN0RFcsTUFBTSxDQUFDQyxXQUFXLEdBQUcsRUFBRTtNQUN2QkQsTUFBTSxDQUFDRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDNUIsTUFBTU8sR0FBRyxHQUFHVixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7TUFDNUNTLEdBQUcsQ0FBQ1IsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO01BQy9CTyxHQUFHLENBQUNSLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztNQUMvQkMsTUFBTSxDQUFDUyxXQUFXLENBQUNILEdBQUcsQ0FBQztJQUN6QixDQUFDLE1BQU0sSUFBSWxCLEtBQUssQ0FBQ2MsSUFBSSxDQUFDQyxLQUFLLENBQUNkLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDQSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssTUFBTSxFQUFFO01BQ3ZEVyxNQUFNLENBQUNDLFdBQVcsR0FBRyxFQUFFO01BQ3ZCLE1BQU1LLEdBQUcsR0FBR1YsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO01BQzVDUyxHQUFHLENBQUNSLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztNQUNsQ0MsTUFBTSxDQUFDUyxXQUFXLENBQUNILEdBQUcsQ0FBQztJQUN6QjtJQUNBWCxLQUFLLENBQUNjLFdBQVcsQ0FBQ1QsTUFBTSxDQUFDO0VBQzNCO0VBQ0EsT0FBT0wsS0FBSztBQUNkO0FBQ0E7QUFDQTtBQUNBLFNBQVNlLFdBQVdBLENBQUN6QixjQUFjLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0VBQzlDO0VBQ0EsTUFBTUMsS0FBSyxHQUFHLEVBQUU7RUFDaEIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtJQUMzQkQsS0FBSyxDQUFDQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ2IsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUMzQkYsS0FBSyxDQUFDQyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUNsQjtFQUNGO0VBQ0E7RUFDQSxLQUFLLE1BQU0sQ0FBQ0MsQ0FBQyxFQUFFQyxDQUFDLENBQUMsSUFBSVAsY0FBYyxFQUFFO0lBQ25DRyxLQUFLLENBQUNHLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsR0FBRyxNQUFNO0VBQ3RCO0VBQ0EsS0FBSyxNQUFNLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLElBQUlSLEdBQUcsRUFBRTtJQUN4QixJQUFJRSxLQUFLLENBQUNLLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7TUFDMUJOLEtBQUssQ0FBQ0ssQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLEtBQUs7SUFDckI7RUFDRjtFQUNBLEtBQUssTUFBTSxDQUFDRCxDQUFDLEVBQUVDLENBQUMsQ0FBQyxJQUFJUCxJQUFJLEVBQUU7SUFDekIsSUFBSUMsS0FBSyxDQUFDSyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO01BQzFCTixLQUFLLENBQUNLLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsR0FBRyxNQUFNO0lBQ3RCO0VBQ0Y7RUFDQTtFQUNBLE1BQU1DLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDRixLQUFLLENBQUNHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztFQUM1QjtFQUNBLEtBQUssSUFBSVYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEdBQUcsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7SUFDNUIsTUFBTVcsTUFBTSxHQUFHSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDL0NHLE1BQU0sQ0FBQ0MsV0FBVyxHQUFHYixLQUFLLENBQUNjLElBQUksQ0FBQ0MsS0FBSyxDQUFDZCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQ0EsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0RFcsTUFBTSxDQUFDSSxPQUFPLENBQUNDLEtBQUssR0FBR2hCLENBQUM7SUFDeEJXLE1BQU0sQ0FBQ0YsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ2pDLElBQUlYLEtBQUssQ0FBQ2MsSUFBSSxDQUFDQyxLQUFLLENBQUNkLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDQSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxFQUFFO01BQy9DVyxNQUFNLENBQUNDLFdBQVcsR0FBRyxFQUFFO01BQ3ZCRCxNQUFNLENBQUNGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUM1QixNQUFNTyxHQUFHLEdBQUdWLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUM1Q1MsR0FBRyxDQUFDUixTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7TUFDL0JPLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDQyxlQUFlLEdBQUcsS0FBSztNQUNqQ1IsTUFBTSxDQUFDUyxXQUFXLENBQUNILEdBQUcsQ0FBQztJQUN6QixDQUFDLE1BQU0sSUFBSWxCLEtBQUssQ0FBQ2MsSUFBSSxDQUFDQyxLQUFLLENBQUNkLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDQSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssTUFBTSxFQUFFO01BQ3ZEVyxNQUFNLENBQUNDLFdBQVcsR0FBRyxFQUFFO01BQ3ZCLE1BQU1LLEdBQUcsR0FBR1YsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO01BQzVDUyxHQUFHLENBQUNSLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztNQUNsQ0MsTUFBTSxDQUFDUyxXQUFXLENBQUNILEdBQUcsQ0FBQztJQUN6QixDQUFDLE1BQU0sSUFBSWxCLEtBQUssQ0FBQ2MsSUFBSSxDQUFDQyxLQUFLLENBQUNkLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDQSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssTUFBTSxFQUFFO01BQ3ZEVyxNQUFNLENBQUNDLFdBQVcsR0FBRyxFQUFFO0lBQ3pCO0lBQ0FOLEtBQUssQ0FBQ2MsV0FBVyxDQUFDVCxNQUFNLENBQUM7RUFDM0I7RUFDQSxPQUFPTCxLQUFLO0FBQ2Q7QUFDQTtBQUNBLFNBQVNnQixTQUFTQSxDQUFBLEVBQUc7RUFDbkIsTUFBTUMsSUFBSSxHQUFHaEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzFDZSxJQUFJLENBQUNkLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztFQUMzQixLQUFLLElBQUlWLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzVCLE1BQU1XLE1BQU0sR0FBR0osUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQy9DRyxNQUFNLENBQUNJLE9BQU8sQ0FBQ0MsS0FBSyxHQUFHaEIsQ0FBQztJQUN4QlcsTUFBTSxDQUFDRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDakNhLElBQUksQ0FBQ0gsV0FBVyxDQUFDVCxNQUFNLENBQUM7RUFDMUI7RUFDQSxPQUFPWSxJQUFJO0FBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekhBLElBQUFDLFFBQUEsR0FBQUMsbUJBQUE7QUFDQSxJQUFBQyxlQUFBLEdBQUFELG1CQUFBO0FBQ0EsSUFBQUUsYUFBQSxHQUFBRixtQkFBQTtBQUtBLElBQUlHLEtBQUssR0FBRyxDQUFDO0FBQ2IsSUFBSUMsU0FBUyxHQUFHLEVBQUU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNDLFFBQVFBLENBQUNDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0VBQ3RDLElBQUlDLFNBQVMsR0FBRyxLQUFLO0VBQ3JCLE1BQU1DLE9BQU8sR0FBRyxDQUFDSCxTQUFTLEVBQUVDLFNBQVMsQ0FBQztFQUN0QyxJQUFJRyxZQUFZLEdBQUdELE9BQU8sQ0FBQyxDQUFDLENBQUM7RUFDN0IsTUFBTUUsVUFBVSxHQUFHQSxDQUFBLEtBQU07SUFDdkJELFlBQVksR0FBR0EsWUFBWSxLQUFLRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUdBLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBR0EsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUN0RSxDQUFDO0VBQ0QsTUFBTUcsU0FBUyxHQUFHQSxDQUFBLEtBQU1GLFlBQVk7RUFDcEMsTUFBTUcsVUFBVSxHQUFHQSxDQUFBLEtBQU07SUFDdkIsTUFBTUMsTUFBTSxHQUFHRixTQUFTLENBQUMsQ0FBQztJQUMxQixNQUFNRyxXQUFXLEdBQUdELE1BQU0sQ0FBQ0UsS0FBSyxDQUFDQyxXQUFXO0lBQzVDLE1BQU1DLFVBQVUsR0FBR0osTUFBTSxDQUFDRSxLQUFLLENBQUNHLFFBQVE7SUFDeEMsTUFBTUMsV0FBVyxHQUFHTixNQUFNLENBQUNFLEtBQUssQ0FBQ0ssY0FBYztJQUMvQyxNQUFNQyxjQUFjLEdBQUcsSUFBQXBELDBCQUFVLEVBQUNrRCxXQUFXLEVBQUVGLFVBQVUsRUFBRUgsV0FBVyxDQUFDO0lBQ3ZFLE1BQU1RLGdCQUFnQixHQUFHLElBQUEzQiwyQkFBVyxFQUFDd0IsV0FBVyxFQUFFRixVQUFVLEVBQUVILFdBQVcsQ0FBQztJQUMxRSxNQUFNUyxjQUFjLEdBQUdWLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDUyxTQUFTLENBQUMsQ0FBQztJQUMvQyxPQUFPO01BQ0xILGNBQWM7TUFDZEMsZ0JBQWdCO01BQ2hCQztJQUNGLENBQUM7RUFDSCxDQUFDO0VBRUQsTUFBTUUsYUFBYSxHQUFHQSxDQUFBLEtBQU07SUFDMUI7SUFDQTtJQUNBZixVQUFVLENBQUMsQ0FBQztJQUNaLE1BQU1nQixZQUFZLEdBQUdmLFNBQVMsQ0FBQyxDQUFDLENBQUNnQixJQUFJO0lBQ3JDLE1BQU1DLHVCQUF1QixHQUFHaEIsVUFBVSxDQUFDRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNZLGNBQWM7SUFDdEUsTUFBTU0sbUJBQW1CLEdBQUdqQixVQUFVLENBQUNELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ1csZ0JBQWdCO0lBQ3BFWixVQUFVLENBQUMsQ0FBQztJQUNaLE1BQU1vQixzQkFBc0IsR0FBR2xCLFVBQVUsQ0FBQ0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDVSxjQUFjO0lBQ3JFLE1BQU1VLHNCQUFzQixHQUFHbkIsVUFBVSxDQUFDRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNZLGNBQWM7SUFDckUsTUFBTVMsaUJBQWlCLEdBQUdyQixTQUFTLENBQUMsQ0FBQyxDQUFDZ0IsSUFBSTtJQUMxQyxPQUFPO01BQ0xELFlBQVk7TUFDWk0saUJBQWlCO01BQ2pCRixzQkFBc0I7TUFDdEJELG1CQUFtQjtNQUNuQkQsdUJBQXVCO01BQ3ZCRztJQUNGLENBQUM7RUFDSCxDQUFDO0VBQ0QsTUFBTUUsV0FBVyxHQUFHQSxDQUFDcEIsTUFBTSxFQUFFcUIsVUFBVSxLQUFLO0lBQzFDLElBQUkzQixTQUFTLEtBQUssSUFBSSxFQUFFO01BQ3RCO0lBQ0Y7SUFDQSxNQUFNNEIsVUFBVSxHQUFHdEIsTUFBTSxDQUFDRSxLQUFLLENBQUNxQixrQkFBa0IsQ0FBQ0MsR0FBRyxDQUFDQyxNQUFNLENBQUNKLFVBQVUsQ0FBQyxDQUFDO0lBQzFFO0lBQ0F4QixVQUFVLENBQUMsQ0FBQztJQUNaQyxTQUFTLENBQUMsQ0FBQyxDQUFDSSxLQUFLLENBQUN3QixhQUFhLENBQUNKLFVBQVUsQ0FBQztJQUMzQ0ssYUFBYSxDQUFDN0IsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxQkQsVUFBVSxDQUFDLENBQUM7SUFDWjhCLGFBQWEsQ0FBQzNCLE1BQU0sQ0FBQztJQUNyQlksYUFBYSxDQUFDLENBQUM7SUFDZjtJQUNBLElBQUl0QixTQUFTLENBQUNzQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3hCQyxXQUFXLENBQUN2QyxTQUFTLENBQUN3QyxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQzVCLE1BQU1DLEtBQUssR0FBRy9ELFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztNQUMzREQsS0FBSyxDQUFDRSxTQUFTLENBQUMsQ0FBQztNQUNqQnZDLFNBQVMsR0FBRyxJQUFJO01BQ2hCRixTQUFTLEdBQUcsSUFBSTtNQUNoQkMsU0FBUyxHQUFHLElBQUk7TUFDaEJILFNBQVMsR0FBRyxFQUFFO0lBQ2hCLENBQUMsTUFBTTtNQUNMTyxVQUFVLENBQUMsQ0FBQztJQUNkO0lBQ0E7SUFDQSxTQUFTOEIsYUFBYUEsQ0FBQzNCLE1BQU0sRUFBRTtNQUM3QixJQUFJa0MsTUFBTSxDQUFDbEMsTUFBTSxDQUFDLEtBQUttQyxTQUFTLEVBQUUsT0FBTyxLQUNwQztRQUNIN0MsU0FBUyxDQUFDOEMsSUFBSSxDQUFDRixNQUFNLENBQUNsQyxNQUFNLENBQUMsQ0FBQztNQUNoQztJQUNGO0lBQ0E7SUFDQSxTQUFTa0MsTUFBTUEsQ0FBQ2xDLE1BQU0sRUFBRTtNQUN0QjtNQUNBLE1BQU1xQyxvQkFBb0IsR0FBRzdDLFNBQVMsQ0FBQ1UsS0FBSyxDQUFDb0MsTUFBTSxDQUFDLENBQUM7TUFDckQsTUFBTUMscUJBQXFCLEdBQUc5QyxTQUFTLENBQUNTLEtBQUssQ0FBQ29DLE1BQU0sQ0FBQyxDQUFDO01BQ3RELE1BQU1FLGFBQWEsR0FBR2hELFNBQVMsQ0FBQ3NCLElBQUk7TUFDcEMsTUFBTTJCLGFBQWEsR0FBR2hELFNBQVMsQ0FBQ3FCLElBQUk7TUFDcEMsSUFBSTRCLEdBQUc7TUFDUCxJQUFJTCxvQkFBb0IsS0FBSyxLQUFLLElBQUlFLHFCQUFxQixLQUFLLEtBQUssRUFDbkUsT0FBT0csR0FBRyxDQUFDLEtBQ1IsSUFBSUwsb0JBQW9CLEtBQUssSUFBSSxJQUFJckMsTUFBTSxDQUFDYyxJQUFJLEtBQUswQixhQUFhLEVBQUU7UUFDdkVFLEdBQUcsR0FBRyxHQUFHRCxhQUFhLFNBQVM7TUFDakMsQ0FBQyxNQUFNLElBQ0xKLG9CQUFvQixLQUFLLElBQUksSUFDN0JyQyxNQUFNLENBQUNjLElBQUksS0FBSzBCLGFBQWEsRUFDN0I7UUFDQUUsR0FBRyxHQUFHLEdBQUdGLGFBQWEsT0FBTztNQUMvQixDQUFDLE1BQU0sSUFDTEQscUJBQXFCLEtBQUssSUFBSSxJQUM5QnZDLE1BQU0sQ0FBQ2MsSUFBSSxLQUFLMEIsYUFBYSxFQUM3QjtRQUNBRSxHQUFHLEdBQUcsR0FBR0YsYUFBYSxTQUFTO01BQ2pDLENBQUMsTUFBTSxJQUNMRCxxQkFBcUIsS0FBSyxJQUFJLElBQzlCdkMsTUFBTSxDQUFDYyxJQUFJLEtBQUsyQixhQUFhLEVBQzdCO1FBQ0FDLEdBQUcsR0FBRyxHQUFHRCxhQUFhLE9BQU87TUFDL0I7TUFDQSxPQUFPQyxHQUFHO0lBQ1o7RUFDRixDQUFDO0VBRUQsT0FBTztJQUNMNUMsU0FBUztJQUNUc0IsV0FBVztJQUNYUixhQUFhO0lBQ2JsQjtFQUNGLENBQUM7QUFDSDtBQUNBO0FBQ0EsU0FBU2lELGdCQUFnQkEsQ0FBQ25ELFNBQVMsRUFBRUMsU0FBUyxFQUFFbUQsVUFBVSxFQUFFbEQsU0FBUyxFQUFFO0VBQ3JFLE1BQU1tRCxJQUFJLEdBQUd0RCxRQUFRLENBQUNDLFNBQVMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLENBQUM7RUFDdEQsTUFBTW9ELElBQUksR0FBRzlFLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFDbkQsTUFBTWUsbUJBQW1CLEdBQUcvRSxRQUFRLENBQUNnRSxhQUFhLENBQUMsWUFBWSxDQUFDO0VBQ2hFLE1BQU1nQixvQkFBb0IsR0FBR2hGLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxZQUFZLENBQUM7RUFDakUsTUFBTWlCLGdCQUFnQixHQUFHakYsUUFBUSxDQUFDZ0UsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0VBQ3pFLE1BQU1rQixpQkFBaUIsR0FBR2xGLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztFQUMxRWlCLGdCQUFnQixDQUFDNUUsV0FBVyxHQUFHLEVBQUU7RUFDakM2RSxpQkFBaUIsQ0FBQzdFLFdBQVcsR0FBRyxFQUFFO0VBQ2xDO0VBQ0E7O0VBRUEsTUFBTThFLFlBQVksR0FBR0EsQ0FBQSxLQUFNO0lBQ3pCLE1BQU1DLGtCQUFrQixHQUFHNUQsU0FBUyxDQUFDc0IsSUFBSSxDQUFDdUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRCxNQUFNQyxrQkFBa0IsR0FBRzdELFNBQVMsQ0FBQ3FCLElBQUksQ0FBQ3VDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkQsSUFBSVIsSUFBSSxDQUFDbkQsU0FBUyxLQUFLLElBQUksRUFBRTtNQUMzQjtJQUNGO0lBQ0E7SUFDQSxNQUFNNkQsY0FBYyxHQUFHQSxDQUFBLEtBQU07TUFDM0IsSUFBSVYsSUFBSSxDQUFDL0MsU0FBUyxDQUFDLENBQUMsQ0FBQ2dCLElBQUksS0FBS3RCLFNBQVMsQ0FBQ3NCLElBQUksRUFBRTtRQUM1QzBDLGFBQWEsQ0FBQ1AsZ0JBQWdCLEVBQUVHLGtCQUFrQixDQUFDO1FBQ25ESSxhQUFhLENBQUNOLGlCQUFpQixFQUFFSSxrQkFBa0IsQ0FBQztNQUN0RCxDQUFDLE1BQU07UUFDTEUsYUFBYSxDQUFDUCxnQkFBZ0IsRUFBRUssa0JBQWtCLENBQUM7UUFDbkRFLGFBQWEsQ0FBQ04saUJBQWlCLEVBQUVFLGtCQUFrQixDQUFDO01BQ3REO0lBQ0YsQ0FBQztJQUNERyxjQUFjLENBQUMsQ0FBQztJQUVoQlQsSUFBSSxDQUFDekUsV0FBVyxHQUFHLEdBQUd3RSxJQUFJLENBQUMvQyxTQUFTLENBQUMsQ0FBQyxDQUFDZ0IsSUFBSSxTQUFTO0lBQ3BEaUMsbUJBQW1CLENBQUMxRSxXQUFXLEdBQUcsRUFBRTtJQUNwQzJFLG9CQUFvQixDQUFDM0UsV0FBVyxHQUFHLEVBQUU7O0lBRXJDO0lBQ0EsTUFBTW9GLGtCQUFrQixHQUFHekYsUUFBUSxDQUFDZ0UsYUFBYSxDQUFDLElBQUlvQixrQkFBa0IsRUFBRSxDQUFDO0lBQzNFLE1BQU1NLGtCQUFrQixHQUN0QkQsa0JBQWtCLENBQUNFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDO0lBQ3hELE1BQU1DLGtCQUFrQixHQUFHNUYsUUFBUSxDQUFDZ0UsYUFBYSxDQUFDLElBQUlzQixrQkFBa0IsRUFBRSxDQUFDO0lBQzNFLE1BQU1PLGtCQUFrQixHQUN0QkQsa0JBQWtCLENBQUNELGdCQUFnQixDQUFDLGlCQUFpQixDQUFDO0lBQ3hEO0lBQ0EsTUFBTUcsa0JBQWtCLEdBQUdqQixJQUFJLENBQUNqQyxhQUFhLENBQUMsQ0FBQyxDQUFDTSxzQkFBc0I7SUFDdEUsTUFBTTZDLGtCQUFrQixHQUFHbEIsSUFBSSxDQUFDakMsYUFBYSxDQUFDLENBQUMsQ0FBQ0csdUJBQXVCO0lBQ3ZFO0lBQ0EsTUFBTWlELGVBQWUsR0FBR0EsQ0FBQSxLQUFNO01BQzVCLElBQUluQixJQUFJLENBQUMvQyxTQUFTLENBQUNnQixJQUFJLEtBQUt0QixTQUFTLENBQUNzQixJQUFJLEVBQUU7UUFDMUNtRCxlQUFlLENBQUNQLGtCQUFrQixFQUFFSSxrQkFBa0IsRUFBRSxLQUFLLENBQUM7UUFDOURHLGVBQWUsQ0FBQ0osa0JBQWtCLEVBQUVFLGtCQUFrQixFQUFFLEtBQUssQ0FBQztNQUNoRSxDQUFDLE1BQU07UUFDTEUsZUFBZSxDQUFDUCxrQkFBa0IsRUFBRUksa0JBQWtCLEVBQUUsS0FBSyxDQUFDO1FBQzlERyxlQUFlLENBQUNKLGtCQUFrQixFQUFFRSxrQkFBa0IsRUFBRSxLQUFLLENBQUM7TUFDaEU7SUFDRixDQUFDO0lBQ0RDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pCO0lBQ0FqQixtQkFBbUIsQ0FBQ2xFLFdBQVcsQ0FDN0JnRSxJQUFJLENBQUNqQyxhQUFhLENBQUMsQ0FBQyxDQUFDSyxzQkFDdkIsQ0FBQztJQUNEK0Isb0JBQW9CLENBQUNuRSxXQUFXLENBQUNnRSxJQUFJLENBQUNqQyxhQUFhLENBQUMsQ0FBQyxDQUFDSSxtQkFBbUIsQ0FBQztJQUMxRSxJQUFJNEIsVUFBVSxLQUFLLEtBQUssRUFBRTtNQUN4QnNCLGNBQWMsQ0FBQyxzQkFBc0JyQixJQUFJLENBQUMvQyxTQUFTLENBQUMsQ0FBQyxDQUFDZ0IsSUFBSSxFQUFFLENBQUM7SUFDL0Q7SUFDQXFELE9BQU8sQ0FBQzNFLFNBQVMsQ0FBQ3NCLElBQUksRUFBRXJCLFNBQVMsQ0FBQ3FCLElBQUksQ0FBQztFQUN6QyxDQUFDO0VBQ0QsU0FBU3NELFlBQVlBLENBQUNDLENBQUMsRUFBRTtJQUN2QixNQUFNckUsTUFBTSxHQUFHNkMsSUFBSSxDQUFDL0MsU0FBUyxDQUFDLENBQUM7SUFDL0IrQyxJQUFJLENBQUN6QixXQUFXLENBQUNwQixNQUFNLEVBQUVxRSxDQUFDLENBQUM7SUFDM0JsQixZQUFZLENBQUMsQ0FBQztFQUNoQjtFQUVBSCxvQkFBb0IsQ0FBQ3NCLGdCQUFnQixDQUFDLE9BQU8sRUFBR0QsQ0FBQyxJQUFLO0lBQ3BELE1BQU01RixLQUFLLEdBQUc0RixDQUFDLENBQUNFLE1BQU0sQ0FBQy9GLE9BQU8sQ0FBQ0MsS0FBSztJQUNwQyxNQUFNdUIsTUFBTSxHQUFHNkMsSUFBSSxDQUFDL0MsU0FBUyxDQUFDLENBQUM7SUFDL0I7SUFDQSxJQUFJckIsS0FBSyxLQUFLMEQsU0FBUyxJQUFJa0MsQ0FBQyxDQUFDRSxNQUFNLENBQUNDLGFBQWEsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQzlESixZQUFZLENBQUMzRixLQUFLLENBQUM7SUFDbkIwRSxZQUFZLENBQUMsQ0FBQztJQUNkO0lBQ0EsSUFDRW5ELE1BQU0sQ0FBQ2MsSUFBSSxLQUFLLElBQUksSUFDcEJkLE1BQU0sQ0FBQ2MsSUFBSSxLQUFLLEtBQUssSUFDckJ1RCxDQUFDLENBQUNFLE1BQU0sQ0FBQ0MsYUFBYSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQ2pDO01BQ0EzQixJQUFJLENBQUN6QixXQUFXLENBQUNwQixNQUFNLEVBQUUsSUFBQXlFLHFCQUFZLEVBQUN6RSxNQUFNLENBQUMsQ0FBQztNQUM5Q21ELFlBQVksQ0FBQyxDQUFDO0lBQ2hCO0VBQ0YsQ0FBQyxDQUFDO0VBQ0Y7RUFDQUEsWUFBWSxDQUFDLENBQUM7QUFDaEI7QUFDQTtBQUNBLFNBQVN1QixTQUFTQSxDQUFBLEVBQUc7RUFDbkIsTUFBTUMsVUFBVSxHQUFHM0csUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ2hEMEcsVUFBVSxDQUFDQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztFQUM5QyxNQUFNQyxNQUFNLEdBQUc3RyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDNUM0RyxNQUFNLENBQUNELFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO0VBQzNDLE1BQU1FLEtBQUssR0FBRzlHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQztFQUMxQzZHLEtBQUssQ0FBQ3pHLFdBQVcsR0FBRyxZQUFZO0VBRWhDLE1BQU0wRyxTQUFTLEdBQUcvRyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDL0M4RyxTQUFTLENBQUNILFlBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDO0VBQy9DLE1BQU1JLGVBQWUsR0FBR2hILFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUN4RCtHLGVBQWUsQ0FBQzNHLFdBQVcsR0FBRyxlQUFlO0VBQzdDMkcsZUFBZSxDQUFDSixZQUFZLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDO0VBQzFESSxlQUFlLENBQUM5RyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztFQUNqRCxNQUFNOEcsY0FBYyxHQUFHakgsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ3ZEZ0gsY0FBYyxDQUFDNUcsV0FBVyxHQUFHLGVBQWU7RUFDNUM0RyxjQUFjLENBQUNMLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUM7RUFDekRLLGNBQWMsQ0FBQy9HLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGtCQUFrQixDQUFDO0VBQ2hEMEcsTUFBTSxDQUFDaEcsV0FBVyxDQUFDaUcsS0FBSyxDQUFDO0VBQ3pCQyxTQUFTLENBQUNsRyxXQUFXLENBQUNtRyxlQUFlLENBQUM7RUFDdENELFNBQVMsQ0FBQ2xHLFdBQVcsQ0FBQ29HLGNBQWMsQ0FBQztFQUNyQ04sVUFBVSxDQUFDOUYsV0FBVyxDQUFDZ0csTUFBTSxDQUFDO0VBQzlCRixVQUFVLENBQUM5RixXQUFXLENBQUNrRyxTQUFTLENBQUM7RUFDakMsT0FBT0osVUFBVTtBQUNuQjtBQUVBLFNBQVNPLGFBQWFBLENBQUEsRUFBRztFQUN2QixNQUFNQyxhQUFhLEdBQUduSCxRQUFRLENBQUNnRSxhQUFhLENBQUMsdUJBQXVCLENBQUM7RUFDckVtRCxhQUFhLENBQUN0RyxXQUFXLENBQUM2RixTQUFTLENBQUMsQ0FBQyxDQUFDO0VBQ3RDLE1BQU1VLE9BQU8sR0FBR3BILFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFDdEQsTUFBTXFELE1BQU0sR0FBR3JILFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxJQUFJLENBQUM7RUFDM0NzRCxVQUFVLENBQUMsTUFBTTtJQUNmRCxNQUFNLENBQUNuSCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDNUJpSCxPQUFPLENBQUNsSCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDakMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNQO0FBQ0E7QUFDQSxTQUFTb0gsZ0JBQWdCQSxDQUFBLEVBQUc7RUFDMUIsTUFBTUMsVUFBVSxHQUFHeEgsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ2hELE1BQU13SCxhQUFhLEdBQUd6SCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDbkR3SCxhQUFhLENBQUN2SCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztFQUM5Q3NILGFBQWEsQ0FBQzVHLFdBQVcsQ0FBQyxJQUFBRSx5QkFBUyxFQUFDLENBQUMsQ0FBQztFQUN0QyxNQUFNMkcsSUFBSSxHQUFHMUgsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzFDLE1BQU0wSCxRQUFRLEdBQUc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtFQUNBRCxJQUFJLENBQUNFLFNBQVMsR0FBR0QsUUFBUTtFQUN6QkgsVUFBVSxDQUFDM0csV0FBVyxDQUFDNEcsYUFBYSxDQUFDO0VBQ3JDRCxVQUFVLENBQUMzRyxXQUFXLENBQUM2RyxJQUFJLENBQUM7RUFDNUIsT0FBT0YsVUFBVTtBQUNuQjtBQUNBO0FBQ0EsU0FBU0ssY0FBY0EsQ0FBQ0MsT0FBTyxFQUFFO0VBQy9CQSxPQUFPLENBQUN6SCxXQUFXLEdBQUcsRUFBRTtFQUN4QnlILE9BQU8sQ0FBQ2pILFdBQVcsQ0FBQzBHLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUN6QztBQUNBO0FBQ0EsU0FBU1EsZUFBZUEsQ0FBQ0MsU0FBUyxFQUFFO0VBQ2xDLE1BQU1DLFNBQVMsR0FBR2pJLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztFQUM1RCxNQUFNa0UsT0FBTyxHQUFHbEksUUFBUSxDQUFDZ0UsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUNuRCxNQUFNbUUsY0FBYyxHQUFHbkksUUFBUSxDQUFDZ0UsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0VBQ3ZFbUUsY0FBYyxDQUFDeEgsS0FBSyxDQUFDeUgsT0FBTyxHQUFHLE1BQU07RUFDckMsSUFBSUosU0FBUyxDQUFDOUYsS0FBSyxDQUFDSyxjQUFjLENBQUNxQixNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQy9DLE1BQU15RSxhQUFhLEdBQUcsSUFBQUMsZ0NBQWtCLEVBQUNOLFNBQVMsQ0FBQztJQUNuRCxNQUFNTyxLQUFLLEdBQUdQLFNBQVMsQ0FBQzlGLEtBQUssQ0FBQ0ssY0FBYztJQUM1QyxNQUFNaUcsSUFBSSxHQUFHUixTQUFTLENBQUM5RixLQUFLLENBQUNHLFFBQVE7SUFDckMsTUFBTW9HLE1BQU0sR0FBR1QsU0FBUyxDQUFDOUYsS0FBSyxDQUFDQyxXQUFXO0lBQzFDOEYsU0FBUyxDQUFDNUgsV0FBVyxHQUFHLEVBQUU7SUFDMUI0SCxTQUFTLENBQUNwSCxXQUFXLENBQUMsSUFBQXpCLDBCQUFVLEVBQUNtSixLQUFLLEVBQUVDLElBQUksRUFBRUMsTUFBTSxDQUFDLENBQUM7SUFDdERQLE9BQU8sQ0FBQ3ZILEtBQUssQ0FBQ3lILE9BQU8sR0FBRyxPQUFPO0VBQ2pDLENBQUMsTUFBTTtJQUNMLE1BQU1NLFFBQVEsR0FBR1YsU0FBUyxDQUFDbEYsSUFBSTtJQUMvQmtGLFNBQVMsR0FBRyxJQUFJO0lBQ2hCQSxTQUFTLEdBQUcsSUFBQVcsZUFBTSxFQUFDRCxRQUFRLEVBQUVILEtBQUssQ0FBQztJQUNuQyxNQUFNRixhQUFhLEdBQUcsSUFBQUMsZ0NBQWtCLEVBQUNOLFNBQVMsQ0FBQztJQUNuRCxNQUFNWSxnQkFBZ0IsR0FBR1osU0FBUyxDQUFDOUYsS0FBSyxDQUFDSyxjQUFjO0lBQ3ZELE1BQU1pRyxJQUFJLEdBQUdSLFNBQVMsQ0FBQzlGLEtBQUssQ0FBQ0csUUFBUTtJQUNyQyxNQUFNb0csTUFBTSxHQUFHVCxTQUFTLENBQUM5RixLQUFLLENBQUNDLFdBQVc7SUFDMUM4RixTQUFTLENBQUM1SCxXQUFXLEdBQUcsRUFBRTtJQUMxQjRILFNBQVMsQ0FBQ3BILFdBQVcsQ0FBQyxJQUFBekIsMEJBQVUsRUFBQ3dKLGdCQUFnQixFQUFFSixJQUFJLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFUCxPQUFPLENBQUN2SCxLQUFLLENBQUN5SCxPQUFPLEdBQUcsT0FBTztFQUNqQztBQUNGO0FBQ0E7QUFDQSxTQUFTUyxhQUFhQSxDQUFDbkUsR0FBRyxFQUFFO0VBQzFCLE1BQU1vRSxVQUFVLEdBQUc5SSxRQUFRLENBQUNnRSxhQUFhLENBQUMsY0FBYyxDQUFDO0VBQ3pELE1BQU0yRCxRQUFRLEdBQUc7QUFDbkIsc0NBQXNDakQsR0FBRztBQUN6QztBQUNBO0FBQ0EsYUFBYTtFQUNYb0UsVUFBVSxDQUFDbEIsU0FBUyxHQUFHRCxRQUFRO0FBQ2pDO0FBQ0EsU0FBU3pCLGNBQWNBLENBQUN4QixHQUFHLEVBQUU7RUFDM0IsTUFBTW9FLFVBQVUsR0FBRzlJLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFDekQsSUFBSTNDLEtBQUssR0FBRyxDQUFDLEVBQUU7SUFDYkEsS0FBSyxHQUFHLENBQUM7RUFDWDtFQUNBd0gsYUFBYSxDQUFDbkUsR0FBRyxDQUFDO0VBQ2xCcUUsU0FBUyxDQUFDLENBQUM7QUFDYjtBQUNBLFNBQVNDLGlCQUFpQkEsQ0FBQSxFQUFHO0VBQzNCLE1BQU1GLFVBQVUsR0FBRzlJLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFDekRoRSxRQUFRLENBQUNnRSxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQzNELFdBQVcsR0FBR2dCLEtBQUs7RUFDL0QsSUFBSUEsS0FBSyxLQUFLLENBQUMsRUFBRTtJQUNmeUgsVUFBVSxDQUFDekksV0FBVyxHQUFHLEVBQUU7SUFDM0J5SSxVQUFVLENBQUNuSSxLQUFLLENBQUN5SCxPQUFPLEdBQUcsTUFBTTtFQUNuQyxDQUFDLE1BQU07SUFDTFUsVUFBVSxDQUFDbkksS0FBSyxDQUFDeUgsT0FBTyxHQUFHLE1BQU07RUFDbkM7QUFDRjtBQUVBLFNBQVNXLFNBQVNBLENBQUEsRUFBRztFQUNuQixJQUFJMUgsS0FBSyxJQUFJLENBQUMsRUFBRTtJQUNkMkgsaUJBQWlCLENBQUMsQ0FBQztJQUNuQjNILEtBQUssRUFBRTtJQUNQaUcsVUFBVSxDQUFDeUIsU0FBUyxFQUFFLElBQUksQ0FBQztFQUM3QjtBQUNGO0FBQ0E7QUFDQSxTQUFTdkQsYUFBYUEsQ0FBQ3lELEdBQUcsRUFBRWpILE1BQU0sRUFBRTtFQUNsQyxNQUFNa0gsVUFBVSxHQUFHO0FBQ3JCLDZCQUE2QmxILE1BQU07QUFDbkMsbUNBQW1DQSxNQUFNO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztFQUNMaUgsR0FBRyxDQUFDckIsU0FBUyxHQUFHc0IsVUFBVTtBQUM1QjtBQUNBOztBQUVBLFNBQVNqRCxlQUFlQSxDQUFDa0QsUUFBUSxFQUFFQyxhQUFhLEVBQUVDLEtBQUssRUFBRTtFQUN2RCxJQUFJRCxhQUFhLENBQUN4RixNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ2hDdUYsUUFBUSxDQUFDRyxPQUFPLENBQUVDLElBQUksSUFBSztJQUN6QkgsYUFBYSxDQUFDRSxPQUFPLENBQUVFLFFBQVEsSUFBSztNQUNsQyxJQUFJRCxJQUFJLENBQUMvSSxPQUFPLENBQUNzQyxJQUFJLEtBQUswRyxRQUFRLEVBQUU7UUFDbENELElBQUksQ0FBQzVJLEtBQUssQ0FBQ0MsZUFBZSxHQUFHLEdBQUd5SSxLQUFLLEVBQUU7TUFDekM7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSjtBQUNBLFNBQVN4RixXQUFXQSxDQUFDYSxHQUFHLEVBQUU7RUFDeEIsTUFBTStFLFNBQVMsR0FBR3pKLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDekQsTUFBTTBGLE1BQU0sR0FBRzFKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUM1QyxNQUFNMEgsUUFBUSxHQUFHO0FBQ25CO0FBQ0EsNENBQTRDakQsR0FBRztBQUMvQztBQUNBO0FBQ0EsVUFBVTtFQUNSK0UsU0FBUyxDQUFDcEosV0FBVyxHQUFHLEVBQUU7RUFDMUJxSixNQUFNLENBQUM5QixTQUFTLEdBQUdELFFBQVE7RUFDM0I4QixTQUFTLENBQUM1SSxXQUFXLENBQUM2SSxNQUFNLENBQUM7QUFDL0I7O0FBRUE7QUFDQSxTQUFTQyxZQUFZQSxDQUFDVixHQUFHLEVBQUU7RUFDekIsTUFBTXRCLFFBQVEsR0FBRztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7RUFDTnNCLEdBQUcsQ0FBQ3JCLFNBQVMsR0FBR0QsUUFBUTtBQUMxQjs7QUFFQTtBQUNBLFNBQVN4QixPQUFPQSxDQUFDM0IsYUFBYSxFQUFFQyxhQUFhLEVBQUU7RUFDN0MsTUFBTW1GLGFBQWEsR0FBRzVKLFFBQVEsQ0FBQzJGLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDO0VBQ25FLE1BQU1iLElBQUksR0FBRzlFLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFDbkQsTUFBTTZGLFFBQVEsR0FBRyxDQUFDLEdBQUdELGFBQWEsQ0FBQztFQUNuQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDbEosS0FBSyxDQUFDMEksS0FBSyxHQUFHLFNBQVM7RUFDbkNRLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ2xKLEtBQUssQ0FBQzBJLEtBQUssR0FBRyxTQUFTO0VBQ25DLElBQUk3RSxhQUFhLEtBQUssS0FBSyxFQUFFO0lBQzNCcUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDeEosV0FBVyxHQUFHLEdBQUdtRSxhQUFhLFVBQVU7SUFDcERxRixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUN4SixXQUFXLEdBQUcsR0FBR29FLGFBQWEsVUFBVTtFQUN0RCxDQUFDLE1BQU0sSUFBSUQsYUFBYSxLQUFLLEtBQUssRUFBRTtJQUNsQ3FGLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ3hKLFdBQVcsR0FBRyxHQUFHbUUsYUFBYSxXQUFXO0lBQ3JEcUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDeEosV0FBVyxHQUFHLEdBQUdvRSxhQUFhLFVBQVU7SUFDcERLLElBQUksQ0FBQ3pFLFdBQVcsR0FBRyxhQUFhO0VBQ2xDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzliQSxJQUFBWSxRQUFBLEdBQUFDLG1CQUFBO0FBQ0EsU0FBUzRJLFVBQVVBLENBQUM5SCxNQUFNLEVBQUUrSCxVQUFVLEVBQUVSLElBQUksRUFBRTtFQUM1QztFQUNBO0VBQ0EsTUFBTVMsZ0JBQWdCLEdBQUdoSSxNQUFNLENBQUNFLEtBQUssQ0FBQ0ssY0FBYztFQUNwRCxNQUFNMEgsY0FBYyxHQUFHRixVQUFVLENBQUNHLEtBQUssQ0FBQyxDQUFDLEVBQUVILFVBQVUsQ0FBQ25HLE1BQU0sR0FBRzJGLElBQUksQ0FBQzNGLE1BQU0sQ0FBQztFQUMzRXFHLGNBQWMsQ0FBQ1gsT0FBTyxDQUFFYSxJQUFJLElBQUs7SUFDL0JILGdCQUFnQixDQUFDVixPQUFPLENBQUVoRyxVQUFVLElBQUs7TUFDdkMsSUFBSUEsVUFBVSxDQUFDOEcsUUFBUSxDQUFDLENBQUMsS0FBS0QsSUFBSSxDQUFDQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1FBQzdDO1FBQ0FKLGdCQUFnQixDQUFDSyxNQUFNLENBQUNMLGdCQUFnQixDQUFDTSxPQUFPLENBQUNoSCxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEV5RyxVQUFVLENBQUNNLE1BQU0sQ0FBQ04sVUFBVSxDQUFDTyxPQUFPLENBQUNILElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUNoRDtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBQ0EsU0FBU0kseUJBQXlCQSxDQUFDdkksTUFBTSxFQUFFdkIsS0FBSyxFQUFFOEksSUFBSSxFQUFFO0VBQ3RELE1BQU1pQixXQUFXLEdBQUd4SSxNQUFNLENBQUNFLEtBQUssQ0FBQ3FCLGtCQUFrQjtFQUNuRCxNQUFNa0gsWUFBWSxHQUFHRCxXQUFXLENBQUNoSCxHQUFHLENBQUNDLE1BQU0sQ0FBQ2hELEtBQUssQ0FBQyxDQUFDO0VBQ25ELE1BQU1pSyxTQUFTLEdBQUcxSSxNQUFNLENBQUNFLEtBQUssQ0FBQ3lJLGFBQWEsQ0FBQ0YsWUFBWSxFQUFFbEIsSUFBSSxDQUFDO0VBQ2hFLE1BQU1xQixVQUFVLEdBQUdyQixJQUFJLENBQUNzQixTQUFTO0VBQ2pDLElBQUl0QixJQUFJLENBQUNzQixTQUFTLENBQUNqSCxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQy9CO0lBQ0EsSUFBSThHLFNBQVMsS0FBSyxJQUFJLEVBQUU7TUFDdEIxSSxNQUFNLENBQUNFLEtBQUssQ0FBQzRJLFdBQVcsQ0FBQ3ZCLElBQUksQ0FBQztJQUNoQztFQUNGLENBQUMsTUFBTTtJQUNMTyxVQUFVLENBQUM5SCxNQUFNLEVBQUU0SSxVQUFVLEVBQUVyQixJQUFJLENBQUM7RUFDdEM7QUFDRjtBQUNBLFNBQVN3Qix1QkFBdUJBLENBQUMvSSxNQUFNLEVBQUV2QixLQUFLLEVBQUU4SSxJQUFJLEVBQUU7RUFDcEQsTUFBTWlCLFdBQVcsR0FBR3hJLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDcUIsa0JBQWtCO0VBQ25ELE1BQU1rSCxZQUFZLEdBQUdELFdBQVcsQ0FBQ2hILEdBQUcsQ0FBQ0MsTUFBTSxDQUFDaEQsS0FBSyxDQUFDLENBQUM7RUFDbkQsTUFBTW1LLFVBQVUsR0FBR3JCLElBQUksQ0FBQ3NCLFNBQVM7RUFDakMsSUFBSXRCLElBQUksQ0FBQ3NCLFNBQVMsQ0FBQ2pILE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDL0I1QixNQUFNLENBQUNFLEtBQUssQ0FBQzhJLGVBQWUsQ0FBQ1AsWUFBWSxFQUFFbEIsSUFBSSxDQUFDO0VBQ2xELENBQUMsTUFBTTtJQUNMTyxVQUFVLENBQUM5SCxNQUFNLEVBQUU0SSxVQUFVLEVBQUVyQixJQUFJLENBQUM7RUFDdEM7QUFDRjtBQUVBLFNBQVN4SSxTQUFTQSxDQUFBLEVBQUc7RUFDbkIsTUFBTUMsSUFBSSxHQUFHaEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzFDZSxJQUFJLENBQUNkLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztFQUMzQixLQUFLLElBQUlWLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzVCLE1BQU1XLE1BQU0sR0FBR0osUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQy9DRyxNQUFNLENBQUNJLE9BQU8sQ0FBQ0MsS0FBSyxHQUFHaEIsQ0FBQztJQUN4QlcsTUFBTSxDQUFDRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDakNhLElBQUksQ0FBQ0gsV0FBVyxDQUFDVCxNQUFNLENBQUM7RUFDMUI7RUFDQSxPQUFPWSxJQUFJO0FBQ2I7QUFFQSxTQUFTaUssU0FBU0EsQ0FBQzVFLENBQUMsRUFBRTtFQUNwQkEsQ0FBQyxDQUFDNkUsY0FBYyxDQUFDLENBQUM7QUFDcEI7QUFDQSxTQUFTQyxJQUFJQSxDQUFDOUUsQ0FBQyxFQUFFO0VBQ2ZBLENBQUMsQ0FBQytFLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sRUFBRWhGLENBQUMsQ0FBQ0UsTUFBTSxDQUFDK0UsRUFBRSxDQUFDO0FBQzdDO0FBQ0EsU0FBU0MsSUFBSUEsQ0FBQ2xGLENBQUMsRUFBRTJCLFNBQVMsRUFBRTtFQUMxQixNQUFNTyxLQUFLLEdBQUdQLFNBQVMsQ0FBQzlGLEtBQUssQ0FBQzZILFVBQVU7RUFDeEMsTUFBTXRKLEtBQUssR0FBRzRGLENBQUMsQ0FBQ0UsTUFBTSxDQUFDL0YsT0FBTyxDQUFDQyxLQUFLO0VBQ3BDO0VBQ0EsSUFBSUEsS0FBSyxJQUFJMEQsU0FBUyxFQUFFO0lBQ3RCO0VBQ0YsQ0FBQyxNQUFNO0lBQ0xrQyxDQUFDLENBQUM2RSxjQUFjLENBQUMsQ0FBQztJQUNsQixNQUFNTSxJQUFJLEdBQUduRixDQUFDLENBQUMrRSxZQUFZLENBQUNLLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDM0MsTUFBTUMsT0FBTyxHQUFHMUwsUUFBUSxDQUFDMkwsY0FBYyxDQUFDSCxJQUFJLENBQUM7SUFDN0MsTUFBTUksYUFBYSxHQUFHQyxxQkFBcUIsQ0FBQ0gsT0FBTyxFQUFFRixJQUFJLENBQUM7SUFDMUQsTUFBTU0sU0FBUyxHQUFHQyxnQkFBZ0IsQ0FBQ3hELEtBQUssRUFBRWlELElBQUksQ0FBQztJQUMvQ25GLENBQUMsQ0FBQ0UsTUFBTSxDQUFDMUYsV0FBVyxDQUFDNkssT0FBTyxDQUFDO0lBQzdCLElBQUlFLGFBQWEsS0FBSyxZQUFZLEVBQUU7TUFDbENyQix5QkFBeUIsQ0FBQ3ZDLFNBQVMsRUFBRXZILEtBQUssRUFBRThILEtBQUssQ0FBQ3VELFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUMsTUFBTSxJQUFJRixhQUFhLEtBQUssVUFBVSxFQUFFO01BQ3ZDYix1QkFBdUIsQ0FBQy9DLFNBQVMsRUFBRXZILEtBQUssRUFBRThILEtBQUssQ0FBQ3VELFNBQVMsQ0FBQyxDQUFDO0lBQzdEO0VBQ0Y7QUFDRjs7QUFFQTtBQUNBLFNBQVNELHFCQUFxQkEsQ0FBQy9ELE9BQU8sRUFBRWhGLElBQUksRUFBRTtFQUM1QyxNQUFNa0osUUFBUSxHQUFHbEosSUFBSTtFQUNyQixNQUFNbUosWUFBWSxHQUFHbkUsT0FBTyxDQUFDb0UsU0FBUyxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ2pELE1BQU1DLGNBQWMsR0FBR0gsWUFBWSxDQUFDQSxZQUFZLENBQUNySSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUN1SSxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ3ZFLE1BQU1QLGFBQWEsR0FBR1EsY0FBYyxDQUFDLENBQUMsQ0FBQztFQUN2QyxPQUFPUixhQUFhO0FBQ3RCO0FBQ0E7QUFDQSxTQUFTUyxJQUFJQSxDQUFDaEcsQ0FBQyxFQUFFMkIsU0FBUyxFQUFFO0VBQzFCLE1BQU1PLEtBQUssR0FBR1AsU0FBUyxDQUFDOUYsS0FBSyxDQUFDNkgsVUFBVTtFQUN4QyxNQUFNUixJQUFJLEdBQUdsRCxDQUFDLENBQUNFLE1BQU07RUFDckIsTUFBTXlGLFFBQVEsR0FBRzNGLENBQUMsQ0FBQ0UsTUFBTSxDQUFDK0UsRUFBRTtFQUM1QixNQUFNTSxhQUFhLEdBQUdDLHFCQUFxQixDQUFDdEMsSUFBSSxFQUFFeUMsUUFBUSxDQUFDO0VBQzNELE1BQU12TCxLQUFLLEdBQUdzTCxnQkFBZ0IsQ0FBQ3hELEtBQUssRUFBRXlELFFBQVEsQ0FBQztFQUUvQyxJQUFJSixhQUFhLEtBQUssWUFBWSxFQUFFO0lBQ2xDLE1BQU1VLE1BQU0sR0FBR0MsZ0JBQWdCLENBQUNoRSxLQUFLLEVBQUU5SCxLQUFLLEVBQUUsVUFBVSxFQUFFdUgsU0FBUyxDQUFDO0lBQ3BFLElBQUlzRSxNQUFNLEtBQUssSUFBSSxFQUFFO01BQ25CL0MsSUFBSSxDQUFDckosU0FBUyxDQUFDc00sTUFBTSxDQUFDLEdBQUdSLFFBQVEsYUFBYSxDQUFDO01BQy9DekMsSUFBSSxDQUFDckosU0FBUyxDQUFDQyxHQUFHLENBQUMsR0FBRzZMLFFBQVEsV0FBVyxDQUFDO0lBQzVDO0VBQ0YsQ0FBQyxNQUFNLElBQUlKLGFBQWEsS0FBSyxVQUFVLEVBQUU7SUFDdkMsTUFBTVUsTUFBTSxHQUFHQyxnQkFBZ0IsQ0FBQ2hFLEtBQUssRUFBRTlILEtBQUssRUFBRSxZQUFZLEVBQUV1SCxTQUFTLENBQUM7SUFDdEUsSUFBSXNFLE1BQU0sS0FBSyxJQUFJLEVBQUU7TUFDbkIvQyxJQUFJLENBQUNySixTQUFTLENBQUNzTSxNQUFNLENBQUMsR0FBR1IsUUFBUSxXQUFXLENBQUM7TUFDN0N6QyxJQUFJLENBQUNySixTQUFTLENBQUNDLEdBQUcsQ0FBQyxHQUFHNkwsUUFBUSxhQUFhLENBQUM7SUFDOUM7RUFDRjs7RUFFQTtFQUNBO0VBQ0EsU0FBU08sZ0JBQWdCQSxDQUFDaEUsS0FBSyxFQUFFOUgsS0FBSyxFQUFFZ00sU0FBUyxFQUFFekssTUFBTSxFQUFFO0lBQ3pELE1BQU0wSyxlQUFlLEdBQUduRSxLQUFLLENBQUM5SCxLQUFLLENBQUMsQ0FBQ29LLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakQsTUFBTThCLFFBQVEsR0FBRyxJQUFBQyxhQUFJLEVBQUNyRSxLQUFLLENBQUM5SCxLQUFLLENBQUMsQ0FBQ3VMLFFBQVEsRUFBRXpELEtBQUssQ0FBQzlILEtBQUssQ0FBQyxDQUFDbUQsTUFBTSxDQUFDO0lBQ2pFLE1BQU1pSixTQUFTLEdBQUcsRUFBRTtJQUNwQkEsU0FBUyxDQUFDekksSUFBSSxDQUFDdUksUUFBUSxDQUFDO0lBQ3hCLE1BQU1HLFNBQVMsR0FBRyxJQUFBQyxrQkFBUyxFQUFDSixRQUFRLENBQUM7SUFDckMsSUFBSUYsU0FBUyxLQUFLLFlBQVksRUFBRTtNQUM5QkssU0FBUyxDQUFDbkMsYUFBYSxDQUFDK0IsZUFBZSxFQUFFQyxRQUFRLENBQUM7SUFDcEQsQ0FBQyxNQUFNLElBQUlGLFNBQVMsS0FBSyxVQUFVLEVBQUU7TUFDbkNLLFNBQVMsQ0FBQzlCLGVBQWUsQ0FBQzBCLGVBQWUsRUFBRUMsUUFBUSxDQUFDO0lBQ3REO0lBQ0E7SUFDQSxNQUFNTCxNQUFNLEdBQUdVLGdCQUFnQixDQUM3QkwsUUFBUSxDQUFDOUIsU0FBUyxDQUFDWCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzNCbEksTUFBTSxDQUFDRSxLQUFLLENBQUNLLGNBQ2YsQ0FBQztJQUNELElBQUkrSixNQUFNLEtBQUssSUFBSSxFQUFFO01BQ25CO01BQ0EsTUFBTVcsV0FBVyxHQUFHTixRQUFRLENBQUM5QixTQUFTO01BQ3RDcUMsZ0JBQWdCLENBQUMzRSxLQUFLLENBQUM5SCxLQUFLLENBQUMsQ0FBQ29LLFNBQVMsRUFBRTdJLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDSyxjQUFjLENBQUM7TUFDckVnRyxLQUFLLENBQUM5SCxLQUFLLENBQUMsQ0FBQ29LLFNBQVMsR0FBRyxFQUFFO01BQzNCdEMsS0FBSyxDQUFDOUgsS0FBSyxDQUFDLENBQUNvSyxTQUFTLEdBQUdvQyxXQUFXO01BQ3BDQSxXQUFXLENBQUMzRCxPQUFPLENBQUVoRyxVQUFVLElBQUs7UUFDbEN0QixNQUFNLENBQUNFLEtBQUssQ0FBQ0ssY0FBYyxDQUFDNkIsSUFBSSxDQUFDZCxVQUFVLENBQUM7TUFDOUMsQ0FBQyxDQUFDO0lBQ0o7SUFDQSxPQUFPZ0osTUFBTTtFQUNmO0FBQ0Y7QUFDQTtBQUNBLFNBQVNQLGdCQUFnQkEsQ0FBQ29CLEtBQUssRUFBRW5CLFFBQVEsRUFBRTtFQUN6QyxJQUFJdkwsS0FBSyxHQUFHLElBQUk7RUFDaEIwTSxLQUFLLENBQUM3RCxPQUFPLENBQUVDLElBQUksSUFBSztJQUN0QixJQUFLQSxJQUFJLENBQUN5QyxRQUFRLENBQUM1QixRQUFRLENBQUMsQ0FBQyxLQUFLNEIsUUFBUSxDQUFDNUIsUUFBUSxDQUFDLENBQUMsS0FBTSxJQUFJLEVBQUU7TUFDL0QzSixLQUFLLEdBQUcwTSxLQUFLLENBQUM3QyxPQUFPLENBQUNmLElBQUksQ0FBQztNQUMzQixPQUFPOUksS0FBSztJQUNkO0VBQ0YsQ0FBQyxDQUFDO0VBQ0YsT0FBT0EsS0FBSztBQUNkO0FBQ0E7QUFDQSxTQUFTeU0sZ0JBQWdCQSxDQUFDRSxZQUFZLEVBQUVDLGNBQWMsRUFBRTtFQUN0REQsWUFBWSxDQUFDOUQsT0FBTyxDQUFFZ0UsUUFBUSxJQUFLO0lBQ2pDRCxjQUFjLENBQUMvRCxPQUFPLENBQUVoRyxVQUFVLElBQUs7TUFDckMsSUFBSUEsVUFBVSxDQUFDOEcsUUFBUSxDQUFDLENBQUMsS0FBS2tELFFBQVEsQ0FBQ2xELFFBQVEsQ0FBQyxDQUFDLEVBQUU7UUFDakRpRCxjQUFjLENBQUNoRCxNQUFNLENBQUNnRCxjQUFjLENBQUMvQyxPQUFPLENBQUNoSCxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDOUQ7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSjtBQUNBO0FBQ0EsU0FBUzBKLGdCQUFnQkEsQ0FBQ0ksWUFBWSxFQUFFQyxjQUFjLEVBQUU7RUFDdEQsSUFBSWYsTUFBTSxHQUFHLElBQUk7RUFDakJjLFlBQVksQ0FBQzlELE9BQU8sQ0FBRWEsSUFBSSxJQUFLO0lBQzdCa0QsY0FBYyxDQUFDL0QsT0FBTyxDQUFFaEcsVUFBVSxJQUFLO01BQ3JDLElBQUk2RyxJQUFJLENBQUNDLFFBQVEsQ0FBQyxDQUFDLEtBQUs5RyxVQUFVLENBQUM4RyxRQUFRLENBQUMsQ0FBQyxFQUFFO1FBQzdDa0MsTUFBTSxHQUFHLEtBQUs7UUFDZCxPQUFPQSxNQUFNO01BQ2Y7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFDRixPQUFPQSxNQUFNO0FBQ2Y7QUFDQTtBQUNBLFNBQVNpQixTQUFTQSxDQUFDaEYsS0FBSyxFQUFFO0VBQ3hCLE1BQU1pRixTQUFTLEdBQUd4TixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDL0N1TixTQUFTLENBQUM1RyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztFQUM3QzRHLFNBQVMsQ0FBQzdNLEtBQUssQ0FBQ3lILE9BQU8sR0FBRyxNQUFNO0VBQ2hDRyxLQUFLLENBQUNlLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3RCLE1BQU1rRSxHQUFHLEdBQUd6TixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDekN3TixHQUFHLENBQUM3RyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcyQyxJQUFJLENBQUN5QyxRQUFRLEVBQUUsQ0FBQztJQUMxQ3lCLEdBQUcsQ0FBQ2pOLE9BQU8sQ0FBQ29ELE1BQU0sR0FBRyxHQUFHMkYsSUFBSSxDQUFDM0YsTUFBTSxFQUFFO0lBQ3JDNkosR0FBRyxDQUFDdk4sU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3pCc04sR0FBRyxDQUFDdk4sU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQzlCc04sR0FBRyxDQUFDdk4sU0FBUyxDQUFDQyxHQUFHLENBQUMsR0FBR29KLElBQUksQ0FBQ3lDLFFBQVEsYUFBYSxDQUFDO0lBQ2hEeUIsR0FBRyxDQUFDN0csWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7SUFDckM0RyxTQUFTLENBQUMzTSxXQUFXLENBQUM0TSxHQUFHLENBQUM7RUFDNUIsQ0FBQyxDQUFDO0VBQ0YsT0FBT0QsU0FBUztBQUNsQjtBQUVBLFNBQVNFLFNBQVNBLENBQUMxRixTQUFTLEVBQUVPLEtBQUssRUFBRTtFQUNuQyxNQUFNTixTQUFTLEdBQUdqSSxRQUFRLENBQUNnRSxhQUFhLENBQUMsa0JBQWtCLENBQUM7RUFDNUQsTUFBTW1FLGNBQWMsR0FBR25JLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztFQUN2RSxNQUFNa0UsT0FBTyxHQUFHbEksUUFBUSxDQUFDZ0UsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUNuRGtFLE9BQU8sQ0FBQ3ZILEtBQUssQ0FBQ3lILE9BQU8sR0FBRyxNQUFNO0VBQzlCSCxTQUFTLENBQUM1SCxXQUFXLEdBQUcsRUFBRTtFQUMxQjRILFNBQVMsQ0FBQ3BILFdBQVcsQ0FBQ0UsU0FBUyxDQUFDLENBQUMsQ0FBQztFQUNsQ29ILGNBQWMsQ0FBQ3hILEtBQUssQ0FBQ3lILE9BQU8sR0FBRyxNQUFNO0VBQ3JDRCxjQUFjLENBQUM5SCxXQUFXLEdBQUcsRUFBRTtFQUMvQjhILGNBQWMsQ0FBQ3RILFdBQVcsQ0FBQzBNLFNBQVMsQ0FBQ2hGLEtBQUssQ0FBQyxDQUFDO0VBQzVDSixjQUFjLENBQUN4SCxLQUFLLENBQUN5SCxPQUFPLEdBQUcsTUFBTTtFQUNyQyxNQUFNZSxRQUFRLEdBQUduSixRQUFRLENBQUMyRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7RUFDbkQsTUFBTWdJLE9BQU8sR0FBRzNOLFFBQVEsQ0FBQzJGLGdCQUFnQixDQUFDLFlBQVksQ0FBQztFQUN2RHdELFFBQVEsQ0FBQ0csT0FBTyxDQUFFQyxJQUFJLElBQUs7SUFDekJBLElBQUksQ0FBQ2pELGdCQUFnQixDQUFDLFdBQVcsRUFBR0QsQ0FBQyxJQUFLO01BQ3hDOEUsSUFBSSxDQUFDOUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDO0lBQ0ZrRCxJQUFJLENBQUNqRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdELENBQUMsSUFBSztNQUNwQ2dHLElBQUksQ0FBQ2hHLENBQUMsRUFBRTJCLFNBQVMsQ0FBQztJQUNwQixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFDRjtFQUNBMkYsT0FBTyxDQUFDckUsT0FBTyxDQUFFc0UsTUFBTSxJQUFLO0lBQzFCQSxNQUFNLENBQUN0SCxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUdELENBQUMsSUFBSztNQUN6QzRFLFNBQVMsQ0FBQzVFLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQztJQUNGdUgsTUFBTSxDQUFDdEgsZ0JBQWdCLENBQUMsTUFBTSxFQUFHRCxDQUFDLElBQUs7TUFDckNrRixJQUFJLENBQUNsRixDQUFDLEVBQUUyQixTQUFTLENBQUM7TUFDbEIsTUFBTTZGLFdBQVcsR0FBRzdGLFNBQVMsQ0FBQzlGLEtBQUssQ0FBQzZILFVBQVUsQ0FBQytELE1BQU0sQ0FBQyxDQUFDQyxLQUFLLEVBQUV4RSxJQUFJLEtBQUs7UUFDckUsT0FBUXdFLEtBQUssSUFBSXhFLElBQUksQ0FBQzNGLE1BQU07TUFDOUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUNMO01BQ0EsSUFBSW9FLFNBQVMsQ0FBQzlGLEtBQUssQ0FBQ0ssY0FBYyxDQUFDcUIsTUFBTSxLQUFLaUssV0FBVyxFQUFFO1FBQ3pEM0YsT0FBTyxDQUFDdkgsS0FBSyxDQUFDeUgsT0FBTyxHQUFHLE9BQU87TUFDakM7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSjtBQUNBLFNBQVNFLGtCQUFrQkEsQ0FBQ3RHLE1BQU0sRUFBRTtFQUNsQ0EsTUFBTSxDQUFDRSxLQUFLLENBQUM2SCxVQUFVLENBQUNULE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3hDdkgsTUFBTSxDQUFDRSxLQUFLLENBQUM0SSxXQUFXLENBQUN2QixJQUFJLENBQUM7RUFDaEMsQ0FBQyxDQUFDO0VBQ0YsT0FBT3ZILE1BQU07QUFDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1T0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM0SyxJQUFJQSxDQUFDWixRQUFRLEVBQUVwSSxNQUFNLEVBQUU7RUFDOUIsTUFBTTRFLElBQUksR0FBRyxDQUFDO0VBQ2QsU0FBU2xKLEdBQUdBLENBQUEsRUFBRztJQUNiLElBQUksQ0FBQ2tKLElBQUksRUFBRTtFQUNiO0VBQ0EsU0FBU2xFLE1BQU1BLENBQUEsRUFBRztJQUNoQixPQUFPVixNQUFNLElBQUksSUFBSSxDQUFDNEUsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0VBQzNDO0VBRUEsT0FBTztJQUNMd0QsUUFBUTtJQUNScEksTUFBTTtJQUNONEUsSUFBSTtJQUNKcUMsU0FBUyxFQUFFLEVBQUU7SUFDYnZMLEdBQUc7SUFDSGdGO0VBQ0YsQ0FBQztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVN5SSxTQUFTQSxDQUFDaEQsVUFBVSxFQUFFO0VBQzdCLE1BQU14SCxjQUFjLEdBQUcsRUFBRTtFQUN6QixNQUFNTCxLQUFLLEdBQUc4TCxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNqQyxNQUFNekssa0JBQWtCLEdBQUdyQixLQUFLLENBQUMrTCxjQUFjO0VBQy9DLE1BQU1DLGNBQWMsR0FBR2hNLEtBQUssQ0FBQ2lNLGlCQUFpQjtFQUM5QyxNQUFNaE0sV0FBVyxHQUFHLEVBQUU7RUFDdEIsTUFBTUUsUUFBUSxHQUFHLEVBQUU7RUFFbkIsU0FBUzJMLFdBQVdBLENBQUNJLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzdCLE1BQU1uTSxLQUFLLEdBQUcsRUFBRTtJQUNoQixNQUFNK0wsY0FBYyxHQUFHLElBQUlLLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLE1BQU1ILGlCQUFpQixHQUFHLElBQUlHLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLElBQUlDLENBQUMsR0FBRyxDQUFDO0lBQ1QsS0FBSyxJQUFJOU8sQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHMk8sR0FBRyxFQUFFM08sQ0FBQyxFQUFFLEVBQUU7TUFDNUJ5QyxLQUFLLENBQUN6QyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ2Y7SUFDQSxLQUFLLElBQUlJLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3VPLEdBQUcsRUFBRXZPLENBQUMsRUFBRSxFQUFFO01BQzVCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHdU8sR0FBRyxFQUFFdk8sQ0FBQyxFQUFFLEVBQUU7UUFDNUJvQyxLQUFLLENBQUNyQyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQ0QsQ0FBQyxFQUFFQyxDQUFDLENBQUM7UUFDcEJtTyxjQUFjLENBQUNPLEdBQUcsQ0FBQ0QsQ0FBQyxFQUFFLENBQUMxTyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDO1FBQzdCcU8saUJBQWlCLENBQUNLLEdBQUcsQ0FBQyxDQUFDM08sQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQ3NLLFFBQVEsQ0FBQyxDQUFDLEVBQUVtRSxDQUFDLENBQUM7UUFDM0NBLENBQUMsRUFBRTtNQUNMO0lBQ0Y7SUFDQSxPQUFPO01BQUVyTSxLQUFLO01BQUUrTCxjQUFjO01BQUVFO0lBQWtCLENBQUM7RUFDckQ7RUFFQSxTQUFTTSxRQUFRQSxDQUFDbkwsVUFBVSxFQUFFb0wsVUFBVSxFQUFFO0lBQ3hDLE1BQU1DLFVBQVUsR0FBRyxFQUFFO0lBQ3JCLE1BQU1DLFFBQVEsR0FBRyxFQUFFO0lBQ25CLE1BQU0vTyxDQUFDLEdBQUd5RCxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU14RCxDQUFDLEdBQUd3RCxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCO0lBQ0EsSUFBSXpELENBQUMsR0FBRzZPLFVBQVUsR0FBRyxFQUFFLElBQUk1TyxDQUFDLEdBQUc0TyxVQUFVLEdBQUcsRUFBRSxFQUFFO01BQzlDLEtBQUssSUFBSWpQLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2lQLFVBQVUsRUFBRWpQLENBQUMsRUFBRSxFQUFFO1FBQ25Da1AsVUFBVSxDQUFDdkssSUFBSSxDQUFDLENBQUN2RSxDQUFDLEdBQUdKLENBQUMsRUFBRUssQ0FBQyxDQUFDLENBQUM7UUFDM0I4TyxRQUFRLENBQUN4SyxJQUFJLENBQUMsQ0FBQ3ZFLENBQUMsRUFBRUMsQ0FBQyxHQUFHTCxDQUFDLENBQUMsQ0FBQztNQUMzQjtJQUNGLENBQUMsTUFBTSxJQUFJSSxDQUFDLEdBQUc2TyxVQUFVLElBQUksRUFBRSxJQUFJNU8sQ0FBQyxHQUFHNE8sVUFBVSxJQUFJLEVBQUUsRUFBRTtNQUN2RCxLQUFLLElBQUlqUCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdpUCxVQUFVLEVBQUVqUCxDQUFDLEVBQUUsRUFBRTtRQUNuQ2tQLFVBQVUsQ0FBQ3ZLLElBQUksQ0FBQyxDQUFDdkUsQ0FBQyxHQUFHSixDQUFDLEVBQUVLLENBQUMsQ0FBQyxDQUFDO1FBQzNCOE8sUUFBUSxDQUFDeEssSUFBSSxDQUFDLENBQUN2RSxDQUFDLEVBQUVDLENBQUMsR0FBR0wsQ0FBQyxDQUFDLENBQUM7TUFDM0I7SUFDRixDQUFDLE1BQU0sSUFBSUksQ0FBQyxHQUFHNk8sVUFBVSxJQUFJLEVBQUUsSUFBSTVPLENBQUMsR0FBRzRPLFVBQVUsR0FBRyxFQUFFLEVBQUU7TUFDdEQsS0FBSyxJQUFJalAsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHaVAsVUFBVSxFQUFFalAsQ0FBQyxFQUFFLEVBQUU7UUFDbkNrUCxVQUFVLENBQUN2SyxJQUFJLENBQUMsQ0FBQ3ZFLENBQUMsR0FBR0osQ0FBQyxFQUFFSyxDQUFDLENBQUMsQ0FBQztRQUMzQjhPLFFBQVEsQ0FBQ3hLLElBQUksQ0FBQyxDQUFDdkUsQ0FBQyxFQUFFQyxDQUFDLEdBQUdMLENBQUMsQ0FBQyxDQUFDO01BQzNCO0lBQ0YsQ0FBQyxNQUFNLElBQUlJLENBQUMsR0FBRzZPLFVBQVUsR0FBRyxFQUFFLElBQUk1TyxDQUFDLEdBQUc0TyxVQUFVLElBQUksRUFBRSxFQUFFO01BQ3RELEtBQUssSUFBSWpQLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2lQLFVBQVUsRUFBRWpQLENBQUMsRUFBRSxFQUFFO1FBQ25Da1AsVUFBVSxDQUFDdkssSUFBSSxDQUFDLENBQUN2RSxDQUFDLEdBQUdKLENBQUMsRUFBRUssQ0FBQyxDQUFDLENBQUM7UUFDM0I4TyxRQUFRLENBQUN4SyxJQUFJLENBQUMsQ0FBQ3ZFLENBQUMsRUFBRUMsQ0FBQyxHQUFHTCxDQUFDLENBQUMsQ0FBQztNQUMzQjtJQUNGO0lBQ0EsT0FBTztNQUFFa1AsVUFBVTtNQUFFQztJQUFTLENBQUM7RUFDakM7RUFFQSxTQUFTakUsYUFBYUEsQ0FBQ3JILFVBQVUsRUFBRWlHLElBQUksRUFBRTtJQUN2QyxNQUFNbUIsU0FBUyxHQUFHK0QsUUFBUSxDQUFDbkwsVUFBVSxFQUFFaUcsSUFBSSxDQUFDM0YsTUFBTSxDQUFDLENBQUNnTCxRQUFRO0lBQzVELElBQUk1QixnQkFBZ0IsQ0FBQ3RDLFNBQVMsRUFBRW5JLGNBQWMsQ0FBQyxLQUFLLEtBQUssRUFBRSxPQUFPLElBQUk7SUFDdEVzTSxpQkFBaUIsQ0FBQ25FLFNBQVMsRUFBRW5JLGNBQWMsQ0FBQztJQUM1Q3NNLGlCQUFpQixDQUFDbkUsU0FBUyxFQUFFbkIsSUFBSSxDQUFDc0IsU0FBUyxDQUFDO0lBQzVDLE9BQU9ILFNBQVM7RUFDbEI7RUFDQSxTQUFTTSxlQUFlQSxDQUFDMUgsVUFBVSxFQUFFaUcsSUFBSSxFQUFFO0lBQ3pDLE1BQU1tQixTQUFTLEdBQUcrRCxRQUFRLENBQUNuTCxVQUFVLEVBQUVpRyxJQUFJLENBQUMzRixNQUFNLENBQUMsQ0FBQytLLFVBQVU7SUFDOUQsSUFBSTNCLGdCQUFnQixDQUFDdEMsU0FBUyxFQUFFbkksY0FBYyxDQUFDLEtBQUssS0FBSyxFQUFFLE9BQU8sSUFBSTtJQUN0RXNNLGlCQUFpQixDQUFDbkUsU0FBUyxFQUFFbkksY0FBYyxDQUFDO0lBQzVDc00saUJBQWlCLENBQUNuRSxTQUFTLEVBQUVuQixJQUFJLENBQUNzQixTQUFTLENBQUM7SUFDNUMsT0FBT0gsU0FBUztFQUNsQjtFQUVBLFNBQVNvRSxvQkFBb0JBLENBQUEsRUFBRztJQUM5QixNQUFNQyxTQUFTLEdBQUdDLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDakMsTUFBTUMsaUJBQWlCLEdBQUcxTCxrQkFBa0IsQ0FBQ0MsR0FBRyxDQUFDdUwsU0FBUyxDQUFDO0lBQzNELElBQUl4TSxjQUFjLENBQUMyTSxRQUFRLENBQUNELGlCQUFpQixDQUFDLEtBQUssS0FBSyxFQUFFO01BQ3hELE9BQU9BLGlCQUFpQjtJQUMxQixDQUFDLE1BQU07TUFDTCxPQUFPSCxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9CO0VBQ0Y7RUFDQSxTQUFTRSxVQUFVQSxDQUFDRyxHQUFHLEVBQUU7SUFDdkIsT0FBTzdPLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUM4TyxNQUFNLENBQUMsQ0FBQyxHQUFHRCxHQUFHLENBQUM7RUFDeEM7RUFFQSxTQUFTbkMsZ0JBQWdCQSxDQUFDSSxZQUFZLEVBQUVDLGNBQWMsRUFBRTtJQUN0RCxJQUFJZixNQUFNLEdBQUcsSUFBSTtJQUNqQmMsWUFBWSxDQUFDOUQsT0FBTyxDQUFFYSxJQUFJLElBQUs7TUFDN0JrRCxjQUFjLENBQUMvRCxPQUFPLENBQUVoRyxVQUFVLElBQUs7UUFDckMsSUFBSTZHLElBQUksQ0FBQ0MsUUFBUSxDQUFDLENBQUMsS0FBSzlHLFVBQVUsQ0FBQzhHLFFBQVEsQ0FBQyxDQUFDLEVBQUU7VUFDN0NrQyxNQUFNLEdBQUcsS0FBSztVQUNkLE9BQU9BLE1BQU07UUFDZjtNQUNGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUNGLE9BQU9BLE1BQU07RUFDZjtFQUNBLFNBQVNWLGFBQWFBLENBQUEsRUFBRztJQUN2QixNQUFNbUQsU0FBUyxHQUFHek8sSUFBSSxDQUFDOE8sTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHO0lBQ3RDLE9BQU9MLFNBQVMsR0FBRyxZQUFZLEdBQUcsVUFBVTtFQUM5QztFQUNBLFNBQVNqRSxXQUFXQSxDQUFDdkIsSUFBSSxFQUFFO0lBQ3pCLE1BQU0wRCxXQUFXLEdBQUdvQyxnQkFBZ0IsQ0FBQzlGLElBQUksQ0FBQzNGLE1BQU0sQ0FBQztJQUNqRHFKLFdBQVcsQ0FBQzNELE9BQU8sQ0FBRWhHLFVBQVUsSUFBSztNQUNsQ2lHLElBQUksQ0FBQ3NCLFNBQVMsQ0FBQ3pHLElBQUksQ0FBQ2QsVUFBVSxDQUFDO01BQy9CZixjQUFjLENBQUM2QixJQUFJLENBQUNkLFVBQVUsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFDRixPQUFPMkosV0FBVztFQUNwQjtFQUNBLFNBQVNvQyxnQkFBZ0JBLENBQUNYLFVBQVUsRUFBRTtJQUNwQyxNQUFNWSxJQUFJLEdBQUcxRCxhQUFhLENBQUMsQ0FBQztJQUM1QixJQUFJMEQsSUFBSSxLQUFLLFlBQVksRUFBRTtNQUN6QixNQUFNaE0sVUFBVSxHQUFHd0wsb0JBQW9CLENBQUMsQ0FBQztNQUN6QyxNQUFNUyxVQUFVLEdBQUdkLFFBQVEsQ0FBQ25MLFVBQVUsRUFBRW9MLFVBQVUsQ0FBQyxDQUFDQyxVQUFVO01BQzlELE1BQU1yQyxNQUFNLEdBQUdVLGdCQUFnQixDQUFDdUMsVUFBVSxFQUFFaE4sY0FBYyxDQUFDO01BRTNELElBQUkrSixNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ25CLE9BQU9pRCxVQUFVO01BQ25CLENBQUMsTUFBTSxJQUFJakQsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUMzQixPQUFPK0MsZ0JBQWdCLENBQUNYLFVBQVUsQ0FBQztNQUNyQztJQUNGLENBQUMsTUFBTSxJQUFJWSxJQUFJLEtBQUssVUFBVSxFQUFFO01BQzlCLE1BQU1oTSxVQUFVLEdBQUd3TCxvQkFBb0IsQ0FBQyxDQUFDO01BQ3pDLE1BQU1TLFVBQVUsR0FBR2QsUUFBUSxDQUFDbkwsVUFBVSxFQUFFb0wsVUFBVSxDQUFDLENBQUNFLFFBQVE7TUFDNUQsTUFBTXRDLE1BQU0sR0FBR1UsZ0JBQWdCLENBQUN1QyxVQUFVLEVBQUVoTixjQUFjLENBQUM7TUFFM0QsSUFBSStKLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsT0FBT2lELFVBQVU7TUFDbkIsQ0FBQyxNQUFNLElBQUlqRCxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQzNCLE9BQU8rQyxnQkFBZ0IsQ0FBQ1gsVUFBVSxDQUFDO01BQ3JDO0lBQ0Y7RUFDRjtFQUNBOztFQUVBLFNBQVNjLGVBQWVBLENBQUNsTSxVQUFVLEVBQUU2SixLQUFLLEVBQUU7SUFDMUMsSUFBSWIsTUFBTSxHQUFHLEtBQUs7SUFDbEJhLEtBQUssQ0FBQzdELE9BQU8sQ0FBRWdFLFFBQVEsSUFBSztNQUMxQixJQUFJaEssVUFBVSxDQUFDOEcsUUFBUSxDQUFDLENBQUMsS0FBS2tELFFBQVEsQ0FBQ2xELFFBQVEsQ0FBQyxDQUFDLEVBQUU7UUFDakRrQyxNQUFNLEdBQUcsSUFBSTtRQUNiLE9BQU9BLE1BQU07TUFDZjtJQUNGLENBQUMsQ0FBQztJQUNGLE9BQU9BLE1BQU07RUFDZjtFQUNBLFNBQVNtRCxLQUFLQSxDQUFDbk0sVUFBVSxFQUFFNkosS0FBSyxFQUFFO0lBQ2hDLE9BQU9xQyxlQUFlLENBQUNsTSxVQUFVLEVBQUU2SixLQUFLLENBQUM7RUFDM0M7RUFDQSxTQUFTekosYUFBYUEsQ0FBQ0osVUFBVSxFQUFFO0lBQ2pDLElBQUltTSxLQUFLLENBQUNuTSxVQUFVLEVBQUVmLGNBQWMsQ0FBQyxLQUFLLElBQUksRUFBRTtNQUM5Q3dILFVBQVUsQ0FBQ1QsT0FBTyxDQUFFQyxJQUFJLElBQUs7UUFDM0IsSUFBSWlHLGVBQWUsQ0FBQ2xNLFVBQVUsRUFBRWlHLElBQUksQ0FBQ3NCLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtVQUN4RHRCLElBQUksQ0FBQ2pLLEdBQUcsQ0FBQyxDQUFDO1VBRVYrQyxRQUFRLENBQUMrQixJQUFJLENBQUNkLFVBQVUsQ0FBQztVQUN6QjtRQUNGO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxNQUFNLElBQUltTSxLQUFLLENBQUNuTSxVQUFVLEVBQUVmLGNBQWMsQ0FBQyxLQUFLLEtBQUssRUFBRTtNQUN0REosV0FBVyxDQUFDaUMsSUFBSSxDQUFDZCxVQUFVLENBQUM7TUFDNUI7SUFDRjtFQUNGO0VBQ0EsU0FBU2dCLE1BQU1BLENBQUEsRUFBRztJQUNoQixPQUFPL0IsY0FBYyxDQUFDcUIsTUFBTSxJQUFJdkIsUUFBUSxDQUFDdUIsTUFBTTtFQUNqRDtFQUNBLFNBQVNpTCxpQkFBaUJBLENBQUNBLGlCQUFpQixFQUFFYSxpQkFBaUIsRUFBRTtJQUMvRGIsaUJBQWlCLENBQUN2RixPQUFPLENBQUVoRyxVQUFVLElBQUs7TUFDeENvTSxpQkFBaUIsQ0FBQ3RMLElBQUksQ0FBQ2QsVUFBVSxDQUFDO0lBQ3BDLENBQUMsQ0FBQztFQUNKO0VBQ0EsU0FBU1gsU0FBU0EsQ0FBQSxFQUFHO0lBQ25CLE1BQU0ySixNQUFNLEdBQUcsRUFBRTtJQUNqQnZDLFVBQVUsQ0FBQ1QsT0FBTyxDQUFFQyxJQUFJLElBQUs7TUFDM0IsSUFBSUEsSUFBSSxDQUFDakYsTUFBTSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDMUJnSSxNQUFNLENBQUNsSSxJQUFJLENBQUNtRixJQUFJLENBQUN5QyxRQUFRLENBQUM7TUFDNUI7SUFDRixDQUFDLENBQUM7SUFDRixPQUFPTSxNQUFNO0VBQ2Y7RUFFQSxPQUFPO0lBQ0wzQixhQUFhO0lBQ2JLLGVBQWU7SUFDZkYsV0FBVztJQUNYcEgsYUFBYTtJQUNiK0wsS0FBSztJQUNMbkwsTUFBTTtJQUNOM0IsU0FBUztJQUNUWSxrQkFBa0I7SUFDbEIySyxjQUFjO0lBQ2QvTCxXQUFXO0lBQ1hFLFFBQVE7SUFDUkUsY0FBYztJQUNkd0g7RUFDRixDQUFDO0FBQ0g7QUFDQSxTQUFTcEIsTUFBTUEsQ0FBQzdGLElBQUksRUFBRTtFQUNwQixNQUFNNk0sT0FBTyxHQUFHL0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7RUFDbEMsTUFBTWdELFVBQVUsR0FBR2hELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0VBQ3hDLE1BQU1pRCxTQUFTLEdBQUdqRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztFQUN0QyxNQUFNa0QsU0FBUyxHQUFHbEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7RUFDdEMsTUFBTW1ELE1BQU0sR0FBR25ELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0VBQ2hDLE1BQU1yRSxLQUFLLEdBQUcsQ0FBQ29ILE9BQU8sRUFBRUcsU0FBUyxFQUFFRixVQUFVLEVBQUVDLFNBQVMsRUFBRUUsTUFBTSxDQUFDO0VBQ2pFLE1BQU03TixLQUFLLEdBQUc2SyxTQUFTLENBQUN4RSxLQUFLLENBQUM7RUFDOUIsT0FBTztJQUNMckcsS0FBSztJQUNMWTtFQUNGLENBQUM7QUFDSDtBQUNBO0FBQ0EsTUFBTWtOLFNBQVMsR0FBRyxFQUFFO0FBQ3BCLFNBQVN2SixZQUFZQSxDQUFDekUsTUFBTSxFQUFFO0VBQzVCLE9BQU9pTyxZQUFZLENBQUMsQ0FBQztFQUNyQixTQUFTQSxZQUFZQSxDQUFBLEVBQUc7SUFDdEIsTUFBTUMsUUFBUSxHQUFHLEVBQUU7SUFDbkIsTUFBTTFILElBQUksR0FBR3hHLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDRyxRQUFRO0lBQ2xDLElBQUk4TixhQUFhLEdBQUcsRUFBRTtJQUN0QixJQUFJM0gsSUFBSSxDQUFDNUUsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNuQjRFLElBQUksQ0FBQ2MsT0FBTyxDQUFFaEssR0FBRyxJQUFLO1FBQ3BCOFEsWUFBWSxDQUFDOVEsR0FBRyxDQUFDO1FBQ2pCK1EsU0FBUyxDQUFDLENBQUM7TUFDYixDQUFDLENBQUM7O01BRUY7TUFDQSxJQUFJSCxRQUFRLENBQUN0TSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE1BQU0wTSxJQUFJLEdBQUdDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pCUCxTQUFTLENBQUM1TCxJQUFJLENBQUNrTSxJQUFJLENBQUM7UUFDcEIsT0FBT0EsSUFBSTtNQUNiLENBQUMsTUFBTTtRQUNMLElBQUlFLE9BQU8sR0FBR04sUUFBUSxDQUFDQSxRQUFRLENBQUN0TSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzNDb00sU0FBUyxDQUFDNUwsSUFBSSxDQUFDb00sT0FBTyxDQUFDO1FBQ3ZCQSxPQUFPLEdBQUcsSUFBSTtRQUNkLE9BQU9OLFFBQVEsQ0FBQ3BNLEdBQUcsQ0FBQyxDQUFDO01BQ3ZCO0lBQ0YsQ0FBQyxNQUFNLElBQUlvTSxRQUFRLENBQUN0TSxNQUFNLEtBQUssQ0FBQyxJQUFJNEUsSUFBSSxDQUFDNUUsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUNyRCxNQUFNME0sSUFBSSxHQUFHQyxVQUFVLENBQUMsQ0FBQztNQUN6QlAsU0FBUyxDQUFDNUwsSUFBSSxDQUFDa00sSUFBSSxDQUFDO01BQ3BCLE9BQU9BLElBQUk7SUFDYjs7SUFFQTtJQUNBLFNBQVNELFNBQVNBLENBQUEsRUFBRztNQUNuQixJQUFJRixhQUFhLENBQUN2TSxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ2hDLE1BQU02TSxRQUFRLEdBQUd6TyxNQUFNLENBQUNFLEtBQUssQ0FBQ2dNLGNBQWM7TUFDNUNpQyxhQUFhLENBQUM3RyxPQUFPLENBQUVoRyxVQUFVLElBQUs7UUFDcEM7UUFDQSxNQUFNb04sSUFBSSxHQUFHRCxRQUFRLENBQUNqTixHQUFHLENBQUNGLFVBQVUsQ0FBQzhHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSTRGLFNBQVMsQ0FBQ2QsUUFBUSxDQUFDd0IsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFO1VBQ3RDUixRQUFRLENBQUM5TCxJQUFJLENBQUNzTSxJQUFJLENBQUM7UUFDckI7TUFDRixDQUFDLENBQUM7TUFDRlAsYUFBYSxHQUFHLEVBQUU7SUFDcEI7SUFDQTtJQUNBLFNBQVNDLFlBQVlBLENBQUM5USxHQUFHLEVBQUU7TUFDekIsTUFBTU8sQ0FBQyxHQUFHUCxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQ2hCLE1BQU1RLENBQUMsR0FBR1IsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUNoQixJQUFJTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNkc1EsYUFBYSxDQUFDL0wsSUFBSSxDQUFDLENBQUN2RSxDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQztNQUNoQztNQUNBLElBQUlELENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2RzUSxhQUFhLENBQUMvTCxJQUFJLENBQUMsQ0FBQ3ZFLENBQUMsR0FBRyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDO01BQ2hDO01BQ0EsSUFBSUEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDZHFRLGFBQWEsQ0FBQy9MLElBQUksQ0FBQyxDQUFDdkUsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDaEM7TUFDQSxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNkcVEsYUFBYSxDQUFDL0wsSUFBSSxDQUFDLENBQUN2RSxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUNoQztJQUNGO0lBQ0E7SUFDQSxTQUFTeVEsVUFBVUEsQ0FBQSxFQUFHO01BQ3BCLElBQUlELElBQUk7TUFDUixHQUFHO1FBQ0RBLElBQUksR0FBR2hRLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUM4TyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztNQUN4QyxDQUFDLFFBQVFZLFNBQVMsQ0FBQ2QsUUFBUSxDQUFDb0IsSUFBSSxDQUFDO01BQ2pDLE9BQU9BLElBQUk7SUFDYjtFQUNGO0FBQ0Y7QUFDQSxTQUFTSyxHQUFHQSxDQUFDaFIsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7RUFDakIsT0FBT0QsQ0FBQyxHQUFHQyxDQUFDO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hVQTtBQUM2RztBQUNqQjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sbUdBQW1HLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxPQUFPLFFBQVEsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLE1BQU0sVUFBVSxZQUFZLE1BQU0sTUFBTSxVQUFVLFlBQVksTUFBTSxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLE9BQU8sYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLFVBQVUsS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLFlBQVksTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxPQUFPLFlBQVksT0FBTyxLQUFLLFVBQVUsS0FBSyxVQUFVLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsS0FBSyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sYUFBYSxPQUFPLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLE9BQU8sVUFBVSxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksTUFBTSxVQUFVLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsc0NBQXNDLHVCQUF1Qiw4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SWYsV0FBVyxDQUFDNU8sS0FBSyxDQUFDSyxjQUFjLENBQUNxQixNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQy9DLE1BQU1rTyxFQUFFLEdBQUcsSUFBQW5KLGVBQU0sRUFBQ25FLGFBQWEsRUFBRXNNLFdBQVcsQ0FBQy9HLFVBQVUsQ0FBQztJQUN4RDtJQUNBK0csV0FBVyxHQUFHZ0IsRUFBRTtFQUNsQjtFQUNBLElBQUlmLFlBQVksQ0FBQzdPLEtBQUssQ0FBQ0ssY0FBYyxDQUFDcUIsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNoRCxNQUFNa08sRUFBRSxHQUFHLElBQUFuSixlQUFNLEVBQUNsRSxhQUFhLEVBQUVzTSxZQUFZLENBQUNoSCxVQUFVLENBQUM7SUFDekQ7SUFDQWdILFlBQVksR0FBR2UsRUFBRTtFQUNuQjtBQUNGO0FBQ0EsU0FBU1YsUUFBUUEsQ0FBQSxFQUFHO0VBQ2xCLE1BQU1qSixjQUFjLEdBQUduSSxRQUFRLENBQUNnRSxhQUFhLENBQUMsd0JBQXdCLENBQUM7RUFDdkVtRSxjQUFjLENBQUN4SCxLQUFLLENBQUN5SCxPQUFPLEdBQUcsTUFBTTtFQUNyQyxJQUFJNEksT0FBTyxDQUFDTSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0lBQ3BCTyxVQUFVLENBQUMsQ0FBQztJQUNaLElBQUE5Siw2QkFBZSxFQUFDK0ksV0FBVyxDQUFDO0VBQzlCLENBQUMsTUFBTSxJQUFJRSxPQUFPLENBQUNNLElBQUksR0FBRyxDQUFDLEVBQUU7SUFDM0JPLFVBQVUsQ0FBQyxDQUFDO0lBQ1osSUFBQTlKLDZCQUFlLEVBQUNnSixZQUFZLENBQUM7RUFDL0I7QUFDRixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ib2FyZC1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20tY29tcG9uZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2Utc2hpcC1wYWdlL3NoaXAtcG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91dGlsaXR5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2Utc2hpcC1wYWdlL3NoaXBzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZS1zaGlwLXBhZ2Uvc2hpcHMuY3NzPzQyN2MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2Z1bmN0aW9uIGRyYXcgc2hpcHMgd2l0aCBoaXQgYW5kIG1pc3MgZm9yIHRoZSBvd25lclxuZnVuY3Rpb24gZmlyc3RCb2FyZChzaGlwQ29vcmRpbmF0ZSwgaGl0LCBtaXNzKSB7XG4gIC8vIENyZWF0ZSBhIDJEIGdyaWQgb2YgY2VsbHNcbiAgY29uc3QgY2VsbHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY2VsbHNbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gXCJcIjtcbiAgICB9XG4gIH1cbiAgLy8gTWFyayB0aGUgY29vcmRpbmF0ZXMgb24gdGhlIGdyaWRcbiAgZm9yIChjb25zdCBbYSwgYl0gb2Ygc2hpcENvb3JkaW5hdGUpIHtcbiAgICBjZWxsc1thXVtiXSA9IFwic2hpcFwiO1xuICB9XG4gIGZvciAoY29uc3QgW3gsIHldIG9mIGhpdCkge1xuICAgIGlmIChjZWxsc1t4XVt5XSA9PT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgbWlzcykge1xuICAgIGlmIChjZWxsc1t4XVt5XSAhPT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgfVxuICB9XG4gIC8vIENyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGdyaWRcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkcy5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIC8vIENyZWF0ZSBidXR0b25zIGZvciBlYWNoIGNlbGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcInNoaXBcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcInRhcmdldC1kb3RcIik7XG4gICAgICBkb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNGIyOTI5XCI7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9IGVsc2UgaWYgKGNlbGxzW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gXCJoaXRcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcInRhcmdldC1kb3RcIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImhpdC1zdHJpa2VcIik7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9IGVsc2UgaWYgKGNlbGxzW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJtaXNzZWQtc3RyaWtlXCIpO1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGRvdCk7XG4gICAgfVxuICAgIGdyaWRzLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cbiAgcmV0dXJuIGdyaWRzO1xufVxuLy9mdW5jdGlvbiAgZHJhdyBtaXNzIGFuZCBoaXQgYW5kIHJldmVsIHNoaXAgaWYgaXQgaGl0IHVzZWQgdG9cbi8vc2hvdyBmb3Igb3Bwb25lbnQgYnkgaGlkaW5nIHNoaXBzIHdoZW4gaXQgcmVuZGVyIGZpcnN0XG5mdW5jdGlvbiBzdHJpa2VCb2FyZChzaGlwQ29vcmRpbmF0ZSwgaGl0LCBtaXNzKSB7XG4gIC8vIENyZWF0ZSBhIDJEIGdyaWQgb2YgY2VsbHNcbiAgY29uc3QgY2VsbHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY2VsbHNbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gXCJcIjtcbiAgICB9XG4gIH1cbiAgLy8gbWFyayB0aGUgY29vcmRpbmF0ZXMgb24gdGhlIGdyaWRcbiAgZm9yIChjb25zdCBbYSwgYl0gb2Ygc2hpcENvb3JkaW5hdGUpIHtcbiAgICBjZWxsc1thXVtiXSA9IFwic2hpcFwiO1xuICB9XG4gIGZvciAoY29uc3QgW3gsIHldIG9mIGhpdCkge1xuICAgIGlmIChjZWxsc1t4XVt5XSA9PT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgbWlzcykge1xuICAgIGlmIChjZWxsc1t4XVt5XSAhPT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgfVxuICB9XG4gIC8vIENyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGdyaWRcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkcy5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIC8vIENyZWF0ZSBidXR0b25zIGZvciBlYWNoIGNlbGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcImhpdFwiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWRvdFwiKTtcbiAgICAgIGRvdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGRvdCk7XG4gICAgfSBlbHNlIGlmIChjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09IFwibWlzc1wiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkLXN0cmlrZVwiKTtcbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkb3QpO1xuICAgIH0gZWxzZSBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcInNoaXBcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gICAgZ3JpZHMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICByZXR1cm4gZ3JpZHM7XG59XG4vL2RyYXcgMTAgWCAxMCBib2FyZFxuZnVuY3Rpb24gZHJhd0dyaWRzKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBncmlkLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cbiAgcmV0dXJuIGdyaWQ7XG59XG5leHBvcnQgeyBmaXJzdEJvYXJkLCBzdHJpa2VCb2FyZCwgZHJhd0dyaWRzIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyTW92ZSB9IGZyb20gXCIuL3V0aWxpdHkuanNcIjtcbmltcG9ydCB7IHN0cmlrZUJvYXJkLCBmaXJzdEJvYXJkLCBkcmF3R3JpZHMgfSBmcm9tIFwiLi9ib2FyZC1jb21wb25lbnQuanNcIjtcbmltcG9ydCB7XG4gIGRyYWdTaGlwcyxcbiAgcmFuZG9tbHlQbGFjZVNoaXBzLFxufSBmcm9tIFwiLi9wbGFjZS1zaGlwLXBhZ2Uvc2hpcC1wb3NpdGlvbi5qc1wiO1xuXG5sZXQgY291bnQgPSAzO1xubGV0IHdpbm5lck1zZyA9IFtdO1xuLypcbipHYW1lRmxvdyAtIG9iamVjdCB0aGF0IGhhcyAzIG1ldGhvZHMgb25lIHRvIGNoYW5nZSBwbGF5ZXIgdHVybixzZWNvbmQgdG8gY3JlYXRlIGJvYXJkIHVzaW5nIHBsYXllciBpbmZvLCBcbiogICAgICAgICAgIHRoaXJkIHRvIHVwZGF0ZSBib2FyZCBzdGF0ZVxuKkdhbWVGbG93KCkucHJpbnRCb2FyZChwbGF5ZXIpIC0gZHJhdyBib2FyZCB1c2luZyBwbGF5ZXIgaGl0LG1pc3MgYW5kIHNoaXAgcG9zaXRpb24gYXJyYXksXG4gcmV0dXJuIDEwIHggMTAgYm9hcmQgb25lIHdpdGggc2hpcCBzaG93biwgdGhlIG90aGVyIHdpdGhvdXQgdGhlIHNoaXAgdW5sZXNzIGl0IGhpdCB0byBzaG93IHRoZSBvcHBvbmVudCBzdHJpa2luZyBzdGF0ZSBvbiB0aGUgYm9hcmQuIFxuKi9cblxuZnVuY3Rpb24gR2FtZUZsb3cocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgbGV0IGlzR2FtZUVuZCA9IGZhbHNlO1xuICBjb25zdCBwbGF5ZXJzID0gW3BsYXllck9uZSwgcGxheWVyVHdvXTtcbiAgbGV0IGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgYWN0aXZlUGxheWVyID0gYWN0aXZlUGxheWVyID09PSBwbGF5ZXJzWzBdID8gcGxheWVyc1sxXSA6IHBsYXllcnNbMF07XG4gIH07XG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IGFjdGl2ZVBsYXllcjtcbiAgY29uc3QgcHJpbnRCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBnZXRQbGF5ZXIoKTtcbiAgICBjb25zdCBtaXNzU3RyaWtlcyA9IHBsYXllci5ib2FyZC5taXNzZWRTaG90cztcbiAgICBjb25zdCBoaXRTdHJpa2VzID0gcGxheWVyLmJvYXJkLmhpdFNob3RzO1xuICAgIGNvbnN0IGFsbFRoZVNoaXBzID0gcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zO1xuICAgIGNvbnN0IHNoaXBCb2FyZFN0YXRlID0gZmlyc3RCb2FyZChhbGxUaGVTaGlwcywgaGl0U3RyaWtlcywgbWlzc1N0cmlrZXMpO1xuICAgIGNvbnN0IHN0cmlrZUJvYXJkU3RhdGUgPSBzdHJpa2VCb2FyZChhbGxUaGVTaGlwcywgaGl0U3RyaWtlcywgbWlzc1N0cmlrZXMpO1xuICAgIGNvbnN0IHVwZGF0ZVN1bmtTaGlwID0gcGxheWVyLmJvYXJkLnN1bmtTaGlwcygpO1xuICAgIHJldHVybiB7XG4gICAgICBzaGlwQm9hcmRTdGF0ZSxcbiAgICAgIHN0cmlrZUJvYXJkU3RhdGUsXG4gICAgICB1cGRhdGVTdW5rU2hpcCxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHByaW50TmV3Qm9hcmQgPSAoKSA9PiB7XG4gICAgLy9kcmF3IGN1cnJlbnQgcGxheWVyIGJvYXJkIHN0YXRlIHVzaW5nIG9wcG9uZW50IGhpdCBhbmQgbWlzc1xuICAgIC8vdGhlbiBkcmF3IHN0cmlraW5nIGJvYXJkIHVzaW5nIGN1cnJlbnQgcGxheWVyIGhpdCBhbmQgbWlzcyBvbiBvcHBvbmVudCBib2FyZFxuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBjb25zdCBvcHBvbmVudE5hbWUgPSBnZXRQbGF5ZXIoKS5uYW1lO1xuICAgIGNvbnN0IG9wcG9uZW50UGxheWVyU2hpcFN0YXRlID0gcHJpbnRCb2FyZChnZXRQbGF5ZXIoKSkudXBkYXRlU3Vua1NoaXA7XG4gICAgY29uc3Qgb3Bwb25lbnRTdHJpa2VCb2FyZCA9IHByaW50Qm9hcmQoZ2V0UGxheWVyKCkpLnN0cmlrZUJvYXJkU3RhdGU7XG4gICAgY2hhbmdlVHVybigpO1xuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQgPSBwcmludEJvYXJkKGdldFBsYXllcigpKS5zaGlwQm9hcmRTdGF0ZTtcbiAgICBjb25zdCBjdXJyZW50UGxheWVyU2hpcFN0YXRlID0gcHJpbnRCb2FyZChnZXRQbGF5ZXIoKSkudXBkYXRlU3Vua1NoaXA7XG4gICAgY29uc3QgY3VycmVudFBsYXllck5hbWUgPSBnZXRQbGF5ZXIoKS5uYW1lO1xuICAgIHJldHVybiB7XG4gICAgICBvcHBvbmVudE5hbWUsXG4gICAgICBjdXJyZW50UGxheWVyTmFtZSxcbiAgICAgIGN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQsXG4gICAgICBvcHBvbmVudFN0cmlrZUJvYXJkLFxuICAgICAgb3Bwb25lbnRQbGF5ZXJTaGlwU3RhdGUsXG4gICAgICBjdXJyZW50UGxheWVyU2hpcFN0YXRlLFxuICAgIH07XG4gIH07XG4gIGNvbnN0IHBsYXllclJvdW5kID0gKHBsYXllciwgY2xpY2tlZE51bSkgPT4ge1xuICAgIGlmIChpc0dhbWVFbmQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHBsYXllci5ib2FyZC5jb29yZGluYXRlc0hhc2hNYXAuZ2V0KE51bWJlcihjbGlja2VkTnVtKSk7XG4gICAgLy9hdHRhY2sgb3Bwb25lbnQgYm9hcmQgYnkgY2hhbmdpbmcgdHVybiB0byBndCBvcHBvbmVudCBib2FyZFxuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBnZXRQbGF5ZXIoKS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuICAgIGRlY2xhcmVXaW5uZXIoZ2V0UGxheWVyKCkpO1xuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBkZWNsYXJlV2lubmVyKHBsYXllcik7XG4gICAgcHJpbnROZXdCb2FyZCgpO1xuICAgIC8vYW5ub3VuY2Ugd2lubmVyIGlmIGl0IGZvdW5kXG4gICAgaWYgKHdpbm5lck1zZy5sZW5ndGggPiAwKSB7XG4gICAgICB3aW5uZXJNb2RhbCh3aW5uZXJNc2cucG9wKCkpO1xuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2lubmVyLW1vZGFsXVwiKTtcbiAgICAgIG1vZGFsLnNob3dNb2RhbCgpO1xuICAgICAgaXNHYW1lRW5kID0gdHJ1ZTtcbiAgICAgIHBsYXllck9uZSA9IG51bGw7XG4gICAgICBwbGF5ZXJUd28gPSBudWxsO1xuICAgICAgd2lubmVyTXNnID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZVR1cm4oKTtcbiAgICB9XG4gICAgLy9zdG9yZSB3aW5uZXIgbWVzc2FnZSB3aGVuIHN0YXRlIGNoYW5nZSBpbiB0aGUgYWJvdmUgd2hlbiB3ZSBjaGFuZ2UgdHVybnNcbiAgICBmdW5jdGlvbiBkZWNsYXJlV2lubmVyKHBsYXllcikge1xuICAgICAgaWYgKHdpbm5lcihwbGF5ZXIpID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5uZXJNc2cucHVzaCh3aW5uZXIocGxheWVyKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vZnVuY3Rpb24gcmV0dXJuIHN0cmluZyB0byBkZWNsYXJlIHdobyB3b24gYW5kIGxvc3QgaWYgdGhlIGdhbWUgZW5kXG4gICAgZnVuY3Rpb24gd2lubmVyKHBsYXllcikge1xuICAgICAgLy8gZ2FtZSBlbmRzIHdoZW4gcGxheWVyIG1ldGhvZCBpc1N1bmsoKSByZXR1cm4gdHJ1ZVxuICAgICAgY29uc3QgZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPSBwbGF5ZXJPbmUuYm9hcmQuaXNTdW5rKCk7XG4gICAgICBjb25zdCBzZWNvbmRQbGF5ZXJTdW5rU2hpcHMgPSBwbGF5ZXJUd28uYm9hcmQuaXNTdW5rKCk7XG4gICAgICBjb25zdCBwbGF5ZXJPbmVOYW1lID0gcGxheWVyT25lLm5hbWU7XG4gICAgICBjb25zdCBwbGF5ZXJUd29OYW1lID0gcGxheWVyVHdvLm5hbWU7XG4gICAgICBsZXQgbXNnO1xuICAgICAgaWYgKGZpcnN0UGxheWVyU3Vua1NoaXBzID09PSBmYWxzZSAmJiBzZWNvbmRQbGF5ZXJTdW5rU2hpcHMgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gbXNnO1xuICAgICAgZWxzZSBpZiAoZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPT09IHRydWUgJiYgcGxheWVyLm5hbWUgPT09IHBsYXllck9uZU5hbWUpIHtcbiAgICAgICAgbXNnID0gYCR7cGxheWVyVHdvTmFtZX0gd29uIPCfjolgO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPT09IHRydWUgJiZcbiAgICAgICAgcGxheWVyLm5hbWUgPT09IHBsYXllck9uZU5hbWVcbiAgICAgICkge1xuICAgICAgICBtc2cgPSBgJHtwbGF5ZXJPbmVOYW1lfSBsb3N0YDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHNlY29uZFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJlxuICAgICAgICBwbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lTmFtZVxuICAgICAgKSB7XG4gICAgICAgIG1zZyA9IGAke3BsYXllck9uZU5hbWV9IHdvbiDwn46JYDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHNlY29uZFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJlxuICAgICAgICBwbGF5ZXIubmFtZSA9PT0gcGxheWVyVHdvTmFtZVxuICAgICAgKSB7XG4gICAgICAgIG1zZyA9IGAke3BsYXllclR3b05hbWV9IGxvc3RgO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1zZztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRQbGF5ZXIsXG4gICAgcGxheWVyUm91bmQsXG4gICAgcHJpbnROZXdCb2FyZCxcbiAgICBpc0dhbWVFbmQsXG4gIH07XG59XG4vLyBmdW5jdGlvbiB0aGF0IHVwZGF0ZSB0aGUgc2NyZWVuIHVzaW5nIGdhbWUgZmxvdyBmdW5jdGlvblxuZnVuY3Rpb24gc2NyZWVuQ29udHJvbGxlcihwbGF5ZXJPbmUsIHBsYXllclR3bywgc29sb1BsYXllciwgaXNHYW1lRW5kKSB7XG4gIGNvbnN0IGdhbWUgPSBHYW1lRmxvdyhwbGF5ZXJPbmUsIHBsYXllclR3bywgaXNHYW1lRW5kKTtcbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLXR1cm5cIik7XG4gIGNvbnN0IHBsYXllck9uZVNoaXBzQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLW9uZVwiKTtcbiAgY29uc3QgcGxheWVyT25lU3RyaWtlQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXR3b1wiKTtcbiAgY29uc3QgZmlyc3RQbGF5ZXJTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW9uZS1taW5pLXNoaXBzXCIpO1xuICBjb25zdCBzZWNvbmRQbGF5ZXJTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLXR3by1taW5pLXNoaXBzXCIpO1xuICBmaXJzdFBsYXllclNoaXBzLnRleHRDb250ZW50ID0gXCJcIjtcbiAgc2Vjb25kUGxheWVyU2hpcHMudGV4dENvbnRlbnQgPSBcIlwiO1xuICAvL2NvbnN0IHBsYXllck9uZUZpcnN0Q2hhciA9IHBsYXllck9uZS5uYW1lLmNoYXJBdCgwKTtcbiAgLy9jb25zdCBwbGF5ZXJUd29GaXJzdENoYXIgPSBwbGF5ZXJUd28ubmFtZS5jaGFyQXQoMCk7XG5cbiAgY29uc3QgdXBkYXRlU2NyZWVuID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllck9uZUZpcnN0Q2hhciA9IHBsYXllck9uZS5uYW1lLmNoYXJBdCgwKTtcbiAgICBjb25zdCBwbGF5ZXJUd29GaXJzdENoYXIgPSBwbGF5ZXJUd28ubmFtZS5jaGFyQXQoMCk7XG4gICAgaWYgKGdhbWUuaXNHYW1lRW5kID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vbWV0aG9kIHRvIGNoYW5nZSBhbmQgdXBkYXRlIHBsYXllciBmbGVldCBiYXNlZCBvbiBjdXJyZW50IHBsYXllciBmb3IgdGhlIG1pbmkgZmxlZXRcbiAgICBjb25zdCBidWlsZERhc2hib2FyZCA9ICgpID0+IHtcbiAgICAgIGlmIChnYW1lLmdldFBsYXllcigpLm5hbWUgPT09IHBsYXllck9uZS5uYW1lKSB7XG4gICAgICAgIGRyYXdNaW5pU2hpcHMoZmlyc3RQbGF5ZXJTaGlwcywgcGxheWVyT25lRmlyc3RDaGFyKTtcbiAgICAgICAgZHJhd01pbmlTaGlwcyhzZWNvbmRQbGF5ZXJTaGlwcywgcGxheWVyVHdvRmlyc3RDaGFyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYXdNaW5pU2hpcHMoZmlyc3RQbGF5ZXJTaGlwcywgcGxheWVyVHdvRmlyc3RDaGFyKTtcbiAgICAgICAgZHJhd01pbmlTaGlwcyhzZWNvbmRQbGF5ZXJTaGlwcywgcGxheWVyT25lRmlyc3RDaGFyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGJ1aWxkRGFzaGJvYXJkKCk7XG5cbiAgICB0dXJuLnRleHRDb250ZW50ID0gYCR7Z2FtZS5nZXRQbGF5ZXIoKS5uYW1lfSdzIHR1cm5gO1xuICAgIHBsYXllck9uZVNoaXBzQm9hcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHBsYXllck9uZVN0cmlrZUJvYXJkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIC8vZ3JhYiBhbGwgbWluaSBzaGlwIGJ5IHVzaW5nIHBsYXllciBuYW1lXG4gICAgY29uc3QgcGxheWVyT25lRGFzaEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cGxheWVyT25lRmlyc3RDaGFyfWApO1xuICAgIGNvbnN0IFBsYXllck9uZU1pbmlTaGlwcyA9XG4gICAgICBwbGF5ZXJPbmVEYXNoQm9hcmQucXVlcnlTZWxlY3RvckFsbChcIi5taW5pLXNoaXAtc2l6ZVwiKTtcbiAgICBjb25zdCBwbGF5ZXJUd29EYXNoQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXJUd29GaXJzdENoYXJ9YCk7XG4gICAgY29uc3QgcGxheWVyVHdvTWluaVNoaXBzID1cbiAgICAgIHBsYXllclR3b0Rhc2hCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1pbmktc2hpcC1zaXplXCIpO1xuICAgIC8vdXBkYXRlIG1pbmkgc2hpcHMgaWYgaXQgaGl0XG4gICAgY29uc3QgcGxheWVyT25lU3Vua1NoaXBzID0gZ2FtZS5wcmludE5ld0JvYXJkKCkuY3VycmVudFBsYXllclNoaXBTdGF0ZTtcbiAgICBjb25zdCBwbGF5ZXJUd29TdW5rU2hpcHMgPSBnYW1lLnByaW50TmV3Qm9hcmQoKS5vcHBvbmVudFBsYXllclNoaXBTdGF0ZTtcbiAgICAvL21ldGhvZCB0byB1cGRhdGUgc2hpcHMgYmFzZWQgb24gY3VycmVudCBwbGF5ZXJcbiAgICBjb25zdCB1cGRhdGVEYXNoQm9hcmQgPSAoKSA9PiB7XG4gICAgICBpZiAoZ2FtZS5nZXRQbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lLm5hbWUpIHtcbiAgICAgICAgdXBkYXRlTWluaVNoaXBzKFBsYXllck9uZU1pbmlTaGlwcywgcGxheWVyT25lU3Vua1NoaXBzLCBcInJlZFwiKTtcbiAgICAgICAgdXBkYXRlTWluaVNoaXBzKHBsYXllclR3b01pbmlTaGlwcywgcGxheWVyVHdvU3Vua1NoaXBzLCBcInJlZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZU1pbmlTaGlwcyhQbGF5ZXJPbmVNaW5pU2hpcHMsIHBsYXllck9uZVN1bmtTaGlwcywgXCJyZWRcIik7XG4gICAgICAgIHVwZGF0ZU1pbmlTaGlwcyhwbGF5ZXJUd29NaW5pU2hpcHMsIHBsYXllclR3b1N1bmtTaGlwcywgXCJyZWRcIik7XG4gICAgICB9XG4gICAgfTtcbiAgICB1cGRhdGVEYXNoQm9hcmQoKTtcbiAgICAvL3VwZGF0ZSB0aGUgYm9hcmRzXG4gICAgcGxheWVyT25lU2hpcHNCb2FyZC5hcHBlbmRDaGlsZChcbiAgICAgIGdhbWUucHJpbnROZXdCb2FyZCgpLmN1cnJlbnRQbGF5ZXJTaGlwQm9hcmRcbiAgICApO1xuICAgIHBsYXllck9uZVN0cmlrZUJvYXJkLmFwcGVuZENoaWxkKGdhbWUucHJpbnROZXdCb2FyZCgpLm9wcG9uZW50U3RyaWtlQm9hcmQpO1xuICAgIGlmIChzb2xvUGxheWVyID09PSBmYWxzZSkge1xuICAgICAgY291bnRkb3duTW9kYWwoYFBhc3MgdGhlIGRldmljZSB0byAke2dhbWUuZ2V0UGxheWVyKCkubmFtZX1gKTtcbiAgICB9XG4gICAgZml4VHlwbyhwbGF5ZXJPbmUubmFtZSwgcGxheWVyVHdvLm5hbWUpO1xuICB9O1xuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xuICAgIGNvbnN0IHBsYXllciA9IGdhbWUuZ2V0UGxheWVyKCk7XG4gICAgZ2FtZS5wbGF5ZXJSb3VuZChwbGF5ZXIsIGUpO1xuICAgIHVwZGF0ZVNjcmVlbigpO1xuICB9XG5cbiAgcGxheWVyT25lU3RyaWtlQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgIGNvbnN0IHBsYXllciA9IGdhbWUuZ2V0UGxheWVyKCk7XG4gICAgLy9jaGVjayBjbGlja2VkIGNlbGwgaXMgZnJlZVxuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkIHx8IGUudGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgIGNsaWNrSGFuZGxlcihpbmRleCk7XG4gICAgdXBkYXRlU2NyZWVuKCk7XG4gICAgLy9mb3Igc29sbyBwbGF5ZXJcbiAgICBpZiAoXG4gICAgICBwbGF5ZXIubmFtZSAhPT0gXCJhaVwiICYmXG4gICAgICBwbGF5ZXIubmFtZSA9PT0gXCJ5b3VcIiAmJlxuICAgICAgZS50YXJnZXQuaGFzQ2hpbGROb2RlcygpICE9PSB0cnVlXG4gICAgKSB7XG4gICAgICBnYW1lLnBsYXllclJvdW5kKHBsYXllciwgY29tcHV0ZXJNb3ZlKHBsYXllcikpO1xuICAgICAgdXBkYXRlU2NyZWVuKCk7XG4gICAgfVxuICB9KTtcbiAgLy9pbml0aWFsIHJlbmRlclxuICB1cGRhdGVTY3JlZW4oKTtcbn1cbi8vaW50cm8gcGFnZVxuZnVuY3Rpb24gaW50cm9QYWdlKCkge1xuICBjb25zdCBwYWdlSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGFnZUhvbGRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImludHJvLXBhZ2VcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhlYWRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxvZ28taG9sZGVyXCIpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZVNoaXBcIjtcblxuICBjb25zdCBidG5Ib2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidG5Ib2xkZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnYW1lLW9wdGlvbnNcIik7XG4gIGNvbnN0IHNpbmdsZVBsYXllckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNpbmdsZVBsYXllckJ0bi50ZXh0Q29udGVudCA9IFwic2luZ2xlLXBsYXllclwiO1xuICBzaW5nbGVQbGF5ZXJCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaW5nbGUtcGxheWVyLWJ0blwiKTtcbiAgc2luZ2xlUGxheWVyQnRuLmNsYXNzTGlzdC5hZGQoXCJnYW1lLW9wdGlvbi1idG5zXCIpO1xuICBjb25zdCBtdWx0aVBsYXllckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG11bHRpUGxheWVyQnRuLnRleHRDb250ZW50ID0gXCJZb3UgdnMgRnJpZW5kXCI7XG4gIG11bHRpUGxheWVyQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibXVsdGktcGxheWVycy1idG5cIik7XG4gIG11bHRpUGxheWVyQnRuLmNsYXNzTGlzdC5hZGQoXCJnYW1lLW9wdGlvbi1idG5zXCIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBidG5Ib2xkZXIuYXBwZW5kQ2hpbGQoc2luZ2xlUGxheWVyQnRuKTtcbiAgYnRuSG9sZGVyLmFwcGVuZENoaWxkKG11bHRpUGxheWVyQnRuKTtcbiAgcGFnZUhvbGRlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBwYWdlSG9sZGVyLmFwcGVuZENoaWxkKGJ0bkhvbGRlcik7XG4gIHJldHVybiBwYWdlSG9sZGVyO1xufVxuXG5mdW5jdGlvbiBkcmF3Rmlyc3RQYWdlKCkge1xuICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBhZ2UtY29udGFpbmVyXVwiKTtcbiAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnRyb1BhZ2UoKSk7XG4gIGNvbnN0IGxvZ29EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ28taG9sZGVyXCIpO1xuICBjb25zdCB0aXR0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIik7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRpdHRsZS5jbGFzc0xpc3QuYWRkKFwibG9nb1wiKTtcbiAgICBsb2dvRGl2LmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG4gIH0sIDApO1xufVxuLy9kcmF3IHNoaXAgcGxhY2VtZW50IHBhZ2VcbmZ1bmN0aW9uIHRlbXBsYXRlU2hpcEdyaWQoKSB7XG4gIGNvbnN0IHNlY29uZFBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdHJhdGVneUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3RyYXRlZ3lCb2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xuICBzdHJhdGVneUJvYXJkLmFwcGVuZENoaWxkKGRyYXdHcmlkcygpKTtcbiAgY29uc3QgYnRucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRlbXBsYXRlID0gYFxuICA8ZGl2IGNsYXNzPVwic2hpcHMtY29udGFpbmVyXCIgZGF0YS1zaGlwcy1jb250YWluZXI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBsYWNlLXNoaXBzLWJ0bnNcIj5cbiAgICA8YnV0dG9uXG4gICAgICBhcmlhLWxhYmVsPVwicGxhY2Ugc2hpcHMgYnkgZHJhZ2dpbmdcIlxuICAgICAgY2xhc3M9XCJkcmFnLWJ0blwiXG4gICAgICBkYXRhLWRyb3AtYnRuXG4gICAgPlxuICAgICAgRHJhZyAmIERyb3Agc2hpcHNcbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICBhcmlhLWxhYmVsPVwicGxhY2Ugc2hpcHMgcmFuZG9tbHlcIlxuICAgICAgY2xhc3M9XCJyYW5kb21pemUtYnRuXCJcbiAgICAgIGRhdGEtcmFuZG9tLWJ0blxuICAgID5cbiAgICAgIFJhbmRvbWl6ZVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJwbGF5LWJ0blwiPlBsYXk8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiBgO1xuICBidG5zLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICBzZWNvbmRQYWdlLmFwcGVuZENoaWxkKHN0cmF0ZWd5Qm9hcmQpO1xuICBzZWNvbmRQYWdlLmFwcGVuZENoaWxkKGJ0bnMpO1xuICByZXR1cm4gc2Vjb25kUGFnZTtcbn1cbi8vZnVuY3Rpb24gdG8gYXR0YWNoIHNoaXAgdGVtcGxhdGUgdG8gZG9tXG5mdW5jdGlvbiBzaGlwc1BsYWNlbWVudChlbGVtZW50KSB7XG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHRlbXBsYXRlU2hpcEdyaWQoKSk7XG59XG4vL1xuZnVuY3Rpb24gcmFuZG9tUGxhY2VtZW50KG5ld1BsYXllcikge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheS1idG5cIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNoaXBzLWNvbnRhaW5lcl1cIik7XG4gIHNoaXBzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaWYgKG5ld1BsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBzZXRTaGlwc1BsYWNlID0gcmFuZG9tbHlQbGFjZVNoaXBzKG5ld1BsYXllcik7XG4gICAgY29uc3Qgc2hpcHMgPSBuZXdQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnM7XG4gICAgY29uc3QgaGl0cyA9IG5ld1BsYXllci5ib2FyZC5oaXRTaG90cztcbiAgICBjb25zdCBtaXNzZWQgPSBuZXdQbGF5ZXIuYm9hcmQubWlzc2VkU2hvdHM7XG4gICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZmlyc3RCb2FyZChzaGlwcywgaGl0cywgbWlzc2VkKSk7XG4gICAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGtlZXBOYW1lID0gbmV3UGxheWVyLm5hbWU7XG4gICAgbmV3UGxheWVyID0gbnVsbDtcbiAgICBuZXdQbGF5ZXIgPSBQbGF5ZXIoa2VlcE5hbWUsIHNoaXBzKTtcbiAgICBjb25zdCBzZXRTaGlwc1BsYWNlID0gcmFuZG9tbHlQbGFjZVNoaXBzKG5ld1BsYXllcik7XG4gICAgY29uc3Qgc2hpcHNDb29yZGluYXRlcyA9IG5ld1BsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucztcbiAgICBjb25zdCBoaXRzID0gbmV3UGxheWVyLmJvYXJkLmhpdFNob3RzO1xuICAgIGNvbnN0IG1pc3NlZCA9IG5ld1BsYXllci5ib2FyZC5taXNzZWRTaG90cztcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmaXJzdEJvYXJkKHNoaXBzQ29vcmRpbmF0ZXMsIGhpdHMsIG1pc3NlZCkpO1xuICAgIHBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfVxufVxuLy9jb3VudGRvd24gcGFnZSB0aGF0IGFjY2VwdCBtZXNzYWdlIGFuZCBoaWRlIG90aGVyIGNvbnRlbnRcbmZ1bmN0aW9uIGNvdW50RG93blBhZ2UobXNnKSB7XG4gIGNvbnN0IHBhc3NTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3Mtc2NyZWVuXCIpO1xuICBjb25zdCB0ZW1wbGF0ZSA9IGAgXG4gICAgIDxkaXYgY2xhc3M9XCJtc2ctdGV4dFwiIGRhdGEtbXNnPiR7bXNnfTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvdW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvdW50ZXItYm9hcmRcIiBkYXRhLWNvdW50LWRvd24+PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICBwYXNzU2NyZWVuLmlubmVySFRNTCA9IHRlbXBsYXRlO1xufVxuZnVuY3Rpb24gY291bnRkb3duTW9kYWwobXNnKSB7XG4gIGNvbnN0IHBhc3NTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3Mtc2NyZWVuXCIpO1xuICBpZiAoY291bnQgPCAwKSB7XG4gICAgY291bnQgPSAzO1xuICB9XG4gIGNvdW50RG93blBhZ2UobXNnKTtcbiAgY291bnRkb3duKCk7XG59XG5mdW5jdGlvbiB1cGRhdGVDb3VudGRvd25VSSgpIHtcbiAgY29uc3QgcGFzc1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzcy1zY3JlZW5cIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb3VudC1kb3duXVwiKS50ZXh0Q29udGVudCA9IGNvdW50O1xuICBpZiAoY291bnQgPT09IDApIHtcbiAgICBwYXNzU2NyZWVuLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBwYXNzU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfSBlbHNlIHtcbiAgICBwYXNzU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3VudGRvd24oKSB7XG4gIGlmIChjb3VudCA+PSAwKSB7XG4gICAgdXBkYXRlQ291bnRkb3duVUkoKTtcbiAgICBjb3VudC0tO1xuICAgIHNldFRpbWVvdXQoY291bnRkb3duLCAxMDAwKTtcbiAgfVxufVxuLy9mdW5jdGlvbiB0byBkcmF3IG1pbmkgc2hpcHMgdG8gc2hvdyBzaGlwICBzdW5rIHN0YXRlIGJ5IGNyZWF0aW5nIGNsYXNzIG5hbWUgdXNpbmcgcGxheWVyIG5hbWUgdG8gdXBkYXRlXG5mdW5jdGlvbiBkcmF3TWluaVNoaXBzKGVsZSwgcGxheWVyKSB7XG4gIGNvbnN0IG1pbmlGbGVldHMgPSBgXG4gIDxkaXYgY2xhc3M9XCJmbGVldC1ob2xkZXIgJHtwbGF5ZXJ9XCI+XG4gICAgPGRpdiBjbGFzcz1cIm1pbmktc2hpcC1vd25lclwiPiR7cGxheWVyfTwvZGl2PlxuPGRpdiBjbGFzcz1cIm1pbmktY2FycmllciAgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J2NhcnJpZXInPjwvZGl2PlxuPGRpdiBjbGFzcz1cIm1pbmktYmF0dGxlU2hpcCAgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J2JhdHRsZVNoaXAnPjwvZGl2PlxuPGRpdiBjbGFzcz1cInNhbWUtc2l6ZS1zaGlwc1wiPlxuICA8ZGl2IGNsYXNzPVwibWluaS1kZXN0cm95ZXIgIG1pbmktc2hpcC1zaXplXCIgZGF0YS1uYW1lPSdkZXN0cm95ZXInPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWluaS1zdWJtYXJpbmUgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J3N1Ym1hcmluZSc+PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtaW5pLXBhdHJvbCBtaW5pLXNoaXAtc2l6ZVwiIGRhdGEtbmFtZT0ncGF0cm9sJz48L2Rpdj5cbjwvZGl2PmA7XG4gIGVsZS5pbm5lckhUTUwgPSBtaW5pRmxlZXRzO1xufVxuLy9mdW5jdGlvbiBhY2NlcHQgbWluaSBzaGlwcyBkaXZzLCBzdW5rIHNoaXAgbmFtZXMgYXMgYW4gYXJyYXkgYW5kIGNoYW5nZSBjb2xvciBvZiBkaXZzIHVzaW5nIGRhdGFzZXQgc2FtZSBhcyBzaGlwIG5hbWVcblxuZnVuY3Rpb24gdXBkYXRlTWluaVNoaXBzKHNoaXBzRGl2LCBzdW5rU2hpcEFycmF5LCBjb2xvcikge1xuICBpZiAoc3Vua1NoaXBBcnJheS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgc2hpcHNEaXYuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHN1bmtTaGlwQXJyYXkuZm9yRWFjaCgoc3Vua1NoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmRhdGFzZXQubmFtZSA9PT0gc3Vua1NoaXApIHtcbiAgICAgICAgc2hpcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtjb2xvcn1gO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHdpbm5lck1vZGFsKG1zZykge1xuICBjb25zdCB3aW5uZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2lubmVyXVwiKTtcbiAgY29uc3QgaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdGVtcGxhdGUgPSBgICA8ZGlhbG9nIGRhdGEtd2lubmVyLW1vZGFsIGNsYXNzPVwid2lubmVyLW1vZGFsXCI+XG4gIDxkaXYgY2xhc3M9XCJ3aW5uZXItaG9sZGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cIndpbm5lci1ib2FyZFwiIGRhdGEtd2lubmVyPiR7bXNnfTwvZGl2PlxuICAgIDxidXR0b24gY2xhc3M9XCJyZW1hdGNoLWJ0blwiIGRhdGEtcmVtYXRjaC1idG4+UmVtYXRjaDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGlhbG9nPmA7XG4gIHdpbm5lckRpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGhvbGRlci5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgd2lubmVyRGl2LmFwcGVuZENoaWxkKGhvbGRlcik7XG59XG5cbi8vZm9ybSB0byBhY2NlcHQgcGxheWVycyBuYW1lXG5mdW5jdGlvbiBmb3JtVGVtcGxhdGUoZWxlKSB7XG4gIGNvbnN0IHRlbXBsYXRlID0gYCA8Zm9ybSBmb3I9XCJwbGF5ZXItbmFtZVwiPlxuPGRpdiBjbGFzcz1cImlucHV0LWhvbGRlclwiPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgaWQ9XCJwbGF5ZXItb25lLW5hbWVcIlxuICAgIGNsYXNzPVwicGxheWVyLW5hbWUtaW5wdXRcIlxuICAgIGRhdGEtcGxheWVyLW9uZVxuICAgIHJlcXVpcmVkXG4gIC8+XG4gIDxsYWJlbCBmb3I9XCJwbGF5ZXItb25lLW5hbWVcIiBjbGFzcz1cInBsYXllci1vbmUtbGFiZWxcIlxuICAgID5QbGF5ZXItT25lLU5hbWU6PC9sYWJlbFxuICA+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJpbnB1dC1ob2xkZXJcIj5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIGlkPVwicGxheWVyLXR3by1uYW1lXCJcbiAgICBjbGFzcz1cInBsYXllci1uYW1lLWlucHV0XCJcbiAgICBkYXRhLXBsYXllci10d29cbiAgICByZXF1aXJlZFxuICAvPlxuICA8bGFiZWwgZm9yPVwicGxheWVyLXR3by1uYW1lXCIgY2xhc3M9XCJwbGF5ZXItdHdvLWxhYmVsXCIgZGF0YS1wbGF5ZXJUd29cbiAgICA+UGxheWVyIFR3byBOYW1lOjwvbGFiZWxcbiAgPlxuPC9kaXY+XG48YnV0dG9uIGRhdGEtc3VibWl0LW5hbWUgY2xhc3M9XCJzdWJtaXQtYnRuXCIgPlN0YXJ0PC9idXR0b24+XG48L2Zvcm0+YDtcbiAgZWxlLmlubmVySFRNTCA9IHRlbXBsYXRlO1xufVxuXG4vL2ZpeCBncmFtbWVyXG5mdW5jdGlvbiBmaXhUeXBvKHBsYXllck9uZU5hbWUsIHBsYXllclR3b05hbWUpIHtcbiAgY29uc3QgbWluaVNoaXBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWluaS1zaGlwLW93bmVyXCIpO1xuICBjb25zdCB0dXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItdHVyblwiKTtcbiAgY29uc3QgZGl2QXJyYXkgPSBbLi4ubWluaVNoaXBCb2FyZF07XG4gIGRpdkFycmF5WzBdLnN0eWxlLmNvbG9yID0gXCIjMDBmZjNlXCI7XG4gIGRpdkFycmF5WzFdLnN0eWxlLmNvbG9yID0gXCIjMWZkMWNlXCI7XG4gIGlmIChwbGF5ZXJPbmVOYW1lICE9PSBcInlvdVwiKSB7XG4gICAgZGl2QXJyYXlbMF0udGV4dENvbnRlbnQgPSBgJHtwbGF5ZXJPbmVOYW1lfSdzIGZsZWV0YDtcbiAgICBkaXZBcnJheVsxXS50ZXh0Q29udGVudCA9IGAke3BsYXllclR3b05hbWV9J3MgZmxlZXRgO1xuICB9IGVsc2UgaWYgKHBsYXllck9uZU5hbWUgPT09IFwieW91XCIpIHtcbiAgICBkaXZBcnJheVswXS50ZXh0Q29udGVudCA9IGAke3BsYXllck9uZU5hbWV9J3JlIGZsZWV0YDtcbiAgICBkaXZBcnJheVsxXS50ZXh0Q29udGVudCA9IGAke3BsYXllclR3b05hbWV9J3MgZmxlZXRgO1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSBgWW91J3JlIHR1cm5gO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIHNjcmVlbkNvbnRyb2xsZXIsXG4gIHRlbXBsYXRlU2hpcEdyaWQsXG4gIHNoaXBzUGxhY2VtZW50LFxuICBkcmFnU2hpcHMsXG4gIGNvdW50ZG93bk1vZGFsLFxuICByYW5kb21QbGFjZW1lbnQsXG4gIGRyYXdGaXJzdFBhZ2UsXG4gIGludHJvUGFnZSxcbiAgZm9ybVRlbXBsYXRlLFxufTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCwgU2hpcCB9IGZyb20gXCIuLi91dGlsaXR5XCI7XG5mdW5jdGlvbiByZVBvc2l0aW9uKHBsYXllciwgc2hpcHNBcnJheSwgc2hpcCkge1xuICAvL2lmIHRoZSBzaGlwIGlzIGxlbmd0aCAyIGJ1dHMgaXQncyBwb3NpdGlvbiBwcm9wZXJ0eVxuICAvLyBjb250YWluIG1vcmUgdGhhbiAyIGNvb3JkaW5hdGUgcmVtb3ZlIHRob3NlIGV4Y2VwdCB0aGUgbGFzdCB0d28gYW5kIHVwZGF0ZVxuICBjb25zdCBhbGxTaGlwUG9zaXRpb25zID0gcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zO1xuICBjb25zdCBjZWxsc1RvUmVtb3ZlZCA9IHNoaXBzQXJyYXkuc2xpY2UoMCwgc2hpcHNBcnJheS5sZW5ndGggLSBzaGlwLmxlbmd0aCk7XG4gIGNlbGxzVG9SZW1vdmVkLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBhbGxTaGlwUG9zaXRpb25zLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChjb29yZGluYXRlLnRvU3RyaW5nKCkgPT09IGNlbGwudG9TdHJpbmcoKSkge1xuICAgICAgICAvL3VwZGF0ZSBvYmpcbiAgICAgICAgYWxsU2hpcFBvc2l0aW9ucy5zcGxpY2UoYWxsU2hpcFBvc2l0aW9ucy5pbmRleE9mKGNvb3JkaW5hdGUpLCAxKTtcbiAgICAgICAgc2hpcHNBcnJheS5zcGxpY2Uoc2hpcHNBcnJheS5pbmRleE9mKGNlbGwpLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBwbGFjZVBsYXllclNoaXBIb3Jpem9udGFsKHBsYXllciwgaW5kZXgsIHNoaXApIHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBwbGF5ZXIuYm9hcmQuY29vcmRpbmF0ZXNIYXNoTWFwO1xuICBjb25zdCBjb252ZXJ0SW5kZXggPSBjb29yZGluYXRlcy5nZXQoTnVtYmVyKGluZGV4KSk7XG4gIGNvbnN0IHNoaXBDZWxscyA9IHBsYXllci5ib2FyZC5wbGFjZVZlcnRpY2FsKGNvbnZlcnRJbmRleCwgc2hpcCk7XG4gIGNvbnN0IHRha2VuQ2VsbHMgPSBzaGlwLnBvc2l0aW9ucztcbiAgaWYgKHNoaXAucG9zaXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vb2NjdXBpZWQgcmV0dXJuIG51bGxcbiAgICBpZiAoc2hpcENlbGxzID09PSBudWxsKSB7XG4gICAgICBwbGF5ZXIuYm9hcmQucGxhY2VSYW5kb20oc2hpcCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlUG9zaXRpb24ocGxheWVyLCB0YWtlbkNlbGxzLCBzaGlwKTtcbiAgfVxufVxuZnVuY3Rpb24gcGxhY2VQbGF5ZXJTaGlwVmVydGljYWwocGxheWVyLCBpbmRleCwgc2hpcCkge1xuICBjb25zdCBjb29yZGluYXRlcyA9IHBsYXllci5ib2FyZC5jb29yZGluYXRlc0hhc2hNYXA7XG4gIGNvbnN0IGNvbnZlcnRJbmRleCA9IGNvb3JkaW5hdGVzLmdldChOdW1iZXIoaW5kZXgpKTtcbiAgY29uc3QgdGFrZW5DZWxscyA9IHNoaXAucG9zaXRpb25zO1xuICBpZiAoc2hpcC5wb3NpdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlSG9yaXpvbnRhbChjb252ZXJ0SW5kZXgsIHNoaXApO1xuICB9IGVsc2Uge1xuICAgIHJlUG9zaXRpb24ocGxheWVyLCB0YWtlbkNlbGxzLCBzaGlwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3R3JpZHMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICByZXR1cm4gZ3JpZDtcbn1cblxuZnVuY3Rpb24gYWxsb3dEcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuZnVuY3Rpb24gZHJhZyhlKSB7XG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGUudGFyZ2V0LmlkKTtcbn1cbmZ1bmN0aW9uIGRyb3AoZSwgbmV3UGxheWVyKSB7XG4gIGNvbnN0IHNoaXBzID0gbmV3UGxheWVyLmJvYXJkLnNoaXBzQXJyYXk7XG4gIGNvbnN0IGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgLy9pZiB0aGUgc2hpcCBpcyBvdmVyIG9uIHRoZSB0b3Agb2YgYW5vdGhlciBzaGlwIGl0IHJldHVybiB1bmRlZmluZWRcbiAgaWYgKGluZGV4ID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZGF0YSA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpO1xuICAgIGNvbnN0IGRyYWdnZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKTtcbiAgICBjb25zdCBzaGlwRGlyZWN0aW9uID0gZ2V0U2hpcERpcmVjdGlvbkNsYXNzKGRyYWdnZWQsIGRhdGEpO1xuICAgIGNvbnN0IHNoaXBJbmRleCA9IHdoaWNoU2hpcENsaWNrZWQoc2hpcHMsIGRhdGEpO1xuICAgIGUudGFyZ2V0LmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGlmIChzaGlwRGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgcGxhY2VQbGF5ZXJTaGlwSG9yaXpvbnRhbChuZXdQbGF5ZXIsIGluZGV4LCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgcGxhY2VQbGF5ZXJTaGlwVmVydGljYWwobmV3UGxheWVyLCBpbmRleCwgc2hpcHNbc2hpcEluZGV4XSk7XG4gICAgfVxuICB9XG59XG5cbi8vIHB1dCBzaGlwIGRpcmVjdGlvbiBjbGFzcyBhdCBsYXN0IGFuZCB0byBjaGFuZ2UgaXQgdG8gaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuZnVuY3Rpb24gZ2V0U2hpcERpcmVjdGlvbkNsYXNzKGVsZW1lbnQsIG5hbWUpIHtcbiAgY29uc3Qgc2hpcE5hbWUgPSBuYW1lO1xuICBjb25zdCBhbGxDbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gIGNvbnN0IGRpcmVjdGlvbkNsYXNzID0gYWxsQ2xhc3NOYW1lW2FsbENsYXNzTmFtZS5sZW5ndGggLSAxXS5zcGxpdChcIi1cIik7XG4gIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBkaXJlY3Rpb25DbGFzc1sxXTtcbiAgcmV0dXJuIHNoaXBEaXJlY3Rpb247XG59XG4vL2ZsaXAgdGhlIHNoaXAgZGlyZWN0aW9uIG9uIGNsaWNrIGlmIGl0IGlzIHZhbGlkXG5mdW5jdGlvbiBmbGlwKGUsIG5ld1BsYXllcikge1xuICBjb25zdCBzaGlwcyA9IG5ld1BsYXllci5ib2FyZC5zaGlwc0FycmF5O1xuICBjb25zdCBzaGlwID0gZS50YXJnZXQ7XG4gIGNvbnN0IHNoaXBOYW1lID0gZS50YXJnZXQuaWQ7XG4gIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBnZXRTaGlwRGlyZWN0aW9uQ2xhc3Moc2hpcCwgc2hpcE5hbWUpO1xuICBjb25zdCBpbmRleCA9IHdoaWNoU2hpcENsaWNrZWQoc2hpcHMsIHNoaXBOYW1lKTtcblxuICBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBwb3NpdGlvblRlbXBTaGlwKHNoaXBzLCBpbmRleCwgXCJ2ZXJ0aWNhbFwiLCBuZXdQbGF5ZXIpO1xuICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShgJHtzaGlwTmFtZX0taG9yaXpvbnRhbGApO1xuICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKGAke3NoaXBOYW1lfS12ZXJ0aWNhbGApO1xuICAgIH1cbiAgfSBlbHNlIGlmIChzaGlwRGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBwb3NpdGlvblRlbXBTaGlwKHNoaXBzLCBpbmRleCwgXCJob3Jpem9udGFsXCIsIG5ld1BsYXllcik7XG4gICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKGAke3NoaXBOYW1lfS12ZXJ0aWNhbGApO1xuICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKGAke3NoaXBOYW1lfS1ob3Jpem9udGFsYCk7XG4gICAgfVxuICB9XG5cbiAgLy9mdW5jdGlvbiBhY2NlcHQgc2hpcHMgYXJyYXksIGluZGV4ICBvZiB0aGUgc2hpcCxmbGlwIGRpcmVjdGlvbiBhbmQgcGxheWVyICB0byByZXBsaWNhdGUgdGhhdCBzaGlwIGluXG4gIC8vZGlmZmVyZW50IHBvc2l0aW9ucyhkaXJlY3Rpb24pIGFuZCByZXR1cm4gYm9vbGVhbiBmb3IgZWFjaCBwb3NpdGlvbiBhbmQgZmxpcCBmb3IgdmFsaWQgZGlyZWN0aW9uXG4gIGZ1bmN0aW9uIHBvc2l0aW9uVGVtcFNoaXAoc2hpcHMsIGluZGV4LCBkaXJlY3Rpb24sIHBsYXllcikge1xuICAgIGNvbnN0IGZpcnN0Q29vcmRpbmF0ZSA9IHNoaXBzW2luZGV4XS5wb3NpdGlvbnNbMF07XG4gICAgY29uc3QgdGVtcFNoaXAgPSBTaGlwKHNoaXBzW2luZGV4XS5zaGlwTmFtZSwgc2hpcHNbaW5kZXhdLmxlbmd0aCk7XG4gICAgY29uc3QgdGVtcFNoaXBzID0gW107XG4gICAgdGVtcFNoaXBzLnB1c2godGVtcFNoaXApO1xuICAgIGNvbnN0IHRlbXBCb2FyZCA9IEdhbWVCb2FyZCh0ZW1wU2hpcCk7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIHRlbXBCb2FyZC5wbGFjZVZlcnRpY2FsKGZpcnN0Q29vcmRpbmF0ZSwgdGVtcFNoaXApO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIHRlbXBCb2FyZC5wbGFjZUhvcml6b250YWwoZmlyc3RDb29yZGluYXRlLCB0ZW1wU2hpcCk7XG4gICAgfVxuICAgIC8vY2hlY2sgdGhlIG5ldyBwb3NpdGlvbiBleGNlcHQgdGhlIGZpcnN0IGNvb3JkaW5hdGVcbiAgICBjb25zdCByZXN1bHQgPSBpc0Nvb3JkaW5hdGVGcmVlKFxuICAgICAgdGVtcFNoaXAucG9zaXRpb25zLnNsaWNlKDEpLFxuICAgICAgcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zXG4gICAgKTtcbiAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAvL3VwZGF0ZSBzaGlwIHBvc2l0aW9uIGluIHNoaXAgYW5kIHBsYXllciBvYmplY3RcbiAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gdGVtcFNoaXAucG9zaXRpb25zO1xuICAgICAgcmVtb3ZlQ29vcmRpbmF0ZShzaGlwc1tpbmRleF0ucG9zaXRpb25zLCBwbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMpO1xuICAgICAgc2hpcHNbaW5kZXhdLnBvc2l0aW9ucyA9IFtdO1xuICAgICAgc2hpcHNbaW5kZXhdLnBvc2l0aW9ucyA9IG5ld1Bvc2l0aW9uO1xuICAgICAgbmV3UG9zaXRpb24uZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgICBwbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMucHVzaChjb29yZGluYXRlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4vL2dldCBzcGVjaWZpYyBzaGlwIGZyb20gc2hpcHMgb2JqZWN0IGFycmF5XG5mdW5jdGlvbiB3aGljaFNoaXBDbGlja2VkKGFycmF5LCBzaGlwTmFtZSkge1xuICBsZXQgaW5kZXggPSBudWxsO1xuICBhcnJheS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgaWYgKChzaGlwLnNoaXBOYW1lLnRvU3RyaW5nKCkgPT09IHNoaXBOYW1lLnRvU3RyaW5nKCkpID09PSB0cnVlKSB7XG4gICAgICBpbmRleCA9IGFycmF5LmluZGV4T2Yoc2hpcCk7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGluZGV4O1xufVxuLy9yZW1vdmUgY29vcmRpbmF0ZSBmb3IgZmxpcCBzaGlwc1xuZnVuY3Rpb24gcmVtb3ZlQ29vcmRpbmF0ZShzaGlwUG9zaXRpb24sIHRha2VuUG9zaXRpb25zKSB7XG4gIHNoaXBQb3NpdGlvbi5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIHRha2VuUG9zaXRpb25zLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChjb29yZGluYXRlLnRvU3RyaW5nKCkgPT09IHBvc2l0aW9uLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgdGFrZW5Qb3NpdGlvbnMuc3BsaWNlKHRha2VuUG9zaXRpb25zLmluZGV4T2YoY29vcmRpbmF0ZSksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbi8vY2hlY2sgdGhlIGNlbGwgaXMgZnJlZVxuZnVuY3Rpb24gaXNDb29yZGluYXRlRnJlZShzaGlwUG9zaXRpb24sIHRha2VuUG9zaXRpb25zKSB7XG4gIGxldCByZXN1bHQgPSB0cnVlO1xuICBzaGlwUG9zaXRpb24uZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIHRha2VuUG9zaXRpb25zLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChjZWxsLnRvU3RyaW5nKCkgPT09IGNvb3JkaW5hdGUudG9TdHJpbmcoKSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4vL2RyYXcgZHJhZ2dlZCBhbmQgZHJvcHBlZCBzaGlwcyB0byBpbml0aWFsaXplLCBpdCB1c2Ugc2hpcCBvYmplY3QgcHJvcGVydGllc1xuZnVuY3Rpb24gZHJhd1NoaXBzKHNoaXBzKSB7XG4gIGNvbnN0IGRpdkhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpdkhvbGRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRyb3Atc2hpcHNcIik7XG4gIGRpdkhvbGRlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtzaGlwLnNoaXBOYW1lfWApO1xuICAgIGRpdi5kYXRhc2V0Lmxlbmd0aCA9IGAke3NoaXAubGVuZ3RofWA7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwic2hpcC1zaXplXCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKGAke3NoaXAuc2hpcE5hbWV9LWhvcml6b250YWxgKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgICBkaXZIb2xkZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfSk7XG4gIHJldHVybiBkaXZIb2xkZXI7XG59XG5cbmZ1bmN0aW9uIGRyYWdTaGlwcyhuZXdQbGF5ZXIsIHNoaXBzKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtY29udGFpbmVyXCIpO1xuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zaGlwcy1jb250YWluZXJdXCIpO1xuICBjb25zdCBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5LWJ0blwiKTtcbiAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkcmF3R3JpZHMoKSk7XG4gIHNoaXBzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgc2hpcHNDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkcmF3U2hpcHMoc2hpcHMpKTtcbiAgc2hpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBjb25zdCBzaGlwc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuICBzaGlwc0Rpdi5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICBkcmFnKGUpO1xuICAgIH0pO1xuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBmbGlwKGUsIG5ld1BsYXllcik7XG4gICAgfSk7XG4gIH0pO1xuICAvL2Ryb3Agem9uZSBvciBncmlkIGNlbGxzXG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgYWxsb3dEcm9wKGUpO1xuICAgIH0pO1xuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgICAgZHJvcChlLCBuZXdQbGF5ZXIpO1xuICAgICAgY29uc3QgdG90YWxMZW5ndGggPSBuZXdQbGF5ZXIuYm9hcmQuc2hpcHNBcnJheS5yZWR1Y2UoKHRvdGFsLCBzaGlwKSA9PiB7XG4gICAgICAgIHJldHVybiAodG90YWwgKz0gc2hpcC5sZW5ndGgpO1xuICAgICAgfSwgMCk7XG4gICAgICAvL2NoZWNrIGFsbCBzaGlwIGxlbmd0aCBzdW0gaXMgZXF1YWwgdG8gdG90YWwgc2hpcCBkcm9wcGVkIGFuZCB1cGRhdGUgcGxheWVyIG9iamVjdFxuICAgICAgaWYgKG5ld1BsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPT09IHRvdGFsTGVuZ3RoKSB7XG4gICAgICAgIHBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiByYW5kb21seVBsYWNlU2hpcHMocGxheWVyKSB7XG4gIHBsYXllci5ib2FyZC5zaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VSYW5kb20oc2hpcCk7XG4gIH0pO1xuICByZXR1cm4gcGxheWVyO1xufVxuZXhwb3J0IHsgZHJhd0dyaWRzLCBkcmFnU2hpcHMsIHJhbmRvbWx5UGxhY2VTaGlwcyB9O1xuIiwiLy9pbXBvcnQgeyBzaGlwcyB9IGZyb20gXCIuL2RvbS1zdHVmZlwiO1xuXG4vKipcbiAqc2hpcCAgaGFzIG5hbWUsbGVuZ3RoIGFuZCBoaXRzLHBvc2l0aW9uIGFzIHByb3BlcnR5IGFuZCBpc1N1bmsgYW5kIGhpdCBhcyBtZXRob2RcbiAqc2hpcC5wb3NpdGlvbiAtIGlzIGFuIGFycmF5IHRoYXQgaG9sZCBjb29yZGluYXRlcyBvZiB0aGUgc2hpcC5cbiAqc2hpcC5pc1N1bmsoKSAtIHRvIGNoZWNrIHRoZSBzaGlwIGlzIHN1bmsgb3Igbm90IHJldHVybiBib29sZWFuXG4gKnNoaXAuaGl0KHNoaXAuaGl0cykgLSBpbmNyZWFzZSBzaGlwIGhpdHMgb24gYnkgb25lIGVhY2ggdGltZSBpdCBpcyBjYWxsZWQuXG4gKiBAcGFyYW0geyp9IHNoaXBOYW1lXG4gKiBAcGFyYW0geyp9IGxlbmd0aFxuICovXG5mdW5jdGlvbiBTaGlwKHNoaXBOYW1lLCBsZW5ndGgpIHtcbiAgY29uc3QgaGl0cyA9IDA7XG4gIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMrKztcbiAgfVxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIGxlbmd0aCA8PSB0aGlzLmhpdHMgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNoaXBOYW1lLFxuICAgIGxlbmd0aCxcbiAgICBoaXRzLFxuICAgIHBvc2l0aW9uczogW10sXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn1cbi8qKlxuICogR2FtZUJvYXJkLmNyZWF0ZUJvYXJkIC0gY3JlYXRlcyBib2FyZCB3aXRoIFt4LHldIGNvb3JkaW5hdGUgYmFzZWQgb24gcm93IGFuZCBjb2x1bW4gbnVtYmVyIFxuICogYW5kIHJldHVybiBib2FyZCBhbmQgdHdvIGhhc2htYXAgdGhhdCBjb250YWluIG51bWJlciBhbmQgY29ycmVzcG9uZGluZyBjb29yZGluYXRlKDAsIFswLDBdKSBhbmQgdGhlIHNlY29uZCBvbmUgaW52ZXJzZSAoWzAsMF0sIDApLlxuICogXG4gKiBHYW1lQm9hcmQucG9zaXRpb24oYXJyYXksbGVuZ3RoKSAtIGFjY2VwdCBjb29yZGluYXRlW3gsIHldIGFuZCBzaGlwIGxlbmd0aCB0aGVuIGNhbGN1bGF0ZSB0aGUgc3BhY2UgdGhlIHNoaXAgdGFrZXMgb24gMTAgeCAxMCBib2FyZCBhbmQgXG4gKiByZXR1cm4gYXJyYXkgb2YgY29vcmRpbmF0ZXMuXG4gKlxuICogR2FtZUJvYXJkLnJhbmRvbWx5UG9zaXRpb24obGVuZ3RoKSAtIGFjY2VwdCBzaGlwIGxlbmd0aCB0aGVuIHJldHVybiB2ZXJ0aWNhbCBvciBob3Jpem9udGFsIGNlbGwgXG4gKiB0aGF0IHRoZSBzaGlwIHdpbGwgdGFrZXMgY29vcmRpbmF0ZXMgYXMgYW4gYXJyYXkgYnkgY2FsbGluZyBpdCBzZWxmIHJlY3Vyc2l2ZWx5IGlmIHRoZSBwb3NpdGlvbiBvY2N1cGllZC5cbiAqIFxuICogR2FtZUJvYXJkLnBsYWNlVmVydGljYWwgJiYgR2FtZUJvYXJkLiBwbGFjZUhvcml6b250YWwgLSBtZXRob2RzIHVzZSB0byBwbGFjZSBzaGlwIG1hbnVhbGx5IGJ5IGFjY2VwdGluZyBjb29yZGluYXRlcyhbeCx5XSBhbmQgc2hpcCkgcmV0dXJuIGFycmF5IG9mIGNvb3JkaW5hdGUgdGhlIHNoaXAgd2lsbCB0YWtlLlxuICogYW5kIHVwZGF0ZSBzaGlwcyBwb3NpdGlvbiBhbmQgc3RvcmUgY29vcmRpbmF0ZSB0byB0aGUgc2hpcC5cbiAqICBcbiAqIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrIC0gYWNjZXB0IGNvb3JkaW5hdGUgW3gseV0gLGNoZWNrIGl0IGlzIG1pc3NlZCBvciBoaXQgc2hvdCAscmVwb3J0IGFsbCB0aGUgc2hpcCBpcyBzdW5rIG9yIG5vdCBcbiAqIGFuZCBjYWxsIGhpdCBvbiBzcGVjaWZpYyBzaGlwIGlmIGl0IGlzIGEgaGl0LiBcblxuICovXG5mdW5jdGlvbiBHYW1lQm9hcmQoc2hpcHNBcnJheSkge1xuICBjb25zdCBzaGlwc1Bvc2l0aW9ucyA9IFtdO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKDEwLCAxMCk7XG4gIGNvbnN0IGNvb3JkaW5hdGVzSGFzaE1hcCA9IGJvYXJkLmFsbENvb3JkaW5hdGVzO1xuICBjb25zdCBpbnZlcnNlSGFzaE1hcCA9IGJvYXJkLmludmVyc2VDb29yZGluYXRlO1xuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuICBjb25zdCBoaXRTaG90cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKHJvdywgY29sKSB7XG4gICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICBjb25zdCBhbGxDb29yZGluYXRlcyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBpbnZlcnNlQ29vcmRpbmF0ZSA9IG5ldyBNYXAoKTtcbiAgICBsZXQgayA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICB9XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCByb3c7IHgrKykge1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjb2w7IHkrKykge1xuICAgICAgICBib2FyZFt4XVt5XSA9IFt4LCB5XTtcbiAgICAgICAgYWxsQ29vcmRpbmF0ZXMuc2V0KGssIFt4LCB5XSk7XG4gICAgICAgIGludmVyc2VDb29yZGluYXRlLnNldChbeCwgeV0udG9TdHJpbmcoKSwgayk7XG4gICAgICAgIGsrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgYm9hcmQsIGFsbENvb3JkaW5hdGVzLCBpbnZlcnNlQ29vcmRpbmF0ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gUG9zaXRpb24oY29vcmRpbmF0ZSwgc2hpcExlbmd0aCkge1xuICAgIGNvbnN0IGhvcml6b250YWwgPSBbXTtcbiAgICBjb25zdCB2ZXJ0aWNhbCA9IFtdO1xuICAgIGNvbnN0IHggPSBjb29yZGluYXRlWzBdO1xuICAgIGNvbnN0IHkgPSBjb29yZGluYXRlWzFdO1xuICAgIC8vW3gseV0gPSBpZiB4ICsgbGVuZ3RoIDwgbGVuZ3RoXG4gICAgaWYgKHggKyBzaGlwTGVuZ3RoIDwgMTAgJiYgeSArIHNoaXBMZW5ndGggPCAxMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaG9yaXpvbnRhbC5wdXNoKFt4ICsgaSwgeV0pO1xuICAgICAgICB2ZXJ0aWNhbC5wdXNoKFt4LCB5ICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeCArIHNoaXBMZW5ndGggPj0gMTAgJiYgeSArIHNoaXBMZW5ndGggPj0gMTApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhvcml6b250YWwucHVzaChbeCAtIGksIHldKTtcbiAgICAgICAgdmVydGljYWwucHVzaChbeCwgeSAtIGldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHggKyBzaGlwTGVuZ3RoID49IDEwICYmIHkgKyBzaGlwTGVuZ3RoIDwgMTApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhvcml6b250YWwucHVzaChbeCAtIGksIHldKTtcbiAgICAgICAgdmVydGljYWwucHVzaChbeCwgeSArIGldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHggKyBzaGlwTGVuZ3RoIDwgMTAgJiYgeSArIHNoaXBMZW5ndGggPj0gMTApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhvcml6b250YWwucHVzaChbeCArIGksIHldKTtcbiAgICAgICAgdmVydGljYWwucHVzaChbeCwgeSAtIGldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgaG9yaXpvbnRhbCwgdmVydGljYWwgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlVmVydGljYWwoY29vcmRpbmF0ZSwgc2hpcCkge1xuICAgIGNvbnN0IHNoaXBDZWxscyA9IFBvc2l0aW9uKGNvb3JkaW5hdGUsIHNoaXAubGVuZ3RoKS52ZXJ0aWNhbDtcbiAgICBpZiAoaXNDb29yZGluYXRlRnJlZShzaGlwQ2VsbHMsIHNoaXBzUG9zaXRpb25zKSA9PT0gZmFsc2UpIHJldHVybiBudWxsO1xuICAgIHR3b0RpbWVuc2lvbkFycmF5KHNoaXBDZWxscywgc2hpcHNQb3NpdGlvbnMpO1xuICAgIHR3b0RpbWVuc2lvbkFycmF5KHNoaXBDZWxscywgc2hpcC5wb3NpdGlvbnMpO1xuICAgIHJldHVybiBzaGlwQ2VsbHM7XG4gIH1cbiAgZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsKGNvb3JkaW5hdGUsIHNoaXApIHtcbiAgICBjb25zdCBzaGlwQ2VsbHMgPSBQb3NpdGlvbihjb29yZGluYXRlLCBzaGlwLmxlbmd0aCkuaG9yaXpvbnRhbDtcbiAgICBpZiAoaXNDb29yZGluYXRlRnJlZShzaGlwQ2VsbHMsIHNoaXBzUG9zaXRpb25zKSA9PT0gZmFsc2UpIHJldHVybiBudWxsO1xuICAgIHR3b0RpbWVuc2lvbkFycmF5KHNoaXBDZWxscywgc2hpcHNQb3NpdGlvbnMpO1xuICAgIHR3b0RpbWVuc2lvbkFycmF5KHNoaXBDZWxscywgc2hpcC5wb3NpdGlvbnMpO1xuICAgIHJldHVybiBzaGlwQ2VsbHM7XG4gIH1cblxuICBmdW5jdGlvbiByYW5kb21GcmVlQ29vcmRpbmF0ZSgpIHtcbiAgICBjb25zdCByYW5kb21OdW0gPSByYW5kb21DZWxsKDEwMCk7XG4gICAgY29uc3QgcmVsYXRlZENvb3JkaW5hdGUgPSBjb29yZGluYXRlc0hhc2hNYXAuZ2V0KHJhbmRvbU51bSk7XG4gICAgaWYgKHNoaXBzUG9zaXRpb25zLmluY2x1ZGVzKHJlbGF0ZWRDb29yZGluYXRlKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiByZWxhdGVkQ29vcmRpbmF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJhbmRvbUZyZWVDb29yZGluYXRlKCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHJhbmRvbUNlbGwobnVtKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Nvb3JkaW5hdGVGcmVlKHNoaXBQb3NpdGlvbiwgdGFrZW5Qb3NpdGlvbnMpIHtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBzaGlwUG9zaXRpb24uZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgdGFrZW5Qb3NpdGlvbnMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgICBpZiAoY2VsbC50b1N0cmluZygpID09PSBjb29yZGluYXRlLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIHNoaXBEaXJlY3Rpb24oKSB7XG4gICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5yYW5kb20oKSA+PSAwLjU7XG4gICAgcmV0dXJuIHJhbmRvbU51bSA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICB9XG4gIGZ1bmN0aW9uIHBsYWNlUmFuZG9tKHNoaXApIHtcbiAgICBjb25zdCBuZXdQb3NpdGlvbiA9IHJhbmRvbWx5UG9zaXRpb24oc2hpcC5sZW5ndGgpO1xuICAgIG5ld1Bvc2l0aW9uLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIHNoaXAucG9zaXRpb25zLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgICBzaGlwc1Bvc2l0aW9ucy5wdXNoKGNvb3JkaW5hdGUpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXdQb3NpdGlvbjtcbiAgfVxuICBmdW5jdGlvbiByYW5kb21seVBvc2l0aW9uKHNoaXBMZW5ndGgpIHtcbiAgICBjb25zdCBzaWRlID0gc2hpcERpcmVjdGlvbigpO1xuICAgIGlmIChzaWRlID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IHJhbmRvbUZyZWVDb29yZGluYXRlKCk7XG4gICAgICBjb25zdCBzcGFjZVRha2VuID0gUG9zaXRpb24oY29vcmRpbmF0ZSwgc2hpcExlbmd0aCkuaG9yaXpvbnRhbDtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGlzQ29vcmRpbmF0ZUZyZWUoc3BhY2VUYWtlbiwgc2hpcHNQb3NpdGlvbnMpO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBzcGFjZVRha2VuO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiByYW5kb21seVBvc2l0aW9uKHNoaXBMZW5ndGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2lkZSA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gcmFuZG9tRnJlZUNvb3JkaW5hdGUoKTtcbiAgICAgIGNvbnN0IHNwYWNlVGFrZW4gPSBQb3NpdGlvbihjb29yZGluYXRlLCBzaGlwTGVuZ3RoKS52ZXJ0aWNhbDtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGlzQ29vcmRpbmF0ZUZyZWUoc3BhY2VUYWtlbiwgc2hpcHNQb3NpdGlvbnMpO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBzcGFjZVRha2VuO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiByYW5kb21seVBvc2l0aW9uKHNoaXBMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvL2Z1bmN0aW9uIHRvIGNvbXBhcmUgY29vcmRpbmF0ZSBleGlzdCBpbiBhcnJheSBvZiBjb29yZGluYXRlcyAgYnkgY2hhbmdpbmcgdGhlbSB0byBzdHJpbmcgZmlyc3QgcmV0dXJuIGJvb2xlYW5cblxuICBmdW5jdGlvbiBjaGVja0Nvb3JkaW5hdGUoY29vcmRpbmF0ZSwgYXJyYXkpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgYXJyYXkuZm9yRWFjaCgocG9zaXRpb24pID0+IHtcbiAgICAgIGlmIChjb29yZGluYXRlLnRvU3RyaW5nKCkgPT09IHBvc2l0aW9uLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGlzSGl0KGNvb3JkaW5hdGUsIGFycmF5KSB7XG4gICAgcmV0dXJuIGNoZWNrQ29vcmRpbmF0ZShjb29yZGluYXRlLCBhcnJheSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlKSB7XG4gICAgaWYgKGlzSGl0KGNvb3JkaW5hdGUsIHNoaXBzUG9zaXRpb25zKSA9PT0gdHJ1ZSkge1xuICAgICAgc2hpcHNBcnJheS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChjaGVja0Nvb3JkaW5hdGUoY29vcmRpbmF0ZSwgc2hpcC5wb3NpdGlvbnMpID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hpcC5oaXQoKTtcblxuICAgICAgICAgIGhpdFNob3RzLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzSGl0KGNvb3JkaW5hdGUsIHNoaXBzUG9zaXRpb25zKSA9PT0gZmFsc2UpIHtcbiAgICAgIG1pc3NlZFNob3RzLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gc2hpcHNQb3NpdGlvbnMubGVuZ3RoIDw9IGhpdFNob3RzLmxlbmd0aDtcbiAgfVxuICBmdW5jdGlvbiB0d29EaW1lbnNpb25BcnJheSh0d29EaW1lbnNpb25BcnJheSwgb25lRGltZW5zaW9uQXJyYXkpIHtcbiAgICB0d29EaW1lbnNpb25BcnJheS5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBvbmVEaW1lbnNpb25BcnJheS5wdXNoKGNvb3JkaW5hdGUpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHN1bmtTaGlwcygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHNoaXAuc2hpcE5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBsYWNlVmVydGljYWwsXG4gICAgcGxhY2VIb3Jpem9udGFsLFxuICAgIHBsYWNlUmFuZG9tLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaXNIaXQsXG4gICAgaXNTdW5rLFxuICAgIHN1bmtTaGlwcyxcbiAgICBjb29yZGluYXRlc0hhc2hNYXAsXG4gICAgaW52ZXJzZUhhc2hNYXAsXG4gICAgbWlzc2VkU2hvdHMsXG4gICAgaGl0U2hvdHMsXG4gICAgc2hpcHNQb3NpdGlvbnMsXG4gICAgc2hpcHNBcnJheSxcbiAgfTtcbn1cbmZ1bmN0aW9uIFBsYXllcihuYW1lKSB7XG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKFwiY2FycmllclwiLCA1KTtcbiAgY29uc3QgYmF0dGxlU2hpcCA9IFNoaXAoXCJiYXR0bGVTaGlwXCIsIDQpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xuICBjb25zdCBwYXRyb2wgPSBTaGlwKFwicGF0cm9sXCIsIDIpO1xuICBjb25zdCBzaGlwcyA9IFtjYXJyaWVyLCBzdWJtYXJpbmUsIGJhdHRsZVNoaXAsIGRlc3Ryb3llciwgcGF0cm9sXTtcbiAgY29uc3QgYm9hcmQgPSBHYW1lQm9hcmQoc2hpcHMpO1xuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIG5hbWUsXG4gIH07XG59XG4vL2NvbXB1dGVyIG1vdmUgZnVuY3Rpb24gdGhhdCByZXR1cm4gbnVtYmVyIG5vdCBwaWNrZWQgYW5kIHRyeSBhZGphY2VudCBzbG90IGlmIGl0IGhpdCBvdGhlciBzaGlwXG5jb25zdCBwaWNrZWROdW0gPSBbXTtcbmZ1bmN0aW9uIGNvbXB1dGVyTW92ZShwbGF5ZXIpIHtcbiAgcmV0dXJuIGNvbXB1dGVyU2xvdCgpO1xuICBmdW5jdGlvbiBjb21wdXRlclNsb3QoKSB7XG4gICAgY29uc3QgbmV4dEhpdHMgPSBbXTtcbiAgICBjb25zdCBoaXRzID0gcGxheWVyLmJvYXJkLmhpdFNob3RzO1xuICAgIGxldCBuZWlnaGJvclNsb3RzID0gW107XG4gICAgaWYgKGhpdHMubGVuZ3RoID4gMCkge1xuICAgICAgaGl0cy5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgYWRqYWNlbnRTbG90KGhpdCk7XG4gICAgICAgIHZhbGlkU3BvdCgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vaWYgYmV0dGVyIHNsb3QgYXJlIGFscmVhZHkgcGlja2VkIHR1biB0byByYW5kb20gc3BvdFxuICAgICAgaWYgKG5leHRIaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCBtb3ZlID0gcmFuZG9tU3BvdCgpO1xuICAgICAgICBwaWNrZWROdW0ucHVzaChtb3ZlKTtcbiAgICAgICAgcmV0dXJuIG1vdmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmV4dFRyeSA9IG5leHRIaXRzW25leHRIaXRzLmxlbmd0aCAtIDFdO1xuICAgICAgICBwaWNrZWROdW0ucHVzaChuZXh0VHJ5KTtcbiAgICAgICAgbmV4dFRyeSA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXh0SGl0cy5wb3AoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5leHRIaXRzLmxlbmd0aCA9PT0gMCAmJiBoaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgbW92ZSA9IHJhbmRvbVNwb3QoKTtcbiAgICAgIHBpY2tlZE51bS5wdXNoKG1vdmUpO1xuICAgICAgcmV0dXJuIG1vdmU7XG4gICAgfVxuXG4gICAgLy9tZXRob2QgdGhhdCB2ZXJpZnkgYWRqYWNlbnQgc2xvdCBpcyBub3QgcGlja2VkIGFscmVhZHkgYW5kIHB1dCB0aGUgbmV3IG9uZSBpbiB0aGUgcXVldWVcbiAgICBmdW5jdGlvbiB2YWxpZFNwb3QoKSB7XG4gICAgICBpZiAobmVpZ2hib3JTbG90cy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGNvbnN0IGFsbFNwb3RzID0gcGxheWVyLmJvYXJkLmludmVyc2VIYXNoTWFwO1xuICAgICAgbmVpZ2hib3JTbG90cy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIC8vdHVybiBjb29yZGluYXRlIHRvIG51bWJlciB1c2luZyBoYXNtYXBcbiAgICAgICAgY29uc3Qgc3BvdCA9IGFsbFNwb3RzLmdldChjb29yZGluYXRlLnRvU3RyaW5nKCkpO1xuICAgICAgICBpZiAocGlja2VkTnVtLmluY2x1ZGVzKHNwb3QpID09PSBmYWxzZSkge1xuICAgICAgICAgIG5leHRIaXRzLnB1c2goc3BvdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbmVpZ2hib3JTbG90cyA9IFtdO1xuICAgIH1cbiAgICAvL21ldGhvZCB0aGF0IGdlbmVyYXRlIG5laWdoYm9yIHNwb3QgZnJvbSBnaXZlbiBjb29yZGluYXRlXG4gICAgZnVuY3Rpb24gYWRqYWNlbnRTbG90KGhpdCkge1xuICAgICAgY29uc3QgeCA9IGhpdFswXTtcbiAgICAgIGNvbnN0IHkgPSBoaXRbMV07XG4gICAgICBpZiAoeCArIDEgPCAxMCkge1xuICAgICAgICBuZWlnaGJvclNsb3RzLnB1c2goW3ggKyAxLCB5XSk7XG4gICAgICB9XG4gICAgICBpZiAoeCAtIDEgPj0gMCkge1xuICAgICAgICBuZWlnaGJvclNsb3RzLnB1c2goW3ggLSAxLCB5XSk7XG4gICAgICB9XG4gICAgICBpZiAoeSArIDEgPCAxMCkge1xuICAgICAgICBuZWlnaGJvclNsb3RzLnB1c2goW3gsIHkgKyAxXSk7XG4gICAgICB9XG4gICAgICBpZiAoeSAtIDEgPj0gMCkge1xuICAgICAgICBuZWlnaGJvclNsb3RzLnB1c2goW3gsIHkgLSAxXSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vbWV0aG9kIHJldHVybiByYW5kb20gbnVtYmVyIGZyb20gMCB0byAxMDBcbiAgICBmdW5jdGlvbiByYW5kb21TcG90KCkge1xuICAgICAgbGV0IG1vdmU7XG4gICAgICBkbyB7XG4gICAgICAgIG1vdmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgfSB3aGlsZSAocGlja2VkTnVtLmluY2x1ZGVzKG1vdmUpKTtcbiAgICAgIHJldHVybiBtb3ZlO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gc3VtKGEsIGIpIHtcbiAgcmV0dXJuIGEgKyBiO1xufVxuZXhwb3J0IHsgc3VtLCBTaGlwLCBHYW1lQm9hcmQsIFBsYXllciwgY29tcHV0ZXJNb3ZlIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLypib2R5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzIDMwIDcwKTtcbn0qL1xuLmJvYXJkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDZ2bWluKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDZ2bWluKTtcbiAgZ2FwOiAycHg7XG4gIHBhZGRpbmc6IDAuMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59XG4uYm9hcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4ucGxhY2Utc2hpcHMtYnRucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMXJlbTtcbiAgd2lkdGg6IDgwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXJnaW4tdG9wOiAycHg7XG59XG5cbi5kcmFnLWJ0bixcbi5wbGF5LWJ0bixcbi5uZXh0LWJ0bixcbi5yYW5kb21pemUtYnRuIHtcbiAgcGFkZGluZzogMC42cmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xufVxuLnBsYXktYnRuLFxuLm5leHQtYnRuIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgYm94LXNoYWRvdzogLTFweCAwcHggOXB4IDNweCAjZmYwMGQ0O1xufVxuLmRyYWctYnRuOmhvdmVyLFxuLnJhbmRvbWl6ZS1idG46aG92ZXIge1xuICBjb2xvcjogYmVpZ2U7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuLnNoaXBzLWNvbnRhaW5lcixcbi5kcm9wLXNoaXBzIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xuICBnYXA6IDJweDtcbiAgbWF4LWhlaWdodDogMjAwcHg7XG59XG5cbi5ncmlkLWNlbGwge1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4uZHJhZ2dpbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XG59XG4uZmxleC1ob3Jpem9udGFsIHtcbiAgZGlzcGxheTogZmxleDtcbn1cbi5mbGV4LXZlcnRpY2FsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5zdWJtYXJpbmUtaG9yaXpvbnRhbCB7XG4gIC0td2lkdGg6IDM7XG59XG4uc3VibWFyaW5lLXZlcnRpY2FsIHtcbiAgLS1oZWlnaHQ6IDM7XG59XG4uY2Fycmllci1ob3Jpem9udGFsIHtcbiAgLS13aWR0aDogNTtcbn1cbi5jYXJyaWVyLXZlcnRpY2FsIHtcbiAgLS1oZWlnaHQ6IDU7XG59XG4ucGF0cm9sLWhvcml6b250YWwge1xuICAtLXdpZHRoOiAyO1xufVxuLnBhdHJvbC12ZXJ0aWNhbCB7XG4gIC0taGVpZ2h0OiAyO1xufVxuLmRlc3Ryb3llci1ob3Jpem9udGFsIHtcbiAgLS13aWR0aDogMztcbn1cbi5kZXN0cm95ZXItdmVydGljYWwge1xuICAtLWhlaWdodDogMztcbn1cbi5iYXR0bGVTaGlwLWhvcml6b250YWwge1xuICAtLXdpZHRoOiA0O1xufVxuLmJhdHRsZVNoaXAtdmVydGljYWwge1xuICAtLWhlaWdodDogNDtcbn1cbi5zaGlwIHtcbiAgd2lkdGg6IDZ2bWluO1xuICBoZWlnaHQ6IDZ2bWluO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCAyMDMgNTQpO1xuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG4uc2hpcC1zaXplIHtcbiAgd2lkdGg6IGNhbGMoNnZtaW4gKiB2YXIoLS13aWR0aCwgMSkpO1xuICBoZWlnaHQ6IGNhbGMoNnZtaW4gKiB2YXIoLS1oZWlnaHQsIDEpKTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICByaWdodDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMSwgMTQ3LCAxKTtcbn1cblxuLnRhcmdldC1kb3Qge1xuICBhc3BlY3QtcmF0aW86IDE7XG4gIHdpZHRoOiAwLjhyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbi5taXNzZWQtc3RyaWtlIHtcbiAgYXNwZWN0LXJhdGlvOiAxO1xuICB3aWR0aDogMC4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG4ubWlzc2VkLXN0cmlrZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG4gIGJvcmRlcjogbm9uZTtcbn1cbi5oaXQtc3RyaWtlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1MDAwMDtcbn1cbi8qbWluaSBzaGlwcyBzdHlsZSovXG4uZmxlZXQtaG9sZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4ubWluaS1zaGlwLW93bmVyIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG59XG4uc2FtZS1zaXplLXNoaXBzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxNTBweDtcbn1cbi5taW5pLWNhcnJpZXIge1xuICAtLXdpZHRoOiA1O1xufVxuLm1pbmktYmF0dGxlU2hpcCB7XG4gIC0td2lkdGg6IDQ7XG59XG4ubWluaS1kZXN0cm95ZXIge1xuICAtLXdpZHRoOiAzO1xufVxuLm1pbmktc3VibWFyaW5lIHtcbiAgLS13aWR0aDogMztcbn1cbi5taW5pLXBhdHJvbCB7XG4gIC0td2lkdGg6IDEuNTtcbn1cbi5taW5pLXNoaXAtc2l6ZSB7XG4gIHdpZHRoOiBjYWxjKDQwcHggKiB2YXIoLS13aWR0aCwgMSkpO1xuICBoZWlnaHQ6IDIwcHg7XG4gIG1hcmdpbjogMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTY2IDE5OCAxNjUpO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcGxhY2Utc2hpcC1wYWdlL3NoaXBzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7OztFQUlFO0FBQ0Y7RUFDRSxhQUFhO0VBQ2Isd0NBQXdDO0VBQ3hDLHFDQUFxQztFQUNyQyxRQUFRO0VBQ1IsZUFBZTtFQUNmLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixTQUFTO0VBQ1QsVUFBVTtFQUNWLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBOzs7O0VBSUUsZUFBZTtFQUNmLGVBQWU7RUFDZixZQUFZO0VBQ1oscUJBQXFCO0FBQ3ZCO0FBQ0E7O0VBRUUsYUFBYTtFQUNiLG9DQUFvQztBQUN0QztBQUNBOztFQUVFLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7QUFDQTs7RUFFRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLCtCQUErQjtFQUMvQixxQkFBcUI7RUFDckIsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxvQ0FBb0M7RUFDcEMsc0NBQXNDO0VBQ3RDLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtBQUNkO0FBQ0E7RUFDRSx5QkFBeUI7QUFDM0I7QUFDQSxtQkFBbUI7QUFDbkI7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixZQUFZO0FBQ2Q7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxtQ0FBbUM7RUFDbkMsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQ0FBa0M7QUFDcENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLypib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzIDMwIDcwKTtcXG59Ki9cXG4uYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA2dm1pbik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNnZtaW4pO1xcbiAgZ2FwOiAycHg7XFxuICBwYWRkaW5nOiAwLjJyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4ucGxhY2Utc2hpcHMtYnRucyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZ2FwOiAxcmVtO1xcbiAgd2lkdGg6IDgwJTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDJweDtcXG59XFxuXFxuLmRyYWctYnRuLFxcbi5wbGF5LWJ0bixcXG4ubmV4dC1idG4sXFxuLnJhbmRvbWl6ZS1idG4ge1xcbiAgcGFkZGluZzogMC42cmVtO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4ucGxheS1idG4sXFxuLm5leHQtYnRuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBib3gtc2hhZG93OiAtMXB4IDBweCA5cHggM3B4ICNmZjAwZDQ7XFxufVxcbi5kcmFnLWJ0bjpob3ZlcixcXG4ucmFuZG9taXplLWJ0bjpob3ZlciB7XFxuICBjb2xvcjogYmVpZ2U7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuLnNoaXBzLWNvbnRhaW5lcixcXG4uZHJvcC1zaGlwcyB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogc3RhcnQ7XFxuICBnYXA6IDJweDtcXG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uZHJhZ2dpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xcbn1cXG4uZmxleC1ob3Jpem9udGFsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5mbGV4LXZlcnRpY2FsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uc3VibWFyaW5lLWhvcml6b250YWwge1xcbiAgLS13aWR0aDogMztcXG59XFxuLnN1Ym1hcmluZS12ZXJ0aWNhbCB7XFxuICAtLWhlaWdodDogMztcXG59XFxuLmNhcnJpZXItaG9yaXpvbnRhbCB7XFxuICAtLXdpZHRoOiA1O1xcbn1cXG4uY2Fycmllci12ZXJ0aWNhbCB7XFxuICAtLWhlaWdodDogNTtcXG59XFxuLnBhdHJvbC1ob3Jpem9udGFsIHtcXG4gIC0td2lkdGg6IDI7XFxufVxcbi5wYXRyb2wtdmVydGljYWwge1xcbiAgLS1oZWlnaHQ6IDI7XFxufVxcbi5kZXN0cm95ZXItaG9yaXpvbnRhbCB7XFxuICAtLXdpZHRoOiAzO1xcbn1cXG4uZGVzdHJveWVyLXZlcnRpY2FsIHtcXG4gIC0taGVpZ2h0OiAzO1xcbn1cXG4uYmF0dGxlU2hpcC1ob3Jpem9udGFsIHtcXG4gIC0td2lkdGg6IDQ7XFxufVxcbi5iYXR0bGVTaGlwLXZlcnRpY2FsIHtcXG4gIC0taGVpZ2h0OiA0O1xcbn1cXG4uc2hpcCB7XFxuICB3aWR0aDogNnZtaW47XFxuICBoZWlnaHQ6IDZ2bWluO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAgMjAzIDU0KTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG4gIGN1cnNvcjogZ3JhYmJpbmc7XFxufVxcbi5zaGlwLXNpemUge1xcbiAgd2lkdGg6IGNhbGMoNnZtaW4gKiB2YXIoLS13aWR0aCwgMSkpO1xcbiAgaGVpZ2h0OiBjYWxjKDZ2bWluICogdmFyKC0taGVpZ2h0LCAxKSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICByaWdodDogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEsIDE0NywgMSk7XFxufVxcblxcbi50YXJnZXQtZG90IHtcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG4gIHdpZHRoOiAwLjhyZW07XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbi5taXNzZWQtc3RyaWtlIHtcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG4gIHdpZHRoOiAwLjJyZW07XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbi5taXNzZWQtc3RyaWtlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5oaXQtc3RyaWtlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNTAwMDA7XFxufVxcbi8qbWluaSBzaGlwcyBzdHlsZSovXFxuLmZsZWV0LWhvbGRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLm1pbmktc2hpcC1vd25lciB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuLnNhbWUtc2l6ZS1zaGlwcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMTUwcHg7XFxufVxcbi5taW5pLWNhcnJpZXIge1xcbiAgLS13aWR0aDogNTtcXG59XFxuLm1pbmktYmF0dGxlU2hpcCB7XFxuICAtLXdpZHRoOiA0O1xcbn1cXG4ubWluaS1kZXN0cm95ZXIge1xcbiAgLS13aWR0aDogMztcXG59XFxuLm1pbmktc3VibWFyaW5lIHtcXG4gIC0td2lkdGg6IDM7XFxufVxcbi5taW5pLXBhdHJvbCB7XFxuICAtLXdpZHRoOiAxLjU7XFxufVxcbi5taW5pLXNoaXAtc2l6ZSB7XFxuICB3aWR0aDogY2FsYyg0MHB4ICogdmFyKC0td2lkdGgsIDEpKTtcXG4gIGhlaWdodDogMjBweDtcXG4gIG1hcmdpbjogMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE2NiAxOTggMTY1KTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9ncmFkdWF0ZS12MTctbGF0aW4tcmVndWxhci53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL2FyY2hpdm8tYmxhY2stdjIxLWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9uYW51bS1nb3RoaWMtY29kaW5nLXYyMS1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvZ2VybWFuaWEtb25lLXYyMC1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvc2hhcmUtdGVjaC1tb25vLXYxNS1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvaW1hZ2VzL3NldC1zaGlwcy5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9pbWFnZXMvc2hpcHMuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICBmb250LWZhbWlseTogXCJHcmFkdWF0ZVwiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pIGZvcm1hdChcIndvZmYyXCIpO1xufVxuLyogYXJjaGl2by1ibGFjay1yZWd1bGFyIC0gbGF0aW4gKi9cbkBmb250LWZhY2Uge1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIGZvbnQtZmFtaWx5OiBcIkFyY2hpdm8gQmxhY2tcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KVxuICAgIGZvcm1hdChcIndvZmYyXCIpO1xufVxuLyogbmFudW0tZ290aGljLWNvZGluZy1yZWd1bGFyIC0gbGF0aW4gKi9cbkBmb250LWZhY2Uge1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIGZvbnQtZmFtaWx5OiBcIk5hbnVtIEdvdGhpYyBDb2RpbmdcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogMzAwO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KVxuICAgIGZvcm1hdChcIndvZmYyXCIpO1xufVxuLyogZ2VybWFuaWEtb25lLXJlZ3VsYXIgLSBsYXRpbiAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiR2VybWFuaWEgT25lXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19ffSlcbiAgICBmb3JtYXQoXCJ3b2ZmMlwiKTtcbn1cbi8qIHNoYXJlLXRlY2gtbW9uby1yZWd1bGFyIC0gbGF0aW4gKi9cbkBmb250LWZhY2Uge1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIGZvbnQtZmFtaWx5OiBcIlNoYXJlIFRlY2ggTW9ub1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fX30pXG4gICAgZm9ybWF0KFwid29mZjJcIik7XG59XG4qIHtcbiAgbWFyZ2luOiAwO1xufVxuYm9keSB7XG4gIHdpZHRoOiAxMDB2dztcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX199KTtcbiAgZm9udC1mYW1pbHk6IFwiR3JhZHVhdGVcIiwgXCJTaGFyZSBUZWNoIE1vbm9cIiwgXCJHZXJtYW5pYSBPbmVcIiwgbW9ub3NwYWNlLCBBcmlhbCxcbiAgICBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBpbmhlcml0O1xufVxuYnV0dG9uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xufVxuLyppbnRybyBwYWdlKi9cbi5pbnRyby1wYWdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAyMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fX30pO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG4uaGVhZGVyIHtcbiAgcGFkZGluZzogMS41cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTUsIDE1LCAxNSk7XG4gIGNvbG9yOiBhbGljZWJsdWU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMnM7XG59XG5cbi5sb2dvIHtcbiAgZm9udC1mYW1pbHk6IFwiQXJjaGl2byBCbGFja1wiO1xuICBsZXR0ZXItc3BhY2luZzogMC4zcmVtO1xuICBmb250LXNpemU6IDIuM3JlbTtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IGJsdWU7XG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAycztcbn1cbi5sb2dvOmhvdmVyIHtcbiAgY29sb3I6IHllbGxvdztcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xufVxuLmdhbWUtb3B0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNXJlbTtcbn1cbi5nYW1lLW9wdGlvbi1idG5zIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtZmFtaWx5OiBcIk5hbnVtIEdvdGhpYyBDb2RpbmdcIjtcbiAgdGV4dC1zaGFkb3c6IC0xcHggLTJweCAycHggIzAwMDAwMDdkO1xuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMXM7XG4gIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XG59XG4uZ2FtZS1vcHRpb24tYnRuczpob3ZlciB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYigwLCAwLCAwKTtcbn1cbi5tdWx0aS1wbGF5ZXJzLWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMDMsIDIyNiwgNCk7XG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XG59XG4uc2luZ2xlLXBsYXllci1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIsIDE0NSwgMCk7XG4gIGNvbG9yOiBhbGljZWJsdWU7XG59XG5cbi8qc2hpcCBwbGFjZW1lbnQgcGFnZSovXG4uc2hpcHMtZ3JpZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMgMzAgNzApO1xufVxuLmRyYWctYnRuLFxuLnJhbmRvbWl6ZS1idG4sXG4ucGxheS1idG4ge1xuICBmb250LWZhbWlseTogXCJHZXJtYW5pYSBPbmVcIjtcbn1cblxuLnBsYXllcnMtbmFtZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4vKiBjb3VudCBkb3duKi9cbi5wYXNzLXNjcmVlbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTAwMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgdG9wOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmb250LWZhbWlseTogXCJHcmFkdWF0ZVwiO1xufVxuLmNvdW50ZXIge1xuICBhc3BlY3QtcmF0aW86IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMzAlO1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICBib3JkZXI6IDAuMnJlbSBzb2xpZCByZ2IoMTc0LCAwLCAyNTUpO1xuICBjb2xvcjogYnJvd247XG59XG4uY291bnRlci1ib2FyZCB7XG4gIGZvbnQtc2l6ZTogNHJlbTtcbn1cbi5tc2ctdGV4dCB7XG4gIGNvbG9yOiBiZWlnZTtcbiAgZm9udC1zaXplOiAycmVtO1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG4vKnBsYXllcnMgYm9hcmQsbWluaSBzaGlwcyBib2FyZCovXG5cbi5wbGF5ZXJzLWJvYXJkLFxuLm1pbmktc2hpcC1ob2xkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwLjRyZW07XG59XG5cbi8qd2lubmVyIG1vZGFsKi9cbi53aW5uZXItYm9hcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XG4gIHBhZGRpbmc6IDFyZW07XG59XG4ud2lubmVyLWhvbGRlciB7XG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDhweCAzcHggIzQxY2MyZjtcbiAgYm9yZGVyOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwLjJyZW07XG59XG4ud2lubmVyLW1vZGFsIHtcbiAgYm9yZGVyOiBub25lO1xuICB3aWR0aDogMjAlO1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcbiAgYm94LXNoYWRvdzogLTJweCAwcHggOHB4IDNweCAjMDAwMDAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IDMwJTtcbn1cbi5yZW1hdGNoLWJ0biB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVuO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmc6IDAuM3JlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbi8qZm9ybSBzdHlsZSovXG5pbnB1dCB7XG4gIGZvbnQtZmFtaWx5OiBcIkdlcm1hbmlhIE9uZVwiO1xufVxuLnBsYXllci1uYW1lLWlucHV0IHtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwLjlyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xufVxuXG4ucGxheWVyLW5hbWUtaW5wdXQ6Zm9jdXMgfiAucGxheWVyLW9uZS1sYWJlbCB7XG4gIHRvcDogMC4zcmVtO1xuICBsZWZ0OiAyMCU7XG4gIGNvbG9yOiAjMTlkNTAwO1xufVxuLnBsYXllci10d28tbGFiZWwsXG4ucGxheWVyLW9uZS1sYWJlbCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm90dG9tOiAyLjhyZW07XG4gIGxlZnQ6IDFyZW07XG4gIGNvbG9yOiAjNjA2MzVmO1xuICB0cmFuc2l0aW9uOiBhbGwgMnM7XG59XG4ucGxheWVyLW5hbWUtaW5wdXQ6Zm9jdXMgfiAucGxheWVyLXR3by1sYWJlbCB7XG4gIHRvcDogMjAlO1xuICBsZWZ0OiAyMCU7XG4gIGNvbG9yOiAjMTlkNTAwO1xufVxuZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDNyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzOSwgMzQsIDM0KTtcbiAgb3BhY2l0eTogMC44O1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIHBhZGRpbmc6IDJyZW07XG4gIG1hcmdpbjogYXV0bztcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgY29sb3I6IGFudGlxdWV3aGl0ZTtcbiAgZm9udC1mYW1pbHk6IFwiR2VybWFuaWEgT25lXCIsIG1vbm9zcGFjZTtcbn1cbi5pbnB1dC1ob2xkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnN1Ym1pdC1idG4ge1xuICBwYWRkaW5nOiAwLjRyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LWZhbWlseTogXCJHZXJtYW5pYSBPbmVcIjtcbn1cbi5zdWJtaXQtYnRuOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xufVxuLnBsYXllci10dXJuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgY29sb3I6IGFsaWNlYmx1ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgb3BhY2l0eTogMC44O1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291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QUNqQixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHcmFkdWF0ZVxcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL2dyYWR1YXRlLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG4vKiBhcmNoaXZvLWJsYWNrLXJlZ3VsYXIgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJBcmNoaXZvIEJsYWNrXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvYXJjaGl2by1ibGFjay12MjEtbGF0aW4tcmVndWxhci53b2ZmMlxcXCIpXFxuICAgIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuLyogbmFudW0tZ290aGljLWNvZGluZy1yZWd1bGFyIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTmFudW0gR290aGljIENvZGluZ1xcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL25hbnVtLWdvdGhpYy1jb2RpbmctdjIxLWxhdGluLXJlZ3VsYXIud29mZjJcXFwiKVxcbiAgICBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbi8qIGdlcm1hbmlhLW9uZS1yZWd1bGFyIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2VybWFuaWEgT25lXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvZ2VybWFuaWEtb25lLXYyMC1sYXRpbi1yZWd1bGFyLndvZmYyXFxcIilcXG4gICAgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG4vKiBzaGFyZS10ZWNoLW1vbm8tcmVndWxhciAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LWZhbWlseTogXFxcIlNoYXJlIFRlY2ggTW9ub1xcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL3NoYXJlLXRlY2gtbW9uby12MTUtbGF0aW4tcmVndWxhci53b2ZmMlxcXCIpXFxuICAgIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuKiB7XFxuICBtYXJnaW46IDA7XFxufVxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vYXNzZXRzL2ltYWdlcy9zZXQtc2hpcHMuanBnKTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR3JhZHVhdGVcXFwiLCBcXFwiU2hhcmUgVGVjaCBNb25vXFxcIiwgXFxcIkdlcm1hbmlhIE9uZVxcXCIsIG1vbm9zcGFjZSwgQXJpYWwsXFxuICAgIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGluaGVyaXQ7XFxufVxcbmJ1dHRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBsZXR0ZXItc3BhY2luZzogMXB4O1xcbn1cXG4vKmludHJvIHBhZ2UqL1xcbi5pbnRyby1wYWdlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi9hc3NldHMvaW1hZ2VzL3NoaXBzLmpwZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5oZWFkZXIge1xcbiAgcGFkZGluZzogMS41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1LCAxNSwgMTUpO1xcbiAgY29sb3I6IGFsaWNlYmx1ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMnM7XFxufVxcblxcbi5sb2dvIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQXJjaGl2byBCbGFja1xcXCI7XFxuICBsZXR0ZXItc3BhY2luZzogMC4zcmVtO1xcbiAgZm9udC1zaXplOiAyLjNyZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IGJsdWU7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMnM7XFxufVxcbi5sb2dvOmhvdmVyIHtcXG4gIGNvbG9yOiB5ZWxsb3c7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XFxufVxcbi5nYW1lLW9wdGlvbnMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDAuNXJlbTtcXG59XFxuLmdhbWUtb3B0aW9uLWJ0bnMge1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOYW51bSBHb3RoaWMgQ29kaW5nXFxcIjtcXG4gIHRleHQtc2hhZG93OiAtMXB4IC0ycHggMnB4ICMwMDAwMDA3ZDtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAxcztcXG4gIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XFxufVxcbi5nYW1lLW9wdGlvbi1idG5zOmhvdmVyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG59XFxuLm11bHRpLXBsYXllcnMtYnRuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMDMsIDIyNiwgNCk7XFxuICBjb2xvcjogcmdiKDAsIDAsIDApO1xcbn1cXG4uc2luZ2xlLXBsYXllci1idG4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyLCAxNDUsIDApO1xcbiAgY29sb3I6IGFsaWNlYmx1ZTtcXG59XFxuXFxuLypzaGlwIHBsYWNlbWVudCBwYWdlKi9cXG4uc2hpcHMtZ3JpZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMyAzMCA3MCk7XFxufVxcbi5kcmFnLWJ0bixcXG4ucmFuZG9taXplLWJ0bixcXG4ucGxheS1idG4ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHZXJtYW5pYSBPbmVcXFwiO1xcbn1cXG5cXG4ucGxheWVycy1uYW1lIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbi8qIGNvdW50IGRvd24qL1xcbi5wYXNzLXNjcmVlbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxMDAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICB0b3A6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBkaXNwbGF5OiBub25lO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR3JhZHVhdGVcXFwiO1xcbn1cXG4uY291bnRlciB7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDMwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBib3JkZXI6IDAuMnJlbSBzb2xpZCByZ2IoMTc0LCAwLCAyNTUpO1xcbiAgY29sb3I6IGJyb3duO1xcbn1cXG4uY291bnRlci1ib2FyZCB7XFxuICBmb250LXNpemU6IDRyZW07XFxufVxcbi5tc2ctdGV4dCB7XFxuICBjb2xvcjogYmVpZ2U7XFxuICBmb250LXNpemU6IDJyZW07XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcbi8qcGxheWVycyBib2FyZCxtaW5pIHNoaXBzIGJvYXJkKi9cXG5cXG4ucGxheWVycy1ib2FyZCxcXG4ubWluaS1zaGlwLWhvbGRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuNHJlbTtcXG59XFxuXFxuLyp3aW5uZXIgbW9kYWwqL1xcbi53aW5uZXItYm9hcmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuLndpbm5lci1ob2xkZXIge1xcbiAgYm94LXNoYWRvdzogLTJweCAwcHggOHB4IDNweCAjNDFjYzJmO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMC4ycmVtO1xcbn1cXG4ud2lubmVyLW1vZGFsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHdpZHRoOiAyMCU7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjRyZW07XFxuICBib3gtc2hhZG93OiAtMnB4IDBweCA4cHggM3B4ICMwMDAwMDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiAzMCU7XFxufVxcbi5yZW1hdGNoLWJ0biB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbjtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHBhZGRpbmc6IDAuM3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbi8qZm9ybSBzdHlsZSovXFxuaW5wdXQge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHZXJtYW5pYSBPbmVcXFwiO1xcbn1cXG4ucGxheWVyLW5hbWUtaW5wdXQge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMC45cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xcbn1cXG5cXG4ucGxheWVyLW5hbWUtaW5wdXQ6Zm9jdXMgfiAucGxheWVyLW9uZS1sYWJlbCB7XFxuICB0b3A6IDAuM3JlbTtcXG4gIGxlZnQ6IDIwJTtcXG4gIGNvbG9yOiAjMTlkNTAwO1xcbn1cXG4ucGxheWVyLXR3by1sYWJlbCxcXG4ucGxheWVyLW9uZS1sYWJlbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3R0b206IDIuOHJlbTtcXG4gIGxlZnQ6IDFyZW07XFxuICBjb2xvcjogIzYwNjM1ZjtcXG4gIHRyYW5zaXRpb246IGFsbCAycztcXG59XFxuLnBsYXllci1uYW1lLWlucHV0OmZvY3VzIH4gLnBsYXllci10d28tbGFiZWwge1xcbiAgdG9wOiAyMCU7XFxuICBsZWZ0OiAyMCU7XFxuICBjb2xvcjogIzE5ZDUwMDtcXG59XFxuZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogM3JlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzOSwgMzQsIDM0KTtcXG4gIG9wYWNpdHk6IDAuODtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmc6IDJyZW07XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIGhlaWdodDogMzUwcHg7XFxuICBjb2xvcjogYW50aXF1ZXdoaXRlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHZXJtYW5pYSBPbmVcXFwiLCBtb25vc3BhY2U7XFxufVxcbi5pbnB1dC1ob2xkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5zdWJtaXQtYnRuIHtcXG4gIHBhZGRpbmc6IDAuNHJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCI7XFxufVxcbi5zdWJtaXQtYnRuOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcXG59XFxuLnBsYXllci10dXJuIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgY29sb3I6IGFsaWNlYmx1ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XFxuICBvcGFjaXR5OiAwLjg7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaGlwcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaGlwcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCIuL3BsYWNlLXNoaXAtcGFnZS9zaGlwcy5jc3NcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3V0aWxpdHkuanNcIjtcbmltcG9ydCB7IHJhbmRvbWx5UGxhY2VTaGlwcyB9IGZyb20gXCIuL3BsYWNlLXNoaXAtcGFnZS9zaGlwLXBvc2l0aW9uLmpzXCI7XG5pbXBvcnQge1xuICBzY3JlZW5Db250cm9sbGVyLFxuICBkcmF3Rmlyc3RQYWdlLFxuICBzaGlwc1BsYWNlbWVudCxcbiAgcmFuZG9tUGxhY2VtZW50LFxuICBkcmFnU2hpcHMsXG4gIGNvdW50ZG93bk1vZGFsLFxuICBmb3JtVGVtcGxhdGUsXG59IGZyb20gXCIuL2RvbS1jb21wb25lbnQuanNcIjtcblxuY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wYWdlLWNvbnRhaW5lcl1cIik7XG5jb25zdCBib2FyZFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtd3JhcHBlclwiKTtcbmRyYXdGaXJzdFBhZ2UoKTtcbmJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5sZXQgcGxheWVyT25lTmFtZTtcbmxldCBwbGF5ZXJUd29OYW1lO1xubGV0IGZpcnN0UGxheWVyO1xubGV0IHNlY29uZFBsYXllcjtcbi8vc3RvcmUgcGxheWVycyBvYmplY3QgaW4gaGFzaG1hcFxuY29uc3QgaGFzaG1hcCA9IG5ldyBNYXAoKTtcbmxldCBzb2xvUGxheWVyID0gZmFsc2U7XG5wYWdlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIi5tdWx0aS1wbGF5ZXJzLWJ0blwiKSkge1xuICAgIHNvbG9QbGF5ZXIgPSBmYWxzZTtcbiAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGZvcm1UZW1wbGF0ZShwYWdlQ29udGFpbmVyKTtcbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIltkYXRhLXN1Ym1pdC1uYW1lXVwiKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwbGF5ZXJPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcGxheWVyLW9uZV1cIik7XG4gICAgY29uc3QgcGxheWVyVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBsYXllci10d29cIik7XG4gICAgLy9hdm9pZCBzcGFjZSBmb3IgY3JlYXRpbmcgY2xhc3MgIGxhdGVyIGZvciBmbGVldCBkYXNoIGJvYXJkXG4gICAgcGxheWVyT25lTmFtZSA9IHBsYXllck9uZS52YWx1ZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgcGxheWVyVHdvTmFtZSA9IHBsYXllclR3by52YWx1ZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgLy9yZXR1cm4gaWYgcGxheWVycyBuYW1lIHNhbWUgYW5kIGVtcHR5XG4gICAgaWYgKFxuICAgICAgcGxheWVyT25lTmFtZSA9PT0gXCJcIiB8fFxuICAgICAgcGxheWVyVHdvTmFtZSA9PT0gXCJcIiB8fFxuICAgICAgKHBsYXllck9uZU5hbWUgPT09IHBsYXllclR3b05hbWUpID09PSB0cnVlXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZpcnN0UGxheWVyID0gUGxheWVyKHBsYXllck9uZU5hbWUpO1xuICAgIHNlY29uZFBsYXllciA9IFBsYXllcihwbGF5ZXJUd29OYW1lKTtcbiAgICBjb3VudGRvd25Nb2RhbChgJHtwbGF5ZXJPbmVOYW1lfSBzZXQgdGhlIHNoaXBzYCk7XG4gICAgc2hpcHNQbGFjZW1lbnQocGFnZUNvbnRhaW5lcik7XG4gIH1cbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCJbZGF0YS1yYW5kb20tYnRuXCIpKSB7XG4gICAgcHV0U2hpcHMoKTtcbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIltkYXRhLWRyb3AtYnRuXVwiKSkge1xuICAgIGRyYWdBbmREcm9wKCk7XG4gIH1cbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCIucGxheS1idG5cIikpIHtcbiAgICBwYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBpZiAoc29sb1BsYXllciA9PT0gZmFsc2UpIHtcbiAgICAgIGNvdW50ZG93bk1vZGFsKGAke3BsYXllclR3b05hbWV9IHNldCB0aGUgc2hpcHNgKTtcbiAgICAgIGJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIHNoaXBzUGxhY2VtZW50KHBhZ2VDb250YWluZXIpO1xuXG4gICAgaWYgKHNvbG9QbGF5ZXIgPT09IHRydWUgJiYgaGFzaG1hcC5zaXplID09PSAwKSB7XG4gICAgICAvL3JhbmRvbWx5IHBsYWNlIGFpIHNoaXBzXG4gICAgICByYW5kb21seVBsYWNlU2hpcHMoc2Vjb25kUGxheWVyKTtcbiAgICAgIGhhc2htYXAuc2V0KHBsYXllck9uZU5hbWUsIGZpcnN0UGxheWVyKTtcbiAgICAgIGhhc2htYXAuc2V0KHBsYXllclR3b05hbWUsIHNlY29uZFBsYXllcik7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaGFzaG1hcC5nZXQocGxheWVyVHdvTmFtZSkgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgaGFzaG1hcC5nZXQocGxheWVyT25lTmFtZSkgIT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgY29uc3QgcGxheWVyT25lID0gaGFzaG1hcC5nZXQocGxheWVyT25lTmFtZSk7XG4gICAgICBjb25zdCBwbGF5ZXJUd28gPSBoYXNobWFwLmdldChwbGF5ZXJUd29OYW1lKTtcbiAgICAgIHNjcmVlbkNvbnRyb2xsZXIocGxheWVyT25lLCBwbGF5ZXJUd28sIHNvbG9QbGF5ZXIpO1xuICAgICAgYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICBwYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKGhhc2htYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgaGFzaG1hcC5zZXQocGxheWVyT25lTmFtZSwgZmlyc3RQbGF5ZXIpO1xuICAgIH1cbiAgICBpZiAoaGFzaG1hcC5zaXplID4gMCkge1xuICAgICAgaGFzaG1hcC5zZXQocGxheWVyVHdvTmFtZSwgc2Vjb25kUGxheWVyKTtcbiAgICB9XG4gIH1cbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCIuc2luZ2xlLXBsYXllci1idG5cIikpIHtcbiAgICBzb2xvUGxheWVyID0gdHJ1ZTtcbiAgICBwbGF5ZXJPbmVOYW1lID0gXCJ5b3VcIjtcbiAgICBwbGF5ZXJUd29OYW1lID0gXCJhaVwiO1xuICAgIGZpcnN0UGxheWVyID0gUGxheWVyKHBsYXllck9uZU5hbWUpO1xuICAgIHNlY29uZFBsYXllciA9IFBsYXllcihwbGF5ZXJUd29OYW1lKTtcbiAgICBjb3VudGRvd25Nb2RhbChcInNldCB0aGUgc2hpcHNcIik7XG4gICAgc2hpcHNQbGFjZW1lbnQocGFnZUNvbnRhaW5lcik7XG4gICAgYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxufSk7XG5jb25zdCB3aW5uZXJNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1tc2dcIik7XG53aW5uZXJNc2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiLnJlbWF0Y2gtYnRuXCIpKSB7XG4gICAgLy9yZXNldCB0aGUgcGxheWVyIGFuZCBkb20gZWxlbWVudFxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXdpbm5lci1tb2RhbF1cIik7XG4gICAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkXCIpO1xuICAgIGNvbnN0IHR1cm5EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci10dXJuXCIpO1xuICAgIGNvbnN0IGRhc2hCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWluaS1kYXNoLWJvYXJkXCIpO1xuICAgIGNvbnN0IHdpbm5lckRpdkhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWhvbGRlclwiKTtcbiAgICBjb25zdCB3aW5uZXJNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1ib2FyZFwiKTtcbiAgICBmaXJzdFBsYXllciA9IG51bGw7XG4gICAgc2Vjb25kUGxheWVyID0gbnVsbDtcbiAgICBoYXNobWFwLmNsZWFyKCk7XG4gICAgZmlyc3RQbGF5ZXIgPSBQbGF5ZXIocGxheWVyT25lTmFtZSk7XG4gICAgc2Vjb25kUGxheWVyID0gUGxheWVyKHBsYXllclR3b05hbWUpO1xuICAgIGlzR2FtZUVuZCA9IGZhbHNlO1xuICAgIGJvYXJkcy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdHVybkRpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZGFzaEJvYXJkLmZvckVhY2goKGRpdikgPT4ge1xuICAgICAgZGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9KTtcbiAgICBib2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcbiAgICAgIGJvYXJkLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9KTtcbiAgICB3aW5uZXJNc2cudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHdpbm5lckRpdkhvbGRlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZmlyc3RQbGF5ZXIgPSBQbGF5ZXIocGxheWVyT25lTmFtZSk7XG4gICAgc2Vjb25kUGxheWVyID0gUGxheWVyKHBsYXllclR3b05hbWUpO1xuICAgIG1vZGFsLmNsb3NlKCk7XG4gICAgcGFnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgc2hpcHNQbGFjZW1lbnQocGFnZUNvbnRhaW5lcik7XG4gIH1cbn0pO1xuLy9kcmFnIGFuZCBkcm9wIHNoaXAgYmFzZWQgb24gc29sbyBvciBtdWx0aSBwbGF5ZXJcbmZ1bmN0aW9uIGRyYWdBbmREcm9wKCkge1xuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zaGlwcy1jb250YWluZXJdXCIpO1xuICBzaGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGlmIChoYXNobWFwLnNpemUgPCAxKSB7XG4gICAgaWYgKGZpcnN0UGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlcG9zaXRpb24oKTtcbiAgICB9XG4gICAgZHJhZ1NoaXBzKGZpcnN0UGxheWVyLCBmaXJzdFBsYXllci5ib2FyZC5zaGlwc0FycmF5KTtcbiAgfVxuICBpZiAoaGFzaG1hcC5zaXplID4gMSkge1xuICAgIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgcmVwb3NpdGlvbigpO1xuICAgIH1cbiAgICBkcmFnU2hpcHMoc2Vjb25kUGxheWVyLCBzZWNvbmRQbGF5ZXIuYm9hcmQuc2hpcHNBcnJheSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlcG9zaXRpb24oKSB7XG4gIGlmIChmaXJzdFBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeG8gPSBQbGF5ZXIocGxheWVyT25lTmFtZSwgZmlyc3RQbGF5ZXIuc2hpcHNBcnJheSk7XG4gICAgLy8gZmlyc3RQbGF5ZXIgPSBudWxsO1xuICAgIGZpcnN0UGxheWVyID0geG87XG4gIH1cbiAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgeG8gPSBQbGF5ZXIocGxheWVyVHdvTmFtZSwgc2Vjb25kUGxheWVyLnNoaXBzQXJyYXkpO1xuICAgIC8vc2Vjb25kUGxheWVyID0gbnVsbDtcbiAgICBzZWNvbmRQbGF5ZXIgPSB4bztcbiAgfVxufVxuZnVuY3Rpb24gcHV0U2hpcHMoKSB7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNoaXBzLWNvbnRhaW5lcl1cIik7XG4gIHNoaXBzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaWYgKGhhc2htYXAuc2l6ZSA8IDEpIHtcbiAgICByZXBvc2l0aW9uKCk7XG4gICAgcmFuZG9tUGxhY2VtZW50KGZpcnN0UGxheWVyKTtcbiAgfSBlbHNlIGlmIChoYXNobWFwLnNpemUgPiAwKSB7XG4gICAgcmVwb3NpdGlvbigpO1xuICAgIHJhbmRvbVBsYWNlbWVudChzZWNvbmRQbGF5ZXIpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiZmlyc3RCb2FyZCIsInNoaXBDb29yZGluYXRlIiwiaGl0IiwibWlzcyIsImNlbGxzIiwiaSIsImoiLCJhIiwiYiIsIngiLCJ5IiwiZ3JpZHMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJidXR0b24iLCJ0ZXh0Q29udGVudCIsIk1hdGgiLCJmbG9vciIsImRhdGFzZXQiLCJpbmRleCIsImRvdCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZW5kQ2hpbGQiLCJzdHJpa2VCb2FyZCIsImRyYXdHcmlkcyIsImdyaWQiLCJfdXRpbGl0eSIsInJlcXVpcmUiLCJfYm9hcmRDb21wb25lbnQiLCJfc2hpcFBvc2l0aW9uIiwiY291bnQiLCJ3aW5uZXJNc2ciLCJHYW1lRmxvdyIsInBsYXllck9uZSIsInBsYXllclR3byIsImlzR2FtZUVuZCIsInBsYXllcnMiLCJhY3RpdmVQbGF5ZXIiLCJjaGFuZ2VUdXJuIiwiZ2V0UGxheWVyIiwicHJpbnRCb2FyZCIsInBsYXllciIsIm1pc3NTdHJpa2VzIiwiYm9hcmQiLCJtaXNzZWRTaG90cyIsImhpdFN0cmlrZXMiLCJoaXRTaG90cyIsImFsbFRoZVNoaXBzIiwic2hpcHNQb3NpdGlvbnMiLCJzaGlwQm9hcmRTdGF0ZSIsInN0cmlrZUJvYXJkU3RhdGUiLCJ1cGRhdGVTdW5rU2hpcCIsInN1bmtTaGlwcyIsInByaW50TmV3Qm9hcmQiLCJvcHBvbmVudE5hbWUiLCJuYW1lIiwib3Bwb25lbnRQbGF5ZXJTaGlwU3RhdGUiLCJvcHBvbmVudFN0cmlrZUJvYXJkIiwiY3VycmVudFBsYXllclNoaXBCb2FyZCIsImN1cnJlbnRQbGF5ZXJTaGlwU3RhdGUiLCJjdXJyZW50UGxheWVyTmFtZSIsInBsYXllclJvdW5kIiwiY2xpY2tlZE51bSIsImNvb3JkaW5hdGUiLCJjb29yZGluYXRlc0hhc2hNYXAiLCJnZXQiLCJOdW1iZXIiLCJyZWNlaXZlQXR0YWNrIiwiZGVjbGFyZVdpbm5lciIsImxlbmd0aCIsIndpbm5lck1vZGFsIiwicG9wIiwibW9kYWwiLCJxdWVyeVNlbGVjdG9yIiwic2hvd01vZGFsIiwid2lubmVyIiwidW5kZWZpbmVkIiwicHVzaCIsImZpcnN0UGxheWVyU3Vua1NoaXBzIiwiaXNTdW5rIiwic2Vjb25kUGxheWVyU3Vua1NoaXBzIiwicGxheWVyT25lTmFtZSIsInBsYXllclR3b05hbWUiLCJtc2ciLCJzY3JlZW5Db250cm9sbGVyIiwic29sb1BsYXllciIsImdhbWUiLCJ0dXJuIiwicGxheWVyT25lU2hpcHNCb2FyZCIsInBsYXllck9uZVN0cmlrZUJvYXJkIiwiZmlyc3RQbGF5ZXJTaGlwcyIsInNlY29uZFBsYXllclNoaXBzIiwidXBkYXRlU2NyZWVuIiwicGxheWVyT25lRmlyc3RDaGFyIiwiY2hhckF0IiwicGxheWVyVHdvRmlyc3RDaGFyIiwiYnVpbGREYXNoYm9hcmQiLCJkcmF3TWluaVNoaXBzIiwicGxheWVyT25lRGFzaEJvYXJkIiwiUGxheWVyT25lTWluaVNoaXBzIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllclR3b0Rhc2hCb2FyZCIsInBsYXllclR3b01pbmlTaGlwcyIsInBsYXllck9uZVN1bmtTaGlwcyIsInBsYXllclR3b1N1bmtTaGlwcyIsInVwZGF0ZURhc2hCb2FyZCIsInVwZGF0ZU1pbmlTaGlwcyIsImNvdW50ZG93bk1vZGFsIiwiZml4VHlwbyIsImNsaWNrSGFuZGxlciIsImUiLCJhZGRFdmVudExpc3RlbmVyIiwidGFyZ2V0IiwiaGFzQ2hpbGROb2RlcyIsImNvbXB1dGVyTW92ZSIsImludHJvUGFnZSIsInBhZ2VIb2xkZXIiLCJzZXRBdHRyaWJ1dGUiLCJoZWFkZXIiLCJ0aXRsZSIsImJ0bkhvbGRlciIsInNpbmdsZVBsYXllckJ0biIsIm11bHRpUGxheWVyQnRuIiwiZHJhd0ZpcnN0UGFnZSIsInBhZ2VDb250YWluZXIiLCJsb2dvRGl2IiwidGl0dGxlIiwic2V0VGltZW91dCIsInRlbXBsYXRlU2hpcEdyaWQiLCJzZWNvbmRQYWdlIiwic3RyYXRlZ3lCb2FyZCIsImJ0bnMiLCJ0ZW1wbGF0ZSIsImlubmVySFRNTCIsInNoaXBzUGxhY2VtZW50IiwiZWxlbWVudCIsInJhbmRvbVBsYWNlbWVudCIsIm5ld1BsYXllciIsImNvbnRhaW5lciIsInBsYXlCdG4iLCJzaGlwc0NvbnRhaW5lciIsImRpc3BsYXkiLCJzZXRTaGlwc1BsYWNlIiwicmFuZG9tbHlQbGFjZVNoaXBzIiwic2hpcHMiLCJoaXRzIiwibWlzc2VkIiwia2VlcE5hbWUiLCJQbGF5ZXIiLCJzaGlwc0Nvb3JkaW5hdGVzIiwiY291bnREb3duUGFnZSIsInBhc3NTY3JlZW4iLCJjb3VudGRvd24iLCJ1cGRhdGVDb3VudGRvd25VSSIsImVsZSIsIm1pbmlGbGVldHMiLCJzaGlwc0RpdiIsInN1bmtTaGlwQXJyYXkiLCJjb2xvciIsImZvckVhY2giLCJzaGlwIiwic3Vua1NoaXAiLCJ3aW5uZXJEaXYiLCJob2xkZXIiLCJmb3JtVGVtcGxhdGUiLCJtaW5pU2hpcEJvYXJkIiwiZGl2QXJyYXkiLCJyZVBvc2l0aW9uIiwic2hpcHNBcnJheSIsImFsbFNoaXBQb3NpdGlvbnMiLCJjZWxsc1RvUmVtb3ZlZCIsInNsaWNlIiwiY2VsbCIsInRvU3RyaW5nIiwic3BsaWNlIiwiaW5kZXhPZiIsInBsYWNlUGxheWVyU2hpcEhvcml6b250YWwiLCJjb29yZGluYXRlcyIsImNvbnZlcnRJbmRleCIsInNoaXBDZWxscyIsInBsYWNlVmVydGljYWwiLCJ0YWtlbkNlbGxzIiwicG9zaXRpb25zIiwicGxhY2VSYW5kb20iLCJwbGFjZVBsYXllclNoaXBWZXJ0aWNhbCIsInBsYWNlSG9yaXpvbnRhbCIsImFsbG93RHJvcCIsInByZXZlbnREZWZhdWx0IiwiZHJhZyIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJpZCIsImRyb3AiLCJkYXRhIiwiZ2V0RGF0YSIsImRyYWdnZWQiLCJnZXRFbGVtZW50QnlJZCIsInNoaXBEaXJlY3Rpb24iLCJnZXRTaGlwRGlyZWN0aW9uQ2xhc3MiLCJzaGlwSW5kZXgiLCJ3aGljaFNoaXBDbGlja2VkIiwic2hpcE5hbWUiLCJhbGxDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJzcGxpdCIsImRpcmVjdGlvbkNsYXNzIiwiZmxpcCIsInJlc3VsdCIsInBvc2l0aW9uVGVtcFNoaXAiLCJyZW1vdmUiLCJkaXJlY3Rpb24iLCJmaXJzdENvb3JkaW5hdGUiLCJ0ZW1wU2hpcCIsIlNoaXAiLCJ0ZW1wU2hpcHMiLCJ0ZW1wQm9hcmQiLCJHYW1lQm9hcmQiLCJpc0Nvb3JkaW5hdGVGcmVlIiwibmV3UG9zaXRpb24iLCJyZW1vdmVDb29yZGluYXRlIiwiYXJyYXkiLCJzaGlwUG9zaXRpb24iLCJ0YWtlblBvc2l0aW9ucyIsInBvc2l0aW9uIiwiZHJhd1NoaXBzIiwiZGl2SG9sZGVyIiwiZGl2IiwiZHJhZ1NoaXBzIiwic3F1YXJlcyIsInNxdWFyZSIsInRvdGFsTGVuZ3RoIiwicmVkdWNlIiwidG90YWwiLCJjcmVhdGVCb2FyZCIsImFsbENvb3JkaW5hdGVzIiwiaW52ZXJzZUhhc2hNYXAiLCJpbnZlcnNlQ29vcmRpbmF0ZSIsInJvdyIsImNvbCIsIk1hcCIsImsiLCJzZXQiLCJQb3NpdGlvbiIsInNoaXBMZW5ndGgiLCJob3Jpem9udGFsIiwidmVydGljYWwiLCJ0d29EaW1lbnNpb25BcnJheSIsInJhbmRvbUZyZWVDb29yZGluYXRlIiwicmFuZG9tTnVtIiwicmFuZG9tQ2VsbCIsInJlbGF0ZWRDb29yZGluYXRlIiwiaW5jbHVkZXMiLCJudW0iLCJyYW5kb20iLCJyYW5kb21seVBvc2l0aW9uIiwic2lkZSIsInNwYWNlVGFrZW4iLCJjaGVja0Nvb3JkaW5hdGUiLCJpc0hpdCIsIm9uZURpbWVuc2lvbkFycmF5IiwiY2FycmllciIsImJhdHRsZVNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2wiLCJwaWNrZWROdW0iLCJjb21wdXRlclNsb3QiLCJuZXh0SGl0cyIsIm5laWdoYm9yU2xvdHMiLCJhZGphY2VudFNsb3QiLCJ2YWxpZFNwb3QiLCJtb3ZlIiwicmFuZG9tU3BvdCIsIm5leHRUcnkiLCJhbGxTcG90cyIsInNwb3QiLCJzdW0iLCJfZG9tQ29tcG9uZW50IiwiYm9hcmRXcmFwcGVyIiwiZmlyc3RQbGF5ZXIiLCJzZWNvbmRQbGF5ZXIiLCJoYXNobWFwIiwibWF0Y2hlcyIsInZhbHVlIiwicmVwbGFjZSIsInB1dFNoaXBzIiwiZHJhZ0FuZERyb3AiLCJzaXplIiwiYm9hcmRzIiwidHVybkRpdiIsImRhc2hCb2FyZCIsIndpbm5lckRpdkhvbGRlciIsImNsZWFyIiwiY2xvc2UiLCJyZXBvc2l0aW9uIiwieG8iXSwic291cmNlUm9vdCI6IiJ9