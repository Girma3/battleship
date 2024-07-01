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
    //printNewBoard();
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
function screenController(playerOne, playerTwo, soloPlayer) {
  const game = GameFlow(playerOne, playerTwo);
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
  if (divArray[0].textContent !== "you") {
    divArray[0].textContent = `${playerOneName}'s fleet`;
    divArray[1].textContent = `${playerTwoName}'s fleet`;
  } else {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sbUdBQW1HLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxPQUFPLFFBQVEsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLE1BQU0sVUFBVSxZQUFZLE1BQU0sTUFBTSxVQUFVLFlBQVksTUFBTSxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLE1B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RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLE9BQU8sYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLFVBQVUsS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFVB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LEdBQUcsQ0FBQyxFQUFFO0lBQy9DLE1BQU1rTyxFQUFFLEdBQUcsSUFBQW5KLGVBQU0sRUFBQ25FLGFBQWEsRUFBRXNNLFdBQVcsQ0FBQy9HLFVBQVUsQ0FBQztJQUN4RDtJQUNBK0csV0FBVyxHQUFHZ0IsRUFBRTtFQUNsQjtFQUNBLElBQUlmLFlBQVksQ0FBQzdPLEtBQUssQ0FBQ0ssY0FBYyxDQUFDcUIsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNoRCxNQUFNa08sRUFBRSxHQUFHLElBQUFuSixlQUFNLEVBQUNsRSxhQUFhLEVBQUVzTSxZQUFZLENBQUNoSCxVQUFVLENBQUM7SUFDekQ7SUFDQWdILFlBQVksR0FBR2UsRUFBRTtFQUNuQjtBQUNGO0FBQ0EsU0FBU1YsUUFBUUEsQ0FBQSxFQUFHO0VBQ2xCLE1BQU1qSixjQUFjLEdBQUduSSxRQUFRLENBQUNnRSxhQUFhLENBQUMsd0JBQXdCLENBQUM7RUFDdkVtRSxjQUFjLENBQUN4SCxLQUFLLENBQUN5SCxPQUFPLEdBQUcsTUFBTTtFQUNyQyxJQUFJNEksT0FBTyxDQUFDTSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0lBQ3BCTyxVQUFVLENBQUMsQ0FBQztJQUNaLElBQUE5Siw2QkFBZSxFQUFDK0ksV0FBVyxDQUFDO0VBQzlCLENBQUMsTUFBTSxJQUFJRSxPQUFPLENBQUNNLElBQUksR0FBRyxDQUFDLEVBQUU7SUFDM0JPLFVBQVUsQ0FBQyxDQUFDO0lBQ1osSUFBQTlKLDZCQUFlLEVBQUNnSixZQUFZLENBQUM7RUFDL0I7QUFDRixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ib2FyZC1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20tY29tcG9uZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2Utc2hpcC1wYWdlL3NoaXAtcG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91dGlsaXR5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2Utc2hpcC1wYWdlL3NoaXBzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZS1zaGlwLXBhZ2Uvc2hpcHMuY3NzPzQyN2MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2Z1bmN0aW9uIGRyYXcgc2hpcHMgd2l0aCBoaXQgYW5kIG1pc3MgZm9yIHRoZSBvd25lclxuZnVuY3Rpb24gZmlyc3RCb2FyZChzaGlwQ29vcmRpbmF0ZSwgaGl0LCBtaXNzKSB7XG4gIC8vIENyZWF0ZSBhIDJEIGdyaWQgb2YgY2VsbHNcbiAgY29uc3QgY2VsbHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY2VsbHNbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gXCJcIjtcbiAgICB9XG4gIH1cbiAgLy8gTWFyayB0aGUgY29vcmRpbmF0ZXMgb24gdGhlIGdyaWRcbiAgZm9yIChjb25zdCBbYSwgYl0gb2Ygc2hpcENvb3JkaW5hdGUpIHtcbiAgICBjZWxsc1thXVtiXSA9IFwic2hpcFwiO1xuICB9XG4gIGZvciAoY29uc3QgW3gsIHldIG9mIGhpdCkge1xuICAgIGlmIChjZWxsc1t4XVt5XSA9PT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgbWlzcykge1xuICAgIGlmIChjZWxsc1t4XVt5XSAhPT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgfVxuICB9XG4gIC8vIENyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGdyaWRcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkcy5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIC8vIENyZWF0ZSBidXR0b25zIGZvciBlYWNoIGNlbGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcInNoaXBcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcInRhcmdldC1kb3RcIik7XG4gICAgICBkb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNGIyOTI5XCI7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9IGVsc2UgaWYgKGNlbGxzW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gXCJoaXRcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcInRhcmdldC1kb3RcIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImhpdC1zdHJpa2VcIik7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9IGVsc2UgaWYgKGNlbGxzW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJtaXNzZWQtc3RyaWtlXCIpO1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGRvdCk7XG4gICAgfVxuICAgIGdyaWRzLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cbiAgcmV0dXJuIGdyaWRzO1xufVxuLy9mdW5jdGlvbiAgZHJhdyBtaXNzIGFuZCBoaXQgYW5kIHJldmVsIHNoaXAgaWYgaXQgaGl0IHVzZWQgdG9cbi8vc2hvdyBmb3Igb3Bwb25lbnQgYnkgaGlkaW5nIHNoaXBzIHdoZW4gaXQgcmVuZGVyIGZpcnN0XG5mdW5jdGlvbiBzdHJpa2VCb2FyZChzaGlwQ29vcmRpbmF0ZSwgaGl0LCBtaXNzKSB7XG4gIC8vIENyZWF0ZSBhIDJEIGdyaWQgb2YgY2VsbHNcbiAgY29uc3QgY2VsbHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY2VsbHNbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gXCJcIjtcbiAgICB9XG4gIH1cbiAgLy8gbWFyayB0aGUgY29vcmRpbmF0ZXMgb24gdGhlIGdyaWRcbiAgZm9yIChjb25zdCBbYSwgYl0gb2Ygc2hpcENvb3JkaW5hdGUpIHtcbiAgICBjZWxsc1thXVtiXSA9IFwic2hpcFwiO1xuICB9XG4gIGZvciAoY29uc3QgW3gsIHldIG9mIGhpdCkge1xuICAgIGlmIChjZWxsc1t4XVt5XSA9PT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgbWlzcykge1xuICAgIGlmIChjZWxsc1t4XVt5XSAhPT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgfVxuICB9XG4gIC8vIENyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGdyaWRcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkcy5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIC8vIENyZWF0ZSBidXR0b25zIGZvciBlYWNoIGNlbGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcImhpdFwiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWRvdFwiKTtcbiAgICAgIGRvdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGRvdCk7XG4gICAgfSBlbHNlIGlmIChjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09IFwibWlzc1wiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkLXN0cmlrZVwiKTtcbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkb3QpO1xuICAgIH0gZWxzZSBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcInNoaXBcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gICAgZ3JpZHMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICByZXR1cm4gZ3JpZHM7XG59XG4vL2RyYXcgMTAgWCAxMCBib2FyZFxuZnVuY3Rpb24gZHJhd0dyaWRzKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBncmlkLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cbiAgcmV0dXJuIGdyaWQ7XG59XG5leHBvcnQgeyBmaXJzdEJvYXJkLCBzdHJpa2VCb2FyZCwgZHJhd0dyaWRzIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyTW92ZSB9IGZyb20gXCIuL3V0aWxpdHkuanNcIjtcbmltcG9ydCB7IHN0cmlrZUJvYXJkLCBmaXJzdEJvYXJkLCBkcmF3R3JpZHMgfSBmcm9tIFwiLi9ib2FyZC1jb21wb25lbnQuanNcIjtcbmltcG9ydCB7XG4gIGRyYWdTaGlwcyxcbiAgcmFuZG9tbHlQbGFjZVNoaXBzLFxufSBmcm9tIFwiLi9wbGFjZS1zaGlwLXBhZ2Uvc2hpcC1wb3NpdGlvbi5qc1wiO1xuXG5sZXQgY291bnQgPSAzO1xubGV0IHdpbm5lck1zZyA9IFtdO1xuLypcbipHYW1lRmxvdyAtIG9iamVjdCB0aGF0IGhhcyAzIG1ldGhvZHMgb25lIHRvIGNoYW5nZSBwbGF5ZXIgdHVybixzZWNvbmQgdG8gY3JlYXRlIGJvYXJkIHVzaW5nIHBsYXllciBpbmZvLCBcbiogICAgICAgICAgIHRoaXJkIHRvIHVwZGF0ZSBib2FyZCBzdGF0ZVxuKkdhbWVGbG93KCkucHJpbnRCb2FyZChwbGF5ZXIpIC0gZHJhdyBib2FyZCB1c2luZyBwbGF5ZXIgaGl0LG1pc3MgYW5kIHNoaXAgcG9zaXRpb24gYXJyYXksXG4gcmV0dXJuIDEwIHggMTAgYm9hcmQgb25lIHdpdGggc2hpcCBzaG93biwgdGhlIG90aGVyIHdpdGhvdXQgdGhlIHNoaXAgdW5sZXNzIGl0IGhpdCB0byBzaG93IHRoZSBvcHBvbmVudCBzdHJpa2luZyBzdGF0ZSBvbiB0aGUgYm9hcmQuIFxuKi9cblxuZnVuY3Rpb24gR2FtZUZsb3cocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgbGV0IGlzR2FtZUVuZCA9IGZhbHNlO1xuICBjb25zdCBwbGF5ZXJzID0gW3BsYXllck9uZSwgcGxheWVyVHdvXTtcbiAgbGV0IGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgYWN0aXZlUGxheWVyID0gYWN0aXZlUGxheWVyID09PSBwbGF5ZXJzWzBdID8gcGxheWVyc1sxXSA6IHBsYXllcnNbMF07XG4gIH07XG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IGFjdGl2ZVBsYXllcjtcbiAgY29uc3QgcHJpbnRCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBnZXRQbGF5ZXIoKTtcbiAgICBjb25zdCBtaXNzU3RyaWtlcyA9IHBsYXllci5ib2FyZC5taXNzZWRTaG90cztcbiAgICBjb25zdCBoaXRTdHJpa2VzID0gcGxheWVyLmJvYXJkLmhpdFNob3RzO1xuICAgIGNvbnN0IGFsbFRoZVNoaXBzID0gcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zO1xuICAgIGNvbnN0IHNoaXBCb2FyZFN0YXRlID0gZmlyc3RCb2FyZChhbGxUaGVTaGlwcywgaGl0U3RyaWtlcywgbWlzc1N0cmlrZXMpO1xuICAgIGNvbnN0IHN0cmlrZUJvYXJkU3RhdGUgPSBzdHJpa2VCb2FyZChhbGxUaGVTaGlwcywgaGl0U3RyaWtlcywgbWlzc1N0cmlrZXMpO1xuICAgIGNvbnN0IHVwZGF0ZVN1bmtTaGlwID0gcGxheWVyLmJvYXJkLnN1bmtTaGlwcygpO1xuICAgIHJldHVybiB7XG4gICAgICBzaGlwQm9hcmRTdGF0ZSxcbiAgICAgIHN0cmlrZUJvYXJkU3RhdGUsXG4gICAgICB1cGRhdGVTdW5rU2hpcCxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHByaW50TmV3Qm9hcmQgPSAoKSA9PiB7XG4gICAgLy9kcmF3IGN1cnJlbnQgcGxheWVyIGJvYXJkIHN0YXRlIHVzaW5nIG9wcG9uZW50IGhpdCBhbmQgbWlzc1xuICAgIC8vdGhlbiBkcmF3IHN0cmlraW5nIGJvYXJkIHVzaW5nIGN1cnJlbnQgcGxheWVyIGhpdCBhbmQgbWlzcyBvbiBvcHBvbmVudCBib2FyZFxuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBjb25zdCBvcHBvbmVudE5hbWUgPSBnZXRQbGF5ZXIoKS5uYW1lO1xuICAgIGNvbnN0IG9wcG9uZW50UGxheWVyU2hpcFN0YXRlID0gcHJpbnRCb2FyZChnZXRQbGF5ZXIoKSkudXBkYXRlU3Vua1NoaXA7XG4gICAgY29uc3Qgb3Bwb25lbnRTdHJpa2VCb2FyZCA9IHByaW50Qm9hcmQoZ2V0UGxheWVyKCkpLnN0cmlrZUJvYXJkU3RhdGU7XG4gICAgY2hhbmdlVHVybigpO1xuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQgPSBwcmludEJvYXJkKGdldFBsYXllcigpKS5zaGlwQm9hcmRTdGF0ZTtcbiAgICBjb25zdCBjdXJyZW50UGxheWVyU2hpcFN0YXRlID0gcHJpbnRCb2FyZChnZXRQbGF5ZXIoKSkudXBkYXRlU3Vua1NoaXA7XG4gICAgY29uc3QgY3VycmVudFBsYXllck5hbWUgPSBnZXRQbGF5ZXIoKS5uYW1lO1xuICAgIHJldHVybiB7XG4gICAgICBvcHBvbmVudE5hbWUsXG4gICAgICBjdXJyZW50UGxheWVyTmFtZSxcbiAgICAgIGN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQsXG4gICAgICBvcHBvbmVudFN0cmlrZUJvYXJkLFxuICAgICAgb3Bwb25lbnRQbGF5ZXJTaGlwU3RhdGUsXG4gICAgICBjdXJyZW50UGxheWVyU2hpcFN0YXRlLFxuICAgIH07XG4gIH07XG4gIGNvbnN0IHBsYXllclJvdW5kID0gKHBsYXllciwgY2xpY2tlZE51bSkgPT4ge1xuICAgIGlmIChpc0dhbWVFbmQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHBsYXllci5ib2FyZC5jb29yZGluYXRlc0hhc2hNYXAuZ2V0KE51bWJlcihjbGlja2VkTnVtKSk7XG4gICAgLy9hdHRhY2sgb3Bwb25lbnQgYm9hcmQgYnkgY2hhbmdpbmcgdHVybiB0byBndCBvcHBvbmVudCBib2FyZFxuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBnZXRQbGF5ZXIoKS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuICAgIGRlY2xhcmVXaW5uZXIoZ2V0UGxheWVyKCkpO1xuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBkZWNsYXJlV2lubmVyKHBsYXllcik7XG4gICAgLy9wcmludE5ld0JvYXJkKCk7XG4gICAgLy9hbm5vdW5jZSB3aW5uZXIgaWYgaXQgZm91bmRcbiAgICBpZiAod2lubmVyTXNnLmxlbmd0aCA+IDApIHtcbiAgICAgIHdpbm5lck1vZGFsKHdpbm5lck1zZy5wb3AoKSk7XG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5uZXItbW9kYWxdXCIpO1xuICAgICAgbW9kYWwuc2hvd01vZGFsKCk7XG4gICAgICBpc0dhbWVFbmQgPSB0cnVlO1xuICAgICAgcGxheWVyT25lID0gbnVsbDtcbiAgICAgIHBsYXllclR3byA9IG51bGw7XG4gICAgICB3aW5uZXJNc2cgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlVHVybigpO1xuICAgIH1cbiAgICAvL3N0b3JlIHdpbm5lciBtZXNzYWdlIHdoZW4gc3RhdGUgY2hhbmdlIGluIHRoZSBhYm92ZSB3aGVuIHdlIGNoYW5nZSB0dXJuc1xuICAgIGZ1bmN0aW9uIGRlY2xhcmVXaW5uZXIocGxheWVyKSB7XG4gICAgICBpZiAod2lubmVyKHBsYXllcikgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbm5lck1zZy5wdXNoKHdpbm5lcihwbGF5ZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9mdW5jdGlvbiByZXR1cm4gc3RyaW5nIHRvIGRlY2xhcmUgd2hvIHdvbiBhbmQgbG9zdCBpZiB0aGUgZ2FtZSBlbmRcbiAgICBmdW5jdGlvbiB3aW5uZXIocGxheWVyKSB7XG4gICAgICAvLyBnYW1lIGVuZHMgd2hlbiBwbGF5ZXIgbWV0aG9kIGlzU3VuaygpIHJldHVybiB0cnVlXG4gICAgICBjb25zdCBmaXJzdFBsYXllclN1bmtTaGlwcyA9IHBsYXllck9uZS5ib2FyZC5pc1N1bmsoKTtcbiAgICAgIGNvbnN0IHNlY29uZFBsYXllclN1bmtTaGlwcyA9IHBsYXllclR3by5ib2FyZC5pc1N1bmsoKTtcbiAgICAgIGNvbnN0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmUubmFtZTtcbiAgICAgIGNvbnN0IHBsYXllclR3b05hbWUgPSBwbGF5ZXJUd28ubmFtZTtcbiAgICAgIGxldCBtc2c7XG4gICAgICBpZiAoZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPT09IGZhbHNlICYmIHNlY29uZFBsYXllclN1bmtTaGlwcyA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybiBtc2c7XG4gICAgICBlbHNlIGlmIChmaXJzdFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJiBwbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lTmFtZSkge1xuICAgICAgICBtc2cgPSBgJHtwbGF5ZXJUd29OYW1lfSB3b24g8J+OiWA7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaXJzdFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJlxuICAgICAgICBwbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lTmFtZVxuICAgICAgKSB7XG4gICAgICAgIG1zZyA9IGAke3BsYXllck9uZU5hbWV9IGxvc3RgO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc2Vjb25kUGxheWVyU3Vua1NoaXBzID09PSB0cnVlICYmXG4gICAgICAgIHBsYXllci5uYW1lID09PSBwbGF5ZXJPbmVOYW1lXG4gICAgICApIHtcbiAgICAgICAgbXNnID0gYCR7cGxheWVyT25lTmFtZX0gd29uIPCfjolgO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc2Vjb25kUGxheWVyU3Vua1NoaXBzID09PSB0cnVlICYmXG4gICAgICAgIHBsYXllci5uYW1lID09PSBwbGF5ZXJUd29OYW1lXG4gICAgICApIHtcbiAgICAgICAgbXNnID0gYCR7cGxheWVyVHdvTmFtZX0gbG9zdGA7XG4gICAgICB9XG4gICAgICByZXR1cm4gbXNnO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldFBsYXllcixcbiAgICBwbGF5ZXJSb3VuZCxcbiAgICBwcmludE5ld0JvYXJkLFxuICAgIGlzR2FtZUVuZCxcbiAgfTtcbn1cbi8vIGZ1bmN0aW9uIHRoYXQgdXBkYXRlIHRoZSBzY3JlZW4gdXNpbmcgZ2FtZSBmbG93IGZ1bmN0aW9uXG5mdW5jdGlvbiBzY3JlZW5Db250cm9sbGVyKHBsYXllck9uZSwgcGxheWVyVHdvLCBzb2xvUGxheWVyKSB7XG4gIGNvbnN0IGdhbWUgPSBHYW1lRmxvdyhwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci10dXJuXCIpO1xuICBjb25zdCBwbGF5ZXJPbmVTaGlwc0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1vbmVcIik7XG4gIGNvbnN0IHBsYXllck9uZVN0cmlrZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC10d29cIik7XG4gIGNvbnN0IGZpcnN0UGxheWVyU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1vbmUtbWluaS1zaGlwc1wiKTtcbiAgY29uc3Qgc2Vjb25kUGxheWVyU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci10d28tbWluaS1zaGlwc1wiKTtcbiAgZmlyc3RQbGF5ZXJTaGlwcy50ZXh0Q29udGVudCA9IFwiXCI7XG4gIHNlY29uZFBsYXllclNoaXBzLnRleHRDb250ZW50ID0gXCJcIjtcbiAgLy9jb25zdCBwbGF5ZXJPbmVGaXJzdENoYXIgPSBwbGF5ZXJPbmUubmFtZS5jaGFyQXQoMCk7XG4gIC8vY29uc3QgcGxheWVyVHdvRmlyc3RDaGFyID0gcGxheWVyVHdvLm5hbWUuY2hhckF0KDApO1xuXG4gIGNvbnN0IHVwZGF0ZVNjcmVlbiA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJPbmVGaXJzdENoYXIgPSBwbGF5ZXJPbmUubmFtZS5jaGFyQXQoMCk7XG4gICAgY29uc3QgcGxheWVyVHdvRmlyc3RDaGFyID0gcGxheWVyVHdvLm5hbWUuY2hhckF0KDApO1xuICAgIGlmIChnYW1lLmlzR2FtZUVuZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL21ldGhvZCB0byBjaGFuZ2UgYW5kIHVwZGF0ZSBwbGF5ZXIgZmxlZXQgYmFzZWQgb24gY3VycmVudCBwbGF5ZXIgZm9yIHRoZSBtaW5pIGZsZWV0XG4gICAgY29uc3QgYnVpbGREYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgICBpZiAoZ2FtZS5nZXRQbGF5ZXIoKS5uYW1lID09PSBwbGF5ZXJPbmUubmFtZSkge1xuICAgICAgICBkcmF3TWluaVNoaXBzKGZpcnN0UGxheWVyU2hpcHMsIHBsYXllck9uZUZpcnN0Q2hhcik7XG4gICAgICAgIGRyYXdNaW5pU2hpcHMoc2Vjb25kUGxheWVyU2hpcHMsIHBsYXllclR3b0ZpcnN0Q2hhcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcmF3TWluaVNoaXBzKGZpcnN0UGxheWVyU2hpcHMsIHBsYXllclR3b0ZpcnN0Q2hhcik7XG4gICAgICAgIGRyYXdNaW5pU2hpcHMoc2Vjb25kUGxheWVyU2hpcHMsIHBsYXllck9uZUZpcnN0Q2hhcik7XG4gICAgICB9XG4gICAgfTtcbiAgICBidWlsZERhc2hib2FyZCgpO1xuXG4gICAgdHVybi50ZXh0Q29udGVudCA9IGAke2dhbWUuZ2V0UGxheWVyKCkubmFtZX0ncyB0dXJuYDtcbiAgICBwbGF5ZXJPbmVTaGlwc0JvYXJkLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBwbGF5ZXJPbmVTdHJpa2VCb2FyZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAvL2dyYWIgYWxsIG1pbmkgc2hpcCBieSB1c2luZyBwbGF5ZXIgbmFtZVxuICAgIGNvbnN0IHBsYXllck9uZURhc2hCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BsYXllck9uZUZpcnN0Q2hhcn1gKTtcbiAgICBjb25zdCBQbGF5ZXJPbmVNaW5pU2hpcHMgPVxuICAgICAgcGxheWVyT25lRGFzaEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWluaS1zaGlwLXNpemVcIik7XG4gICAgY29uc3QgcGxheWVyVHdvRGFzaEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cGxheWVyVHdvRmlyc3RDaGFyfWApO1xuICAgIGNvbnN0IHBsYXllclR3b01pbmlTaGlwcyA9XG4gICAgICBwbGF5ZXJUd29EYXNoQm9hcmQucXVlcnlTZWxlY3RvckFsbChcIi5taW5pLXNoaXAtc2l6ZVwiKTtcbiAgICAvL3VwZGF0ZSBtaW5pIHNoaXBzIGlmIGl0IGhpdFxuICAgIGNvbnN0IHBsYXllck9uZVN1bmtTaGlwcyA9IGdhbWUucHJpbnROZXdCb2FyZCgpLmN1cnJlbnRQbGF5ZXJTaGlwU3RhdGU7XG4gICAgY29uc3QgcGxheWVyVHdvU3Vua1NoaXBzID0gZ2FtZS5wcmludE5ld0JvYXJkKCkub3Bwb25lbnRQbGF5ZXJTaGlwU3RhdGU7XG4gICAgLy9tZXRob2QgdG8gdXBkYXRlIHNoaXBzIGJhc2VkIG9uIGN1cnJlbnQgcGxheWVyXG4gICAgY29uc3QgdXBkYXRlRGFzaEJvYXJkID0gKCkgPT4ge1xuICAgICAgaWYgKGdhbWUuZ2V0UGxheWVyLm5hbWUgPT09IHBsYXllck9uZS5uYW1lKSB7XG4gICAgICAgIHVwZGF0ZU1pbmlTaGlwcyhQbGF5ZXJPbmVNaW5pU2hpcHMsIHBsYXllck9uZVN1bmtTaGlwcywgXCJyZWRcIik7XG4gICAgICAgIHVwZGF0ZU1pbmlTaGlwcyhwbGF5ZXJUd29NaW5pU2hpcHMsIHBsYXllclR3b1N1bmtTaGlwcywgXCJyZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVNaW5pU2hpcHMoUGxheWVyT25lTWluaVNoaXBzLCBwbGF5ZXJPbmVTdW5rU2hpcHMsIFwicmVkXCIpO1xuICAgICAgICB1cGRhdGVNaW5pU2hpcHMocGxheWVyVHdvTWluaVNoaXBzLCBwbGF5ZXJUd29TdW5rU2hpcHMsIFwicmVkXCIpO1xuICAgICAgfVxuICAgIH07XG4gICAgdXBkYXRlRGFzaEJvYXJkKCk7XG4gICAgLy91cGRhdGUgdGhlIGJvYXJkc1xuICAgIHBsYXllck9uZVNoaXBzQm9hcmQuYXBwZW5kQ2hpbGQoXG4gICAgICBnYW1lLnByaW50TmV3Qm9hcmQoKS5jdXJyZW50UGxheWVyU2hpcEJvYXJkXG4gICAgKTtcbiAgICBwbGF5ZXJPbmVTdHJpa2VCb2FyZC5hcHBlbmRDaGlsZChnYW1lLnByaW50TmV3Qm9hcmQoKS5vcHBvbmVudFN0cmlrZUJvYXJkKTtcbiAgICBpZiAoc29sb1BsYXllciA9PT0gZmFsc2UpIHtcbiAgICAgIGNvdW50ZG93bk1vZGFsKGBQYXNzIHRoZSBkZXZpY2UgdG8gJHtnYW1lLmdldFBsYXllcigpLm5hbWV9YCk7XG4gICAgfVxuICAgIGZpeFR5cG8ocGxheWVyT25lLm5hbWUsIHBsYXllclR3by5uYW1lKTtcbiAgfTtcbiAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGUpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBnYW1lLmdldFBsYXllcigpO1xuICAgIGdhbWUucGxheWVyUm91bmQocGxheWVyLCBlKTtcbiAgICB1cGRhdGVTY3JlZW4oKTtcbiAgfVxuXG4gIHBsYXllck9uZVN0cmlrZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICBjb25zdCBwbGF5ZXIgPSBnYW1lLmdldFBsYXllcigpO1xuICAgIC8vY2hlY2sgY2xpY2tlZCBjZWxsIGlzIGZyZWVcbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCB8fCBlLnRhcmdldC5oYXNDaGlsZE5vZGVzKCkgPT09IHRydWUpIHJldHVybjtcbiAgICBjbGlja0hhbmRsZXIoaW5kZXgpO1xuICAgIHVwZGF0ZVNjcmVlbigpO1xuICAgIC8vZm9yIHNvbG8gcGxheWVyXG4gICAgaWYgKFxuICAgICAgcGxheWVyLm5hbWUgIT09IFwiYWlcIiAmJlxuICAgICAgcGxheWVyLm5hbWUgPT09IFwieW91XCIgJiZcbiAgICAgIGUudGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSAhPT0gdHJ1ZVxuICAgICkge1xuICAgICAgZ2FtZS5wbGF5ZXJSb3VuZChwbGF5ZXIsIGNvbXB1dGVyTW92ZShwbGF5ZXIpKTtcbiAgICAgIHVwZGF0ZVNjcmVlbigpO1xuICAgIH1cbiAgfSk7XG4gIC8vaW5pdGlhbCByZW5kZXJcbiAgdXBkYXRlU2NyZWVuKCk7XG59XG4vL2ludHJvIHBhZ2VcbmZ1bmN0aW9uIGludHJvUGFnZSgpIHtcbiAgY29uc3QgcGFnZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBhZ2VIb2xkZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJpbnRyby1wYWdlXCIpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBoZWFkZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJsb2dvLWhvbGRlclwiKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVTaGlwXCI7XG5cbiAgY29uc3QgYnRuSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnRuSG9sZGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ2FtZS1vcHRpb25zXCIpO1xuICBjb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzaW5nbGVQbGF5ZXJCdG4udGV4dENvbnRlbnQgPSBcInNpbmdsZS1wbGF5ZXJcIjtcbiAgc2luZ2xlUGxheWVyQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2luZ2xlLXBsYXllci1idG5cIik7XG4gIHNpbmdsZVBsYXllckJ0bi5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vcHRpb24tYnRuc1wiKTtcbiAgY29uc3QgbXVsdGlQbGF5ZXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBtdWx0aVBsYXllckJ0bi50ZXh0Q29udGVudCA9IFwiWW91IHZzIEZyaWVuZFwiO1xuICBtdWx0aVBsYXllckJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm11bHRpLXBsYXllcnMtYnRuXCIpO1xuICBtdWx0aVBsYXllckJ0bi5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vcHRpb24tYnRuc1wiKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgYnRuSG9sZGVyLmFwcGVuZENoaWxkKHNpbmdsZVBsYXllckJ0bik7XG4gIGJ0bkhvbGRlci5hcHBlbmRDaGlsZChtdWx0aVBsYXllckJ0bik7XG4gIHBhZ2VIb2xkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgcGFnZUhvbGRlci5hcHBlbmRDaGlsZChidG5Ib2xkZXIpO1xuICByZXR1cm4gcGFnZUhvbGRlcjtcbn1cblxuZnVuY3Rpb24gZHJhd0ZpcnN0UGFnZSgpIHtcbiAgY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wYWdlLWNvbnRhaW5lcl1cIik7XG4gIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoaW50cm9QYWdlKCkpO1xuICBjb25zdCBsb2dvRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dvLWhvbGRlclwiKTtcbiAgY29uc3QgdGl0dGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImgxXCIpO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0aXR0bGUuY2xhc3NMaXN0LmFkZChcImxvZ29cIik7XG4gICAgbG9nb0Rpdi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xuICB9LCAwKTtcbn1cbi8vZHJhdyBzaGlwIHBsYWNlbWVudCBwYWdlXG5mdW5jdGlvbiB0ZW1wbGF0ZVNoaXBHcmlkKCkge1xuICBjb25zdCBzZWNvbmRQYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgc3RyYXRlZ3lCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHN0cmF0ZWd5Qm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkLWNvbnRhaW5lclwiKTtcbiAgc3RyYXRlZ3lCb2FyZC5hcHBlbmRDaGlsZChkcmF3R3JpZHMoKSk7XG4gIGNvbnN0IGJ0bnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGRpdiBjbGFzcz1cInNoaXBzLWNvbnRhaW5lclwiIGRhdGEtc2hpcHMtY29udGFpbmVyPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwbGFjZS1zaGlwcy1idG5zXCI+XG4gICAgPGJ1dHRvblxuICAgICAgYXJpYS1sYWJlbD1cInBsYWNlIHNoaXBzIGJ5IGRyYWdnaW5nXCJcbiAgICAgIGNsYXNzPVwiZHJhZy1idG5cIlxuICAgICAgZGF0YS1kcm9wLWJ0blxuICAgID5cbiAgICAgIERyYWcgJiBEcm9wIHNoaXBzXG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgYXJpYS1sYWJlbD1cInBsYWNlIHNoaXBzIHJhbmRvbWx5XCJcbiAgICAgIGNsYXNzPVwicmFuZG9taXplLWJ0blwiXG4gICAgICBkYXRhLXJhbmRvbS1idG5cbiAgICA+XG4gICAgICBSYW5kb21pemVcbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwicGxheS1idG5cIj5QbGF5PC9idXR0b24+XG4gICAgPC9kaXY+XG4gYDtcbiAgYnRucy5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgc2Vjb25kUGFnZS5hcHBlbmRDaGlsZChzdHJhdGVneUJvYXJkKTtcbiAgc2Vjb25kUGFnZS5hcHBlbmRDaGlsZChidG5zKTtcbiAgcmV0dXJuIHNlY29uZFBhZ2U7XG59XG4vL2Z1bmN0aW9uIHRvIGF0dGFjaCBzaGlwIHRlbXBsYXRlIHRvIGRvbVxuZnVuY3Rpb24gc2hpcHNQbGFjZW1lbnQoZWxlbWVudCkge1xuICBlbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZVNoaXBHcmlkKCkpO1xufVxuLy9cbmZ1bmN0aW9uIHJhbmRvbVBsYWNlbWVudChuZXdQbGF5ZXIpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1jb250YWluZXJcIik7XG4gIGNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXktYnRuXCIpO1xuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zaGlwcy1jb250YWluZXJdXCIpO1xuICBzaGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGlmIChuZXdQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3Qgc2V0U2hpcHNQbGFjZSA9IHJhbmRvbWx5UGxhY2VTaGlwcyhuZXdQbGF5ZXIpO1xuICAgIGNvbnN0IHNoaXBzID0gbmV3UGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zO1xuICAgIGNvbnN0IGhpdHMgPSBuZXdQbGF5ZXIuYm9hcmQuaGl0U2hvdHM7XG4gICAgY29uc3QgbWlzc2VkID0gbmV3UGxheWVyLmJvYXJkLm1pc3NlZFNob3RzO1xuICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZpcnN0Qm9hcmQoc2hpcHMsIGhpdHMsIG1pc3NlZCkpO1xuICAgIHBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBrZWVwTmFtZSA9IG5ld1BsYXllci5uYW1lO1xuICAgIG5ld1BsYXllciA9IG51bGw7XG4gICAgbmV3UGxheWVyID0gUGxheWVyKGtlZXBOYW1lLCBzaGlwcyk7XG4gICAgY29uc3Qgc2V0U2hpcHNQbGFjZSA9IHJhbmRvbWx5UGxhY2VTaGlwcyhuZXdQbGF5ZXIpO1xuICAgIGNvbnN0IHNoaXBzQ29vcmRpbmF0ZXMgPSBuZXdQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnM7XG4gICAgY29uc3QgaGl0cyA9IG5ld1BsYXllci5ib2FyZC5oaXRTaG90cztcbiAgICBjb25zdCBtaXNzZWQgPSBuZXdQbGF5ZXIuYm9hcmQubWlzc2VkU2hvdHM7XG4gICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZmlyc3RCb2FyZChzaGlwc0Nvb3JkaW5hdGVzLCBoaXRzLCBtaXNzZWQpKTtcbiAgICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH1cbn1cbi8vY291bnRkb3duIHBhZ2UgdGhhdCBhY2NlcHQgbWVzc2FnZSBhbmQgaGlkZSBvdGhlciBjb250ZW50XG5mdW5jdGlvbiBjb3VudERvd25QYWdlKG1zZykge1xuICBjb25zdCBwYXNzU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzLXNjcmVlblwiKTtcbiAgY29uc3QgdGVtcGxhdGUgPSBgIFxuICAgICA8ZGl2IGNsYXNzPVwibXNnLXRleHRcIiBkYXRhLW1zZz4ke21zZ308L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb3VudGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb3VudGVyLWJvYXJkXCIgZGF0YS1jb3VudC1kb3duPjwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgcGFzc1NjcmVlbi5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbn1cbmZ1bmN0aW9uIGNvdW50ZG93bk1vZGFsKG1zZykge1xuICBjb25zdCBwYXNzU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzLXNjcmVlblwiKTtcbiAgaWYgKGNvdW50IDwgMCkge1xuICAgIGNvdW50ID0gMztcbiAgfVxuICBjb3VudERvd25QYWdlKG1zZyk7XG4gIGNvdW50ZG93bigpO1xufVxuZnVuY3Rpb24gdXBkYXRlQ291bnRkb3duVUkoKSB7XG4gIGNvbnN0IHBhc3NTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3Mtc2NyZWVuXCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY291bnQtZG93bl1cIikudGV4dENvbnRlbnQgPSBjb3VudDtcbiAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgcGFzc1NjcmVlbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgcGFzc1NjcmVlbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0gZWxzZSB7XG4gICAgcGFzc1NjcmVlbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY291bnRkb3duKCkge1xuICBpZiAoY291bnQgPj0gMCkge1xuICAgIHVwZGF0ZUNvdW50ZG93blVJKCk7XG4gICAgY291bnQtLTtcbiAgICBzZXRUaW1lb3V0KGNvdW50ZG93biwgMTAwMCk7XG4gIH1cbn1cbi8vZnVuY3Rpb24gdG8gZHJhdyBtaW5pIHNoaXBzIHRvIHNob3cgc2hpcCAgc3VuayBzdGF0ZSBieSBjcmVhdGluZyBjbGFzcyBuYW1lIHVzaW5nIHBsYXllciBuYW1lIHRvIHVwZGF0ZVxuZnVuY3Rpb24gZHJhd01pbmlTaGlwcyhlbGUsIHBsYXllcikge1xuICBjb25zdCBtaW5pRmxlZXRzID0gYFxuICA8ZGl2IGNsYXNzPVwiZmxlZXQtaG9sZGVyICR7cGxheWVyfVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtaW5pLXNoaXAtb3duZXJcIj4ke3BsYXllcn08L2Rpdj5cbjxkaXYgY2xhc3M9XCJtaW5pLWNhcnJpZXIgIG1pbmktc2hpcC1zaXplXCIgZGF0YS1uYW1lPSdjYXJyaWVyJz48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtaW5pLWJhdHRsZVNoaXAgIG1pbmktc2hpcC1zaXplXCIgZGF0YS1uYW1lPSdiYXR0bGVTaGlwJz48L2Rpdj5cbjxkaXYgY2xhc3M9XCJzYW1lLXNpemUtc2hpcHNcIj5cbiAgPGRpdiBjbGFzcz1cIm1pbmktZGVzdHJveWVyICBtaW5pLXNoaXAtc2l6ZVwiIGRhdGEtbmFtZT0nZGVzdHJveWVyJz48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1pbmktc3VibWFyaW5lIG1pbmktc2hpcC1zaXplXCIgZGF0YS1uYW1lPSdzdWJtYXJpbmUnPjwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibWluaS1wYXRyb2wgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J3BhdHJvbCc+PC9kaXY+XG48L2Rpdj5gO1xuICBlbGUuaW5uZXJIVE1MID0gbWluaUZsZWV0cztcbn1cbi8vZnVuY3Rpb24gYWNjZXB0IG1pbmkgc2hpcHMgZGl2cywgc3VuayBzaGlwIG5hbWVzIGFzIGFuIGFycmF5IGFuZCBjaGFuZ2UgY29sb3Igb2YgZGl2cyB1c2luZyBkYXRhc2V0IHNhbWUgYXMgc2hpcCBuYW1lXG5cbmZ1bmN0aW9uIHVwZGF0ZU1pbmlTaGlwcyhzaGlwc0Rpdiwgc3Vua1NoaXBBcnJheSwgY29sb3IpIHtcbiAgaWYgKHN1bmtTaGlwQXJyYXkubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIHNoaXBzRGl2LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzdW5rU2hpcEFycmF5LmZvckVhY2goKHN1bmtTaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5kYXRhc2V0Lm5hbWUgPT09IHN1bmtTaGlwKSB7XG4gICAgICAgIHNoaXAuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYCR7Y29sb3J9YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiB3aW5uZXJNb2RhbChtc2cpIHtcbiAgY29uc3Qgd2lubmVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXdpbm5lcl1cIik7XG4gIGNvbnN0IGhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRlbXBsYXRlID0gYCAgPGRpYWxvZyBkYXRhLXdpbm5lci1tb2RhbCBjbGFzcz1cIndpbm5lci1tb2RhbFwiPlxuICA8ZGl2IGNsYXNzPVwid2lubmVyLWhvbGRlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3aW5uZXItYm9hcmRcIiBkYXRhLXdpbm5lcj4ke21zZ308L2Rpdj5cbiAgICA8YnV0dG9uIGNsYXNzPVwicmVtYXRjaC1idG5cIiBkYXRhLXJlbWF0Y2gtYnRuPlJlbWF0Y2g8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2RpYWxvZz5gO1xuICB3aW5uZXJEaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICBob2xkZXIuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gIHdpbm5lckRpdi5hcHBlbmRDaGlsZChob2xkZXIpO1xufVxuXG4vL2Zvcm0gdG8gYWNjZXB0IHBsYXllcnMgbmFtZVxuZnVuY3Rpb24gZm9ybVRlbXBsYXRlKGVsZSkge1xuICBjb25zdCB0ZW1wbGF0ZSA9IGAgPGZvcm0gZm9yPVwicGxheWVyLW5hbWVcIj5cbjxkaXYgY2xhc3M9XCJpbnB1dC1ob2xkZXJcIj5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIGlkPVwicGxheWVyLW9uZS1uYW1lXCJcbiAgICBjbGFzcz1cInBsYXllci1uYW1lLWlucHV0XCJcbiAgICBkYXRhLXBsYXllci1vbmVcbiAgICByZXF1aXJlZFxuICAvPlxuICA8bGFiZWwgZm9yPVwicGxheWVyLW9uZS1uYW1lXCIgY2xhc3M9XCJwbGF5ZXItb25lLWxhYmVsXCJcbiAgICA+UGxheWVyLU9uZS1OYW1lOjwvbGFiZWxcbiAgPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiaW5wdXQtaG9sZGVyXCI+XG4gIDxpbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBpZD1cInBsYXllci10d28tbmFtZVwiXG4gICAgY2xhc3M9XCJwbGF5ZXItbmFtZS1pbnB1dFwiXG4gICAgZGF0YS1wbGF5ZXItdHdvXG4gICAgcmVxdWlyZWRcbiAgLz5cbiAgPGxhYmVsIGZvcj1cInBsYXllci10d28tbmFtZVwiIGNsYXNzPVwicGxheWVyLXR3by1sYWJlbFwiIGRhdGEtcGxheWVyVHdvXG4gICAgPlBsYXllciBUd28gTmFtZTo8L2xhYmVsXG4gID5cbjwvZGl2PlxuPGJ1dHRvbiBkYXRhLXN1Ym1pdC1uYW1lIGNsYXNzPVwic3VibWl0LWJ0blwiID5TdGFydDwvYnV0dG9uPlxuPC9mb3JtPmA7XG4gIGVsZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbn1cblxuLy9maXggZ3JhbW1lclxuZnVuY3Rpb24gZml4VHlwbyhwbGF5ZXJPbmVOYW1lLCBwbGF5ZXJUd29OYW1lKSB7XG4gIGNvbnN0IG1pbmlTaGlwQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1pbmktc2hpcC1vd25lclwiKTtcbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLXR1cm5cIik7XG4gIGNvbnN0IGRpdkFycmF5ID0gWy4uLm1pbmlTaGlwQm9hcmRdO1xuICBkaXZBcnJheVswXS5zdHlsZS5jb2xvciA9IFwiIzAwZmYzZVwiO1xuICBkaXZBcnJheVsxXS5zdHlsZS5jb2xvciA9IFwiIzFmZDFjZVwiO1xuICBpZiAoZGl2QXJyYXlbMF0udGV4dENvbnRlbnQgIT09IFwieW91XCIpIHtcbiAgICBkaXZBcnJheVswXS50ZXh0Q29udGVudCA9IGAke3BsYXllck9uZU5hbWV9J3MgZmxlZXRgO1xuICAgIGRpdkFycmF5WzFdLnRleHRDb250ZW50ID0gYCR7cGxheWVyVHdvTmFtZX0ncyBmbGVldGA7XG4gIH0gZWxzZSB7XG4gICAgZGl2QXJyYXlbMF0udGV4dENvbnRlbnQgPSBgJHtwbGF5ZXJPbmVOYW1lfSdyZSBmbGVldGA7XG4gICAgZGl2QXJyYXlbMV0udGV4dENvbnRlbnQgPSBgJHtwbGF5ZXJUd29OYW1lfSdzIGZsZWV0YDtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gYFlvdSdyZSB0dXJuYDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBzY3JlZW5Db250cm9sbGVyLFxuICB0ZW1wbGF0ZVNoaXBHcmlkLFxuICBzaGlwc1BsYWNlbWVudCxcbiAgZHJhZ1NoaXBzLFxuICBjb3VudGRvd25Nb2RhbCxcbiAgcmFuZG9tUGxhY2VtZW50LFxuICBkcmF3Rmlyc3RQYWdlLFxuICBpbnRyb1BhZ2UsXG4gIGZvcm1UZW1wbGF0ZSxcbn07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQsIFNoaXAgfSBmcm9tIFwiLi4vdXRpbGl0eVwiO1xuZnVuY3Rpb24gcmVQb3NpdGlvbihwbGF5ZXIsIHNoaXBzQXJyYXksIHNoaXApIHtcbiAgLy9pZiB0aGUgc2hpcCBpcyBsZW5ndGggMiBidXRzIGl0J3MgcG9zaXRpb24gcHJvcGVydHlcbiAgLy8gY29udGFpbiBtb3JlIHRoYW4gMiBjb29yZGluYXRlIHJlbW92ZSB0aG9zZSBleGNlcHQgdGhlIGxhc3QgdHdvIGFuZCB1cGRhdGVcbiAgY29uc3QgYWxsU2hpcFBvc2l0aW9ucyA9IHBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucztcbiAgY29uc3QgY2VsbHNUb1JlbW92ZWQgPSBzaGlwc0FycmF5LnNsaWNlKDAsIHNoaXBzQXJyYXkubGVuZ3RoIC0gc2hpcC5sZW5ndGgpO1xuICBjZWxsc1RvUmVtb3ZlZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgYWxsU2hpcFBvc2l0aW9ucy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBpZiAoY29vcmRpbmF0ZS50b1N0cmluZygpID09PSBjZWxsLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgLy91cGRhdGUgb2JqXG4gICAgICAgIGFsbFNoaXBQb3NpdGlvbnMuc3BsaWNlKGFsbFNoaXBQb3NpdGlvbnMuaW5kZXhPZihjb29yZGluYXRlKSwgMSk7XG4gICAgICAgIHNoaXBzQXJyYXkuc3BsaWNlKHNoaXBzQXJyYXkuaW5kZXhPZihjZWxsKSwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcGxhY2VQbGF5ZXJTaGlwSG9yaXpvbnRhbChwbGF5ZXIsIGluZGV4LCBzaGlwKSB7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gcGxheWVyLmJvYXJkLmNvb3JkaW5hdGVzSGFzaE1hcDtcbiAgY29uc3QgY29udmVydEluZGV4ID0gY29vcmRpbmF0ZXMuZ2V0KE51bWJlcihpbmRleCkpO1xuICBjb25zdCBzaGlwQ2VsbHMgPSBwbGF5ZXIuYm9hcmQucGxhY2VWZXJ0aWNhbChjb252ZXJ0SW5kZXgsIHNoaXApO1xuICBjb25zdCB0YWtlbkNlbGxzID0gc2hpcC5wb3NpdGlvbnM7XG4gIGlmIChzaGlwLnBvc2l0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAvL29jY3VwaWVkIHJldHVybiBudWxsXG4gICAgaWYgKHNoaXBDZWxscyA9PT0gbnVsbCkge1xuICAgICAgcGxheWVyLmJvYXJkLnBsYWNlUmFuZG9tKHNoaXApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZVBvc2l0aW9uKHBsYXllciwgdGFrZW5DZWxscywgc2hpcCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHBsYWNlUGxheWVyU2hpcFZlcnRpY2FsKHBsYXllciwgaW5kZXgsIHNoaXApIHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBwbGF5ZXIuYm9hcmQuY29vcmRpbmF0ZXNIYXNoTWFwO1xuICBjb25zdCBjb252ZXJ0SW5kZXggPSBjb29yZGluYXRlcy5nZXQoTnVtYmVyKGluZGV4KSk7XG4gIGNvbnN0IHRha2VuQ2VsbHMgPSBzaGlwLnBvc2l0aW9ucztcbiAgaWYgKHNoaXAucG9zaXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIHBsYXllci5ib2FyZC5wbGFjZUhvcml6b250YWwoY29udmVydEluZGV4LCBzaGlwKTtcbiAgfSBlbHNlIHtcbiAgICByZVBvc2l0aW9uKHBsYXllciwgdGFrZW5DZWxscywgc2hpcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhd0dyaWRzKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBncmlkLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cbiAgcmV0dXJuIGdyaWQ7XG59XG5cbmZ1bmN0aW9uIGFsbG93RHJvcChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cbmZ1bmN0aW9uIGRyYWcoZSkge1xuICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBlLnRhcmdldC5pZCk7XG59XG5mdW5jdGlvbiBkcm9wKGUsIG5ld1BsYXllcikge1xuICBjb25zdCBzaGlwcyA9IG5ld1BsYXllci5ib2FyZC5zaGlwc0FycmF5O1xuICBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gIC8vaWYgdGhlIHNoaXAgaXMgb3ZlciBvbiB0aGUgdG9wIG9mIGFub3RoZXIgc2hpcCBpdCByZXR1cm4gdW5kZWZpbmVkXG4gIGlmIChpbmRleCA9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKTtcbiAgICBjb25zdCBkcmFnZ2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSk7XG4gICAgY29uc3Qgc2hpcERpcmVjdGlvbiA9IGdldFNoaXBEaXJlY3Rpb25DbGFzcyhkcmFnZ2VkLCBkYXRhKTtcbiAgICBjb25zdCBzaGlwSW5kZXggPSB3aGljaFNoaXBDbGlja2VkKHNoaXBzLCBkYXRhKTtcbiAgICBlLnRhcmdldC5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIHBsYWNlUGxheWVyU2hpcEhvcml6b250YWwobmV3UGxheWVyLCBpbmRleCwgc2hpcHNbc2hpcEluZGV4XSk7XG4gICAgfSBlbHNlIGlmIChzaGlwRGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIHBsYWNlUGxheWVyU2hpcFZlcnRpY2FsKG5ld1BsYXllciwgaW5kZXgsIHNoaXBzW3NoaXBJbmRleF0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBwdXQgc2hpcCBkaXJlY3Rpb24gY2xhc3MgYXQgbGFzdCBhbmQgdG8gY2hhbmdlIGl0IHRvIGhvcml6b250YWwgb3IgdmVydGljYWxcbmZ1bmN0aW9uIGdldFNoaXBEaXJlY3Rpb25DbGFzcyhlbGVtZW50LCBuYW1lKSB7XG4gIGNvbnN0IHNoaXBOYW1lID0gbmFtZTtcbiAgY29uc3QgYWxsQ2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xuICBjb25zdCBkaXJlY3Rpb25DbGFzcyA9IGFsbENsYXNzTmFtZVthbGxDbGFzc05hbWUubGVuZ3RoIC0gMV0uc3BsaXQoXCItXCIpO1xuICBjb25zdCBzaGlwRGlyZWN0aW9uID0gZGlyZWN0aW9uQ2xhc3NbMV07XG4gIHJldHVybiBzaGlwRGlyZWN0aW9uO1xufVxuLy9mbGlwIHRoZSBzaGlwIGRpcmVjdGlvbiBvbiBjbGljayBpZiBpdCBpcyB2YWxpZFxuZnVuY3Rpb24gZmxpcChlLCBuZXdQbGF5ZXIpIHtcbiAgY29uc3Qgc2hpcHMgPSBuZXdQbGF5ZXIuYm9hcmQuc2hpcHNBcnJheTtcbiAgY29uc3Qgc2hpcCA9IGUudGFyZ2V0O1xuICBjb25zdCBzaGlwTmFtZSA9IGUudGFyZ2V0LmlkO1xuICBjb25zdCBzaGlwRGlyZWN0aW9uID0gZ2V0U2hpcERpcmVjdGlvbkNsYXNzKHNoaXAsIHNoaXBOYW1lKTtcbiAgY29uc3QgaW5kZXggPSB3aGljaFNoaXBDbGlja2VkKHNoaXBzLCBzaGlwTmFtZSk7XG5cbiAgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gcG9zaXRpb25UZW1wU2hpcChzaGlwcywgaW5kZXgsIFwidmVydGljYWxcIiwgbmV3UGxheWVyKTtcbiAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoYCR7c2hpcE5hbWV9LWhvcml6b250YWxgKTtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChgJHtzaGlwTmFtZX0tdmVydGljYWxgKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gcG9zaXRpb25UZW1wU2hpcChzaGlwcywgaW5kZXgsIFwiaG9yaXpvbnRhbFwiLCBuZXdQbGF5ZXIpO1xuICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShgJHtzaGlwTmFtZX0tdmVydGljYWxgKTtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChgJHtzaGlwTmFtZX0taG9yaXpvbnRhbGApO1xuICAgIH1cbiAgfVxuXG4gIC8vZnVuY3Rpb24gYWNjZXB0IHNoaXBzIGFycmF5LCBpbmRleCAgb2YgdGhlIHNoaXAsZmxpcCBkaXJlY3Rpb24gYW5kIHBsYXllciAgdG8gcmVwbGljYXRlIHRoYXQgc2hpcCBpblxuICAvL2RpZmZlcmVudCBwb3NpdGlvbnMoZGlyZWN0aW9uKSBhbmQgcmV0dXJuIGJvb2xlYW4gZm9yIGVhY2ggcG9zaXRpb24gYW5kIGZsaXAgZm9yIHZhbGlkIGRpcmVjdGlvblxuICBmdW5jdGlvbiBwb3NpdGlvblRlbXBTaGlwKHNoaXBzLCBpbmRleCwgZGlyZWN0aW9uLCBwbGF5ZXIpIHtcbiAgICBjb25zdCBmaXJzdENvb3JkaW5hdGUgPSBzaGlwc1tpbmRleF0ucG9zaXRpb25zWzBdO1xuICAgIGNvbnN0IHRlbXBTaGlwID0gU2hpcChzaGlwc1tpbmRleF0uc2hpcE5hbWUsIHNoaXBzW2luZGV4XS5sZW5ndGgpO1xuICAgIGNvbnN0IHRlbXBTaGlwcyA9IFtdO1xuICAgIHRlbXBTaGlwcy5wdXNoKHRlbXBTaGlwKTtcbiAgICBjb25zdCB0ZW1wQm9hcmQgPSBHYW1lQm9hcmQodGVtcFNoaXApO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICB0ZW1wQm9hcmQucGxhY2VWZXJ0aWNhbChmaXJzdENvb3JkaW5hdGUsIHRlbXBTaGlwKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICB0ZW1wQm9hcmQucGxhY2VIb3Jpem9udGFsKGZpcnN0Q29vcmRpbmF0ZSwgdGVtcFNoaXApO1xuICAgIH1cbiAgICAvL2NoZWNrIHRoZSBuZXcgcG9zaXRpb24gZXhjZXB0IHRoZSBmaXJzdCBjb29yZGluYXRlXG4gICAgY29uc3QgcmVzdWx0ID0gaXNDb29yZGluYXRlRnJlZShcbiAgICAgIHRlbXBTaGlwLnBvc2l0aW9ucy5zbGljZSgxKSxcbiAgICAgIHBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9uc1xuICAgICk7XG4gICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgLy91cGRhdGUgc2hpcCBwb3NpdGlvbiBpbiBzaGlwIGFuZCBwbGF5ZXIgb2JqZWN0XG4gICAgICBjb25zdCBuZXdQb3NpdGlvbiA9IHRlbXBTaGlwLnBvc2l0aW9ucztcbiAgICAgIHJlbW92ZUNvb3JkaW5hdGUoc2hpcHNbaW5kZXhdLnBvc2l0aW9ucywgcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zKTtcbiAgICAgIHNoaXBzW2luZGV4XS5wb3NpdGlvbnMgPSBbXTtcbiAgICAgIHNoaXBzW2luZGV4XS5wb3NpdGlvbnMgPSBuZXdQb3NpdGlvbjtcbiAgICAgIG5ld1Bvc2l0aW9uLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuLy9nZXQgc3BlY2lmaWMgc2hpcCBmcm9tIHNoaXBzIG9iamVjdCBhcnJheVxuZnVuY3Rpb24gd2hpY2hTaGlwQ2xpY2tlZChhcnJheSwgc2hpcE5hbWUpIHtcbiAgbGV0IGluZGV4ID0gbnVsbDtcbiAgYXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGlmICgoc2hpcC5zaGlwTmFtZS50b1N0cmluZygpID09PSBzaGlwTmFtZS50b1N0cmluZygpKSA9PT0gdHJ1ZSkge1xuICAgICAgaW5kZXggPSBhcnJheS5pbmRleE9mKHNoaXApO1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpbmRleDtcbn1cbi8vcmVtb3ZlIGNvb3JkaW5hdGUgZm9yIGZsaXAgc2hpcHNcbmZ1bmN0aW9uIHJlbW92ZUNvb3JkaW5hdGUoc2hpcFBvc2l0aW9uLCB0YWtlblBvc2l0aW9ucykge1xuICBzaGlwUG9zaXRpb24uZm9yRWFjaCgocG9zaXRpb24pID0+IHtcbiAgICB0YWtlblBvc2l0aW9ucy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBpZiAoY29vcmRpbmF0ZS50b1N0cmluZygpID09PSBwb3NpdGlvbi50b1N0cmluZygpKSB7XG4gICAgICAgIHRha2VuUG9zaXRpb25zLnNwbGljZSh0YWtlblBvc2l0aW9ucy5pbmRleE9mKGNvb3JkaW5hdGUpLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4vL2NoZWNrIHRoZSBjZWxsIGlzIGZyZWVcbmZ1bmN0aW9uIGlzQ29vcmRpbmF0ZUZyZWUoc2hpcFBvc2l0aW9uLCB0YWtlblBvc2l0aW9ucykge1xuICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgc2hpcFBvc2l0aW9uLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICB0YWtlblBvc2l0aW9ucy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBpZiAoY2VsbC50b1N0cmluZygpID09PSBjb29yZGluYXRlLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuLy9kcmF3IGRyYWdnZWQgYW5kIGRyb3BwZWQgc2hpcHMgdG8gaW5pdGlhbGl6ZSwgaXQgdXNlIHNoaXAgb2JqZWN0IHByb3BlcnRpZXNcbmZ1bmN0aW9uIGRyYXdTaGlwcyhzaGlwcykge1xuICBjb25zdCBkaXZIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXZIb2xkZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkcm9wLXNoaXBzXCIpO1xuICBkaXZIb2xkZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7c2hpcC5zaGlwTmFtZX1gKTtcbiAgICBkaXYuZGF0YXNldC5sZW5ndGggPSBgJHtzaGlwLmxlbmd0aH1gO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXAtc2l6ZVwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChgJHtzaGlwLnNoaXBOYW1lfS1ob3Jpem9udGFsYCk7XG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gICAgZGl2SG9sZGVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH0pO1xuICByZXR1cm4gZGl2SG9sZGVyO1xufVxuXG5mdW5jdGlvbiBkcmFnU2hpcHMobmV3UGxheWVyLCBzaGlwcykge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWNvbnRhaW5lclwiKTtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2hpcHMtY29udGFpbmVyXVwiKTtcbiAgY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheS1idG5cIik7XG4gIHBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZHJhd0dyaWRzKCkpO1xuICBzaGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIHNoaXBzQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZHJhd1NoaXBzKHNoaXBzKSk7XG4gIHNoaXBzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgY29uc3Qgc2hpcHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG4gIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgc2hpcHNEaXYuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgZHJhZyhlKTtcbiAgICB9KTtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZmxpcChlLCBuZXdQbGF5ZXIpO1xuICAgIH0pO1xuICB9KTtcbiAgLy9kcm9wIHpvbmUgb3IgZ3JpZCBjZWxsc1xuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgIGFsbG93RHJvcChlKTtcbiAgICB9KTtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgIGRyb3AoZSwgbmV3UGxheWVyKTtcbiAgICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gbmV3UGxheWVyLmJvYXJkLnNoaXBzQXJyYXkucmVkdWNlKCh0b3RhbCwgc2hpcCkgPT4ge1xuICAgICAgICByZXR1cm4gKHRvdGFsICs9IHNoaXAubGVuZ3RoKTtcbiAgICAgIH0sIDApO1xuICAgICAgLy9jaGVjayBhbGwgc2hpcCBsZW5ndGggc3VtIGlzIGVxdWFsIHRvIHRvdGFsIHNoaXAgZHJvcHBlZCBhbmQgdXBkYXRlIHBsYXllciBvYmplY3RcbiAgICAgIGlmIChuZXdQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID09PSB0b3RhbExlbmd0aCkge1xuICAgICAgICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcmFuZG9tbHlQbGFjZVNoaXBzKHBsYXllcikge1xuICBwbGF5ZXIuYm9hcmQuc2hpcHNBcnJheS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlUmFuZG9tKHNoaXApO1xuICB9KTtcbiAgcmV0dXJuIHBsYXllcjtcbn1cbmV4cG9ydCB7IGRyYXdHcmlkcywgZHJhZ1NoaXBzLCByYW5kb21seVBsYWNlU2hpcHMgfTtcbiIsIi8vaW1wb3J0IHsgc2hpcHMgfSBmcm9tIFwiLi9kb20tc3R1ZmZcIjtcblxuLyoqXG4gKnNoaXAgIGhhcyBuYW1lLGxlbmd0aCBhbmQgaGl0cyxwb3NpdGlvbiBhcyBwcm9wZXJ0eSBhbmQgaXNTdW5rIGFuZCBoaXQgYXMgbWV0aG9kXG4gKnNoaXAucG9zaXRpb24gLSBpcyBhbiBhcnJheSB0aGF0IGhvbGQgY29vcmRpbmF0ZXMgb2YgdGhlIHNoaXAuXG4gKnNoaXAuaXNTdW5rKCkgLSB0byBjaGVjayB0aGUgc2hpcCBpcyBzdW5rIG9yIG5vdCByZXR1cm4gYm9vbGVhblxuICpzaGlwLmhpdChzaGlwLmhpdHMpIC0gaW5jcmVhc2Ugc2hpcCBoaXRzIG9uIGJ5IG9uZSBlYWNoIHRpbWUgaXQgaXMgY2FsbGVkLlxuICogQHBhcmFtIHsqfSBzaGlwTmFtZVxuICogQHBhcmFtIHsqfSBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gU2hpcChzaGlwTmFtZSwgbGVuZ3RoKSB7XG4gIGNvbnN0IGhpdHMgPSAwO1xuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgdGhpcy5oaXRzKys7XG4gIH1cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBsZW5ndGggPD0gdGhpcy5oaXRzID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzaGlwTmFtZSxcbiAgICBsZW5ndGgsXG4gICAgaGl0cyxcbiAgICBwb3NpdGlvbnM6IFtdLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59XG4vKipcbiAqIEdhbWVCb2FyZC5jcmVhdGVCb2FyZCAtIGNyZWF0ZXMgYm9hcmQgd2l0aCBbeCx5XSBjb29yZGluYXRlIGJhc2VkIG9uIHJvdyBhbmQgY29sdW1uIG51bWJlciBcbiAqIGFuZCByZXR1cm4gYm9hcmQgYW5kIHR3byBoYXNobWFwIHRoYXQgY29udGFpbiBudW1iZXIgYW5kIGNvcnJlc3BvbmRpbmcgY29vcmRpbmF0ZSgwLCBbMCwwXSkgYW5kIHRoZSBzZWNvbmQgb25lIGludmVyc2UgKFswLDBdLCAwKS5cbiAqIFxuICogR2FtZUJvYXJkLnBvc2l0aW9uKGFycmF5LGxlbmd0aCkgLSBhY2NlcHQgY29vcmRpbmF0ZVt4LCB5XSBhbmQgc2hpcCBsZW5ndGggdGhlbiBjYWxjdWxhdGUgdGhlIHNwYWNlIHRoZSBzaGlwIHRha2VzIG9uIDEwIHggMTAgYm9hcmQgYW5kIFxuICogcmV0dXJuIGFycmF5IG9mIGNvb3JkaW5hdGVzLlxuICpcbiAqIEdhbWVCb2FyZC5yYW5kb21seVBvc2l0aW9uKGxlbmd0aCkgLSBhY2NlcHQgc2hpcCBsZW5ndGggdGhlbiByZXR1cm4gdmVydGljYWwgb3IgaG9yaXpvbnRhbCBjZWxsIFxuICogdGhhdCB0aGUgc2hpcCB3aWxsIHRha2VzIGNvb3JkaW5hdGVzIGFzIGFuIGFycmF5IGJ5IGNhbGxpbmcgaXQgc2VsZiByZWN1cnNpdmVseSBpZiB0aGUgcG9zaXRpb24gb2NjdXBpZWQuXG4gKiBcbiAqIEdhbWVCb2FyZC5wbGFjZVZlcnRpY2FsICYmIEdhbWVCb2FyZC4gcGxhY2VIb3Jpem9udGFsIC0gbWV0aG9kcyB1c2UgdG8gcGxhY2Ugc2hpcCBtYW51YWxseSBieSBhY2NlcHRpbmcgY29vcmRpbmF0ZXMoW3gseV0gYW5kIHNoaXApIHJldHVybiBhcnJheSBvZiBjb29yZGluYXRlIHRoZSBzaGlwIHdpbGwgdGFrZS5cbiAqIGFuZCB1cGRhdGUgc2hpcHMgcG9zaXRpb24gYW5kIHN0b3JlIGNvb3JkaW5hdGUgdG8gdGhlIHNoaXAuXG4gKiAgXG4gKiBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayAtIGFjY2VwdCBjb29yZGluYXRlIFt4LHldICxjaGVjayBpdCBpcyBtaXNzZWQgb3IgaGl0IHNob3QgLHJlcG9ydCBhbGwgdGhlIHNoaXAgaXMgc3VuayBvciBub3QgXG4gKiBhbmQgY2FsbCBoaXQgb24gc3BlY2lmaWMgc2hpcCBpZiBpdCBpcyBhIGhpdC4gXG5cbiAqL1xuZnVuY3Rpb24gR2FtZUJvYXJkKHNoaXBzQXJyYXkpIHtcbiAgY29uc3Qgc2hpcHNQb3NpdGlvbnMgPSBbXTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZCgxMCwgMTApO1xuICBjb25zdCBjb29yZGluYXRlc0hhc2hNYXAgPSBib2FyZC5hbGxDb29yZGluYXRlcztcbiAgY29uc3QgaW52ZXJzZUhhc2hNYXAgPSBib2FyZC5pbnZlcnNlQ29vcmRpbmF0ZTtcbiAgY29uc3QgbWlzc2VkU2hvdHMgPSBbXTtcbiAgY29uc3QgaGl0U2hvdHMgPSBbXTtcblxuICBmdW5jdGlvbiBjcmVhdGVCb2FyZChyb3csIGNvbCkge1xuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgY29uc3QgYWxsQ29vcmRpbmF0ZXMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgaW52ZXJzZUNvb3JkaW5hdGUgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGsgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICAgIGJvYXJkW2ldID0gW107XG4gICAgfVxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgcm93OyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY29sOyB5KyspIHtcbiAgICAgICAgYm9hcmRbeF1beV0gPSBbeCwgeV07XG4gICAgICAgIGFsbENvb3JkaW5hdGVzLnNldChrLCBbeCwgeV0pO1xuICAgICAgICBpbnZlcnNlQ29vcmRpbmF0ZS5zZXQoW3gsIHldLnRvU3RyaW5nKCksIGspO1xuICAgICAgICBrKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGJvYXJkLCBhbGxDb29yZGluYXRlcywgaW52ZXJzZUNvb3JkaW5hdGUgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFBvc2l0aW9uKGNvb3JkaW5hdGUsIHNoaXBMZW5ndGgpIHtcbiAgICBjb25zdCBob3Jpem9udGFsID0gW107XG4gICAgY29uc3QgdmVydGljYWwgPSBbXTtcbiAgICBjb25zdCB4ID0gY29vcmRpbmF0ZVswXTtcbiAgICBjb25zdCB5ID0gY29vcmRpbmF0ZVsxXTtcbiAgICAvL1t4LHldID0gaWYgeCArIGxlbmd0aCA8IGxlbmd0aFxuICAgIGlmICh4ICsgc2hpcExlbmd0aCA8IDEwICYmIHkgKyBzaGlwTGVuZ3RoIDwgMTApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhvcml6b250YWwucHVzaChbeCArIGksIHldKTtcbiAgICAgICAgdmVydGljYWwucHVzaChbeCwgeSArIGldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHggKyBzaGlwTGVuZ3RoID49IDEwICYmIHkgKyBzaGlwTGVuZ3RoID49IDEwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBob3Jpem9udGFsLnB1c2goW3ggLSBpLCB5XSk7XG4gICAgICAgIHZlcnRpY2FsLnB1c2goW3gsIHkgLSBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh4ICsgc2hpcExlbmd0aCA+PSAxMCAmJiB5ICsgc2hpcExlbmd0aCA8IDEwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBob3Jpem9udGFsLnB1c2goW3ggLSBpLCB5XSk7XG4gICAgICAgIHZlcnRpY2FsLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh4ICsgc2hpcExlbmd0aCA8IDEwICYmIHkgKyBzaGlwTGVuZ3RoID49IDEwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBob3Jpem9udGFsLnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICAgIHZlcnRpY2FsLnB1c2goW3gsIHkgLSBpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGhvcml6b250YWwsIHZlcnRpY2FsIH07XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsKGNvb3JkaW5hdGUsIHNoaXApIHtcbiAgICBjb25zdCBzaGlwQ2VsbHMgPSBQb3NpdGlvbihjb29yZGluYXRlLCBzaGlwLmxlbmd0aCkudmVydGljYWw7XG4gICAgaWYgKGlzQ29vcmRpbmF0ZUZyZWUoc2hpcENlbGxzLCBzaGlwc1Bvc2l0aW9ucykgPT09IGZhbHNlKSByZXR1cm4gbnVsbDtcbiAgICB0d29EaW1lbnNpb25BcnJheShzaGlwQ2VsbHMsIHNoaXBzUG9zaXRpb25zKTtcbiAgICB0d29EaW1lbnNpb25BcnJheShzaGlwQ2VsbHMsIHNoaXAucG9zaXRpb25zKTtcbiAgICByZXR1cm4gc2hpcENlbGxzO1xuICB9XG4gIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbChjb29yZGluYXRlLCBzaGlwKSB7XG4gICAgY29uc3Qgc2hpcENlbGxzID0gUG9zaXRpb24oY29vcmRpbmF0ZSwgc2hpcC5sZW5ndGgpLmhvcml6b250YWw7XG4gICAgaWYgKGlzQ29vcmRpbmF0ZUZyZWUoc2hpcENlbGxzLCBzaGlwc1Bvc2l0aW9ucykgPT09IGZhbHNlKSByZXR1cm4gbnVsbDtcbiAgICB0d29EaW1lbnNpb25BcnJheShzaGlwQ2VsbHMsIHNoaXBzUG9zaXRpb25zKTtcbiAgICB0d29EaW1lbnNpb25BcnJheShzaGlwQ2VsbHMsIHNoaXAucG9zaXRpb25zKTtcbiAgICByZXR1cm4gc2hpcENlbGxzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tRnJlZUNvb3JkaW5hdGUoKSB7XG4gICAgY29uc3QgcmFuZG9tTnVtID0gcmFuZG9tQ2VsbCgxMDApO1xuICAgIGNvbnN0IHJlbGF0ZWRDb29yZGluYXRlID0gY29vcmRpbmF0ZXNIYXNoTWFwLmdldChyYW5kb21OdW0pO1xuICAgIGlmIChzaGlwc1Bvc2l0aW9ucy5pbmNsdWRlcyhyZWxhdGVkQ29vcmRpbmF0ZSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmVsYXRlZENvb3JkaW5hdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByYW5kb21GcmVlQ29vcmRpbmF0ZSgpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiByYW5kb21DZWxsKG51bSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudW0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNDb29yZGluYXRlRnJlZShzaGlwUG9zaXRpb24sIHRha2VuUG9zaXRpb25zKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgc2hpcFBvc2l0aW9uLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIHRha2VuUG9zaXRpb25zLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgaWYgKGNlbGwudG9TdHJpbmcoKSA9PT0gY29vcmRpbmF0ZS50b1N0cmluZygpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBmdW5jdGlvbiBzaGlwRGlyZWN0aW9uKCkge1xuICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGgucmFuZG9tKCkgPj0gMC41O1xuICAgIHJldHVybiByYW5kb21OdW0gPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgfVxuICBmdW5jdGlvbiBwbGFjZVJhbmRvbShzaGlwKSB7XG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSByYW5kb21seVBvc2l0aW9uKHNoaXAubGVuZ3RoKTtcbiAgICBuZXdQb3NpdGlvbi5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBzaGlwLnBvc2l0aW9ucy5wdXNoKGNvb3JkaW5hdGUpO1xuICAgICAgc2hpcHNQb3NpdGlvbnMucHVzaChjb29yZGluYXRlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3UG9zaXRpb247XG4gIH1cbiAgZnVuY3Rpb24gcmFuZG9tbHlQb3NpdGlvbihzaGlwTGVuZ3RoKSB7XG4gICAgY29uc3Qgc2lkZSA9IHNoaXBEaXJlY3Rpb24oKTtcbiAgICBpZiAoc2lkZSA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSByYW5kb21GcmVlQ29vcmRpbmF0ZSgpO1xuICAgICAgY29uc3Qgc3BhY2VUYWtlbiA9IFBvc2l0aW9uKGNvb3JkaW5hdGUsIHNoaXBMZW5ndGgpLmhvcml6b250YWw7XG4gICAgICBjb25zdCByZXN1bHQgPSBpc0Nvb3JkaW5hdGVGcmVlKHNwYWNlVGFrZW4sIHNoaXBzUG9zaXRpb25zKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc3BhY2VUYWtlbjtcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmFuZG9tbHlQb3NpdGlvbihzaGlwTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNpZGUgPT09IFwidmVydGljYWxcIikge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IHJhbmRvbUZyZWVDb29yZGluYXRlKCk7XG4gICAgICBjb25zdCBzcGFjZVRha2VuID0gUG9zaXRpb24oY29vcmRpbmF0ZSwgc2hpcExlbmd0aCkudmVydGljYWw7XG4gICAgICBjb25zdCByZXN1bHQgPSBpc0Nvb3JkaW5hdGVGcmVlKHNwYWNlVGFrZW4sIHNoaXBzUG9zaXRpb25zKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc3BhY2VUYWtlbjtcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmFuZG9tbHlQb3NpdGlvbihzaGlwTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy9mdW5jdGlvbiB0byBjb21wYXJlIGNvb3JkaW5hdGUgZXhpc3QgaW4gYXJyYXkgb2YgY29vcmRpbmF0ZXMgIGJ5IGNoYW5naW5nIHRoZW0gdG8gc3RyaW5nIGZpcnN0IHJldHVybiBib29sZWFuXG5cbiAgZnVuY3Rpb24gY2hlY2tDb29yZGluYXRlKGNvb3JkaW5hdGUsIGFycmF5KSB7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGFycmF5LmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgICBpZiAoY29vcmRpbmF0ZS50b1N0cmluZygpID09PSBwb3NpdGlvbi50b1N0cmluZygpKSB7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBmdW5jdGlvbiBpc0hpdChjb29yZGluYXRlLCBhcnJheSkge1xuICAgIHJldHVybiBjaGVja0Nvb3JkaW5hdGUoY29vcmRpbmF0ZSwgYXJyYXkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZSkge1xuICAgIGlmIChpc0hpdChjb29yZGluYXRlLCBzaGlwc1Bvc2l0aW9ucykgPT09IHRydWUpIHtcbiAgICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoY2hlY2tDb29yZGluYXRlKGNvb3JkaW5hdGUsIHNoaXAucG9zaXRpb25zKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNoaXAuaGl0KCk7XG5cbiAgICAgICAgICBoaXRTaG90cy5wdXNoKGNvb3JkaW5hdGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc0hpdChjb29yZGluYXRlLCBzaGlwc1Bvc2l0aW9ucykgPT09IGZhbHNlKSB7XG4gICAgICBtaXNzZWRTaG90cy5wdXNoKGNvb3JkaW5hdGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHNoaXBzUG9zaXRpb25zLmxlbmd0aCA8PSBoaXRTaG90cy5sZW5ndGg7XG4gIH1cbiAgZnVuY3Rpb24gdHdvRGltZW5zaW9uQXJyYXkodHdvRGltZW5zaW9uQXJyYXksIG9uZURpbWVuc2lvbkFycmF5KSB7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgb25lRGltZW5zaW9uQXJyYXkucHVzaChjb29yZGluYXRlKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBzdW5rU2hpcHMoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgc2hpcHNBcnJheS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXN1bHQucHVzaChzaGlwLnNoaXBOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVZlcnRpY2FsLFxuICAgIHBsYWNlSG9yaXpvbnRhbCxcbiAgICBwbGFjZVJhbmRvbSxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGlzSGl0LFxuICAgIGlzU3VuayxcbiAgICBzdW5rU2hpcHMsXG4gICAgY29vcmRpbmF0ZXNIYXNoTWFwLFxuICAgIGludmVyc2VIYXNoTWFwLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIGhpdFNob3RzLFxuICAgIHNoaXBzUG9zaXRpb25zLFxuICAgIHNoaXBzQXJyYXksXG4gIH07XG59XG5mdW5jdGlvbiBQbGF5ZXIobmFtZSkge1xuICBjb25zdCBjYXJyaWVyID0gU2hpcChcImNhcnJpZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZVNoaXAgPSBTaGlwKFwiYmF0dGxlU2hpcFwiLCA0KTtcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcChcImRlc3Ryb3llclwiLCAzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gU2hpcChcInN1Ym1hcmluZVwiLCAzKTtcbiAgY29uc3QgcGF0cm9sID0gU2hpcChcInBhdHJvbFwiLCAyKTtcbiAgY29uc3Qgc2hpcHMgPSBbY2Fycmllciwgc3VibWFyaW5lLCBiYXR0bGVTaGlwLCBkZXN0cm95ZXIsIHBhdHJvbF07XG4gIGNvbnN0IGJvYXJkID0gR2FtZUJvYXJkKHNoaXBzKTtcbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBuYW1lLFxuICB9O1xufVxuLy9jb21wdXRlciBtb3ZlIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIG51bWJlciBub3QgcGlja2VkIGFuZCB0cnkgYWRqYWNlbnQgc2xvdCBpZiBpdCBoaXQgb3RoZXIgc2hpcFxuY29uc3QgcGlja2VkTnVtID0gW107XG5mdW5jdGlvbiBjb21wdXRlck1vdmUocGxheWVyKSB7XG4gIHJldHVybiBjb21wdXRlclNsb3QoKTtcbiAgZnVuY3Rpb24gY29tcHV0ZXJTbG90KCkge1xuICAgIGNvbnN0IG5leHRIaXRzID0gW107XG4gICAgY29uc3QgaGl0cyA9IHBsYXllci5ib2FyZC5oaXRTaG90cztcbiAgICBsZXQgbmVpZ2hib3JTbG90cyA9IFtdO1xuICAgIGlmIChoaXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGhpdHMuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgICAgIGFkamFjZW50U2xvdChoaXQpO1xuICAgICAgICB2YWxpZFNwb3QoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL2lmIGJldHRlciBzbG90IGFyZSBhbHJlYWR5IHBpY2tlZCB0dW4gdG8gcmFuZG9tIHNwb3RcbiAgICAgIGlmIChuZXh0SGl0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgbW92ZSA9IHJhbmRvbVNwb3QoKTtcbiAgICAgICAgcGlja2VkTnVtLnB1c2gobW92ZSk7XG4gICAgICAgIHJldHVybiBtb3ZlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG5leHRUcnkgPSBuZXh0SGl0c1tuZXh0SGl0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgcGlja2VkTnVtLnB1c2gobmV4dFRyeSk7XG4gICAgICAgIG5leHRUcnkgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV4dEhpdHMucG9wKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0SGl0cy5sZW5ndGggPT09IDAgJiYgaGl0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IG1vdmUgPSByYW5kb21TcG90KCk7XG4gICAgICBwaWNrZWROdW0ucHVzaChtb3ZlKTtcbiAgICAgIHJldHVybiBtb3ZlO1xuICAgIH1cblxuICAgIC8vbWV0aG9kIHRoYXQgdmVyaWZ5IGFkamFjZW50IHNsb3QgaXMgbm90IHBpY2tlZCBhbHJlYWR5IGFuZCBwdXQgdGhlIG5ldyBvbmUgaW4gdGhlIHF1ZXVlXG4gICAgZnVuY3Rpb24gdmFsaWRTcG90KCkge1xuICAgICAgaWYgKG5laWdoYm9yU2xvdHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBjb25zdCBhbGxTcG90cyA9IHBsYXllci5ib2FyZC5pbnZlcnNlSGFzaE1hcDtcbiAgICAgIG5laWdoYm9yU2xvdHMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgICAvL3R1cm4gY29vcmRpbmF0ZSB0byBudW1iZXIgdXNpbmcgaGFzbWFwXG4gICAgICAgIGNvbnN0IHNwb3QgPSBhbGxTcG90cy5nZXQoY29vcmRpbmF0ZS50b1N0cmluZygpKTtcbiAgICAgICAgaWYgKHBpY2tlZE51bS5pbmNsdWRlcyhzcG90KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBuZXh0SGl0cy5wdXNoKHNwb3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG5laWdoYm9yU2xvdHMgPSBbXTtcbiAgICB9XG4gICAgLy9tZXRob2QgdGhhdCBnZW5lcmF0ZSBuZWlnaGJvciBzcG90IGZyb20gZ2l2ZW4gY29vcmRpbmF0ZVxuICAgIGZ1bmN0aW9uIGFkamFjZW50U2xvdChoaXQpIHtcbiAgICAgIGNvbnN0IHggPSBoaXRbMF07XG4gICAgICBjb25zdCB5ID0gaGl0WzFdO1xuICAgICAgaWYgKHggKyAxIDwgMTApIHtcbiAgICAgICAgbmVpZ2hib3JTbG90cy5wdXNoKFt4ICsgMSwgeV0pO1xuICAgICAgfVxuICAgICAgaWYgKHggLSAxID49IDApIHtcbiAgICAgICAgbmVpZ2hib3JTbG90cy5wdXNoKFt4IC0gMSwgeV0pO1xuICAgICAgfVxuICAgICAgaWYgKHkgKyAxIDwgMTApIHtcbiAgICAgICAgbmVpZ2hib3JTbG90cy5wdXNoKFt4LCB5ICsgMV0pO1xuICAgICAgfVxuICAgICAgaWYgKHkgLSAxID49IDApIHtcbiAgICAgICAgbmVpZ2hib3JTbG90cy5wdXNoKFt4LCB5IC0gMV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvL21ldGhvZCByZXR1cm4gcmFuZG9tIG51bWJlciBmcm9tIDAgdG8gMTAwXG4gICAgZnVuY3Rpb24gcmFuZG9tU3BvdCgpIHtcbiAgICAgIGxldCBtb3ZlO1xuICAgICAgZG8ge1xuICAgICAgICBtb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICAgIH0gd2hpbGUgKHBpY2tlZE51bS5pbmNsdWRlcyhtb3ZlKSk7XG4gICAgICByZXR1cm4gbW92ZTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHN1bShhLCBiKSB7XG4gIHJldHVybiBhICsgYjtcbn1cbmV4cG9ydCB7IHN1bSwgU2hpcCwgR2FtZUJvYXJkLCBQbGF5ZXIsIGNvbXB1dGVyTW92ZSB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qYm9keSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMyAzMCA3MCk7XG59Ki9cbi5ib2FyZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA2dm1pbik7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA2dm1pbik7XG4gIGdhcDogMnB4O1xuICBwYWRkaW5nOiAwLjJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuLmJvYXJkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnBsYWNlLXNoaXBzLWJ0bnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDFyZW07XG4gIHdpZHRoOiA4MCU7XG4gIG1hcmdpbjogYXV0bztcbiAgbWFyZ2luLXRvcDogMnB4O1xufVxuXG4uZHJhZy1idG4sXG4ucGxheS1idG4sXG4ubmV4dC1idG4sXG4ucmFuZG9taXplLWJ0biB7XG4gIHBhZGRpbmc6IDAuNnJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcbn1cbi5wbGF5LWJ0bixcbi5uZXh0LWJ0biB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGJveC1zaGFkb3c6IC0xcHggMHB4IDlweCAzcHggI2ZmMDBkNDtcbn1cbi5kcmFnLWJ0bjpob3Zlcixcbi5yYW5kb21pemUtYnRuOmhvdmVyIHtcbiAgY29sb3I6IGJlaWdlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbn1cbi5zaGlwcy1jb250YWluZXIsXG4uZHJvcC1zaGlwcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbiAgZ2FwOiAycHg7XG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xufVxuXG4uZ3JpZC1jZWxsIHtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLmRyYWdnaW5nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xufVxuLmZsZXgtaG9yaXpvbnRhbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4uZmxleC12ZXJ0aWNhbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uc3VibWFyaW5lLWhvcml6b250YWwge1xuICAtLXdpZHRoOiAzO1xufVxuLnN1Ym1hcmluZS12ZXJ0aWNhbCB7XG4gIC0taGVpZ2h0OiAzO1xufVxuLmNhcnJpZXItaG9yaXpvbnRhbCB7XG4gIC0td2lkdGg6IDU7XG59XG4uY2Fycmllci12ZXJ0aWNhbCB7XG4gIC0taGVpZ2h0OiA1O1xufVxuLnBhdHJvbC1ob3Jpem9udGFsIHtcbiAgLS13aWR0aDogMjtcbn1cbi5wYXRyb2wtdmVydGljYWwge1xuICAtLWhlaWdodDogMjtcbn1cbi5kZXN0cm95ZXItaG9yaXpvbnRhbCB7XG4gIC0td2lkdGg6IDM7XG59XG4uZGVzdHJveWVyLXZlcnRpY2FsIHtcbiAgLS1oZWlnaHQ6IDM7XG59XG4uYmF0dGxlU2hpcC1ob3Jpem9udGFsIHtcbiAgLS13aWR0aDogNDtcbn1cbi5iYXR0bGVTaGlwLXZlcnRpY2FsIHtcbiAgLS1oZWlnaHQ6IDQ7XG59XG4uc2hpcCB7XG4gIHdpZHRoOiA2dm1pbjtcbiAgaGVpZ2h0OiA2dm1pbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAgMjAzIDU0KTtcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xuICBjdXJzb3I6IGdyYWJiaW5nO1xufVxuLnNoaXAtc2l6ZSB7XG4gIHdpZHRoOiBjYWxjKDZ2bWluICogdmFyKC0td2lkdGgsIDEpKTtcbiAgaGVpZ2h0OiBjYWxjKDZ2bWluICogdmFyKC0taGVpZ2h0LCAxKSk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcmlnaHQ6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEsIDE0NywgMSk7XG59XG5cbi50YXJnZXQtZG90IHtcbiAgYXNwZWN0LXJhdGlvOiAxO1xuICB3aWR0aDogMC44cmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG4ubWlzc2VkLXN0cmlrZSB7XG4gIGFzcGVjdC1yYXRpbzogMTtcbiAgd2lkdGg6IDAuMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuLm1pc3NlZC1zdHJpa2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xuICBib3JkZXI6IG5vbmU7XG59XG4uaGl0LXN0cmlrZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNTAwMDA7XG59XG4vKm1pbmkgc2hpcHMgc3R5bGUqL1xuLmZsZWV0LWhvbGRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLm1pbmktc2hpcC1vd25lciB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuLnNhbWUtc2l6ZS1zaGlwcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTUwcHg7XG59XG4ubWluaS1jYXJyaWVyIHtcbiAgLS13aWR0aDogNTtcbn1cbi5taW5pLWJhdHRsZVNoaXAge1xuICAtLXdpZHRoOiA0O1xufVxuLm1pbmktZGVzdHJveWVyIHtcbiAgLS13aWR0aDogMztcbn1cbi5taW5pLXN1Ym1hcmluZSB7XG4gIC0td2lkdGg6IDM7XG59XG4ubWluaS1wYXRyb2wge1xuICAtLXdpZHRoOiAxLjU7XG59XG4ubWluaS1zaGlwLXNpemUge1xuICB3aWR0aDogY2FsYyg0MHB4ICogdmFyKC0td2lkdGgsIDEpKTtcbiAgaGVpZ2h0OiAyMHB4O1xuICBtYXJnaW46IDJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE2NiAxOTggMTY1KTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3BsYWNlLXNoaXAtcGFnZS9zaGlwcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7RUFJRTtBQUNGO0VBQ0UsYUFBYTtFQUNiLHdDQUF3QztFQUN4QyxxQ0FBcUM7RUFDckMsUUFBUTtFQUNSLGVBQWU7RUFDZix1QkFBdUI7QUFDekI7QUFDQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsU0FBUztFQUNULFVBQVU7RUFDVixZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTs7OztFQUlFLGVBQWU7RUFDZixlQUFlO0VBQ2YsWUFBWTtFQUNaLHFCQUFxQjtBQUN2QjtBQUNBOztFQUVFLGFBQWE7RUFDYixvQ0FBb0M7QUFDdEM7QUFDQTs7RUFFRSxZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCO0FBQ0E7O0VBRUUsYUFBYTtFQUNiLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSxhQUFhO0FBQ2Y7QUFDQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYiwrQkFBK0I7RUFDL0IscUJBQXFCO0VBQ3JCLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usb0NBQW9DO0VBQ3BDLHNDQUFzQztFQUN0QyxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCO0FBQ0EsbUJBQW1CO0FBQ25CO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsbUNBQW1DO0VBQ25DLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0NBQWtDO0FBQ3BDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMyAzMCA3MCk7XFxufSovXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNnZtaW4pO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDZ2bWluKTtcXG4gIGdhcDogMnB4O1xcbiAgcGFkZGluZzogMC4ycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnBsYWNlLXNoaXBzLWJ0bnMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogMXJlbTtcXG4gIHdpZHRoOiA4MCU7XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXJnaW4tdG9wOiAycHg7XFxufVxcblxcbi5kcmFnLWJ0bixcXG4ucGxheS1idG4sXFxuLm5leHQtYnRuLFxcbi5yYW5kb21pemUtYnRuIHtcXG4gIHBhZGRpbmc6IDAuNnJlbTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG59XFxuLnBsYXktYnRuLFxcbi5uZXh0LWJ0biB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgYm94LXNoYWRvdzogLTFweCAwcHggOXB4IDNweCAjZmYwMGQ0O1xcbn1cXG4uZHJhZy1idG46aG92ZXIsXFxuLnJhbmRvbWl6ZS1idG46aG92ZXIge1xcbiAgY29sb3I6IGJlaWdlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcbi5zaGlwcy1jb250YWluZXIsXFxuLmRyb3Atc2hpcHMge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xcbiAgZ2FwOiAycHg7XFxuICBtYXgtaGVpZ2h0OiAyMDBweDtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmRyYWdnaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcXG59XFxuLmZsZXgtaG9yaXpvbnRhbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4uZmxleC12ZXJ0aWNhbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnN1Ym1hcmluZS1ob3Jpem9udGFsIHtcXG4gIC0td2lkdGg6IDM7XFxufVxcbi5zdWJtYXJpbmUtdmVydGljYWwge1xcbiAgLS1oZWlnaHQ6IDM7XFxufVxcbi5jYXJyaWVyLWhvcml6b250YWwge1xcbiAgLS13aWR0aDogNTtcXG59XFxuLmNhcnJpZXItdmVydGljYWwge1xcbiAgLS1oZWlnaHQ6IDU7XFxufVxcbi5wYXRyb2wtaG9yaXpvbnRhbCB7XFxuICAtLXdpZHRoOiAyO1xcbn1cXG4ucGF0cm9sLXZlcnRpY2FsIHtcXG4gIC0taGVpZ2h0OiAyO1xcbn1cXG4uZGVzdHJveWVyLWhvcml6b250YWwge1xcbiAgLS13aWR0aDogMztcXG59XFxuLmRlc3Ryb3llci12ZXJ0aWNhbCB7XFxuICAtLWhlaWdodDogMztcXG59XFxuLmJhdHRsZVNoaXAtaG9yaXpvbnRhbCB7XFxuICAtLXdpZHRoOiA0O1xcbn1cXG4uYmF0dGxlU2hpcC12ZXJ0aWNhbCB7XFxuICAtLWhlaWdodDogNDtcXG59XFxuLnNoaXAge1xcbiAgd2lkdGg6IDZ2bWluO1xcbiAgaGVpZ2h0OiA2dm1pbjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwIDIwMyA1NCk7XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxuICBjdXJzb3I6IGdyYWJiaW5nO1xcbn1cXG4uc2hpcC1zaXplIHtcXG4gIHdpZHRoOiBjYWxjKDZ2bWluICogdmFyKC0td2lkdGgsIDEpKTtcXG4gIGhlaWdodDogY2FsYyg2dm1pbiAqIHZhcigtLWhlaWdodCwgMSkpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IDRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxLCAxNDcsIDEpO1xcbn1cXG5cXG4udGFyZ2V0LWRvdCB7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxuICB3aWR0aDogMC44cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4ubWlzc2VkLXN0cmlrZSB7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxuICB3aWR0aDogMC4ycmVtO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4ubWlzc2VkLXN0cmlrZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uaGl0LXN0cmlrZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjUwMDAwO1xcbn1cXG4vKm1pbmkgc2hpcHMgc3R5bGUqL1xcbi5mbGVldC1ob2xkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5taW5pLXNoaXAtb3duZXIge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcbi5zYW1lLXNpemUtc2hpcHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDE1MHB4O1xcbn1cXG4ubWluaS1jYXJyaWVyIHtcXG4gIC0td2lkdGg6IDU7XFxufVxcbi5taW5pLWJhdHRsZVNoaXAge1xcbiAgLS13aWR0aDogNDtcXG59XFxuLm1pbmktZGVzdHJveWVyIHtcXG4gIC0td2lkdGg6IDM7XFxufVxcbi5taW5pLXN1Ym1hcmluZSB7XFxuICAtLXdpZHRoOiAzO1xcbn1cXG4ubWluaS1wYXRyb2wge1xcbiAgLS13aWR0aDogMS41O1xcbn1cXG4ubWluaS1zaGlwLXNpemUge1xcbiAgd2lkdGg6IGNhbGMoNDBweCAqIHZhcigtLXdpZHRoLCAxKSk7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBtYXJnaW46IDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNjYgMTk4IDE2NSk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvZ3JhZHVhdGUtdjE3LWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9hcmNoaXZvLWJsYWNrLXYyMS1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvbmFudW0tZ290aGljLWNvZGluZy12MjEtbGF0aW4tcmVndWxhci53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL2dlcm1hbmlhLW9uZS12MjAtbGF0aW4tcmVndWxhci53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL3NoYXJlLXRlY2gtbW9uby12MTUtbGF0aW4tcmVndWxhci53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ltYWdlcy9zZXQtc2hpcHMuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvaW1hZ2VzL3NoaXBzLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiR3JhZHVhdGVcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KSBmb3JtYXQoXCJ3b2ZmMlwiKTtcbn1cbi8qIGFyY2hpdm8tYmxhY2stcmVndWxhciAtIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICBmb250LWZhbWlseTogXCJBcmNoaXZvIEJsYWNrXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSlcbiAgICBmb3JtYXQoXCJ3b2ZmMlwiKTtcbn1cbi8qIG5hbnVtLWdvdGhpYy1jb2RpbmctcmVndWxhciAtIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICBmb250LWZhbWlseTogXCJOYW51bSBHb3RoaWMgQ29kaW5nXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSlcbiAgICBmb3JtYXQoXCJ3b2ZmMlwiKTtcbn1cbi8qIGdlcm1hbmlhLW9uZS1yZWd1bGFyIC0gbGF0aW4gKi9cbkBmb250LWZhY2Uge1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIGZvbnQtZmFtaWx5OiBcIkdlcm1hbmlhIE9uZVwiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fX30pXG4gICAgZm9ybWF0KFwid29mZjJcIik7XG59XG4vKiBzaGFyZS10ZWNoLW1vbm8tcmVndWxhciAtIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICBmb250LWZhbWlseTogXCJTaGFyZSBUZWNoIE1vbm9cIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX199KVxuICAgIGZvcm1hdChcIndvZmYyXCIpO1xufVxuKiB7XG4gIG1hcmdpbjogMDtcbn1cbmJvZHkge1xuICB3aWR0aDogMTAwdnc7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19ffSk7XG4gIGZvbnQtZmFtaWx5OiBcIkdyYWR1YXRlXCIsIFwiU2hhcmUgVGVjaCBNb25vXCIsIFwiR2VybWFuaWEgT25lXCIsIG1vbm9zcGFjZSwgQXJpYWwsXG4gICAgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogaW5oZXJpdDtcbn1cbmJ1dHRvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbn1cbi8qaW50cm8gcGFnZSovXG4uaW50cm8tcGFnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMjAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX199KTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuLmhlYWRlciB7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1LCAxNSwgMTUpO1xuICBjb2xvcjogYWxpY2VibHVlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDJzO1xufVxuXG4ubG9nbyB7XG4gIGZvbnQtZmFtaWx5OiBcIkFyY2hpdm8gQmxhY2tcIjtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3JlbTtcbiAgZm9udC1zaXplOiAyLjNyZW07XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIHRleHQtc2hhZG93OiAwIDFweCBibHVlO1xuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMnM7XG59XG4ubG9nbzpob3ZlciB7XG4gIGNvbG9yOiB5ZWxsb3c7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbn1cbi5nYW1lLW9wdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG59XG4uZ2FtZS1vcHRpb24tYnRucyB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LWZhbWlseTogXCJOYW51bSBHb3RoaWMgQ29kaW5nXCI7XG4gIHRleHQtc2hhZG93OiAtMXB4IC0ycHggMnB4ICMwMDAwMDA3ZDtcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDFzO1xuICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xufVxuLmdhbWUtb3B0aW9uLWJ0bnM6aG92ZXIge1xuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMCwgMCwgMCk7XG59XG4ubXVsdGktcGxheWVycy1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjAzLCAyMjYsIDQpO1xuICBjb2xvcjogcmdiKDAsIDAsIDApO1xufVxuLnNpbmdsZS1wbGF5ZXItYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyLCAxNDUsIDApO1xuICBjb2xvcjogYWxpY2VibHVlO1xufVxuXG4vKnNoaXAgcGxhY2VtZW50IHBhZ2UqL1xuLnNoaXBzLWdyaWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzIDMwIDcwKTtcbn1cbi5kcmFnLWJ0bixcbi5yYW5kb21pemUtYnRuLFxuLnBsYXktYnRuIHtcbiAgZm9udC1mYW1pbHk6IFwiR2VybWFuaWEgT25lXCI7XG59XG5cbi5wbGF5ZXJzLW5hbWUge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLyogY291bnQgZG93biovXG4ucGFzcy1zY3JlZW4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDEwMDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIHRvcDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDApO1xuICBkaXNwbGF5OiBub25lO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZm9udC1mYW1pbHk6IFwiR3JhZHVhdGVcIjtcbn1cbi5jb3VudGVyIHtcbiAgYXNwZWN0LXJhdGlvOiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDMwJTtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgcmdiKDE3NCwgMCwgMjU1KTtcbiAgY29sb3I6IGJyb3duO1xufVxuLmNvdW50ZXItYm9hcmQge1xuICBmb250LXNpemU6IDRyZW07XG59XG4ubXNnLXRleHQge1xuICBjb2xvcjogYmVpZ2U7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgcGFkZGluZzogMC41cmVtO1xufVxuLypwbGF5ZXJzIGJvYXJkLG1pbmkgc2hpcHMgYm9hcmQqL1xuXG4ucGxheWVycy1ib2FyZCxcbi5taW5pLXNoaXAtaG9sZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMC40cmVtO1xufVxuXG4vKndpbm5lciBtb2RhbCovXG4ud2lubmVyLWJvYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYW50aXF1ZXdoaXRlO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuLndpbm5lci1ob2xkZXIge1xuICBib3gtc2hhZG93OiAtMnB4IDBweCA4cHggM3B4ICM0MWNjMmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMC4ycmVtO1xufVxuLndpbm5lci1tb2RhbCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgd2lkdGg6IDIwJTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjRyZW07XG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDhweCAzcHggIzAwMDAwMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAzMCU7XG59XG4ucmVtYXRjaC1idG4ge1xuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwLjNyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG4vKmZvcm0gc3R5bGUqL1xuaW5wdXQge1xuICBmb250LWZhbWlseTogXCJHZXJtYW5pYSBPbmVcIjtcbn1cbi5wbGF5ZXItbmFtZS1pbnB1dCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMC45cmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcbn1cblxuLnBsYXllci1uYW1lLWlucHV0OmZvY3VzIH4gLnBsYXllci1vbmUtbGFiZWwge1xuICB0b3A6IDAuM3JlbTtcbiAgbGVmdDogMjAlO1xuICBjb2xvcjogIzE5ZDUwMDtcbn1cbi5wbGF5ZXItdHdvLWxhYmVsLFxuLnBsYXllci1vbmUtbGFiZWwge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvdHRvbTogMi44cmVtO1xuICBsZWZ0OiAxcmVtO1xuICBjb2xvcjogIzYwNjM1ZjtcbiAgdHJhbnNpdGlvbjogYWxsIDJzO1xufVxuLnBsYXllci1uYW1lLWlucHV0OmZvY3VzIH4gLnBsYXllci10d28tbGFiZWwge1xuICB0b3A6IDIwJTtcbiAgbGVmdDogMjAlO1xuICBjb2xvcjogIzE5ZDUwMDtcbn1cbmZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAzcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzksIDM0LCAzNCk7XG4gIG9wYWNpdHk6IDAuODtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBwYWRkaW5nOiAycmVtO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIGhlaWdodDogMzUwcHg7XG4gIGNvbG9yOiBhbnRpcXVld2hpdGU7XG4gIGZvbnQtZmFtaWx5OiBcIkdlcm1hbmlhIE9uZVwiLCBtb25vc3BhY2U7XG59XG4uaW5wdXQtaG9sZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5zdWJtaXQtYnRuIHtcbiAgcGFkZGluZzogMC40cmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1mYW1pbHk6IFwiR2VybWFuaWEgT25lXCI7XG59XG4uc3VibWl0LWJ0bjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbn1cbi5wbGF5ZXItdHVybiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGNvbG9yOiBhbGljZWJsdWU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIG9wYWNpdHk6IDAuODtcbiAgcGFkZGluZzogMC41cmVtO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtC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YWNlIHtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR3JhZHVhdGVcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9ncmFkdWF0ZS12MTctbGF0aW4tcmVndWxhci53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuLyogYXJjaGl2by1ibGFjay1yZWd1bGFyIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQXJjaGl2byBCbGFja1xcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL2FyY2hpdm8tYmxhY2stdjIxLWxhdGluLXJlZ3VsYXIud29mZjJcXFwiKVxcbiAgICBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbi8qIG5hbnVtLWdvdGhpYy1jb2RpbmctcmVndWxhciAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LWZhbWlseTogXFxcIk5hbnVtIEdvdGhpYyBDb2RpbmdcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9uYW51bS1nb3RoaWMtY29kaW5nLXYyMS1sYXRpbi1yZWd1bGFyLndvZmYyXFxcIilcXG4gICAgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG4vKiBnZXJtYW5pYS1vbmUtcmVndWxhciAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL2dlcm1hbmlhLW9uZS12MjAtbGF0aW4tcmVndWxhci53b2ZmMlxcXCIpXFxuICAgIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuLyogc2hhcmUtdGVjaC1tb25vLXJlZ3VsYXIgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJTaGFyZSBUZWNoIE1vbm9cXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9zaGFyZS10ZWNoLW1vbm8tdjE1LWxhdGluLXJlZ3VsYXIud29mZjJcXFwiKVxcbiAgICBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbioge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5ib2R5IHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2Fzc2V0cy9pbWFnZXMvc2V0LXNoaXBzLmpwZyk7XFxuICBmb250LWZhbWlseTogXFxcIkdyYWR1YXRlXFxcIiwgXFxcIlNoYXJlIFRlY2ggTW9ub1xcXCIsIFxcXCJHZXJtYW5pYSBPbmVcXFwiLCBtb25vc3BhY2UsIEFyaWFsLFxcbiAgICBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1zaXplOiBpbmhlcml0O1xcbn1cXG5idXR0b24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG59XFxuLyppbnRybyBwYWdlKi9cXG4uaW50cm8tcGFnZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4vYXNzZXRzL2ltYWdlcy9zaGlwcy5qcGdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uaGVhZGVyIHtcXG4gIHBhZGRpbmc6IDEuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNSwgMTUsIDE1KTtcXG4gIGNvbG9yOiBhbGljZWJsdWU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDJzO1xcbn1cXG5cXG4ubG9nbyB7XFxuICBmb250LWZhbWlseTogXFxcIkFyY2hpdm8gQmxhY2tcXFwiO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3JlbTtcXG4gIGZvbnQtc2l6ZTogMi4zcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHRleHQtc2hhZG93OiAwIDFweCBibHVlO1xcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDJzO1xcbn1cXG4ubG9nbzpob3ZlciB7XFxuICBjb2xvcjogeWVsbG93O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xcbn1cXG4uZ2FtZS1vcHRpb25zIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAwLjVyZW07XFxufVxcbi5nYW1lLW9wdGlvbi1idG5zIHtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTmFudW0gR290aGljIENvZGluZ1xcXCI7XFxuICB0ZXh0LXNoYWRvdzogLTFweCAtMnB4IDJweCAjMDAwMDAwN2Q7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMXM7XFxuICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xcbn1cXG4uZ2FtZS1vcHRpb24tYnRuczpob3ZlciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxufVxcbi5tdWx0aS1wbGF5ZXJzLWJ0biB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjAzLCAyMjYsIDQpO1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG59XFxuLnNpbmdsZS1wbGF5ZXItYnRuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMiwgMTQ1LCAwKTtcXG4gIGNvbG9yOiBhbGljZWJsdWU7XFxufVxcblxcbi8qc2hpcCBwbGFjZW1lbnQgcGFnZSovXFxuLnNoaXBzLWdyaWQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMgMzAgNzApO1xcbn1cXG4uZHJhZy1idG4sXFxuLnJhbmRvbWl6ZS1idG4sXFxuLnBsYXktYnRuIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2VybWFuaWEgT25lXFxcIjtcXG59XFxuXFxuLnBsYXllcnMtbmFtZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4vKiBjb3VudCBkb3duKi9cXG4ucGFzcy1zY3JlZW4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogMTAwMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgdG9wOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDAsIDApO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmb250LWZhbWlseTogXFxcIkdyYWR1YXRlXFxcIjtcXG59XFxuLmNvdW50ZXIge1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAzMCU7XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgYm9yZGVyOiAwLjJyZW0gc29saWQgcmdiKDE3NCwgMCwgMjU1KTtcXG4gIGNvbG9yOiBicm93bjtcXG59XFxuLmNvdW50ZXItYm9hcmQge1xcbiAgZm9udC1zaXplOiA0cmVtO1xcbn1cXG4ubXNnLXRleHQge1xcbiAgY29sb3I6IGJlaWdlO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG4vKnBsYXllcnMgYm9hcmQsbWluaSBzaGlwcyBib2FyZCovXFxuXFxuLnBsYXllcnMtYm9hcmQsXFxuLm1pbmktc2hpcC1ob2xkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjRyZW07XFxufVxcblxcbi8qd2lubmVyIG1vZGFsKi9cXG4ud2lubmVyLWJvYXJkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcXG4gIHBhZGRpbmc6IDFyZW07XFxufVxcbi53aW5uZXItaG9sZGVyIHtcXG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDhweCAzcHggIzQxY2MyZjtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAuMnJlbTtcXG59XFxuLndpbm5lci1tb2RhbCB7XFxuICBib3JkZXI6IG5vbmU7XFxuICB3aWR0aDogMjAlO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgYm94LXNoYWRvdzogLTJweCAwcHggOHB4IDNweCAjMDAwMDAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogMzAlO1xcbn1cXG4ucmVtYXRjaC1idG4ge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW47XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBwYWRkaW5nOiAwLjNyZW07XFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG4vKmZvcm0gc3R5bGUqL1xcbmlucHV0IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2VybWFuaWEgT25lXFxcIjtcXG59XFxuLnBsYXllci1uYW1lLWlucHV0IHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDAuOXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcXG59XFxuXFxuLnBsYXllci1uYW1lLWlucHV0OmZvY3VzIH4gLnBsYXllci1vbmUtbGFiZWwge1xcbiAgdG9wOiAwLjNyZW07XFxuICBsZWZ0OiAyMCU7XFxuICBjb2xvcjogIzE5ZDUwMDtcXG59XFxuLnBsYXllci10d28tbGFiZWwsXFxuLnBsYXllci1vbmUtbGFiZWwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm90dG9tOiAyLjhyZW07XFxuICBsZWZ0OiAxcmVtO1xcbiAgY29sb3I6ICM2MDYzNWY7XFxuICB0cmFuc2l0aW9uOiBhbGwgMnM7XFxufVxcbi5wbGF5ZXItbmFtZS1pbnB1dDpmb2N1cyB+IC5wbGF5ZXItdHdvLWxhYmVsIHtcXG4gIHRvcDogMjAlO1xcbiAgbGVmdDogMjAlO1xcbiAgY29sb3I6ICMxOWQ1MDA7XFxufVxcbmZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDNyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzksIDM0LCAzNCk7XFxuICBvcGFjaXR5OiAwLjg7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAycmVtO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgY29sb3I6IGFudGlxdWV3aGl0ZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2VybWFuaWEgT25lXFxcIiwgbW9ub3NwYWNlO1xcbn1cXG4uaW5wdXQtaG9sZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uc3VibWl0LWJ0biB7XFxuICBwYWRkaW5nOiAwLjRyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHZXJtYW5pYSBPbmVcXFwiO1xcbn1cXG4uc3VibWl0LWJ0bjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XFxufVxcbi5wbGF5ZXItdHVybiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGNvbG9yOiBhbGljZWJsdWU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbiAgb3BhY2l0eTogMC44O1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2hpcHMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc2hpcHMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwiLi9wbGFjZS1zaGlwLXBhZ2Uvc2hpcHMuY3NzXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi91dGlsaXR5LmpzXCI7XG5pbXBvcnQgeyByYW5kb21seVBsYWNlU2hpcHMgfSBmcm9tIFwiLi9wbGFjZS1zaGlwLXBhZ2Uvc2hpcC1wb3NpdGlvbi5qc1wiO1xuaW1wb3J0IHtcbiAgc2NyZWVuQ29udHJvbGxlcixcbiAgZHJhd0ZpcnN0UGFnZSxcbiAgc2hpcHNQbGFjZW1lbnQsXG4gIHJhbmRvbVBsYWNlbWVudCxcbiAgZHJhZ1NoaXBzLFxuICBjb3VudGRvd25Nb2RhbCxcbiAgZm9ybVRlbXBsYXRlLFxufSBmcm9tIFwiLi9kb20tY29tcG9uZW50LmpzXCI7XG5cbmNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcGFnZS1jb250YWluZXJdXCIpO1xuY29uc3QgYm9hcmRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXdyYXBwZXJcIik7XG5kcmF3Rmlyc3RQYWdlKCk7XG5ib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xubGV0IHBsYXllck9uZU5hbWU7XG5sZXQgcGxheWVyVHdvTmFtZTtcbmxldCBmaXJzdFBsYXllcjtcbmxldCBzZWNvbmRQbGF5ZXI7XG4vL3N0b3JlIHBsYXllcnMgb2JqZWN0IGluIGhhc2htYXBcbmNvbnN0IGhhc2htYXAgPSBuZXcgTWFwKCk7XG5sZXQgc29sb1BsYXllciA9IGZhbHNlO1xucGFnZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCIubXVsdGktcGxheWVycy1idG5cIikpIHtcbiAgICBzb2xvUGxheWVyID0gZmFsc2U7XG4gICAgYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBmb3JtVGVtcGxhdGUocGFnZUNvbnRhaW5lcik7XG4gIH1cbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCJbZGF0YS1zdWJtaXQtbmFtZV1cIikpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGxheWVyT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBsYXllci1vbmVdXCIpO1xuICAgIGNvbnN0IHBsYXllclR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wbGF5ZXItdHdvXCIpO1xuICAgIC8vYXZvaWQgc3BhY2UgZm9yIGNyZWF0aW5nIGNsYXNzICBsYXRlciBmb3IgZmxlZXQgZGFzaCBib2FyZFxuICAgIHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmUudmFsdWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgIHBsYXllclR3b05hbWUgPSBwbGF5ZXJUd28udmFsdWUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgIC8vcmV0dXJuIGlmIHBsYXllcnMgbmFtZSBzYW1lIGFuZCBlbXB0eVxuICAgIGlmIChcbiAgICAgIHBsYXllck9uZU5hbWUgPT09IFwiXCIgfHxcbiAgICAgIHBsYXllclR3b05hbWUgPT09IFwiXCIgfHxcbiAgICAgIChwbGF5ZXJPbmVOYW1lID09PSBwbGF5ZXJUd29OYW1lKSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmaXJzdFBsYXllciA9IFBsYXllcihwbGF5ZXJPbmVOYW1lKTtcbiAgICBzZWNvbmRQbGF5ZXIgPSBQbGF5ZXIocGxheWVyVHdvTmFtZSk7XG4gICAgY291bnRkb3duTW9kYWwoYCR7cGxheWVyT25lTmFtZX0gc2V0IHRoZSBzaGlwc2ApO1xuICAgIHNoaXBzUGxhY2VtZW50KHBhZ2VDb250YWluZXIpO1xuICB9XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiW2RhdGEtcmFuZG9tLWJ0blwiKSkge1xuICAgIHB1dFNoaXBzKCk7XG4gIH1cbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCJbZGF0YS1kcm9wLWJ0bl1cIikpIHtcbiAgICBkcmFnQW5kRHJvcCgpO1xuICB9XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiLnBsYXktYnRuXCIpKSB7XG4gICAgcGFnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgaWYgKHNvbG9QbGF5ZXIgPT09IGZhbHNlKSB7XG4gICAgICBjb3VudGRvd25Nb2RhbChgJHtwbGF5ZXJUd29OYW1lfSBzZXQgdGhlIHNoaXBzYCk7XG4gICAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBzaGlwc1BsYWNlbWVudChwYWdlQ29udGFpbmVyKTtcblxuICAgIGlmIChzb2xvUGxheWVyID09PSB0cnVlICYmIGhhc2htYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgLy9yYW5kb21seSBwbGFjZSBhaSBzaGlwc1xuICAgICAgcmFuZG9tbHlQbGFjZVNoaXBzKHNlY29uZFBsYXllcik7XG4gICAgICBoYXNobWFwLnNldChwbGF5ZXJPbmVOYW1lLCBmaXJzdFBsYXllcik7XG4gICAgICBoYXNobWFwLnNldChwbGF5ZXJUd29OYW1lLCBzZWNvbmRQbGF5ZXIpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGhhc2htYXAuZ2V0KHBsYXllclR3b05hbWUpICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIGhhc2htYXAuZ2V0KHBsYXllck9uZU5hbWUpICE9PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIGNvbnN0IHBsYXllck9uZSA9IGhhc2htYXAuZ2V0KHBsYXllck9uZU5hbWUpO1xuICAgICAgY29uc3QgcGxheWVyVHdvID0gaGFzaG1hcC5nZXQocGxheWVyVHdvTmFtZSk7XG4gICAgICBzY3JlZW5Db250cm9sbGVyKHBsYXllck9uZSwgcGxheWVyVHdvLCBzb2xvUGxheWVyKTtcbiAgICAgIGJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgcGFnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChoYXNobWFwLnNpemUgPT09IDApIHtcbiAgICAgIGhhc2htYXAuc2V0KHBsYXllck9uZU5hbWUsIGZpcnN0UGxheWVyKTtcbiAgICB9XG4gICAgaWYgKGhhc2htYXAuc2l6ZSA+IDApIHtcbiAgICAgIGhhc2htYXAuc2V0KHBsYXllclR3b05hbWUsIHNlY29uZFBsYXllcik7XG4gICAgfVxuICB9XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiLnNpbmdsZS1wbGF5ZXItYnRuXCIpKSB7XG4gICAgc29sb1BsYXllciA9IHRydWU7XG4gICAgcGxheWVyT25lTmFtZSA9IFwieW91XCI7XG4gICAgcGxheWVyVHdvTmFtZSA9IFwiYWlcIjtcbiAgICBmaXJzdFBsYXllciA9IFBsYXllcihwbGF5ZXJPbmVOYW1lKTtcbiAgICBzZWNvbmRQbGF5ZXIgPSBQbGF5ZXIocGxheWVyVHdvTmFtZSk7XG4gICAgY291bnRkb3duTW9kYWwoXCJzZXQgdGhlIHNoaXBzXCIpO1xuICAgIHNoaXBzUGxhY2VtZW50KHBhZ2VDb250YWluZXIpO1xuICAgIGJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cbn0pO1xuY29uc3Qgd2lubmVyTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItbXNnXCIpO1xud2lubmVyTXNnLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIi5yZW1hdGNoLWJ0blwiKSkge1xuICAgIC8vcmVzZXQgdGhlIHBsYXllciBhbmQgZG9tIGVsZW1lbnRcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5uZXItbW9kYWxdXCIpO1xuICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZFwiKTtcbiAgICBjb25zdCB0dXJuRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItdHVyblwiKTtcbiAgICBjb25zdCBkYXNoQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1pbmktZGFzaC1ib2FyZFwiKTtcbiAgICBjb25zdCB3aW5uZXJEaXZIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1ob2xkZXJcIik7XG4gICAgY29uc3Qgd2lubmVyTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItYm9hcmRcIik7XG4gICAgZmlyc3RQbGF5ZXIgPSBudWxsO1xuICAgIHNlY29uZFBsYXllciA9IG51bGw7XG4gICAgaGFzaG1hcC5jbGVhcigpO1xuICAgIGZpcnN0UGxheWVyID0gUGxheWVyKHBsYXllck9uZU5hbWUpO1xuICAgIHNlY29uZFBsYXllciA9IFBsYXllcihwbGF5ZXJUd29OYW1lKTtcbiAgICBpc0dhbWVFbmQgPSBmYWxzZTtcbiAgICBib2FyZHMudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHR1cm5EaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGRhc2hCb2FyZC5mb3JFYWNoKChkaXYpID0+IHtcbiAgICAgIGRpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfSk7XG4gICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiB7XG4gICAgICBib2FyZC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfSk7XG4gICAgd2lubmVyTXNnLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB3aW5uZXJEaXZIb2xkZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGZpcnN0UGxheWVyID0gUGxheWVyKHBsYXllck9uZU5hbWUpO1xuICAgIHNlY29uZFBsYXllciA9IFBsYXllcihwbGF5ZXJUd29OYW1lKTtcbiAgICBtb2RhbC5jbG9zZSgpO1xuICAgIHBhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHNoaXBzUGxhY2VtZW50KHBhZ2VDb250YWluZXIpO1xuICB9XG59KTtcbi8vZHJhZyBhbmQgZHJvcCBzaGlwIGJhc2VkIG9uIHNvbG8gb3IgbXVsdGkgcGxheWVyXG5mdW5jdGlvbiBkcmFnQW5kRHJvcCgpIHtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2hpcHMtY29udGFpbmVyXVwiKTtcbiAgc2hpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBpZiAoaGFzaG1hcC5zaXplIDwgMSkge1xuICAgIGlmIChmaXJzdFBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICByZXBvc2l0aW9uKCk7XG4gICAgfVxuICAgIGRyYWdTaGlwcyhmaXJzdFBsYXllciwgZmlyc3RQbGF5ZXIuYm9hcmQuc2hpcHNBcnJheSk7XG4gIH1cbiAgaWYgKGhhc2htYXAuc2l6ZSA+IDEpIHtcbiAgICBpZiAoc2Vjb25kUGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlcG9zaXRpb24oKTtcbiAgICB9XG4gICAgZHJhZ1NoaXBzKHNlY29uZFBsYXllciwgc2Vjb25kUGxheWVyLmJvYXJkLnNoaXBzQXJyYXkpO1xuICB9XG59XG5mdW5jdGlvbiByZXBvc2l0aW9uKCkge1xuICBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHhvID0gUGxheWVyKHBsYXllck9uZU5hbWUsIGZpcnN0UGxheWVyLnNoaXBzQXJyYXkpO1xuICAgIC8vIGZpcnN0UGxheWVyID0gbnVsbDtcbiAgICBmaXJzdFBsYXllciA9IHhvO1xuICB9XG4gIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHhvID0gUGxheWVyKHBsYXllclR3b05hbWUsIHNlY29uZFBsYXllci5zaGlwc0FycmF5KTtcbiAgICAvL3NlY29uZFBsYXllciA9IG51bGw7XG4gICAgc2Vjb25kUGxheWVyID0geG87XG4gIH1cbn1cbmZ1bmN0aW9uIHB1dFNoaXBzKCkge1xuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zaGlwcy1jb250YWluZXJdXCIpO1xuICBzaGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGlmIChoYXNobWFwLnNpemUgPCAxKSB7XG4gICAgcmVwb3NpdGlvbigpO1xuICAgIHJhbmRvbVBsYWNlbWVudChmaXJzdFBsYXllcik7XG4gIH0gZWxzZSBpZiAoaGFzaG1hcC5zaXplID4gMCkge1xuICAgIHJlcG9zaXRpb24oKTtcbiAgICByYW5kb21QbGFjZW1lbnQoc2Vjb25kUGxheWVyKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImZpcnN0Qm9hcmQiLCJzaGlwQ29vcmRpbmF0ZSIsImhpdCIsIm1pc3MiLCJjZWxscyIsImkiLCJqIiwiYSIsImIiLCJ4IiwieSIsImdyaWRzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYnV0dG9uIiwidGV4dENvbnRlbnQiLCJNYXRoIiwiZmxvb3IiLCJkYXRhc2V0IiwiaW5kZXgiLCJkb3QiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImFwcGVuZENoaWxkIiwic3RyaWtlQm9hcmQiLCJkcmF3R3JpZHMiLCJncmlkIiwiX3V0aWxpdHkiLCJyZXF1aXJlIiwiX2JvYXJkQ29tcG9uZW50IiwiX3NoaXBQb3NpdGlvbiIsImNvdW50Iiwid2lubmVyTXNnIiwiR2FtZUZsb3ciLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJpc0dhbWVFbmQiLCJwbGF5ZXJzIiwiYWN0aXZlUGxheWVyIiwiY2hhbmdlVHVybiIsImdldFBsYXllciIsInByaW50Qm9hcmQiLCJwbGF5ZXIiLCJtaXNzU3RyaWtlcyIsImJvYXJkIiwibWlzc2VkU2hvdHMiLCJoaXRTdHJpa2VzIiwiaGl0U2hvdHMiLCJhbGxUaGVTaGlwcyIsInNoaXBzUG9zaXRpb25zIiwic2hpcEJvYXJkU3RhdGUiLCJzdHJpa2VCb2FyZFN0YXRlIiwidXBkYXRlU3Vua1NoaXAiLCJzdW5rU2hpcHMiLCJwcmludE5ld0JvYXJkIiwib3Bwb25lbnROYW1lIiwibmFtZSIsIm9wcG9uZW50UGxheWVyU2hpcFN0YXRlIiwib3Bwb25lbnRTdHJpa2VCb2FyZCIsImN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQiLCJjdXJyZW50UGxheWVyU2hpcFN0YXRlIiwiY3VycmVudFBsYXllck5hbWUiLCJwbGF5ZXJSb3VuZCIsImNsaWNrZWROdW0iLCJjb29yZGluYXRlIiwiY29vcmRpbmF0ZXNIYXNoTWFwIiwiZ2V0IiwiTnVtYmVyIiwicmVjZWl2ZUF0dGFjayIsImRlY2xhcmVXaW5uZXIiLCJsZW5ndGgiLCJ3aW5uZXJNb2RhbCIsInBvcCIsIm1vZGFsIiwicXVlcnlTZWxlY3RvciIsInNob3dNb2RhbCIsIndpbm5lciIsInVuZGVmaW5lZCIsInB1c2giLCJmaXJzdFBsYXllclN1bmtTaGlwcyIsImlzU3VuayIsInNlY29uZFBsYXllclN1bmtTaGlwcyIsInBsYXllck9uZU5hbWUiLCJwbGF5ZXJUd29OYW1lIiwibXNnIiwic2NyZWVuQ29udHJvbGxlciIsInNvbG9QbGF5ZXIiLCJnYW1lIiwidHVybiIsInBsYXllck9uZVNoaXBzQm9hcmQiLCJwbGF5ZXJPbmVTdHJpa2VCb2FyZCIsImZpcnN0UGxheWVyU2hpcHMiLCJzZWNvbmRQbGF5ZXJTaGlwcyIsInVwZGF0ZVNjcmVlbiIsInBsYXllck9uZUZpcnN0Q2hhciIsImNoYXJBdCIsInBsYXllclR3b0ZpcnN0Q2hhciIsImJ1aWxkRGFzaGJvYXJkIiwiZHJhd01pbmlTaGlwcyIsInBsYXllck9uZURhc2hCb2FyZCIsIlBsYXllck9uZU1pbmlTaGlwcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXJUd29EYXNoQm9hcmQiLCJwbGF5ZXJUd29NaW5pU2hpcHMiLCJwbGF5ZXJPbmVTdW5rU2hpcHMiLCJwbGF5ZXJUd29TdW5rU2hpcHMiLCJ1cGRhdGVEYXNoQm9hcmQiLCJ1cGRhdGVNaW5pU2hpcHMiLCJjb3VudGRvd25Nb2RhbCIsImZpeFR5cG8iLCJjbGlja0hhbmRsZXIiLCJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImhhc0NoaWxkTm9kZXMiLCJjb21wdXRlck1vdmUiLCJpbnRyb1BhZ2UiLCJwYWdlSG9sZGVyIiwic2V0QXR0cmlidXRlIiwiaGVhZGVyIiwidGl0bGUiLCJidG5Ib2xkZXIiLCJzaW5nbGVQbGF5ZXJCdG4iLCJtdWx0aVBsYXllckJ0biIsImRyYXdGaXJzdFBhZ2UiLCJwYWdlQ29udGFpbmVyIiwibG9nb0RpdiIsInRpdHRsZSIsInNldFRpbWVvdXQiLCJ0ZW1wbGF0ZVNoaXBHcmlkIiwic2Vjb25kUGFnZSIsInN0cmF0ZWd5Qm9hcmQiLCJidG5zIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJzaGlwc1BsYWNlbWVudCIsImVsZW1lbnQiLCJyYW5kb21QbGFjZW1lbnQiLCJuZXdQbGF5ZXIiLCJjb250YWluZXIiLCJwbGF5QnRuIiwic2hpcHNDb250YWluZXIiLCJkaXNwbGF5Iiwic2V0U2hpcHNQbGFjZSIsInJhbmRvbWx5UGxhY2VTaGlwcyIsInNoaXBzIiwiaGl0cyIsIm1pc3NlZCIsImtlZXBOYW1lIiwiUGxheWVyIiwic2hpcHNDb29yZGluYXRlcyIsImNvdW50RG93blBhZ2UiLCJwYXNzU2NyZWVuIiwiY291bnRkb3duIiwidXBkYXRlQ291bnRkb3duVUkiLCJlbGUiLCJtaW5pRmxlZXRzIiwic2hpcHNEaXYiLCJzdW5rU2hpcEFycmF5IiwiY29sb3IiLCJmb3JFYWNoIiwic2hpcCIsInN1bmtTaGlwIiwid2lubmVyRGl2IiwiaG9sZGVyIiwiZm9ybVRlbXBsYXRlIiwibWluaVNoaXBCb2FyZCIsImRpdkFycmF5IiwicmVQb3NpdGlvbiIsInNoaXBzQXJyYXkiLCJhbGxTaGlwUG9zaXRpb25zIiwiY2VsbHNUb1JlbW92ZWQiLCJzbGljZSIsImNlbGwiLCJ0b1N0cmluZyIsInNwbGljZSIsImluZGV4T2YiLCJwbGFjZVBsYXllclNoaXBIb3Jpem9udGFsIiwiY29vcmRpbmF0ZXMiLCJjb252ZXJ0SW5kZXgiLCJzaGlwQ2VsbHMiLCJwbGFjZVZlcnRpY2FsIiwidGFrZW5DZWxscyIsInBvc2l0aW9ucyIsInBsYWNlUmFuZG9tIiwicGxhY2VQbGF5ZXJTaGlwVmVydGljYWwiLCJwbGFjZUhvcml6b250YWwiLCJhbGxvd0Ryb3AiLCJwcmV2ZW50RGVmYXVsdCIsImRyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiaWQiLCJkcm9wIiwiZGF0YSIsImdldERhdGEiLCJkcmFnZ2VkIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaGlwRGlyZWN0aW9uIiwiZ2V0U2hpcERpcmVjdGlvbkNsYXNzIiwic2hpcEluZGV4Iiwid2hpY2hTaGlwQ2xpY2tlZCIsInNoaXBOYW1lIiwiYWxsQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJkaXJlY3Rpb25DbGFzcyIsImZsaXAiLCJyZXN1bHQiLCJwb3NpdGlvblRlbXBTaGlwIiwicmVtb3ZlIiwiZGlyZWN0aW9uIiwiZmlyc3RDb29yZGluYXRlIiwidGVtcFNoaXAiLCJTaGlwIiwidGVtcFNoaXBzIiwidGVtcEJvYXJkIiwiR2FtZUJvYXJkIiwiaXNDb29yZGluYXRlRnJlZSIsIm5ld1Bvc2l0aW9uIiwicmVtb3ZlQ29vcmRpbmF0ZSIsImFycmF5Iiwic2hpcFBvc2l0aW9uIiwidGFrZW5Qb3NpdGlvbnMiLCJwb3NpdGlvbiIsImRyYXdTaGlwcyIsImRpdkhvbGRlciIsImRpdiIsImRyYWdTaGlwcyIsInNxdWFyZXMiLCJzcXVhcmUiLCJ0b3RhbExlbmd0aCIsInJlZHVjZSIsInRvdGFsIiwiY3JlYXRlQm9hcmQiLCJhbGxDb29yZGluYXRlcyIsImludmVyc2VIYXNoTWFwIiwiaW52ZXJzZUNvb3JkaW5hdGUiLCJyb3ciLCJjb2wiLCJNYXAiLCJrIiwic2V0IiwiUG9zaXRpb24iLCJzaGlwTGVuZ3RoIiwiaG9yaXpvbnRhbCIsInZlcnRpY2FsIiwidHdvRGltZW5zaW9uQXJyYXkiLCJyYW5kb21GcmVlQ29vcmRpbmF0ZSIsInJhbmRvbU51bSIsInJhbmRvbUNlbGwiLCJyZWxhdGVkQ29vcmRpbmF0ZSIsImluY2x1ZGVzIiwibnVtIiwicmFuZG9tIiwicmFuZG9tbHlQb3NpdGlvbiIsInNpZGUiLCJzcGFjZVRha2VuIiwiY2hlY2tDb29yZGluYXRlIiwiaXNIaXQiLCJvbmVEaW1lbnNpb25BcnJheSIsImNhcnJpZXIiLCJiYXR0bGVTaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sIiwicGlja2VkTnVtIiwiY29tcHV0ZXJTbG90IiwibmV4dEhpdHMiLCJuZWlnaGJvclNsb3RzIiwiYWRqYWNlbnRTbG90IiwidmFsaWRTcG90IiwibW92ZSIsInJhbmRvbVNwb3QiLCJuZXh0VHJ5IiwiYWxsU3BvdHMiLCJzcG90Iiwic3VtIiwiX2RvbUNvbXBvbmVudCIsImJvYXJkV3JhcHBlciIsImZpcnN0UGxheWVyIiwic2Vjb25kUGxheWVyIiwiaGFzaG1hcCIsIm1hdGNoZXMiLCJ2YWx1ZSIsInJlcGxhY2UiLCJwdXRTaGlwcyIsImRyYWdBbmREcm9wIiwic2l6ZSIsImJvYXJkcyIsInR1cm5EaXYiLCJkYXNoQm9hcmQiLCJ3aW5uZXJEaXZIb2xkZXIiLCJjbGVhciIsImNsb3NlIiwicmVwb3NpdGlvbiIsInhvIl0sInNvdXJjZVJvb3QiOiIifQ==