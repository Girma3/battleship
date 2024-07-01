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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxtR0FBbUcsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLE9BQU8sUUFBUSxVQUFVLFVBQVUsVUFBVSxZQUFZLE1BQU0sTUFBTSxVQUFVLFlBQVksTUFBTSxNQUFNLFVBQVUsWUFBWSxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxZ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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUNBQW1DO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtQ0FBbUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sWUFBWSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxPQUFPLE1BQU0sWUFBWSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxPQUFPLE1BQU0sWUFBWSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxPQUFPLE1BQU0sWUFBWSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sT0FBTyxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sVUFBVSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLE9BQU8sWUFBWSxPQUFPLEtBQUssVUFBVSxLQUFLLFVBQVUsS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxLQUFLLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxhQUFhLE9BQU8sVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxVQUFVLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxNQUFNLFVBQVUsS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxzQ0FBc0MsdUJBQXVCLDhC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ZixXQUFXLENBQUM1TyxLQUFLLENBQUNLLGNBQWMsQ0FBQ3FCLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDL0MsTUFBTWtPLEVBQUUsR0FBRyxJQUFBbkosZUFBTSxFQUFDbkUsYUFBYSxFQUFFc00sV0FBVyxDQUFDL0csVUFBVSxDQUFDO0lBQ3hEO0lBQ0ErRyxXQUFXLEdBQUdnQixFQUFFO0VBQ2xCO0VBQ0EsSUFBSWYsWUFBWSxDQUFDN08sS0FBSyxDQUFDSyxjQUFjLENBQUNxQixNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ2hELE1BQU1rTyxFQUFFLEdBQUcsSUFBQW5KLGVBQU0sRUFBQ2xFLGFBQWEsRUFBRXNNLFlBQVksQ0FBQ2hILFVBQVUsQ0FBQztJQUN6RDtJQUNBZ0gsWUFBWSxHQUFHZSxFQUFFO0VBQ25CO0FBQ0Y7QUFDQSxTQUFTVixRQUFRQSxDQUFBLEVBQUc7RUFDbEIsTUFBTWpKLGNBQWMsR0FBR25JLFFBQVEsQ0FBQ2dFLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztFQUN2RW1FLGNBQWMsQ0FBQ3hILEtBQUssQ0FBQ3lILE9BQU8sR0FBRyxNQUFNO0VBQ3JDLElBQUk0SSxPQUFPLENBQUNNLElBQUksR0FBRyxDQUFDLEVBQUU7SUFDcEJPLFVBQVUsQ0FBQyxDQUFDO0lBQ1osSUFBQTlKLDZCQUFlLEVBQUMrSSxXQUFXLENBQUM7RUFDOUIsQ0FBQyxNQUFNLElBQUlFLE9BQU8sQ0FBQ00sSUFBSSxHQUFHLENBQUMsRUFBRTtJQUMzQk8sVUFBVSxDQUFDLENBQUM7SUFDWixJQUFBOUosNkJBQWUsRUFBQ2dKLFlBQVksQ0FBQztFQUMvQjtBQUNGLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2JvYXJkLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZS1zaGlwLXBhZ2Uvc2hpcC1wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZS1zaGlwLXBhZ2Uvc2hpcHMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlLXNoaXAtcGFnZS9zaGlwcy5jc3M/NDI3YyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vZnVuY3Rpb24gZHJhdyBzaGlwcyB3aXRoIGhpdCBhbmQgbWlzcyBmb3IgdGhlIG93bmVyXG5mdW5jdGlvbiBmaXJzdEJvYXJkKHNoaXBDb29yZGluYXRlLCBoaXQsIG1pc3MpIHtcbiAgLy8gQ3JlYXRlIGEgMkQgZ3JpZCBvZiBjZWxsc1xuICBjb25zdCBjZWxscyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjZWxsc1tpXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY2VsbHNbaV1bal0gPSBcIlwiO1xuICAgIH1cbiAgfVxuICAvLyBNYXJrIHRoZSBjb29yZGluYXRlcyBvbiB0aGUgZ3JpZFxuICBmb3IgKGNvbnN0IFthLCBiXSBvZiBzaGlwQ29vcmRpbmF0ZSkge1xuICAgIGNlbGxzW2FdW2JdID0gXCJzaGlwXCI7XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgaGl0KSB7XG4gICAgaWYgKGNlbGxzW3hdW3ldID09PSBcInNoaXBcIikge1xuICAgICAgY2VsbHNbeF1beV0gPSBcImhpdFwiO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IFt4LCB5XSBvZiBtaXNzKSB7XG4gICAgaWYgKGNlbGxzW3hdW3ldICE9PSBcInNoaXBcIikge1xuICAgICAgY2VsbHNbeF1beV0gPSBcIm1pc3NcIjtcbiAgICB9XG4gIH1cbiAgLy8gQ3JlYXRlIGEgY29udGFpbmVyIGZvciB0aGUgZ3JpZFxuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdyaWRzLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgLy8gQ3JlYXRlIGJ1dHRvbnMgZm9yIGVhY2ggY2VsbFxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF07XG4gICAgYnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIGlmIChjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09IFwic2hpcFwiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWRvdFwiKTtcbiAgICAgIGRvdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0YjI5MjlcIjtcbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkb3QpO1xuICAgIH0gZWxzZSBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcImhpdFwiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWRvdFwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwiaGl0LXN0cmlrZVwiKTtcbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkb3QpO1xuICAgIH0gZWxzZSBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcIm1pc3NcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcIm1pc3NlZC1zdHJpa2VcIik7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9XG4gICAgZ3JpZHMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICByZXR1cm4gZ3JpZHM7XG59XG4vL2Z1bmN0aW9uICBkcmF3IG1pc3MgYW5kIGhpdCBhbmQgcmV2ZWwgc2hpcCBpZiBpdCBoaXQgdXNlZCB0b1xuLy9zaG93IGZvciBvcHBvbmVudCBieSBoaWRpbmcgc2hpcHMgd2hlbiBpdCByZW5kZXIgZmlyc3RcbmZ1bmN0aW9uIHN0cmlrZUJvYXJkKHNoaXBDb29yZGluYXRlLCBoaXQsIG1pc3MpIHtcbiAgLy8gQ3JlYXRlIGEgMkQgZ3JpZCBvZiBjZWxsc1xuICBjb25zdCBjZWxscyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjZWxsc1tpXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY2VsbHNbaV1bal0gPSBcIlwiO1xuICAgIH1cbiAgfVxuICAvLyBtYXJrIHRoZSBjb29yZGluYXRlcyBvbiB0aGUgZ3JpZFxuICBmb3IgKGNvbnN0IFthLCBiXSBvZiBzaGlwQ29vcmRpbmF0ZSkge1xuICAgIGNlbGxzW2FdW2JdID0gXCJzaGlwXCI7XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgaGl0KSB7XG4gICAgaWYgKGNlbGxzW3hdW3ldID09PSBcInNoaXBcIikge1xuICAgICAgY2VsbHNbeF1beV0gPSBcImhpdFwiO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IFt4LCB5XSBvZiBtaXNzKSB7XG4gICAgaWYgKGNlbGxzW3hdW3ldICE9PSBcInNoaXBcIikge1xuICAgICAgY2VsbHNbeF1beV0gPSBcIm1pc3NcIjtcbiAgICB9XG4gIH1cbiAgLy8gQ3JlYXRlIGEgY29udGFpbmVyIGZvciB0aGUgZ3JpZFxuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdyaWRzLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgLy8gQ3JlYXRlIGJ1dHRvbnMgZm9yIGVhY2ggY2VsbFxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF07XG4gICAgYnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIGlmIChjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09IFwiaGl0XCIpIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJ0YXJnZXQtZG90XCIpO1xuICAgICAgZG90LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9IGVsc2UgaWYgKGNlbGxzW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJtaXNzZWQtc3RyaWtlXCIpO1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGRvdCk7XG4gICAgfSBlbHNlIGlmIChjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09IFwic2hpcFwiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cbiAgICBncmlkcy5hcHBlbmRDaGlsZChidXR0b24pO1xuICB9XG4gIHJldHVybiBncmlkcztcbn1cbi8vZHJhdyAxMCBYIDEwIGJvYXJkXG5mdW5jdGlvbiBkcmF3R3JpZHMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICByZXR1cm4gZ3JpZDtcbn1cbmV4cG9ydCB7IGZpcnN0Qm9hcmQsIHN0cmlrZUJvYXJkLCBkcmF3R3JpZHMgfTtcbiIsImltcG9ydCB7IFBsYXllciwgY29tcHV0ZXJNb3ZlIH0gZnJvbSBcIi4vdXRpbGl0eS5qc1wiO1xuaW1wb3J0IHsgc3RyaWtlQm9hcmQsIGZpcnN0Qm9hcmQsIGRyYXdHcmlkcyB9IGZyb20gXCIuL2JvYXJkLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHtcbiAgZHJhZ1NoaXBzLFxuICByYW5kb21seVBsYWNlU2hpcHMsXG59IGZyb20gXCIuL3BsYWNlLXNoaXAtcGFnZS9zaGlwLXBvc2l0aW9uLmpzXCI7XG5cbmxldCBjb3VudCA9IDM7XG5sZXQgd2lubmVyTXNnID0gW107XG4vKlxuKkdhbWVGbG93IC0gb2JqZWN0IHRoYXQgaGFzIDMgbWV0aG9kcyBvbmUgdG8gY2hhbmdlIHBsYXllciB0dXJuLHNlY29uZCB0byBjcmVhdGUgYm9hcmQgdXNpbmcgcGxheWVyIGluZm8sIFxuKiAgICAgICAgICAgdGhpcmQgdG8gdXBkYXRlIGJvYXJkIHN0YXRlXG4qR2FtZUZsb3coKS5wcmludEJvYXJkKHBsYXllcikgLSBkcmF3IGJvYXJkIHVzaW5nIHBsYXllciBoaXQsbWlzcyBhbmQgc2hpcCBwb3NpdGlvbiBhcnJheSxcbiByZXR1cm4gMTAgeCAxMCBib2FyZCBvbmUgd2l0aCBzaGlwIHNob3duLCB0aGUgb3RoZXIgd2l0aG91dCB0aGUgc2hpcCB1bmxlc3MgaXQgaGl0IHRvIHNob3cgdGhlIG9wcG9uZW50IHN0cmlraW5nIHN0YXRlIG9uIHRoZSBib2FyZC4gXG4qL1xuXG5mdW5jdGlvbiBHYW1lRmxvdyhwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICBsZXQgaXNHYW1lRW5kID0gZmFsc2U7XG4gIGNvbnN0IHBsYXllcnMgPSBbcGxheWVyT25lLCBwbGF5ZXJUd29dO1xuICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyc1swXTtcbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcbiAgICBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0gPyBwbGF5ZXJzWzFdIDogcGxheWVyc1swXTtcbiAgfTtcbiAgY29uc3QgZ2V0UGxheWVyID0gKCkgPT4gYWN0aXZlUGxheWVyO1xuICBjb25zdCBwcmludEJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllciA9IGdldFBsYXllcigpO1xuICAgIGNvbnN0IG1pc3NTdHJpa2VzID0gcGxheWVyLmJvYXJkLm1pc3NlZFNob3RzO1xuICAgIGNvbnN0IGhpdFN0cmlrZXMgPSBwbGF5ZXIuYm9hcmQuaGl0U2hvdHM7XG4gICAgY29uc3QgYWxsVGhlU2hpcHMgPSBwbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnM7XG4gICAgY29uc3Qgc2hpcEJvYXJkU3RhdGUgPSBmaXJzdEJvYXJkKGFsbFRoZVNoaXBzLCBoaXRTdHJpa2VzLCBtaXNzU3RyaWtlcyk7XG4gICAgY29uc3Qgc3RyaWtlQm9hcmRTdGF0ZSA9IHN0cmlrZUJvYXJkKGFsbFRoZVNoaXBzLCBoaXRTdHJpa2VzLCBtaXNzU3RyaWtlcyk7XG4gICAgY29uc3QgdXBkYXRlU3Vua1NoaXAgPSBwbGF5ZXIuYm9hcmQuc3Vua1NoaXBzKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNoaXBCb2FyZFN0YXRlLFxuICAgICAgc3RyaWtlQm9hcmRTdGF0ZSxcbiAgICAgIHVwZGF0ZVN1bmtTaGlwLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgcHJpbnROZXdCb2FyZCA9ICgpID0+IHtcbiAgICAvL2RyYXcgY3VycmVudCBwbGF5ZXIgYm9hcmQgc3RhdGUgdXNpbmcgb3Bwb25lbnQgaGl0IGFuZCBtaXNzXG4gICAgLy90aGVuIGRyYXcgc3RyaWtpbmcgYm9hcmQgdXNpbmcgY3VycmVudCBwbGF5ZXIgaGl0IGFuZCBtaXNzIG9uIG9wcG9uZW50IGJvYXJkXG4gICAgY2hhbmdlVHVybigpO1xuICAgIGNvbnN0IG9wcG9uZW50TmFtZSA9IGdldFBsYXllcigpLm5hbWU7XG4gICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXJTaGlwU3RhdGUgPSBwcmludEJvYXJkKGdldFBsYXllcigpKS51cGRhdGVTdW5rU2hpcDtcbiAgICBjb25zdCBvcHBvbmVudFN0cmlrZUJvYXJkID0gcHJpbnRCb2FyZChnZXRQbGF5ZXIoKSkuc3RyaWtlQm9hcmRTdGF0ZTtcbiAgICBjaGFuZ2VUdXJuKCk7XG4gICAgY29uc3QgY3VycmVudFBsYXllclNoaXBCb2FyZCA9IHByaW50Qm9hcmQoZ2V0UGxheWVyKCkpLnNoaXBCb2FyZFN0YXRlO1xuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJTaGlwU3RhdGUgPSBwcmludEJvYXJkKGdldFBsYXllcigpKS51cGRhdGVTdW5rU2hpcDtcbiAgICBjb25zdCBjdXJyZW50UGxheWVyTmFtZSA9IGdldFBsYXllcigpLm5hbWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wcG9uZW50TmFtZSxcbiAgICAgIGN1cnJlbnRQbGF5ZXJOYW1lLFxuICAgICAgY3VycmVudFBsYXllclNoaXBCb2FyZCxcbiAgICAgIG9wcG9uZW50U3RyaWtlQm9hcmQsXG4gICAgICBvcHBvbmVudFBsYXllclNoaXBTdGF0ZSxcbiAgICAgIGN1cnJlbnRQbGF5ZXJTaGlwU3RhdGUsXG4gICAgfTtcbiAgfTtcbiAgY29uc3QgcGxheWVyUm91bmQgPSAocGxheWVyLCBjbGlja2VkTnVtKSA9PiB7XG4gICAgaWYgKGlzR2FtZUVuZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb29yZGluYXRlID0gcGxheWVyLmJvYXJkLmNvb3JkaW5hdGVzSGFzaE1hcC5nZXQoTnVtYmVyKGNsaWNrZWROdW0pKTtcbiAgICAvL2F0dGFjayBvcHBvbmVudCBib2FyZCBieSBjaGFuZ2luZyB0dXJuIHRvIGd0IG9wcG9uZW50IGJvYXJkXG4gICAgY2hhbmdlVHVybigpO1xuICAgIGdldFBsYXllcigpLmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZSk7XG4gICAgZGVjbGFyZVdpbm5lcihnZXRQbGF5ZXIoKSk7XG4gICAgY2hhbmdlVHVybigpO1xuICAgIGRlY2xhcmVXaW5uZXIocGxheWVyKTtcbiAgICBwcmludE5ld0JvYXJkKCk7XG4gICAgLy9hbm5vdW5jZSB3aW5uZXIgaWYgaXQgZm91bmRcbiAgICBpZiAod2lubmVyTXNnLmxlbmd0aCA+IDApIHtcbiAgICAgIHdpbm5lck1vZGFsKHdpbm5lck1zZy5wb3AoKSk7XG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5uZXItbW9kYWxdXCIpO1xuICAgICAgbW9kYWwuc2hvd01vZGFsKCk7XG4gICAgICBpc0dhbWVFbmQgPSB0cnVlO1xuICAgICAgcGxheWVyT25lID0gbnVsbDtcbiAgICAgIHBsYXllclR3byA9IG51bGw7XG4gICAgICB3aW5uZXJNc2cgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlVHVybigpO1xuICAgIH1cbiAgICAvL3N0b3JlIHdpbm5lciBtZXNzYWdlIHdoZW4gc3RhdGUgY2hhbmdlIGluIHRoZSBhYm92ZSB3aGVuIHdlIGNoYW5nZSB0dXJuc1xuICAgIGZ1bmN0aW9uIGRlY2xhcmVXaW5uZXIocGxheWVyKSB7XG4gICAgICBpZiAod2lubmVyKHBsYXllcikgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbm5lck1zZy5wdXNoKHdpbm5lcihwbGF5ZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9mdW5jdGlvbiByZXR1cm4gc3RyaW5nIHRvIGRlY2xhcmUgd2hvIHdvbiBhbmQgbG9zdCBpZiB0aGUgZ2FtZSBlbmRcbiAgICBmdW5jdGlvbiB3aW5uZXIocGxheWVyKSB7XG4gICAgICAvLyBnYW1lIGVuZHMgd2hlbiBwbGF5ZXIgbWV0aG9kIGlzU3VuaygpIHJldHVybiB0cnVlXG4gICAgICBjb25zdCBmaXJzdFBsYXllclN1bmtTaGlwcyA9IHBsYXllck9uZS5ib2FyZC5pc1N1bmsoKTtcbiAgICAgIGNvbnN0IHNlY29uZFBsYXllclN1bmtTaGlwcyA9IHBsYXllclR3by5ib2FyZC5pc1N1bmsoKTtcbiAgICAgIGNvbnN0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmUubmFtZTtcbiAgICAgIGNvbnN0IHBsYXllclR3b05hbWUgPSBwbGF5ZXJUd28ubmFtZTtcbiAgICAgIGxldCBtc2c7XG4gICAgICBpZiAoZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPT09IGZhbHNlICYmIHNlY29uZFBsYXllclN1bmtTaGlwcyA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybiBtc2c7XG4gICAgICBlbHNlIGlmIChmaXJzdFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJiBwbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lTmFtZSkge1xuICAgICAgICBtc2cgPSBgJHtwbGF5ZXJUd29OYW1lfSB3b24g8J+OiWA7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaXJzdFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJlxuICAgICAgICBwbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lTmFtZVxuICAgICAgKSB7XG4gICAgICAgIG1zZyA9IGAke3BsYXllck9uZU5hbWV9IGxvc3RgO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc2Vjb25kUGxheWVyU3Vua1NoaXBzID09PSB0cnVlICYmXG4gICAgICAgIHBsYXllci5uYW1lID09PSBwbGF5ZXJPbmVOYW1lXG4gICAgICApIHtcbiAgICAgICAgbXNnID0gYCR7cGxheWVyT25lTmFtZX0gd29uIPCfjolgO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc2Vjb25kUGxheWVyU3Vua1NoaXBzID09PSB0cnVlICYmXG4gICAgICAgIHBsYXllci5uYW1lID09PSBwbGF5ZXJUd29OYW1lXG4gICAgICApIHtcbiAgICAgICAgbXNnID0gYCR7cGxheWVyVHdvTmFtZX0gbG9zdGA7XG4gICAgICB9XG4gICAgICByZXR1cm4gbXNnO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldFBsYXllcixcbiAgICBwbGF5ZXJSb3VuZCxcbiAgICBwcmludE5ld0JvYXJkLFxuICAgIGlzR2FtZUVuZCxcbiAgfTtcbn1cbi8vIGZ1bmN0aW9uIHRoYXQgdXBkYXRlIHRoZSBzY3JlZW4gdXNpbmcgZ2FtZSBmbG93IGZ1bmN0aW9uXG5mdW5jdGlvbiBzY3JlZW5Db250cm9sbGVyKHBsYXllck9uZSwgcGxheWVyVHdvLCBzb2xvUGxheWVyLCBpc0dhbWVFbmQpIHtcbiAgY29uc3QgZ2FtZSA9IEdhbWVGbG93KHBsYXllck9uZSwgcGxheWVyVHdvLCBpc0dhbWVFbmQpO1xuICBjb25zdCB0dXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItdHVyblwiKTtcbiAgY29uc3QgcGxheWVyT25lU2hpcHNCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtb25lXCIpO1xuICBjb25zdCBwbGF5ZXJPbmVTdHJpa2VCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtdHdvXCIpO1xuICBjb25zdCBmaXJzdFBsYXllclNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItb25lLW1pbmktc2hpcHNcIik7XG4gIGNvbnN0IHNlY29uZFBsYXllclNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItdHdvLW1pbmktc2hpcHNcIik7XG4gIGZpcnN0UGxheWVyU2hpcHMudGV4dENvbnRlbnQgPSBcIlwiO1xuICBzZWNvbmRQbGF5ZXJTaGlwcy50ZXh0Q29udGVudCA9IFwiXCI7XG4gIC8vY29uc3QgcGxheWVyT25lRmlyc3RDaGFyID0gcGxheWVyT25lLm5hbWUuY2hhckF0KDApO1xuICAvL2NvbnN0IHBsYXllclR3b0ZpcnN0Q2hhciA9IHBsYXllclR3by5uYW1lLmNoYXJBdCgwKTtcblxuICBjb25zdCB1cGRhdGVTY3JlZW4gPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyT25lRmlyc3RDaGFyID0gcGxheWVyT25lLm5hbWUuY2hhckF0KDApO1xuICAgIGNvbnN0IHBsYXllclR3b0ZpcnN0Q2hhciA9IHBsYXllclR3by5uYW1lLmNoYXJBdCgwKTtcbiAgICBpZiAoZ2FtZS5pc0dhbWVFbmQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9tZXRob2QgdG8gY2hhbmdlIGFuZCB1cGRhdGUgcGxheWVyIGZsZWV0IGJhc2VkIG9uIGN1cnJlbnQgcGxheWVyIGZvciB0aGUgbWluaSBmbGVldFxuICAgIGNvbnN0IGJ1aWxkRGFzaGJvYXJkID0gKCkgPT4ge1xuICAgICAgaWYgKGdhbWUuZ2V0UGxheWVyKCkubmFtZSA9PT0gcGxheWVyT25lLm5hbWUpIHtcbiAgICAgICAgZHJhd01pbmlTaGlwcyhmaXJzdFBsYXllclNoaXBzLCBwbGF5ZXJPbmVGaXJzdENoYXIpO1xuICAgICAgICBkcmF3TWluaVNoaXBzKHNlY29uZFBsYXllclNoaXBzLCBwbGF5ZXJUd29GaXJzdENoYXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJhd01pbmlTaGlwcyhmaXJzdFBsYXllclNoaXBzLCBwbGF5ZXJUd29GaXJzdENoYXIpO1xuICAgICAgICBkcmF3TWluaVNoaXBzKHNlY29uZFBsYXllclNoaXBzLCBwbGF5ZXJPbmVGaXJzdENoYXIpO1xuICAgICAgfVxuICAgIH07XG4gICAgYnVpbGREYXNoYm9hcmQoKTtcblxuICAgIHR1cm4udGV4dENvbnRlbnQgPSBgJHtnYW1lLmdldFBsYXllcigpLm5hbWV9J3MgdHVybmA7XG4gICAgcGxheWVyT25lU2hpcHNCb2FyZC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgcGxheWVyT25lU3RyaWtlQm9hcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgLy9ncmFiIGFsbCBtaW5pIHNoaXAgYnkgdXNpbmcgcGxheWVyIG5hbWVcbiAgICBjb25zdCBwbGF5ZXJPbmVEYXNoQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXJPbmVGaXJzdENoYXJ9YCk7XG4gICAgY29uc3QgUGxheWVyT25lTWluaVNoaXBzID1cbiAgICAgIHBsYXllck9uZURhc2hCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1pbmktc2hpcC1zaXplXCIpO1xuICAgIGNvbnN0IHBsYXllclR3b0Rhc2hCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BsYXllclR3b0ZpcnN0Q2hhcn1gKTtcbiAgICBjb25zdCBwbGF5ZXJUd29NaW5pU2hpcHMgPVxuICAgICAgcGxheWVyVHdvRGFzaEJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWluaS1zaGlwLXNpemVcIik7XG4gICAgLy91cGRhdGUgbWluaSBzaGlwcyBpZiBpdCBoaXRcbiAgICBjb25zdCBwbGF5ZXJPbmVTdW5rU2hpcHMgPSBnYW1lLnByaW50TmV3Qm9hcmQoKS5jdXJyZW50UGxheWVyU2hpcFN0YXRlO1xuICAgIGNvbnN0IHBsYXllclR3b1N1bmtTaGlwcyA9IGdhbWUucHJpbnROZXdCb2FyZCgpLm9wcG9uZW50UGxheWVyU2hpcFN0YXRlO1xuICAgIC8vbWV0aG9kIHRvIHVwZGF0ZSBzaGlwcyBiYXNlZCBvbiBjdXJyZW50IHBsYXllclxuICAgIGNvbnN0IHVwZGF0ZURhc2hCb2FyZCA9ICgpID0+IHtcbiAgICAgIGlmIChnYW1lLmdldFBsYXllci5uYW1lID09PSBwbGF5ZXJPbmUubmFtZSkge1xuICAgICAgICB1cGRhdGVNaW5pU2hpcHMoUGxheWVyT25lTWluaVNoaXBzLCBwbGF5ZXJPbmVTdW5rU2hpcHMsIFwicmVkXCIpO1xuICAgICAgICB1cGRhdGVNaW5pU2hpcHMocGxheWVyVHdvTWluaVNoaXBzLCBwbGF5ZXJUd29TdW5rU2hpcHMsIFwicmVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlTWluaVNoaXBzKFBsYXllck9uZU1pbmlTaGlwcywgcGxheWVyT25lU3Vua1NoaXBzLCBcInJlZFwiKTtcbiAgICAgICAgdXBkYXRlTWluaVNoaXBzKHBsYXllclR3b01pbmlTaGlwcywgcGxheWVyVHdvU3Vua1NoaXBzLCBcInJlZFwiKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHVwZGF0ZURhc2hCb2FyZCgpO1xuICAgIC8vdXBkYXRlIHRoZSBib2FyZHNcbiAgICBwbGF5ZXJPbmVTaGlwc0JvYXJkLmFwcGVuZENoaWxkKFxuICAgICAgZ2FtZS5wcmludE5ld0JvYXJkKCkuY3VycmVudFBsYXllclNoaXBCb2FyZFxuICAgICk7XG4gICAgcGxheWVyT25lU3RyaWtlQm9hcmQuYXBwZW5kQ2hpbGQoZ2FtZS5wcmludE5ld0JvYXJkKCkub3Bwb25lbnRTdHJpa2VCb2FyZCk7XG4gICAgaWYgKHNvbG9QbGF5ZXIgPT09IGZhbHNlKSB7XG4gICAgICBjb3VudGRvd25Nb2RhbChgUGFzcyB0aGUgZGV2aWNlIHRvICR7Z2FtZS5nZXRQbGF5ZXIoKS5uYW1lfWApO1xuICAgIH1cbiAgICBmaXhUeXBvKHBsYXllck9uZS5uYW1lLCBwbGF5ZXJUd28ubmFtZSk7XG4gIH07XG4gIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgY29uc3QgcGxheWVyID0gZ2FtZS5nZXRQbGF5ZXIoKTtcbiAgICBnYW1lLnBsYXllclJvdW5kKHBsYXllciwgZSk7XG4gICAgdXBkYXRlU2NyZWVuKCk7XG4gIH1cblxuICBwbGF5ZXJPbmVTdHJpa2VCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgY29uc3QgcGxheWVyID0gZ2FtZS5nZXRQbGF5ZXIoKTtcbiAgICAvL2NoZWNrIGNsaWNrZWQgY2VsbCBpcyBmcmVlXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQgfHwgZS50YXJnZXQuaGFzQ2hpbGROb2RlcygpID09PSB0cnVlKSByZXR1cm47XG4gICAgY2xpY2tIYW5kbGVyKGluZGV4KTtcbiAgICB1cGRhdGVTY3JlZW4oKTtcbiAgICAvL2ZvciBzb2xvIHBsYXllclxuICAgIGlmIChcbiAgICAgIHBsYXllci5uYW1lICE9PSBcImFpXCIgJiZcbiAgICAgIHBsYXllci5uYW1lID09PSBcInlvdVwiICYmXG4gICAgICBlLnRhcmdldC5oYXNDaGlsZE5vZGVzKCkgIT09IHRydWVcbiAgICApIHtcbiAgICAgIGdhbWUucGxheWVyUm91bmQocGxheWVyLCBjb21wdXRlck1vdmUocGxheWVyKSk7XG4gICAgICB1cGRhdGVTY3JlZW4oKTtcbiAgICB9XG4gIH0pO1xuICAvL2luaXRpYWwgcmVuZGVyXG4gIHVwZGF0ZVNjcmVlbigpO1xufVxuLy9pbnRybyBwYWdlXG5mdW5jdGlvbiBpbnRyb1BhZ2UoKSB7XG4gIGNvbnN0IHBhZ2VIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwYWdlSG9sZGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaW50cm8tcGFnZVwiKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaGVhZGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibG9nby1ob2xkZXJcIik7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlU2hpcFwiO1xuXG4gIGNvbnN0IGJ0bkhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ0bkhvbGRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImdhbWUtb3B0aW9uc1wiKTtcbiAgY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc2luZ2xlUGxheWVyQnRuLnRleHRDb250ZW50ID0gXCJzaW5nbGUtcGxheWVyXCI7XG4gIHNpbmdsZVBsYXllckJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNpbmdsZS1wbGF5ZXItYnRuXCIpO1xuICBzaW5nbGVQbGF5ZXJCdG4uY2xhc3NMaXN0LmFkZChcImdhbWUtb3B0aW9uLWJ0bnNcIik7XG4gIGNvbnN0IG11bHRpUGxheWVyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbXVsdGlQbGF5ZXJCdG4udGV4dENvbnRlbnQgPSBcIllvdSB2cyBGcmllbmRcIjtcbiAgbXVsdGlQbGF5ZXJCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtdWx0aS1wbGF5ZXJzLWJ0blwiKTtcbiAgbXVsdGlQbGF5ZXJCdG4uY2xhc3NMaXN0LmFkZChcImdhbWUtb3B0aW9uLWJ0bnNcIik7XG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIGJ0bkhvbGRlci5hcHBlbmRDaGlsZChzaW5nbGVQbGF5ZXJCdG4pO1xuICBidG5Ib2xkZXIuYXBwZW5kQ2hpbGQobXVsdGlQbGF5ZXJCdG4pO1xuICBwYWdlSG9sZGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIHBhZ2VIb2xkZXIuYXBwZW5kQ2hpbGQoYnRuSG9sZGVyKTtcbiAgcmV0dXJuIHBhZ2VIb2xkZXI7XG59XG5cbmZ1bmN0aW9uIGRyYXdGaXJzdFBhZ2UoKSB7XG4gIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcGFnZS1jb250YWluZXJdXCIpO1xuICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGludHJvUGFnZSgpKTtcbiAgY29uc3QgbG9nb0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9nby1ob2xkZXJcIik7XG4gIGNvbnN0IHRpdHRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdGl0dGxlLmNsYXNzTGlzdC5hZGQoXCJsb2dvXCIpO1xuICAgIGxvZ29EaXYuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcbiAgfSwgMCk7XG59XG4vL2RyYXcgc2hpcCBwbGFjZW1lbnQgcGFnZVxuZnVuY3Rpb24gdGVtcGxhdGVTaGlwR3JpZCgpIHtcbiAgY29uc3Qgc2Vjb25kUGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHN0cmF0ZWd5Qm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzdHJhdGVneUJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250YWluZXJcIik7XG4gIHN0cmF0ZWd5Qm9hcmQuYXBwZW5kQ2hpbGQoZHJhd0dyaWRzKCkpO1xuICBjb25zdCBidG5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdGVtcGxhdGUgPSBgXG4gIDxkaXYgY2xhc3M9XCJzaGlwcy1jb250YWluZXJcIiBkYXRhLXNoaXBzLWNvbnRhaW5lcj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGxhY2Utc2hpcHMtYnRuc1wiPlxuICAgIDxidXR0b25cbiAgICAgIGFyaWEtbGFiZWw9XCJwbGFjZSBzaGlwcyBieSBkcmFnZ2luZ1wiXG4gICAgICBjbGFzcz1cImRyYWctYnRuXCJcbiAgICAgIGRhdGEtZHJvcC1idG5cbiAgICA+XG4gICAgICBEcmFnICYgRHJvcCBzaGlwc1xuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b25cbiAgICAgIGFyaWEtbGFiZWw9XCJwbGFjZSBzaGlwcyByYW5kb21seVwiXG4gICAgICBjbGFzcz1cInJhbmRvbWl6ZS1idG5cIlxuICAgICAgZGF0YS1yYW5kb20tYnRuXG4gICAgPlxuICAgICAgUmFuZG9taXplXG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInBsYXktYnRuXCI+UGxheTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuIGA7XG4gIGJ0bnMuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gIHNlY29uZFBhZ2UuYXBwZW5kQ2hpbGQoc3RyYXRlZ3lCb2FyZCk7XG4gIHNlY29uZFBhZ2UuYXBwZW5kQ2hpbGQoYnRucyk7XG4gIHJldHVybiBzZWNvbmRQYWdlO1xufVxuLy9mdW5jdGlvbiB0byBhdHRhY2ggc2hpcCB0ZW1wbGF0ZSB0byBkb21cbmZ1bmN0aW9uIHNoaXBzUGxhY2VtZW50KGVsZW1lbnQpIHtcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGVtcGxhdGVTaGlwR3JpZCgpKTtcbn1cbi8vXG5mdW5jdGlvbiByYW5kb21QbGFjZW1lbnQobmV3UGxheWVyKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtY29udGFpbmVyXCIpO1xuICBjb25zdCBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5LWJ0blwiKTtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2hpcHMtY29udGFpbmVyXVwiKTtcbiAgc2hpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBpZiAobmV3UGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IHNldFNoaXBzUGxhY2UgPSByYW5kb21seVBsYWNlU2hpcHMobmV3UGxheWVyKTtcbiAgICBjb25zdCBzaGlwcyA9IG5ld1BsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucztcbiAgICBjb25zdCBoaXRzID0gbmV3UGxheWVyLmJvYXJkLmhpdFNob3RzO1xuICAgIGNvbnN0IG1pc3NlZCA9IG5ld1BsYXllci5ib2FyZC5taXNzZWRTaG90cztcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmaXJzdEJvYXJkKHNoaXBzLCBoaXRzLCBtaXNzZWQpKTtcbiAgICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qga2VlcE5hbWUgPSBuZXdQbGF5ZXIubmFtZTtcbiAgICBuZXdQbGF5ZXIgPSBudWxsO1xuICAgIG5ld1BsYXllciA9IFBsYXllcihrZWVwTmFtZSwgc2hpcHMpO1xuICAgIGNvbnN0IHNldFNoaXBzUGxhY2UgPSByYW5kb21seVBsYWNlU2hpcHMobmV3UGxheWVyKTtcbiAgICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gbmV3UGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zO1xuICAgIGNvbnN0IGhpdHMgPSBuZXdQbGF5ZXIuYm9hcmQuaGl0U2hvdHM7XG4gICAgY29uc3QgbWlzc2VkID0gbmV3UGxheWVyLmJvYXJkLm1pc3NlZFNob3RzO1xuICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZpcnN0Qm9hcmQoc2hpcHNDb29yZGluYXRlcywgaGl0cywgbWlzc2VkKSk7XG4gICAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9XG59XG4vL2NvdW50ZG93biBwYWdlIHRoYXQgYWNjZXB0IG1lc3NhZ2UgYW5kIGhpZGUgb3RoZXIgY29udGVudFxuZnVuY3Rpb24gY291bnREb3duUGFnZShtc2cpIHtcbiAgY29uc3QgcGFzc1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzcy1zY3JlZW5cIik7XG4gIGNvbnN0IHRlbXBsYXRlID0gYCBcbiAgICAgPGRpdiBjbGFzcz1cIm1zZy10ZXh0XCIgZGF0YS1tc2c+JHttc2d9PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY291bnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY291bnRlci1ib2FyZFwiIGRhdGEtY291bnQtZG93bj48L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIHBhc3NTY3JlZW4uaW5uZXJIVE1MID0gdGVtcGxhdGU7XG59XG5mdW5jdGlvbiBjb3VudGRvd25Nb2RhbChtc2cpIHtcbiAgY29uc3QgcGFzc1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzcy1zY3JlZW5cIik7XG4gIGlmIChjb3VudCA8IDApIHtcbiAgICBjb3VudCA9IDM7XG4gIH1cbiAgY291bnREb3duUGFnZShtc2cpO1xuICBjb3VudGRvd24oKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUNvdW50ZG93blVJKCkge1xuICBjb25zdCBwYXNzU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzLXNjcmVlblwiKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvdW50LWRvd25dXCIpLnRleHRDb250ZW50ID0gY291bnQ7XG4gIGlmIChjb3VudCA9PT0gMCkge1xuICAgIHBhc3NTY3JlZW4udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHBhc3NTY3JlZW4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9IGVsc2Uge1xuICAgIHBhc3NTY3JlZW4uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvdW50ZG93bigpIHtcbiAgaWYgKGNvdW50ID49IDApIHtcbiAgICB1cGRhdGVDb3VudGRvd25VSSgpO1xuICAgIGNvdW50LS07XG4gICAgc2V0VGltZW91dChjb3VudGRvd24sIDEwMDApO1xuICB9XG59XG4vL2Z1bmN0aW9uIHRvIGRyYXcgbWluaSBzaGlwcyB0byBzaG93IHNoaXAgIHN1bmsgc3RhdGUgYnkgY3JlYXRpbmcgY2xhc3MgbmFtZSB1c2luZyBwbGF5ZXIgbmFtZSB0byB1cGRhdGVcbmZ1bmN0aW9uIGRyYXdNaW5pU2hpcHMoZWxlLCBwbGF5ZXIpIHtcbiAgY29uc3QgbWluaUZsZWV0cyA9IGBcbiAgPGRpdiBjbGFzcz1cImZsZWV0LWhvbGRlciAke3BsYXllcn1cIj5cbiAgICA8ZGl2IGNsYXNzPVwibWluaS1zaGlwLW93bmVyXCI+JHtwbGF5ZXJ9PC9kaXY+XG48ZGl2IGNsYXNzPVwibWluaS1jYXJyaWVyICBtaW5pLXNoaXAtc2l6ZVwiIGRhdGEtbmFtZT0nY2Fycmllcic+PC9kaXY+XG48ZGl2IGNsYXNzPVwibWluaS1iYXR0bGVTaGlwICBtaW5pLXNoaXAtc2l6ZVwiIGRhdGEtbmFtZT0nYmF0dGxlU2hpcCc+PC9kaXY+XG48ZGl2IGNsYXNzPVwic2FtZS1zaXplLXNoaXBzXCI+XG4gIDxkaXYgY2xhc3M9XCJtaW5pLWRlc3Ryb3llciAgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J2Rlc3Ryb3llcic+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtaW5pLXN1Ym1hcmluZSBtaW5pLXNoaXAtc2l6ZVwiIGRhdGEtbmFtZT0nc3VibWFyaW5lJz48L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cIm1pbmktcGF0cm9sIG1pbmktc2hpcC1zaXplXCIgZGF0YS1uYW1lPSdwYXRyb2wnPjwvZGl2PlxuPC9kaXY+YDtcbiAgZWxlLmlubmVySFRNTCA9IG1pbmlGbGVldHM7XG59XG4vL2Z1bmN0aW9uIGFjY2VwdCBtaW5pIHNoaXBzIGRpdnMsIHN1bmsgc2hpcCBuYW1lcyBhcyBhbiBhcnJheSBhbmQgY2hhbmdlIGNvbG9yIG9mIGRpdnMgdXNpbmcgZGF0YXNldCBzYW1lIGFzIHNoaXAgbmFtZVxuXG5mdW5jdGlvbiB1cGRhdGVNaW5pU2hpcHMoc2hpcHNEaXYsIHN1bmtTaGlwQXJyYXksIGNvbG9yKSB7XG4gIGlmIChzdW5rU2hpcEFycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICBzaGlwc0Rpdi5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc3Vua1NoaXBBcnJheS5mb3JFYWNoKChzdW5rU2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuZGF0YXNldC5uYW1lID09PSBzdW5rU2hpcCkge1xuICAgICAgICBzaGlwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGAke2NvbG9yfWA7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gd2lubmVyTW9kYWwobXNnKSB7XG4gIGNvbnN0IHdpbm5lckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5uZXJdXCIpO1xuICBjb25zdCBob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0ZW1wbGF0ZSA9IGAgIDxkaWFsb2cgZGF0YS13aW5uZXItbW9kYWwgY2xhc3M9XCJ3aW5uZXItbW9kYWxcIj5cbiAgPGRpdiBjbGFzcz1cIndpbm5lci1ob2xkZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwid2lubmVyLWJvYXJkXCIgZGF0YS13aW5uZXI+JHttc2d9PC9kaXY+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInJlbWF0Y2gtYnRuXCIgZGF0YS1yZW1hdGNoLWJ0bj5SZW1hdGNoPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaWFsb2c+YDtcbiAgd2lubmVyRGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgaG9sZGVyLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQoaG9sZGVyKTtcbn1cblxuLy9mb3JtIHRvIGFjY2VwdCBwbGF5ZXJzIG5hbWVcbmZ1bmN0aW9uIGZvcm1UZW1wbGF0ZShlbGUpIHtcbiAgY29uc3QgdGVtcGxhdGUgPSBgIDxmb3JtIGZvcj1cInBsYXllci1uYW1lXCI+XG48ZGl2IGNsYXNzPVwiaW5wdXQtaG9sZGVyXCI+XG4gIDxpbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBpZD1cInBsYXllci1vbmUtbmFtZVwiXG4gICAgY2xhc3M9XCJwbGF5ZXItbmFtZS1pbnB1dFwiXG4gICAgZGF0YS1wbGF5ZXItb25lXG4gICAgcmVxdWlyZWRcbiAgLz5cbiAgPGxhYmVsIGZvcj1cInBsYXllci1vbmUtbmFtZVwiIGNsYXNzPVwicGxheWVyLW9uZS1sYWJlbFwiXG4gICAgPlBsYXllci1PbmUtTmFtZTo8L2xhYmVsXG4gID5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImlucHV0LWhvbGRlclwiPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgaWQ9XCJwbGF5ZXItdHdvLW5hbWVcIlxuICAgIGNsYXNzPVwicGxheWVyLW5hbWUtaW5wdXRcIlxuICAgIGRhdGEtcGxheWVyLXR3b1xuICAgIHJlcXVpcmVkXG4gIC8+XG4gIDxsYWJlbCBmb3I9XCJwbGF5ZXItdHdvLW5hbWVcIiBjbGFzcz1cInBsYXllci10d28tbGFiZWxcIiBkYXRhLXBsYXllclR3b1xuICAgID5QbGF5ZXIgVHdvIE5hbWU6PC9sYWJlbFxuICA+XG48L2Rpdj5cbjxidXR0b24gZGF0YS1zdWJtaXQtbmFtZSBjbGFzcz1cInN1Ym1pdC1idG5cIiA+U3RhcnQ8L2J1dHRvbj5cbjwvZm9ybT5gO1xuICBlbGUuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG59XG5cbi8vZml4IGdyYW1tZXJcbmZ1bmN0aW9uIGZpeFR5cG8ocGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZSkge1xuICBjb25zdCBtaW5pU2hpcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5taW5pLXNoaXAtb3duZXJcIik7XG4gIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci10dXJuXCIpO1xuICBjb25zdCBkaXZBcnJheSA9IFsuLi5taW5pU2hpcEJvYXJkXTtcbiAgZGl2QXJyYXlbMF0uc3R5bGUuY29sb3IgPSBcIiMwMGZmM2VcIjtcbiAgZGl2QXJyYXlbMV0uc3R5bGUuY29sb3IgPSBcIiMxZmQxY2VcIjtcbiAgaWYgKGRpdkFycmF5WzBdLnRleHRDb250ZW50ICE9PSBcInlvdVwiKSB7XG4gICAgZGl2QXJyYXlbMF0udGV4dENvbnRlbnQgPSBgJHtwbGF5ZXJPbmVOYW1lfSdzIGZsZWV0YDtcbiAgICBkaXZBcnJheVsxXS50ZXh0Q29udGVudCA9IGAke3BsYXllclR3b05hbWV9J3MgZmxlZXRgO1xuICB9IGVsc2Uge1xuICAgIGRpdkFycmF5WzBdLnRleHRDb250ZW50ID0gYCR7cGxheWVyT25lTmFtZX0ncmUgZmxlZXRgO1xuICAgIGRpdkFycmF5WzFdLnRleHRDb250ZW50ID0gYCR7cGxheWVyVHdvTmFtZX0ncyBmbGVldGA7XG4gICAgdHVybi50ZXh0Q29udGVudCA9IGBZb3UncmUgdHVybmA7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgc2NyZWVuQ29udHJvbGxlcixcbiAgdGVtcGxhdGVTaGlwR3JpZCxcbiAgc2hpcHNQbGFjZW1lbnQsXG4gIGRyYWdTaGlwcyxcbiAgY291bnRkb3duTW9kYWwsXG4gIHJhbmRvbVBsYWNlbWVudCxcbiAgZHJhd0ZpcnN0UGFnZSxcbiAgaW50cm9QYWdlLFxuICBmb3JtVGVtcGxhdGUsXG59O1xuIiwiaW1wb3J0IHsgR2FtZUJvYXJkLCBTaGlwIH0gZnJvbSBcIi4uL3V0aWxpdHlcIjtcbmZ1bmN0aW9uIHJlUG9zaXRpb24ocGxheWVyLCBzaGlwc0FycmF5LCBzaGlwKSB7XG4gIC8vaWYgdGhlIHNoaXAgaXMgbGVuZ3RoIDIgYnV0cyBpdCdzIHBvc2l0aW9uIHByb3BlcnR5XG4gIC8vIGNvbnRhaW4gbW9yZSB0aGFuIDIgY29vcmRpbmF0ZSByZW1vdmUgdGhvc2UgZXhjZXB0IHRoZSBsYXN0IHR3byBhbmQgdXBkYXRlXG4gIGNvbnN0IGFsbFNoaXBQb3NpdGlvbnMgPSBwbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnM7XG4gIGNvbnN0IGNlbGxzVG9SZW1vdmVkID0gc2hpcHNBcnJheS5zbGljZSgwLCBzaGlwc0FycmF5Lmxlbmd0aCAtIHNoaXAubGVuZ3RoKTtcbiAgY2VsbHNUb1JlbW92ZWQuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGFsbFNoaXBQb3NpdGlvbnMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKGNvb3JkaW5hdGUudG9TdHJpbmcoKSA9PT0gY2VsbC50b1N0cmluZygpKSB7XG4gICAgICAgIC8vdXBkYXRlIG9ialxuICAgICAgICBhbGxTaGlwUG9zaXRpb25zLnNwbGljZShhbGxTaGlwUG9zaXRpb25zLmluZGV4T2YoY29vcmRpbmF0ZSksIDEpO1xuICAgICAgICBzaGlwc0FycmF5LnNwbGljZShzaGlwc0FycmF5LmluZGV4T2YoY2VsbCksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHBsYWNlUGxheWVyU2hpcEhvcml6b250YWwocGxheWVyLCBpbmRleCwgc2hpcCkge1xuICBjb25zdCBjb29yZGluYXRlcyA9IHBsYXllci5ib2FyZC5jb29yZGluYXRlc0hhc2hNYXA7XG4gIGNvbnN0IGNvbnZlcnRJbmRleCA9IGNvb3JkaW5hdGVzLmdldChOdW1iZXIoaW5kZXgpKTtcbiAgY29uc3Qgc2hpcENlbGxzID0gcGxheWVyLmJvYXJkLnBsYWNlVmVydGljYWwoY29udmVydEluZGV4LCBzaGlwKTtcbiAgY29uc3QgdGFrZW5DZWxscyA9IHNoaXAucG9zaXRpb25zO1xuICBpZiAoc2hpcC5wb3NpdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgLy9vY2N1cGllZCByZXR1cm4gbnVsbFxuICAgIGlmIChzaGlwQ2VsbHMgPT09IG51bGwpIHtcbiAgICAgIHBsYXllci5ib2FyZC5wbGFjZVJhbmRvbShzaGlwKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVQb3NpdGlvbihwbGF5ZXIsIHRha2VuQ2VsbHMsIHNoaXApO1xuICB9XG59XG5mdW5jdGlvbiBwbGFjZVBsYXllclNoaXBWZXJ0aWNhbChwbGF5ZXIsIGluZGV4LCBzaGlwKSB7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gcGxheWVyLmJvYXJkLmNvb3JkaW5hdGVzSGFzaE1hcDtcbiAgY29uc3QgY29udmVydEluZGV4ID0gY29vcmRpbmF0ZXMuZ2V0KE51bWJlcihpbmRleCkpO1xuICBjb25zdCB0YWtlbkNlbGxzID0gc2hpcC5wb3NpdGlvbnM7XG4gIGlmIChzaGlwLnBvc2l0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VIb3Jpem9udGFsKGNvbnZlcnRJbmRleCwgc2hpcCk7XG4gIH0gZWxzZSB7XG4gICAgcmVQb3NpdGlvbihwbGF5ZXIsIHRha2VuQ2VsbHMsIHNoaXApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdHcmlkcygpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdyaWQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24uZGF0YXNldC5pbmRleCA9IGk7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChidXR0b24pO1xuICB9XG4gIHJldHVybiBncmlkO1xufVxuXG5mdW5jdGlvbiBhbGxvd0Ryb3AoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5mdW5jdGlvbiBkcmFnKGUpIHtcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZS50YXJnZXQuaWQpO1xufVxuZnVuY3Rpb24gZHJvcChlLCBuZXdQbGF5ZXIpIHtcbiAgY29uc3Qgc2hpcHMgPSBuZXdQbGF5ZXIuYm9hcmQuc2hpcHNBcnJheTtcbiAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAvL2lmIHRoZSBzaGlwIGlzIG92ZXIgb24gdGhlIHRvcCBvZiBhbm90aGVyIHNoaXAgaXQgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoaW5kZXggPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XG4gICAgY29uc3QgZHJhZ2dlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpO1xuICAgIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBnZXRTaGlwRGlyZWN0aW9uQ2xhc3MoZHJhZ2dlZCwgZGF0YSk7XG4gICAgY29uc3Qgc2hpcEluZGV4ID0gd2hpY2hTaGlwQ2xpY2tlZChzaGlwcywgZGF0YSk7XG4gICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBwbGFjZVBsYXllclNoaXBIb3Jpem9udGFsKG5ld1BsYXllciwgaW5kZXgsIHNoaXBzW3NoaXBJbmRleF0pO1xuICAgIH0gZWxzZSBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICBwbGFjZVBsYXllclNoaXBWZXJ0aWNhbChuZXdQbGF5ZXIsIGluZGV4LCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gcHV0IHNoaXAgZGlyZWN0aW9uIGNsYXNzIGF0IGxhc3QgYW5kIHRvIGNoYW5nZSBpdCB0byBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG5mdW5jdGlvbiBnZXRTaGlwRGlyZWN0aW9uQ2xhc3MoZWxlbWVudCwgbmFtZSkge1xuICBjb25zdCBzaGlwTmFtZSA9IG5hbWU7XG4gIGNvbnN0IGFsbENsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgY29uc3QgZGlyZWN0aW9uQ2xhc3MgPSBhbGxDbGFzc05hbWVbYWxsQ2xhc3NOYW1lLmxlbmd0aCAtIDFdLnNwbGl0KFwiLVwiKTtcbiAgY29uc3Qgc2hpcERpcmVjdGlvbiA9IGRpcmVjdGlvbkNsYXNzWzFdO1xuICByZXR1cm4gc2hpcERpcmVjdGlvbjtcbn1cbi8vZmxpcCB0aGUgc2hpcCBkaXJlY3Rpb24gb24gY2xpY2sgaWYgaXQgaXMgdmFsaWRcbmZ1bmN0aW9uIGZsaXAoZSwgbmV3UGxheWVyKSB7XG4gIGNvbnN0IHNoaXBzID0gbmV3UGxheWVyLmJvYXJkLnNoaXBzQXJyYXk7XG4gIGNvbnN0IHNoaXAgPSBlLnRhcmdldDtcbiAgY29uc3Qgc2hpcE5hbWUgPSBlLnRhcmdldC5pZDtcbiAgY29uc3Qgc2hpcERpcmVjdGlvbiA9IGdldFNoaXBEaXJlY3Rpb25DbGFzcyhzaGlwLCBzaGlwTmFtZSk7XG4gIGNvbnN0IGluZGV4ID0gd2hpY2hTaGlwQ2xpY2tlZChzaGlwcywgc2hpcE5hbWUpO1xuXG4gIGlmIChzaGlwRGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHBvc2l0aW9uVGVtcFNoaXAoc2hpcHMsIGluZGV4LCBcInZlcnRpY2FsXCIsIG5ld1BsYXllcik7XG4gICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKGAke3NoaXBOYW1lfS1ob3Jpem9udGFsYCk7XG4gICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoYCR7c2hpcE5hbWV9LXZlcnRpY2FsYCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHBvc2l0aW9uVGVtcFNoaXAoc2hpcHMsIGluZGV4LCBcImhvcml6b250YWxcIiwgbmV3UGxheWVyKTtcbiAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoYCR7c2hpcE5hbWV9LXZlcnRpY2FsYCk7XG4gICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoYCR7c2hpcE5hbWV9LWhvcml6b250YWxgKTtcbiAgICB9XG4gIH1cblxuICAvL2Z1bmN0aW9uIGFjY2VwdCBzaGlwcyBhcnJheSwgaW5kZXggIG9mIHRoZSBzaGlwLGZsaXAgZGlyZWN0aW9uIGFuZCBwbGF5ZXIgIHRvIHJlcGxpY2F0ZSB0aGF0IHNoaXAgaW5cbiAgLy9kaWZmZXJlbnQgcG9zaXRpb25zKGRpcmVjdGlvbikgYW5kIHJldHVybiBib29sZWFuIGZvciBlYWNoIHBvc2l0aW9uIGFuZCBmbGlwIGZvciB2YWxpZCBkaXJlY3Rpb25cbiAgZnVuY3Rpb24gcG9zaXRpb25UZW1wU2hpcChzaGlwcywgaW5kZXgsIGRpcmVjdGlvbiwgcGxheWVyKSB7XG4gICAgY29uc3QgZmlyc3RDb29yZGluYXRlID0gc2hpcHNbaW5kZXhdLnBvc2l0aW9uc1swXTtcbiAgICBjb25zdCB0ZW1wU2hpcCA9IFNoaXAoc2hpcHNbaW5kZXhdLnNoaXBOYW1lLCBzaGlwc1tpbmRleF0ubGVuZ3RoKTtcbiAgICBjb25zdCB0ZW1wU2hpcHMgPSBbXTtcbiAgICB0ZW1wU2hpcHMucHVzaCh0ZW1wU2hpcCk7XG4gICAgY29uc3QgdGVtcEJvYXJkID0gR2FtZUJvYXJkKHRlbXBTaGlwKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgdGVtcEJvYXJkLnBsYWNlVmVydGljYWwoZmlyc3RDb29yZGluYXRlLCB0ZW1wU2hpcCk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgdGVtcEJvYXJkLnBsYWNlSG9yaXpvbnRhbChmaXJzdENvb3JkaW5hdGUsIHRlbXBTaGlwKTtcbiAgICB9XG4gICAgLy9jaGVjayB0aGUgbmV3IHBvc2l0aW9uIGV4Y2VwdCB0aGUgZmlyc3QgY29vcmRpbmF0ZVxuICAgIGNvbnN0IHJlc3VsdCA9IGlzQ29vcmRpbmF0ZUZyZWUoXG4gICAgICB0ZW1wU2hpcC5wb3NpdGlvbnMuc2xpY2UoMSksXG4gICAgICBwbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnNcbiAgICApO1xuICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgIC8vdXBkYXRlIHNoaXAgcG9zaXRpb24gaW4gc2hpcCBhbmQgcGxheWVyIG9iamVjdFxuICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSB0ZW1wU2hpcC5wb3NpdGlvbnM7XG4gICAgICByZW1vdmVDb29yZGluYXRlKHNoaXBzW2luZGV4XS5wb3NpdGlvbnMsIHBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucyk7XG4gICAgICBzaGlwc1tpbmRleF0ucG9zaXRpb25zID0gW107XG4gICAgICBzaGlwc1tpbmRleF0ucG9zaXRpb25zID0gbmV3UG9zaXRpb247XG4gICAgICBuZXdQb3NpdGlvbi5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIHBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5wdXNoKGNvb3JkaW5hdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbi8vZ2V0IHNwZWNpZmljIHNoaXAgZnJvbSBzaGlwcyBvYmplY3QgYXJyYXlcbmZ1bmN0aW9uIHdoaWNoU2hpcENsaWNrZWQoYXJyYXksIHNoaXBOYW1lKSB7XG4gIGxldCBpbmRleCA9IG51bGw7XG4gIGFycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBpZiAoKHNoaXAuc2hpcE5hbWUudG9TdHJpbmcoKSA9PT0gc2hpcE5hbWUudG9TdHJpbmcoKSkgPT09IHRydWUpIHtcbiAgICAgIGluZGV4ID0gYXJyYXkuaW5kZXhPZihzaGlwKTtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaW5kZXg7XG59XG4vL3JlbW92ZSBjb29yZGluYXRlIGZvciBmbGlwIHNoaXBzXG5mdW5jdGlvbiByZW1vdmVDb29yZGluYXRlKHNoaXBQb3NpdGlvbiwgdGFrZW5Qb3NpdGlvbnMpIHtcbiAgc2hpcFBvc2l0aW9uLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgdGFrZW5Qb3NpdGlvbnMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKGNvb3JkaW5hdGUudG9TdHJpbmcoKSA9PT0gcG9zaXRpb24udG9TdHJpbmcoKSkge1xuICAgICAgICB0YWtlblBvc2l0aW9ucy5zcGxpY2UodGFrZW5Qb3NpdGlvbnMuaW5kZXhPZihjb29yZGluYXRlKSwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuLy9jaGVjayB0aGUgY2VsbCBpcyBmcmVlXG5mdW5jdGlvbiBpc0Nvb3JkaW5hdGVGcmVlKHNoaXBQb3NpdGlvbiwgdGFrZW5Qb3NpdGlvbnMpIHtcbiAgbGV0IHJlc3VsdCA9IHRydWU7XG4gIHNoaXBQb3NpdGlvbi5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgdGFrZW5Qb3NpdGlvbnMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKGNlbGwudG9TdHJpbmcoKSA9PT0gY29vcmRpbmF0ZS50b1N0cmluZygpKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vZHJhdyBkcmFnZ2VkIGFuZCBkcm9wcGVkIHNoaXBzIHRvIGluaXRpYWxpemUsIGl0IHVzZSBzaGlwIG9iamVjdCBwcm9wZXJ0aWVzXG5mdW5jdGlvbiBkcmF3U2hpcHMoc2hpcHMpIHtcbiAgY29uc3QgZGl2SG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2SG9sZGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHJvcC1zaGlwc1wiKTtcbiAgZGl2SG9sZGVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3NoaXAuc2hpcE5hbWV9YCk7XG4gICAgZGl2LmRhdGFzZXQubGVuZ3RoID0gYCR7c2hpcC5sZW5ndGh9YDtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNpemVcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoYCR7c2hpcC5zaGlwTmFtZX0taG9yaXpvbnRhbGApO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICAgIGRpdkhvbGRlci5hcHBlbmRDaGlsZChkaXYpO1xuICB9KTtcbiAgcmV0dXJuIGRpdkhvbGRlcjtcbn1cblxuZnVuY3Rpb24gZHJhZ1NoaXBzKG5ld1BsYXllciwgc2hpcHMpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1jb250YWluZXJcIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNoaXBzLWNvbnRhaW5lcl1cIik7XG4gIGNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXktYnRuXCIpO1xuICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRyYXdHcmlkcygpKTtcbiAgc2hpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBzaGlwc0NvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRyYXdTaGlwcyhzaGlwcykpO1xuICBzaGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGNvbnN0IHNoaXBzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG4gIHNoaXBzRGl2LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICAgIGRyYWcoZSk7XG4gICAgfSk7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGZsaXAoZSwgbmV3UGxheWVyKTtcbiAgICB9KTtcbiAgfSk7XG4gIC8vZHJvcCB6b25lIG9yIGdyaWQgY2VsbHNcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgICBhbGxvd0Ryb3AoZSk7XG4gICAgfSk7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICBkcm9wKGUsIG5ld1BsYXllcik7XG4gICAgICBjb25zdCB0b3RhbExlbmd0aCA9IG5ld1BsYXllci5ib2FyZC5zaGlwc0FycmF5LnJlZHVjZSgodG90YWwsIHNoaXApID0+IHtcbiAgICAgICAgcmV0dXJuICh0b3RhbCArPSBzaGlwLmxlbmd0aCk7XG4gICAgICB9LCAwKTtcbiAgICAgIC8vY2hlY2sgYWxsIHNoaXAgbGVuZ3RoIHN1bSBpcyBlcXVhbCB0byB0b3RhbCBzaGlwIGRyb3BwZWQgYW5kIHVwZGF0ZSBwbGF5ZXIgb2JqZWN0XG4gICAgICBpZiAobmV3UGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA9PT0gdG90YWxMZW5ndGgpIHtcbiAgICAgICAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJhbmRvbWx5UGxhY2VTaGlwcyhwbGF5ZXIpIHtcbiAgcGxheWVyLmJvYXJkLnNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVJhbmRvbShzaGlwKTtcbiAgfSk7XG4gIHJldHVybiBwbGF5ZXI7XG59XG5leHBvcnQgeyBkcmF3R3JpZHMsIGRyYWdTaGlwcywgcmFuZG9tbHlQbGFjZVNoaXBzIH07XG4iLCIvL2ltcG9ydCB7IHNoaXBzIH0gZnJvbSBcIi4vZG9tLXN0dWZmXCI7XG5cbi8qKlxuICpzaGlwICBoYXMgbmFtZSxsZW5ndGggYW5kIGhpdHMscG9zaXRpb24gYXMgcHJvcGVydHkgYW5kIGlzU3VuayBhbmQgaGl0IGFzIG1ldGhvZFxuICpzaGlwLnBvc2l0aW9uIC0gaXMgYW4gYXJyYXkgdGhhdCBob2xkIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGlwLlxuICpzaGlwLmlzU3VuaygpIC0gdG8gY2hlY2sgdGhlIHNoaXAgaXMgc3VuayBvciBub3QgcmV0dXJuIGJvb2xlYW5cbiAqc2hpcC5oaXQoc2hpcC5oaXRzKSAtIGluY3JlYXNlIHNoaXAgaGl0cyBvbiBieSBvbmUgZWFjaCB0aW1lIGl0IGlzIGNhbGxlZC5cbiAqIEBwYXJhbSB7Kn0gc2hpcE5hbWVcbiAqIEBwYXJhbSB7Kn0gbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIFNoaXAoc2hpcE5hbWUsIGxlbmd0aCkge1xuICBjb25zdCBoaXRzID0gMDtcbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHRoaXMuaGl0cysrO1xuICB9XG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gbGVuZ3RoIDw9IHRoaXMuaGl0cyA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2hpcE5hbWUsXG4gICAgbGVuZ3RoLFxuICAgIGhpdHMsXG4gICAgcG9zaXRpb25zOiBbXSxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufVxuLyoqXG4gKiBHYW1lQm9hcmQuY3JlYXRlQm9hcmQgLSBjcmVhdGVzIGJvYXJkIHdpdGggW3gseV0gY29vcmRpbmF0ZSBiYXNlZCBvbiByb3cgYW5kIGNvbHVtbiBudW1iZXIgXG4gKiBhbmQgcmV0dXJuIGJvYXJkIGFuZCB0d28gaGFzaG1hcCB0aGF0IGNvbnRhaW4gbnVtYmVyIGFuZCBjb3JyZXNwb25kaW5nIGNvb3JkaW5hdGUoMCwgWzAsMF0pIGFuZCB0aGUgc2Vjb25kIG9uZSBpbnZlcnNlIChbMCwwXSwgMCkuXG4gKiBcbiAqIEdhbWVCb2FyZC5wb3NpdGlvbihhcnJheSxsZW5ndGgpIC0gYWNjZXB0IGNvb3JkaW5hdGVbeCwgeV0gYW5kIHNoaXAgbGVuZ3RoIHRoZW4gY2FsY3VsYXRlIHRoZSBzcGFjZSB0aGUgc2hpcCB0YWtlcyBvbiAxMCB4IDEwIGJvYXJkIGFuZCBcbiAqIHJldHVybiBhcnJheSBvZiBjb29yZGluYXRlcy5cbiAqXG4gKiBHYW1lQm9hcmQucmFuZG9tbHlQb3NpdGlvbihsZW5ndGgpIC0gYWNjZXB0IHNoaXAgbGVuZ3RoIHRoZW4gcmV0dXJuIHZlcnRpY2FsIG9yIGhvcml6b250YWwgY2VsbCBcbiAqIHRoYXQgdGhlIHNoaXAgd2lsbCB0YWtlcyBjb29yZGluYXRlcyBhcyBhbiBhcnJheSBieSBjYWxsaW5nIGl0IHNlbGYgcmVjdXJzaXZlbHkgaWYgdGhlIHBvc2l0aW9uIG9jY3VwaWVkLlxuICogXG4gKiBHYW1lQm9hcmQucGxhY2VWZXJ0aWNhbCAmJiBHYW1lQm9hcmQuIHBsYWNlSG9yaXpvbnRhbCAtIG1ldGhvZHMgdXNlIHRvIHBsYWNlIHNoaXAgbWFudWFsbHkgYnkgYWNjZXB0aW5nIGNvb3JkaW5hdGVzKFt4LHldIGFuZCBzaGlwKSByZXR1cm4gYXJyYXkgb2YgY29vcmRpbmF0ZSB0aGUgc2hpcCB3aWxsIHRha2UuXG4gKiBhbmQgdXBkYXRlIHNoaXBzIHBvc2l0aW9uIGFuZCBzdG9yZSBjb29yZGluYXRlIHRvIHRoZSBzaGlwLlxuICogIFxuICogR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sgLSBhY2NlcHQgY29vcmRpbmF0ZSBbeCx5XSAsY2hlY2sgaXQgaXMgbWlzc2VkIG9yIGhpdCBzaG90ICxyZXBvcnQgYWxsIHRoZSBzaGlwIGlzIHN1bmsgb3Igbm90IFxuICogYW5kIGNhbGwgaGl0IG9uIHNwZWNpZmljIHNoaXAgaWYgaXQgaXMgYSBoaXQuIFxuXG4gKi9cbmZ1bmN0aW9uIEdhbWVCb2FyZChzaGlwc0FycmF5KSB7XG4gIGNvbnN0IHNoaXBzUG9zaXRpb25zID0gW107XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoMTAsIDEwKTtcbiAgY29uc3QgY29vcmRpbmF0ZXNIYXNoTWFwID0gYm9hcmQuYWxsQ29vcmRpbmF0ZXM7XG4gIGNvbnN0IGludmVyc2VIYXNoTWFwID0gYm9hcmQuaW52ZXJzZUNvb3JkaW5hdGU7XG4gIGNvbnN0IG1pc3NlZFNob3RzID0gW107XG4gIGNvbnN0IGhpdFNob3RzID0gW107XG5cbiAgZnVuY3Rpb24gY3JlYXRlQm9hcmQocm93LCBjb2wpIHtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IGFsbENvb3JkaW5hdGVzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGludmVyc2VDb29yZGluYXRlID0gbmV3IE1hcCgpO1xuICAgIGxldCBrID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgICBib2FyZFtpXSA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHJvdzsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNvbDsgeSsrKSB7XG4gICAgICAgIGJvYXJkW3hdW3ldID0gW3gsIHldO1xuICAgICAgICBhbGxDb29yZGluYXRlcy5zZXQoaywgW3gsIHldKTtcbiAgICAgICAgaW52ZXJzZUNvb3JkaW5hdGUuc2V0KFt4LCB5XS50b1N0cmluZygpLCBrKTtcbiAgICAgICAgaysrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBib2FyZCwgYWxsQ29vcmRpbmF0ZXMsIGludmVyc2VDb29yZGluYXRlIH07XG4gIH1cblxuICBmdW5jdGlvbiBQb3NpdGlvbihjb29yZGluYXRlLCBzaGlwTGVuZ3RoKSB7XG4gICAgY29uc3QgaG9yaXpvbnRhbCA9IFtdO1xuICAgIGNvbnN0IHZlcnRpY2FsID0gW107XG4gICAgY29uc3QgeCA9IGNvb3JkaW5hdGVbMF07XG4gICAgY29uc3QgeSA9IGNvb3JkaW5hdGVbMV07XG4gICAgLy9beCx5XSA9IGlmIHggKyBsZW5ndGggPCBsZW5ndGhcbiAgICBpZiAoeCArIHNoaXBMZW5ndGggPCAxMCAmJiB5ICsgc2hpcExlbmd0aCA8IDEwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBob3Jpem9udGFsLnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICAgIHZlcnRpY2FsLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh4ICsgc2hpcExlbmd0aCA+PSAxMCAmJiB5ICsgc2hpcExlbmd0aCA+PSAxMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaG9yaXpvbnRhbC5wdXNoKFt4IC0gaSwgeV0pO1xuICAgICAgICB2ZXJ0aWNhbC5wdXNoKFt4LCB5IC0gaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeCArIHNoaXBMZW5ndGggPj0gMTAgJiYgeSArIHNoaXBMZW5ndGggPCAxMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaG9yaXpvbnRhbC5wdXNoKFt4IC0gaSwgeV0pO1xuICAgICAgICB2ZXJ0aWNhbC5wdXNoKFt4LCB5ICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeCArIHNoaXBMZW5ndGggPCAxMCAmJiB5ICsgc2hpcExlbmd0aCA+PSAxMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaG9yaXpvbnRhbC5wdXNoKFt4ICsgaSwgeV0pO1xuICAgICAgICB2ZXJ0aWNhbC5wdXNoKFt4LCB5IC0gaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBob3Jpem9udGFsLCB2ZXJ0aWNhbCB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbChjb29yZGluYXRlLCBzaGlwKSB7XG4gICAgY29uc3Qgc2hpcENlbGxzID0gUG9zaXRpb24oY29vcmRpbmF0ZSwgc2hpcC5sZW5ndGgpLnZlcnRpY2FsO1xuICAgIGlmIChpc0Nvb3JkaW5hdGVGcmVlKHNoaXBDZWxscywgc2hpcHNQb3NpdGlvbnMpID09PSBmYWxzZSkgcmV0dXJuIG51bGw7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwc1Bvc2l0aW9ucyk7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwLnBvc2l0aW9ucyk7XG4gICAgcmV0dXJuIHNoaXBDZWxscztcbiAgfVxuICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWwoY29vcmRpbmF0ZSwgc2hpcCkge1xuICAgIGNvbnN0IHNoaXBDZWxscyA9IFBvc2l0aW9uKGNvb3JkaW5hdGUsIHNoaXAubGVuZ3RoKS5ob3Jpem9udGFsO1xuICAgIGlmIChpc0Nvb3JkaW5hdGVGcmVlKHNoaXBDZWxscywgc2hpcHNQb3NpdGlvbnMpID09PSBmYWxzZSkgcmV0dXJuIG51bGw7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwc1Bvc2l0aW9ucyk7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwLnBvc2l0aW9ucyk7XG4gICAgcmV0dXJuIHNoaXBDZWxscztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbUZyZWVDb29yZGluYXRlKCkge1xuICAgIGNvbnN0IHJhbmRvbU51bSA9IHJhbmRvbUNlbGwoMTAwKTtcbiAgICBjb25zdCByZWxhdGVkQ29vcmRpbmF0ZSA9IGNvb3JkaW5hdGVzSGFzaE1hcC5nZXQocmFuZG9tTnVtKTtcbiAgICBpZiAoc2hpcHNQb3NpdGlvbnMuaW5jbHVkZXMocmVsYXRlZENvb3JkaW5hdGUpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJlbGF0ZWRDb29yZGluYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmFuZG9tRnJlZUNvb3JkaW5hdGUoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcmFuZG9tQ2VsbChudW0pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQ29vcmRpbmF0ZUZyZWUoc2hpcFBvc2l0aW9uLCB0YWtlblBvc2l0aW9ucykge1xuICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgIHNoaXBQb3NpdGlvbi5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICB0YWtlblBvc2l0aW9ucy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIGlmIChjZWxsLnRvU3RyaW5nKCkgPT09IGNvb3JkaW5hdGUudG9TdHJpbmcoKSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gc2hpcERpcmVjdGlvbigpIHtcbiAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLnJhbmRvbSgpID49IDAuNTtcbiAgICByZXR1cm4gcmFuZG9tTnVtID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gIH1cbiAgZnVuY3Rpb24gcGxhY2VSYW5kb20oc2hpcCkge1xuICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gcmFuZG9tbHlQb3NpdGlvbihzaGlwLmxlbmd0aCk7XG4gICAgbmV3UG9zaXRpb24uZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgc2hpcC5wb3NpdGlvbnMucHVzaChjb29yZGluYXRlKTtcbiAgICAgIHNoaXBzUG9zaXRpb25zLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld1Bvc2l0aW9uO1xuICB9XG4gIGZ1bmN0aW9uIHJhbmRvbWx5UG9zaXRpb24oc2hpcExlbmd0aCkge1xuICAgIGNvbnN0IHNpZGUgPSBzaGlwRGlyZWN0aW9uKCk7XG4gICAgaWYgKHNpZGUgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gcmFuZG9tRnJlZUNvb3JkaW5hdGUoKTtcbiAgICAgIGNvbnN0IHNwYWNlVGFrZW4gPSBQb3NpdGlvbihjb29yZGluYXRlLCBzaGlwTGVuZ3RoKS5ob3Jpem9udGFsO1xuICAgICAgY29uc3QgcmVzdWx0ID0gaXNDb29yZGluYXRlRnJlZShzcGFjZVRha2VuLCBzaGlwc1Bvc2l0aW9ucyk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNwYWNlVGFrZW47XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJhbmRvbWx5UG9zaXRpb24oc2hpcExlbmd0aCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaWRlID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSByYW5kb21GcmVlQ29vcmRpbmF0ZSgpO1xuICAgICAgY29uc3Qgc3BhY2VUYWtlbiA9IFBvc2l0aW9uKGNvb3JkaW5hdGUsIHNoaXBMZW5ndGgpLnZlcnRpY2FsO1xuICAgICAgY29uc3QgcmVzdWx0ID0gaXNDb29yZGluYXRlRnJlZShzcGFjZVRha2VuLCBzaGlwc1Bvc2l0aW9ucyk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNwYWNlVGFrZW47XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJhbmRvbWx5UG9zaXRpb24oc2hpcExlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vZnVuY3Rpb24gdG8gY29tcGFyZSBjb29yZGluYXRlIGV4aXN0IGluIGFycmF5IG9mIGNvb3JkaW5hdGVzICBieSBjaGFuZ2luZyB0aGVtIHRvIHN0cmluZyBmaXJzdCByZXR1cm4gYm9vbGVhblxuXG4gIGZ1bmN0aW9uIGNoZWNrQ29vcmRpbmF0ZShjb29yZGluYXRlLCBhcnJheSkge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBhcnJheS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgaWYgKGNvb3JkaW5hdGUudG9TdHJpbmcoKSA9PT0gcG9zaXRpb24udG9TdHJpbmcoKSkge1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gaXNIaXQoY29vcmRpbmF0ZSwgYXJyYXkpIHtcbiAgICByZXR1cm4gY2hlY2tDb29yZGluYXRlKGNvb3JkaW5hdGUsIGFycmF5KTtcbiAgfVxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpIHtcbiAgICBpZiAoaXNIaXQoY29vcmRpbmF0ZSwgc2hpcHNQb3NpdGlvbnMpID09PSB0cnVlKSB7XG4gICAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgaWYgKGNoZWNrQ29vcmRpbmF0ZShjb29yZGluYXRlLCBzaGlwLnBvc2l0aW9ucykgPT09IHRydWUpIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaGl0U2hvdHMucHVzaChjb29yZGluYXRlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNIaXQoY29vcmRpbmF0ZSwgc2hpcHNQb3NpdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgbWlzc2VkU2hvdHMucHVzaChjb29yZGluYXRlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBzaGlwc1Bvc2l0aW9ucy5sZW5ndGggPD0gaGl0U2hvdHMubGVuZ3RoO1xuICB9XG4gIGZ1bmN0aW9uIHR3b0RpbWVuc2lvbkFycmF5KHR3b0RpbWVuc2lvbkFycmF5LCBvbmVEaW1lbnNpb25BcnJheSkge1xuICAgIHR3b0RpbWVuc2lvbkFycmF5LmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIG9uZURpbWVuc2lvbkFycmF5LnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gc3Vua1NoaXBzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goc2hpcC5zaGlwTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxhY2VWZXJ0aWNhbCxcbiAgICBwbGFjZUhvcml6b250YWwsXG4gICAgcGxhY2VSYW5kb20sXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBpc0hpdCxcbiAgICBpc1N1bmssXG4gICAgc3Vua1NoaXBzLFxuICAgIGNvb3JkaW5hdGVzSGFzaE1hcCxcbiAgICBpbnZlcnNlSGFzaE1hcCxcbiAgICBtaXNzZWRTaG90cyxcbiAgICBoaXRTaG90cyxcbiAgICBzaGlwc1Bvc2l0aW9ucyxcbiAgICBzaGlwc0FycmF5LFxuICB9O1xufVxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgY29uc3QgY2FycmllciA9IFNoaXAoXCJjYXJyaWVyXCIsIDUpO1xuICBjb25zdCBiYXR0bGVTaGlwID0gU2hpcChcImJhdHRsZVNoaXBcIiwgNCk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoXCJkZXN0cm95ZXJcIiwgMyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoXCJzdWJtYXJpbmVcIiwgMyk7XG4gIGNvbnN0IHBhdHJvbCA9IFNoaXAoXCJwYXRyb2xcIiwgMik7XG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIHN1Ym1hcmluZSwgYmF0dGxlU2hpcCwgZGVzdHJveWVyLCBwYXRyb2xdO1xuICBjb25zdCBib2FyZCA9IEdhbWVCb2FyZChzaGlwcyk7XG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgbmFtZSxcbiAgfTtcbn1cbi8vY29tcHV0ZXIgbW92ZSBmdW5jdGlvbiB0aGF0IHJldHVybiBudW1iZXIgbm90IHBpY2tlZCBhbmQgdHJ5IGFkamFjZW50IHNsb3QgaWYgaXQgaGl0IG90aGVyIHNoaXBcbmNvbnN0IHBpY2tlZE51bSA9IFtdO1xuZnVuY3Rpb24gY29tcHV0ZXJNb3ZlKHBsYXllcikge1xuICByZXR1cm4gY29tcHV0ZXJTbG90KCk7XG4gIGZ1bmN0aW9uIGNvbXB1dGVyU2xvdCgpIHtcbiAgICBjb25zdCBuZXh0SGl0cyA9IFtdO1xuICAgIGNvbnN0IGhpdHMgPSBwbGF5ZXIuYm9hcmQuaGl0U2hvdHM7XG4gICAgbGV0IG5laWdoYm9yU2xvdHMgPSBbXTtcbiAgICBpZiAoaGl0cy5sZW5ndGggPiAwKSB7XG4gICAgICBoaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICBhZGphY2VudFNsb3QoaGl0KTtcbiAgICAgICAgdmFsaWRTcG90KCk7XG4gICAgICB9KTtcblxuICAgICAgLy9pZiBiZXR0ZXIgc2xvdCBhcmUgYWxyZWFkeSBwaWNrZWQgdHVuIHRvIHJhbmRvbSBzcG90XG4gICAgICBpZiAobmV4dEhpdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IG1vdmUgPSByYW5kb21TcG90KCk7XG4gICAgICAgIHBpY2tlZE51bS5wdXNoKG1vdmUpO1xuICAgICAgICByZXR1cm4gbW92ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBuZXh0VHJ5ID0gbmV4dEhpdHNbbmV4dEhpdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIHBpY2tlZE51bS5wdXNoKG5leHRUcnkpO1xuICAgICAgICBuZXh0VHJ5ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5leHRIaXRzLnBvcCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV4dEhpdHMubGVuZ3RoID09PSAwICYmIGhpdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBtb3ZlID0gcmFuZG9tU3BvdCgpO1xuICAgICAgcGlja2VkTnVtLnB1c2gobW92ZSk7XG4gICAgICByZXR1cm4gbW92ZTtcbiAgICB9XG5cbiAgICAvL21ldGhvZCB0aGF0IHZlcmlmeSBhZGphY2VudCBzbG90IGlzIG5vdCBwaWNrZWQgYWxyZWFkeSBhbmQgcHV0IHRoZSBuZXcgb25lIGluIHRoZSBxdWV1ZVxuICAgIGZ1bmN0aW9uIHZhbGlkU3BvdCgpIHtcbiAgICAgIGlmIChuZWlnaGJvclNsb3RzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgY29uc3QgYWxsU3BvdHMgPSBwbGF5ZXIuYm9hcmQuaW52ZXJzZUhhc2hNYXA7XG4gICAgICBuZWlnaGJvclNsb3RzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgLy90dXJuIGNvb3JkaW5hdGUgdG8gbnVtYmVyIHVzaW5nIGhhc21hcFxuICAgICAgICBjb25zdCBzcG90ID0gYWxsU3BvdHMuZ2V0KGNvb3JkaW5hdGUudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmIChwaWNrZWROdW0uaW5jbHVkZXMoc3BvdCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgbmV4dEhpdHMucHVzaChzcG90KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBuZWlnaGJvclNsb3RzID0gW107XG4gICAgfVxuICAgIC8vbWV0aG9kIHRoYXQgZ2VuZXJhdGUgbmVpZ2hib3Igc3BvdCBmcm9tIGdpdmVuIGNvb3JkaW5hdGVcbiAgICBmdW5jdGlvbiBhZGphY2VudFNsb3QoaGl0KSB7XG4gICAgICBjb25zdCB4ID0gaGl0WzBdO1xuICAgICAgY29uc3QgeSA9IGhpdFsxXTtcbiAgICAgIGlmICh4ICsgMSA8IDEwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCArIDEsIHldKTtcbiAgICAgIH1cbiAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCAtIDEsIHldKTtcbiAgICAgIH1cbiAgICAgIGlmICh5ICsgMSA8IDEwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCwgeSArIDFdKTtcbiAgICAgIH1cbiAgICAgIGlmICh5IC0gMSA+PSAwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCwgeSAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9tZXRob2QgcmV0dXJuIHJhbmRvbSBudW1iZXIgZnJvbSAwIHRvIDEwMFxuICAgIGZ1bmN0aW9uIHJhbmRvbVNwb3QoKSB7XG4gICAgICBsZXQgbW92ZTtcbiAgICAgIGRvIHtcbiAgICAgICAgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICB9IHdoaWxlIChwaWNrZWROdW0uaW5jbHVkZXMobW92ZSkpO1xuICAgICAgcmV0dXJuIG1vdmU7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzdW0oYSwgYikge1xuICByZXR1cm4gYSArIGI7XG59XG5leHBvcnQgeyBzdW0sIFNoaXAsIEdhbWVCb2FyZCwgUGxheWVyLCBjb21wdXRlck1vdmUgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKmJvZHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMgMzAgNzApO1xufSovXG4uYm9hcmQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNnZtaW4pO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNnZtaW4pO1xuICBnYXA6IDJweDtcbiAgcGFkZGluZzogMC4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbn1cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5wbGFjZS1zaGlwcy1idG5zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxcmVtO1xuICB3aWR0aDogODAlO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi10b3A6IDJweDtcbn1cblxuLmRyYWctYnRuLFxuLnBsYXktYnRuLFxuLm5leHQtYnRuLFxuLnJhbmRvbWl6ZS1idG4ge1xuICBwYWRkaW5nOiAwLjZyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XG59XG4ucGxheS1idG4sXG4ubmV4dC1idG4ge1xuICBkaXNwbGF5OiBub25lO1xuICBib3gtc2hhZG93OiAtMXB4IDBweCA5cHggM3B4ICNmZjAwZDQ7XG59XG4uZHJhZy1idG46aG92ZXIsXG4ucmFuZG9taXplLWJ0bjpob3ZlciB7XG4gIGNvbG9yOiBiZWlnZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59XG4uc2hpcHMtY29udGFpbmVyLFxuLmRyb3Atc2hpcHMge1xuICBkaXNwbGF5OiBub25lO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG4gIGdhcDogMnB4O1xuICBtYXgtaGVpZ2h0OiAyMDBweDtcbn1cblxuLmdyaWQtY2VsbCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5kcmFnZ2luZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbn1cbi5mbGV4LWhvcml6b250YWwge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLmZsZXgtdmVydGljYWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnN1Ym1hcmluZS1ob3Jpem9udGFsIHtcbiAgLS13aWR0aDogMztcbn1cbi5zdWJtYXJpbmUtdmVydGljYWwge1xuICAtLWhlaWdodDogMztcbn1cbi5jYXJyaWVyLWhvcml6b250YWwge1xuICAtLXdpZHRoOiA1O1xufVxuLmNhcnJpZXItdmVydGljYWwge1xuICAtLWhlaWdodDogNTtcbn1cbi5wYXRyb2wtaG9yaXpvbnRhbCB7XG4gIC0td2lkdGg6IDI7XG59XG4ucGF0cm9sLXZlcnRpY2FsIHtcbiAgLS1oZWlnaHQ6IDI7XG59XG4uZGVzdHJveWVyLWhvcml6b250YWwge1xuICAtLXdpZHRoOiAzO1xufVxuLmRlc3Ryb3llci12ZXJ0aWNhbCB7XG4gIC0taGVpZ2h0OiAzO1xufVxuLmJhdHRsZVNoaXAtaG9yaXpvbnRhbCB7XG4gIC0td2lkdGg6IDQ7XG59XG4uYmF0dGxlU2hpcC12ZXJ0aWNhbCB7XG4gIC0taGVpZ2h0OiA0O1xufVxuLnNoaXAge1xuICB3aWR0aDogNnZtaW47XG4gIGhlaWdodDogNnZtaW47XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwIDIwMyA1NCk7XG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcbiAgY3Vyc29yOiBncmFiYmluZztcbn1cbi5zaGlwLXNpemUge1xuICB3aWR0aDogY2FsYyg2dm1pbiAqIHZhcigtLXdpZHRoLCAxKSk7XG4gIGhlaWdodDogY2FsYyg2dm1pbiAqIHZhcigtLWhlaWdodCwgMSkpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHJpZ2h0OiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxLCAxNDcsIDEpO1xufVxuXG4udGFyZ2V0LWRvdCB7XG4gIGFzcGVjdC1yYXRpbzogMTtcbiAgd2lkdGg6IDAuOHJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuLm1pc3NlZC1zdHJpa2Uge1xuICBhc3BlY3QtcmF0aW86IDE7XG4gIHdpZHRoOiAwLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbi5taXNzZWQtc3RyaWtlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbiAgYm9yZGVyOiBub25lO1xufVxuLmhpdC1zdHJpa2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjUwMDAwO1xufVxuLyptaW5pIHNoaXBzIHN0eWxlKi9cbi5mbGVldC1ob2xkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5taW5pLXNoaXAtb3duZXIge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cbi5zYW1lLXNpemUtc2hpcHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDE1MHB4O1xufVxuLm1pbmktY2FycmllciB7XG4gIC0td2lkdGg6IDU7XG59XG4ubWluaS1iYXR0bGVTaGlwIHtcbiAgLS13aWR0aDogNDtcbn1cbi5taW5pLWRlc3Ryb3llciB7XG4gIC0td2lkdGg6IDM7XG59XG4ubWluaS1zdWJtYXJpbmUge1xuICAtLXdpZHRoOiAzO1xufVxuLm1pbmktcGF0cm9sIHtcbiAgLS13aWR0aDogMS41O1xufVxuLm1pbmktc2hpcC1zaXplIHtcbiAgd2lkdGg6IGNhbGMoNDBweCAqIHZhcigtLXdpZHRoLCAxKSk7XG4gIGhlaWdodDogMjBweDtcbiAgbWFyZ2luOiAycHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNjYgMTk4IDE2NSk7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wbGFjZS1zaGlwLXBhZ2Uvc2hpcHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7O0VBSUU7QUFDRjtFQUNFLGFBQWE7RUFDYix3Q0FBd0M7RUFDeEMscUNBQXFDO0VBQ3JDLFFBQVE7RUFDUixlQUFlO0VBQ2YsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFNBQVM7RUFDVCxVQUFVO0VBQ1YsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7Ozs7RUFJRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLFlBQVk7RUFDWixxQkFBcUI7QUFDdkI7QUFDQTs7RUFFRSxhQUFhO0VBQ2Isb0NBQW9DO0FBQ3RDO0FBQ0E7O0VBRUUsWUFBWTtFQUNaLHVCQUF1QjtBQUN6QjtBQUNBOztFQUVFLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsYUFBYTtBQUNmO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsK0JBQStCO0VBQy9CLHFCQUFxQjtFQUNyQixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLG9DQUFvQztFQUNwQyxzQ0FBc0M7RUFDdEMsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUNBLG1CQUFtQjtBQUNuQjtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLG1DQUFtQztFQUNuQyxZQUFZO0VBQ1osV0FBVztFQUNYLGtDQUFrQztBQUNwQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKmJvZHkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMgMzAgNzApO1xcbn0qL1xcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDZ2bWluKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA2dm1pbik7XFxuICBnYXA6IDJweDtcXG4gIHBhZGRpbmc6IDAuMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5wbGFjZS1zaGlwcy1idG5zIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBnYXA6IDFyZW07XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbn1cXG5cXG4uZHJhZy1idG4sXFxuLnBsYXktYnRuLFxcbi5uZXh0LWJ0bixcXG4ucmFuZG9taXplLWJ0biB7XFxuICBwYWRkaW5nOiAwLjZyZW07XFxuICBmb250LXNpemU6IDFyZW07XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxufVxcbi5wbGF5LWJ0bixcXG4ubmV4dC1idG4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGJveC1zaGFkb3c6IC0xcHggMHB4IDlweCAzcHggI2ZmMDBkNDtcXG59XFxuLmRyYWctYnRuOmhvdmVyLFxcbi5yYW5kb21pemUtYnRuOmhvdmVyIHtcXG4gIGNvbG9yOiBiZWlnZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG4uc2hpcHMtY29udGFpbmVyLFxcbi5kcm9wLXNoaXBzIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcXG4gIGdhcDogMnB4O1xcbiAgbWF4LWhlaWdodDogMjAwcHg7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5kcmFnZ2luZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XFxufVxcbi5mbGV4LWhvcml6b250YWwge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLmZsZXgtdmVydGljYWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5zdWJtYXJpbmUtaG9yaXpvbnRhbCB7XFxuICAtLXdpZHRoOiAzO1xcbn1cXG4uc3VibWFyaW5lLXZlcnRpY2FsIHtcXG4gIC0taGVpZ2h0OiAzO1xcbn1cXG4uY2Fycmllci1ob3Jpem9udGFsIHtcXG4gIC0td2lkdGg6IDU7XFxufVxcbi5jYXJyaWVyLXZlcnRpY2FsIHtcXG4gIC0taGVpZ2h0OiA1O1xcbn1cXG4ucGF0cm9sLWhvcml6b250YWwge1xcbiAgLS13aWR0aDogMjtcXG59XFxuLnBhdHJvbC12ZXJ0aWNhbCB7XFxuICAtLWhlaWdodDogMjtcXG59XFxuLmRlc3Ryb3llci1ob3Jpem9udGFsIHtcXG4gIC0td2lkdGg6IDM7XFxufVxcbi5kZXN0cm95ZXItdmVydGljYWwge1xcbiAgLS1oZWlnaHQ6IDM7XFxufVxcbi5iYXR0bGVTaGlwLWhvcml6b250YWwge1xcbiAgLS13aWR0aDogNDtcXG59XFxuLmJhdHRsZVNoaXAtdmVydGljYWwge1xcbiAgLS1oZWlnaHQ6IDQ7XFxufVxcbi5zaGlwIHtcXG4gIHdpZHRoOiA2dm1pbjtcXG4gIGhlaWdodDogNnZtaW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCAyMDMgNTQpO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbiAgY3Vyc29yOiBncmFiYmluZztcXG59XFxuLnNoaXAtc2l6ZSB7XFxuICB3aWR0aDogY2FsYyg2dm1pbiAqIHZhcigtLXdpZHRoLCAxKSk7XFxuICBoZWlnaHQ6IGNhbGMoNnZtaW4gKiB2YXIoLS1oZWlnaHQsIDEpKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMSwgMTQ3LCAxKTtcXG59XFxuXFxuLnRhcmdldC1kb3Qge1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgd2lkdGg6IDAuOHJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLm1pc3NlZC1zdHJpa2Uge1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgd2lkdGg6IDAuMnJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLm1pc3NlZC1zdHJpa2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmhpdC1zdHJpa2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1MDAwMDtcXG59XFxuLyptaW5pIHNoaXBzIHN0eWxlKi9cXG4uZmxlZXQtaG9sZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4ubWluaS1zaGlwLW93bmVyIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG4uc2FtZS1zaXplLXNoaXBzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxNTBweDtcXG59XFxuLm1pbmktY2FycmllciB7XFxuICAtLXdpZHRoOiA1O1xcbn1cXG4ubWluaS1iYXR0bGVTaGlwIHtcXG4gIC0td2lkdGg6IDQ7XFxufVxcbi5taW5pLWRlc3Ryb3llciB7XFxuICAtLXdpZHRoOiAzO1xcbn1cXG4ubWluaS1zdWJtYXJpbmUge1xcbiAgLS13aWR0aDogMztcXG59XFxuLm1pbmktcGF0cm9sIHtcXG4gIC0td2lkdGg6IDEuNTtcXG59XFxuLm1pbmktc2hpcC1zaXplIHtcXG4gIHdpZHRoOiBjYWxjKDQwcHggKiB2YXIoLS13aWR0aCwgMSkpO1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgbWFyZ2luOiAycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTY2IDE5OCAxNjUpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL2dyYWR1YXRlLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvYXJjaGl2by1ibGFjay12MjEtbGF0aW4tcmVndWxhci53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL25hbnVtLWdvdGhpYy1jb2RpbmctdjIxLWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9nZXJtYW5pYS1vbmUtdjIwLWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9zaGFyZS10ZWNoLW1vbm8tdjE1LWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9pbWFnZXMvc2V0LXNoaXBzLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ltYWdlcy9zaGlwcy5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIGZvbnQtZmFtaWx5OiBcIkdyYWR1YXRlXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSkgZm9ybWF0KFwid29mZjJcIik7XG59XG4vKiBhcmNoaXZvLWJsYWNrLXJlZ3VsYXIgLSBsYXRpbiAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiQXJjaGl2byBCbGFja1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pXG4gICAgZm9ybWF0KFwid29mZjJcIik7XG59XG4vKiBuYW51bS1nb3RoaWMtY29kaW5nLXJlZ3VsYXIgLSBsYXRpbiAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiTmFudW0gR290aGljIENvZGluZ1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pXG4gICAgZm9ybWF0KFwid29mZjJcIik7XG59XG4vKiBnZXJtYW5pYS1vbmUtcmVndWxhciAtIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICBmb250LWZhbWlseTogXCJHZXJtYW5pYSBPbmVcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KVxuICAgIGZvcm1hdChcIndvZmYyXCIpO1xufVxuLyogc2hhcmUtdGVjaC1tb25vLXJlZ3VsYXIgLSBsYXRpbiAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiU2hhcmUgVGVjaCBNb25vXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19ffSlcbiAgICBmb3JtYXQoXCJ3b2ZmMlwiKTtcbn1cbioge1xuICBtYXJnaW46IDA7XG59XG5ib2R5IHtcbiAgd2lkdGg6IDEwMHZ3O1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fX30pO1xuICBmb250LWZhbWlseTogXCJHcmFkdWF0ZVwiLCBcIlNoYXJlIFRlY2ggTW9ub1wiLCBcIkdlcm1hbmlhIE9uZVwiLCBtb25vc3BhY2UsIEFyaWFsLFxuICAgIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGluaGVyaXQ7XG59XG5idXR0b24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG59XG4vKmludHJvIHBhZ2UqL1xuLmludHJvLXBhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDIwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIGhlaWdodDogMTAwdmg7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19ffSk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cbi5oZWFkZXIge1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNSwgMTUsIDE1KTtcbiAgY29sb3I6IGFsaWNlYmx1ZTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAycztcbn1cblxuLmxvZ28ge1xuICBmb250LWZhbWlseTogXCJBcmNoaXZvIEJsYWNrXCI7XG4gIGxldHRlci1zcGFjaW5nOiAwLjNyZW07XG4gIGZvbnQtc2l6ZTogMi4zcmVtO1xuICBmb250LXdlaWdodDogMzAwO1xuICB0ZXh0LXNoYWRvdzogMCAxcHggYmx1ZTtcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDJzO1xufVxuLmxvZ286aG92ZXIge1xuICBjb2xvcjogeWVsbG93O1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XG59XG4uZ2FtZS1vcHRpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xufVxuLmdhbWUtb3B0aW9uLWJ0bnMge1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1mYW1pbHk6IFwiTmFudW0gR290aGljIENvZGluZ1wiO1xuICB0ZXh0LXNoYWRvdzogLTFweCAtMnB4IDJweCAjMDAwMDAwN2Q7XG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAxcztcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcbn1cbi5nYW1lLW9wdGlvbi1idG5zOmhvdmVyIHtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDAsIDAsIDApO1xufVxuLm11bHRpLXBsYXllcnMtYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIwMywgMjI2LCA0KTtcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcbn1cbi5zaW5nbGUtcGxheWVyLWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMiwgMTQ1LCAwKTtcbiAgY29sb3I6IGFsaWNlYmx1ZTtcbn1cblxuLypzaGlwIHBsYWNlbWVudCBwYWdlKi9cbi5zaGlwcy1ncmlkIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMyAzMCA3MCk7XG59XG4uZHJhZy1idG4sXG4ucmFuZG9taXplLWJ0bixcbi5wbGF5LWJ0biB7XG4gIGZvbnQtZmFtaWx5OiBcIkdlcm1hbmlhIE9uZVwiO1xufVxuXG4ucGxheWVycy1uYW1lIHtcbiAgZGlzcGxheTogZmxleDtcbn1cbi8qIGNvdW50IGRvd24qL1xuLnBhc3Mtc2NyZWVuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxMDAwO1xuICB3aWR0aDogMTAwdnc7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICB0b3A6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcbiAgZGlzcGxheTogbm9uZTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZvbnQtZmFtaWx5OiBcIkdyYWR1YXRlXCI7XG59XG4uY291bnRlciB7XG4gIGFzcGVjdC1yYXRpbzogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAzMCU7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIHJnYigxNzQsIDAsIDI1NSk7XG4gIGNvbG9yOiBicm93bjtcbn1cbi5jb3VudGVyLWJvYXJkIHtcbiAgZm9udC1zaXplOiA0cmVtO1xufVxuLm1zZy10ZXh0IHtcbiAgY29sb3I6IGJlaWdlO1xuICBmb250LXNpemU6IDJyZW07XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cbi8qcGxheWVycyBib2FyZCxtaW5pIHNoaXBzIGJvYXJkKi9cblxuLnBsYXllcnMtYm9hcmQsXG4ubWluaS1zaGlwLWhvbGRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuNHJlbTtcbn1cblxuLyp3aW5uZXIgbW9kYWwqL1xuLndpbm5lci1ib2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcbiAgcGFkZGluZzogMXJlbTtcbn1cbi53aW5uZXItaG9sZGVyIHtcbiAgYm94LXNoYWRvdzogLTJweCAwcHggOHB4IDNweCAjNDFjYzJmO1xuICBib3JkZXI6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuMnJlbTtcbn1cbi53aW5uZXItbW9kYWwge1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiAyMCU7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xuICBib3gtc2hhZG93OiAtMnB4IDBweCA4cHggM3B4ICMwMDAwMDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogMzAlO1xufVxuLnJlbWF0Y2gtYnRuIHtcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW47XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgcGFkZGluZzogMC4zcmVtO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLypmb3JtIHN0eWxlKi9cbmlucHV0IHtcbiAgZm9udC1mYW1pbHk6IFwiR2VybWFuaWEgT25lXCI7XG59XG4ucGxheWVyLW5hbWUtaW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDAuOXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XG59XG5cbi5wbGF5ZXItbmFtZS1pbnB1dDpmb2N1cyB+IC5wbGF5ZXItb25lLWxhYmVsIHtcbiAgdG9wOiAwLjNyZW07XG4gIGxlZnQ6IDIwJTtcbiAgY29sb3I6ICMxOWQ1MDA7XG59XG4ucGxheWVyLXR3by1sYWJlbCxcbi5wbGF5ZXItb25lLWxhYmVsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3R0b206IDIuOHJlbTtcbiAgbGVmdDogMXJlbTtcbiAgY29sb3I6ICM2MDYzNWY7XG4gIHRyYW5zaXRpb246IGFsbCAycztcbn1cbi5wbGF5ZXItbmFtZS1pbnB1dDpmb2N1cyB+IC5wbGF5ZXItdHdvLWxhYmVsIHtcbiAgdG9wOiAyMCU7XG4gIGxlZnQ6IDIwJTtcbiAgY29sb3I6ICMxOWQ1MDA7XG59XG5mb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogM3JlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM5LCAzNCwgMzQpO1xuICBvcGFjaXR5OiAwLjg7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgcGFkZGluZzogMnJlbTtcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICBoZWlnaHQ6IDM1MHB4O1xuICBjb2xvcjogYW50aXF1ZXdoaXRlO1xuICBmb250LWZhbWlseTogXCJHZXJtYW5pYSBPbmVcIiwgbW9ub3NwYWNlO1xufVxuLmlucHV0LWhvbGRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uc3VibWl0LWJ0biB7XG4gIHBhZGRpbmc6IDAuNHJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtZmFtaWx5OiBcIkdlcm1hbmlhIE9uZVwiO1xufVxuLnN1Ym1pdC1idG46aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XG59XG4ucGxheWVyLXR1cm4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjb2xvcjogYWxpY2VibHVlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICBvcGFjaXR5OiAwLjg7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4v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eUI7RUFDekIsWUFBWTtFQUNaLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LWZhbWlseTogXFxcIkdyYWR1YXRlXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvZ3JhZHVhdGUtdjE3LWxhdGluLXJlZ3VsYXIud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbi8qIGFyY2hpdm8tYmxhY2stcmVndWxhciAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LWZhbWlseTogXFxcIkFyY2hpdm8gQmxhY2tcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9hcmNoaXZvLWJsYWNrLXYyMS1sYXRpbi1yZWd1bGFyLndvZmYyXFxcIilcXG4gICAgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG4vKiBuYW51bS1nb3RoaWMtY29kaW5nLXJlZ3VsYXIgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOYW51bSBHb3RoaWMgQ29kaW5nXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvbmFudW0tZ290aGljLWNvZGluZy12MjEtbGF0aW4tcmVndWxhci53b2ZmMlxcXCIpXFxuICAgIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuLyogZ2VybWFuaWEtb25lLXJlZ3VsYXIgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHZXJtYW5pYSBPbmVcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9nZXJtYW5pYS1vbmUtdjIwLWxhdGluLXJlZ3VsYXIud29mZjJcXFwiKVxcbiAgICBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbi8qIHNoYXJlLXRlY2gtbW9uby1yZWd1bGFyIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiU2hhcmUgVGVjaCBNb25vXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvc2hhcmUtdGVjaC1tb25vLXYxNS1sYXRpbi1yZWd1bGFyLndvZmYyXFxcIilcXG4gICAgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvaW1hZ2VzL3NldC1zaGlwcy5qcGcpO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHcmFkdWF0ZVxcXCIsIFxcXCJTaGFyZSBUZWNoIE1vbm9cXFwiLCBcXFwiR2VybWFuaWEgT25lXFxcIiwgbW9ub3NwYWNlLCBBcmlhbCxcXG4gICAgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogaW5oZXJpdDtcXG59XFxuYnV0dG9uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XFxufVxcbi8qaW50cm8gcGFnZSovXFxuLmludHJvLXBhZ2Uge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDIwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuL2Fzc2V0cy9pbWFnZXMvc2hpcHMuanBnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLmhlYWRlciB7XFxuICBwYWRkaW5nOiAxLjVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTUsIDE1LCAxNSk7XFxuICBjb2xvcjogYWxpY2VibHVlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAycztcXG59XFxuXFxuLmxvZ28ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJBcmNoaXZvIEJsYWNrXFxcIjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjNyZW07XFxuICBmb250LXNpemU6IDIuM3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICB0ZXh0LXNoYWRvdzogMCAxcHggYmx1ZTtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAycztcXG59XFxuLmxvZ286aG92ZXIge1xcbiAgY29sb3I6IHllbGxvdztcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcXG59XFxuLmdhbWUtb3B0aW9ucyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMC41cmVtO1xcbn1cXG4uZ2FtZS1vcHRpb24tYnRucyB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LWZhbWlseTogXFxcIk5hbnVtIEdvdGhpYyBDb2RpbmdcXFwiO1xcbiAgdGV4dC1zaGFkb3c6IC0xcHggLTJweCAycHggIzAwMDAwMDdkO1xcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDFzO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG59XFxuLmdhbWUtb3B0aW9uLWJ0bnM6aG92ZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDAsIDAsIDApO1xcbn1cXG4ubXVsdGktcGxheWVycy1idG4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIwMywgMjI2LCA0KTtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxufVxcbi5zaW5nbGUtcGxheWVyLWJ0biB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIsIDE0NSwgMCk7XFxuICBjb2xvcjogYWxpY2VibHVlO1xcbn1cXG5cXG4vKnNoaXAgcGxhY2VtZW50IHBhZ2UqL1xcbi5zaGlwcy1ncmlkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzIDMwIDcwKTtcXG59XFxuLmRyYWctYnRuLFxcbi5yYW5kb21pemUtYnRuLFxcbi5wbGF5LWJ0biB7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCI7XFxufVxcblxcbi5wbGF5ZXJzLW5hbWUge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLyogY291bnQgZG93biovXFxuLnBhc3Mtc2NyZWVuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIHRvcDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHcmFkdWF0ZVxcXCI7XFxufVxcbi5jb3VudGVyIHtcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMzAlO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIHJnYigxNzQsIDAsIDI1NSk7XFxuICBjb2xvcjogYnJvd247XFxufVxcbi5jb3VudGVyLWJvYXJkIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG59XFxuLm1zZy10ZXh0IHtcXG4gIGNvbG9yOiBiZWlnZTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuLypwbGF5ZXJzIGJvYXJkLG1pbmkgc2hpcHMgYm9hcmQqL1xcblxcbi5wbGF5ZXJzLWJvYXJkLFxcbi5taW5pLXNoaXAtaG9sZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMC40cmVtO1xcbn1cXG5cXG4vKndpbm5lciBtb2RhbCovXFxuLndpbm5lci1ib2FyZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG4ud2lubmVyLWhvbGRlciB7XFxuICBib3gtc2hhZG93OiAtMnB4IDBweCA4cHggM3B4ICM0MWNjMmY7XFxuICBib3JkZXI6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjJyZW07XFxufVxcbi53aW5uZXItbW9kYWwge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDIwJTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDhweCAzcHggIzAwMDAwMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IDMwJTtcXG59XFxuLnJlbWF0Y2gtYnRuIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVuO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZzogMC4zcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLypmb3JtIHN0eWxlKi9cXG5pbnB1dCB7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCI7XFxufVxcbi5wbGF5ZXItbmFtZS1pbnB1dCB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAwLjlyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XFxufVxcblxcbi5wbGF5ZXItbmFtZS1pbnB1dDpmb2N1cyB+IC5wbGF5ZXItb25lLWxhYmVsIHtcXG4gIHRvcDogMC4zcmVtO1xcbiAgbGVmdDogMjAlO1xcbiAgY29sb3I6ICMxOWQ1MDA7XFxufVxcbi5wbGF5ZXItdHdvLWxhYmVsLFxcbi5wbGF5ZXItb25lLWxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJvdHRvbTogMi44cmVtO1xcbiAgbGVmdDogMXJlbTtcXG4gIGNvbG9yOiAjNjA2MzVmO1xcbiAgdHJhbnNpdGlvbjogYWxsIDJzO1xcbn1cXG4ucGxheWVyLW5hbWUtaW5wdXQ6Zm9jdXMgfiAucGxheWVyLXR3by1sYWJlbCB7XFxuICB0b3A6IDIwJTtcXG4gIGxlZnQ6IDIwJTtcXG4gIGNvbG9yOiAjMTlkNTAwO1xcbn1cXG5mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAzcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM5LCAzNCwgMzQpO1xcbiAgb3BhY2l0eTogMC44O1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgaGVpZ2h0OiAzNTBweDtcXG4gIGNvbG9yOiBhbnRpcXVld2hpdGU7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCIsIG1vbm9zcGFjZTtcXG59XFxuLmlucHV0LWhvbGRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnN1Ym1pdC1idG4ge1xcbiAgcGFkZGluZzogMC40cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2VybWFuaWEgT25lXFxcIjtcXG59XFxuLnN1Ym1pdC1idG46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xcbn1cXG4ucGxheWVyLXR1cm4ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBjb2xvcjogYWxpY2VibHVlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG4gIG9wYWNpdHk6IDAuODtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NoaXBzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NoaXBzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vcGxhY2Utc2hpcC1wYWdlL3NoaXBzLmNzc1wiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vdXRpbGl0eS5qc1wiO1xuaW1wb3J0IHsgcmFuZG9tbHlQbGFjZVNoaXBzIH0gZnJvbSBcIi4vcGxhY2Utc2hpcC1wYWdlL3NoaXAtcG9zaXRpb24uanNcIjtcbmltcG9ydCB7XG4gIHNjcmVlbkNvbnRyb2xsZXIsXG4gIGRyYXdGaXJzdFBhZ2UsXG4gIHNoaXBzUGxhY2VtZW50LFxuICByYW5kb21QbGFjZW1lbnQsXG4gIGRyYWdTaGlwcyxcbiAgY291bnRkb3duTW9kYWwsXG4gIGZvcm1UZW1wbGF0ZSxcbn0gZnJvbSBcIi4vZG9tLWNvbXBvbmVudC5qc1wiO1xuXG5jb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBhZ2UtY29udGFpbmVyXVwiKTtcbmNvbnN0IGJvYXJkV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS13cmFwcGVyXCIpO1xuZHJhd0ZpcnN0UGFnZSgpO1xuYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbmxldCBwbGF5ZXJPbmVOYW1lO1xubGV0IHBsYXllclR3b05hbWU7XG5sZXQgZmlyc3RQbGF5ZXI7XG5sZXQgc2Vjb25kUGxheWVyO1xuLy9zdG9yZSBwbGF5ZXJzIG9iamVjdCBpbiBoYXNobWFwXG5jb25zdCBoYXNobWFwID0gbmV3IE1hcCgpO1xubGV0IHNvbG9QbGF5ZXIgPSBmYWxzZTtcbnBhZ2VDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiLm11bHRpLXBsYXllcnMtYnRuXCIpKSB7XG4gICAgc29sb1BsYXllciA9IGZhbHNlO1xuICAgIGJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZm9ybVRlbXBsYXRlKHBhZ2VDb250YWluZXIpO1xuICB9XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiW2RhdGEtc3VibWl0LW5hbWVdXCIpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHBsYXllck9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wbGF5ZXItb25lXVwiKTtcbiAgICBjb25zdCBwbGF5ZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcGxheWVyLXR3b1wiKTtcbiAgICAvL2F2b2lkIHNwYWNlIGZvciBjcmVhdGluZyBjbGFzcyAgbGF0ZXIgZm9yIGZsZWV0IGRhc2ggYm9hcmRcbiAgICBwbGF5ZXJPbmVOYW1lID0gcGxheWVyT25lLnZhbHVlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICBwbGF5ZXJUd29OYW1lID0gcGxheWVyVHdvLnZhbHVlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAvL3JldHVybiBpZiBwbGF5ZXJzIG5hbWUgc2FtZSBhbmQgZW1wdHlcbiAgICBpZiAoXG4gICAgICBwbGF5ZXJPbmVOYW1lID09PSBcIlwiIHx8XG4gICAgICBwbGF5ZXJUd29OYW1lID09PSBcIlwiIHx8XG4gICAgICAocGxheWVyT25lTmFtZSA9PT0gcGxheWVyVHdvTmFtZSkgPT09IHRydWVcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZmlyc3RQbGF5ZXIgPSBQbGF5ZXIocGxheWVyT25lTmFtZSk7XG4gICAgc2Vjb25kUGxheWVyID0gUGxheWVyKHBsYXllclR3b05hbWUpO1xuICAgIGNvdW50ZG93bk1vZGFsKGAke3BsYXllck9uZU5hbWV9IHNldCB0aGUgc2hpcHNgKTtcbiAgICBzaGlwc1BsYWNlbWVudChwYWdlQ29udGFpbmVyKTtcbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIltkYXRhLXJhbmRvbS1idG5cIikpIHtcbiAgICBwdXRTaGlwcygpO1xuICB9XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiW2RhdGEtZHJvcC1idG5dXCIpKSB7XG4gICAgZHJhZ0FuZERyb3AoKTtcbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIi5wbGF5LWJ0blwiKSkge1xuICAgIHBhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGlmIChzb2xvUGxheWVyID09PSBmYWxzZSkge1xuICAgICAgY291bnRkb3duTW9kYWwoYCR7cGxheWVyVHdvTmFtZX0gc2V0IHRoZSBzaGlwc2ApO1xuICAgICAgYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgc2hpcHNQbGFjZW1lbnQocGFnZUNvbnRhaW5lcik7XG5cbiAgICBpZiAoc29sb1BsYXllciA9PT0gdHJ1ZSAmJiBoYXNobWFwLnNpemUgPT09IDApIHtcbiAgICAgIC8vcmFuZG9tbHkgcGxhY2UgYWkgc2hpcHNcbiAgICAgIHJhbmRvbWx5UGxhY2VTaGlwcyhzZWNvbmRQbGF5ZXIpO1xuICAgICAgaGFzaG1hcC5zZXQocGxheWVyT25lTmFtZSwgZmlyc3RQbGF5ZXIpO1xuICAgICAgaGFzaG1hcC5zZXQocGxheWVyVHdvTmFtZSwgc2Vjb25kUGxheWVyKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBoYXNobWFwLmdldChwbGF5ZXJUd29OYW1lKSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBoYXNobWFwLmdldChwbGF5ZXJPbmVOYW1lKSAhPT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICBjb25zdCBwbGF5ZXJPbmUgPSBoYXNobWFwLmdldChwbGF5ZXJPbmVOYW1lKTtcbiAgICAgIGNvbnN0IHBsYXllclR3byA9IGhhc2htYXAuZ2V0KHBsYXllclR3b05hbWUpO1xuICAgICAgc2NyZWVuQ29udHJvbGxlcihwbGF5ZXJPbmUsIHBsYXllclR3bywgc29sb1BsYXllcik7XG4gICAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHBhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoaGFzaG1hcC5zaXplID09PSAwKSB7XG4gICAgICBoYXNobWFwLnNldChwbGF5ZXJPbmVOYW1lLCBmaXJzdFBsYXllcik7XG4gICAgfVxuICAgIGlmIChoYXNobWFwLnNpemUgPiAwKSB7XG4gICAgICBoYXNobWFwLnNldChwbGF5ZXJUd29OYW1lLCBzZWNvbmRQbGF5ZXIpO1xuICAgIH1cbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIi5zaW5nbGUtcGxheWVyLWJ0blwiKSkge1xuICAgIHNvbG9QbGF5ZXIgPSB0cnVlO1xuICAgIHBsYXllck9uZU5hbWUgPSBcInlvdVwiO1xuICAgIHBsYXllclR3b05hbWUgPSBcImFpXCI7XG4gICAgZmlyc3RQbGF5ZXIgPSBQbGF5ZXIocGxheWVyT25lTmFtZSk7XG4gICAgc2Vjb25kUGxheWVyID0gUGxheWVyKHBsYXllclR3b05hbWUpO1xuICAgIGNvdW50ZG93bk1vZGFsKFwic2V0IHRoZSBzaGlwc1wiKTtcbiAgICBzaGlwc1BsYWNlbWVudChwYWdlQ29udGFpbmVyKTtcbiAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9XG59KTtcbmNvbnN0IHdpbm5lck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLW1zZ1wiKTtcbndpbm5lck1zZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCIucmVtYXRjaC1idG5cIikpIHtcbiAgICAvL3Jlc2V0IHRoZSBwbGF5ZXIgYW5kIGRvbSBlbGVtZW50XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2lubmVyLW1vZGFsXVwiKTtcbiAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWRcIik7XG4gICAgY29uc3QgdHVybkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLXR1cm5cIik7XG4gICAgY29uc3QgZGFzaEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5taW5pLWRhc2gtYm9hcmRcIik7XG4gICAgY29uc3Qgd2lubmVyRGl2SG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItaG9sZGVyXCIpO1xuICAgIGNvbnN0IHdpbm5lck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWJvYXJkXCIpO1xuICAgIGZpcnN0UGxheWVyID0gbnVsbDtcbiAgICBzZWNvbmRQbGF5ZXIgPSBudWxsO1xuICAgIGhhc2htYXAuY2xlYXIoKTtcbiAgICBmaXJzdFBsYXllciA9IFBsYXllcihwbGF5ZXJPbmVOYW1lKTtcbiAgICBzZWNvbmRQbGF5ZXIgPSBQbGF5ZXIocGxheWVyVHdvTmFtZSk7XG4gICAgaXNHYW1lRW5kID0gZmFsc2U7XG4gICAgYm9hcmRzLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB0dXJuRGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBkYXNoQm9hcmQuZm9yRWFjaCgoZGl2KSA9PiB7XG4gICAgICBkaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgYm9hcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuICAgIHdpbm5lck1zZy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgd2lubmVyRGl2SG9sZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBmaXJzdFBsYXllciA9IFBsYXllcihwbGF5ZXJPbmVOYW1lKTtcbiAgICBzZWNvbmRQbGF5ZXIgPSBQbGF5ZXIocGxheWVyVHdvTmFtZSk7XG4gICAgbW9kYWwuY2xvc2UoKTtcbiAgICBwYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBzaGlwc1BsYWNlbWVudChwYWdlQ29udGFpbmVyKTtcbiAgfVxufSk7XG4vL2RyYWcgYW5kIGRyb3Agc2hpcCBiYXNlZCBvbiBzb2xvIG9yIG11bHRpIHBsYXllclxuZnVuY3Rpb24gZHJhZ0FuZERyb3AoKSB7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNoaXBzLWNvbnRhaW5lcl1cIik7XG4gIHNoaXBzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgaWYgKGhhc2htYXAuc2l6ZSA8IDEpIHtcbiAgICBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgcmVwb3NpdGlvbigpO1xuICAgIH1cbiAgICBkcmFnU2hpcHMoZmlyc3RQbGF5ZXIsIGZpcnN0UGxheWVyLmJvYXJkLnNoaXBzQXJyYXkpO1xuICB9XG4gIGlmIChoYXNobWFwLnNpemUgPiAxKSB7XG4gICAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICByZXBvc2l0aW9uKCk7XG4gICAgfVxuICAgIGRyYWdTaGlwcyhzZWNvbmRQbGF5ZXIsIHNlY29uZFBsYXllci5ib2FyZC5zaGlwc0FycmF5KTtcbiAgfVxufVxuZnVuY3Rpb24gcmVwb3NpdGlvbigpIHtcbiAgaWYgKGZpcnN0UGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB4byA9IFBsYXllcihwbGF5ZXJPbmVOYW1lLCBmaXJzdFBsYXllci5zaGlwc0FycmF5KTtcbiAgICAvLyBmaXJzdFBsYXllciA9IG51bGw7XG4gICAgZmlyc3RQbGF5ZXIgPSB4bztcbiAgfVxuICBpZiAoc2Vjb25kUGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB4byA9IFBsYXllcihwbGF5ZXJUd29OYW1lLCBzZWNvbmRQbGF5ZXIuc2hpcHNBcnJheSk7XG4gICAgLy9zZWNvbmRQbGF5ZXIgPSBudWxsO1xuICAgIHNlY29uZFBsYXllciA9IHhvO1xuICB9XG59XG5mdW5jdGlvbiBwdXRTaGlwcygpIHtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2hpcHMtY29udGFpbmVyXVwiKTtcbiAgc2hpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBpZiAoaGFzaG1hcC5zaXplIDwgMSkge1xuICAgIHJlcG9zaXRpb24oKTtcbiAgICByYW5kb21QbGFjZW1lbnQoZmlyc3RQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKGhhc2htYXAuc2l6ZSA+IDApIHtcbiAgICByZXBvc2l0aW9uKCk7XG4gICAgcmFuZG9tUGxhY2VtZW50KHNlY29uZFBsYXllcik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJmaXJzdEJvYXJkIiwic2hpcENvb3JkaW5hdGUiLCJoaXQiLCJtaXNzIiwiY2VsbHMiLCJpIiwiaiIsImEiLCJiIiwieCIsInkiLCJncmlkcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImJ1dHRvbiIsInRleHRDb250ZW50IiwiTWF0aCIsImZsb29yIiwiZGF0YXNldCIsImluZGV4IiwiZG90Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmRDaGlsZCIsInN0cmlrZUJvYXJkIiwiZHJhd0dyaWRzIiwiZ3JpZCIsIl91dGlsaXR5IiwicmVxdWlyZSIsIl9ib2FyZENvbXBvbmVudCIsIl9zaGlwUG9zaXRpb24iLCJjb3VudCIsIndpbm5lck1zZyIsIkdhbWVGbG93IiwicGxheWVyT25lIiwicGxheWVyVHdvIiwiaXNHYW1lRW5kIiwicGxheWVycyIsImFjdGl2ZVBsYXllciIsImNoYW5nZVR1cm4iLCJnZXRQbGF5ZXIiLCJwcmludEJvYXJkIiwicGxheWVyIiwibWlzc1N0cmlrZXMiLCJib2FyZCIsIm1pc3NlZFNob3RzIiwiaGl0U3RyaWtlcyIsImhpdFNob3RzIiwiYWxsVGhlU2hpcHMiLCJzaGlwc1Bvc2l0aW9ucyIsInNoaXBCb2FyZFN0YXRlIiwic3RyaWtlQm9hcmRTdGF0ZSIsInVwZGF0ZVN1bmtTaGlwIiwic3Vua1NoaXBzIiwicHJpbnROZXdCb2FyZCIsIm9wcG9uZW50TmFtZSIsIm5hbWUiLCJvcHBvbmVudFBsYXllclNoaXBTdGF0ZSIsIm9wcG9uZW50U3RyaWtlQm9hcmQiLCJjdXJyZW50UGxheWVyU2hpcEJvYXJkIiwiY3VycmVudFBsYXllclNoaXBTdGF0ZSIsImN1cnJlbnRQbGF5ZXJOYW1lIiwicGxheWVyUm91bmQiLCJjbGlja2VkTnVtIiwiY29vcmRpbmF0ZSIsImNvb3JkaW5hdGVzSGFzaE1hcCIsImdldCIsIk51bWJlciIsInJlY2VpdmVBdHRhY2siLCJkZWNsYXJlV2lubmVyIiwibGVuZ3RoIiwid2lubmVyTW9kYWwiLCJwb3AiLCJtb2RhbCIsInF1ZXJ5U2VsZWN0b3IiLCJzaG93TW9kYWwiLCJ3aW5uZXIiLCJ1bmRlZmluZWQiLCJwdXNoIiwiZmlyc3RQbGF5ZXJTdW5rU2hpcHMiLCJpc1N1bmsiLCJzZWNvbmRQbGF5ZXJTdW5rU2hpcHMiLCJwbGF5ZXJPbmVOYW1lIiwicGxheWVyVHdvTmFtZSIsIm1zZyIsInNjcmVlbkNvbnRyb2xsZXIiLCJzb2xvUGxheWVyIiwiZ2FtZSIsInR1cm4iLCJwbGF5ZXJPbmVTaGlwc0JvYXJkIiwicGxheWVyT25lU3RyaWtlQm9hcmQiLCJmaXJzdFBsYXllclNoaXBzIiwic2Vjb25kUGxheWVyU2hpcHMiLCJ1cGRhdGVTY3JlZW4iLCJwbGF5ZXJPbmVGaXJzdENoYXIiLCJjaGFyQXQiLCJwbGF5ZXJUd29GaXJzdENoYXIiLCJidWlsZERhc2hib2FyZCIsImRyYXdNaW5pU2hpcHMiLCJwbGF5ZXJPbmVEYXNoQm9hcmQiLCJQbGF5ZXJPbmVNaW5pU2hpcHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGxheWVyVHdvRGFzaEJvYXJkIiwicGxheWVyVHdvTWluaVNoaXBzIiwicGxheWVyT25lU3Vua1NoaXBzIiwicGxheWVyVHdvU3Vua1NoaXBzIiwidXBkYXRlRGFzaEJvYXJkIiwidXBkYXRlTWluaVNoaXBzIiwiY291bnRkb3duTW9kYWwiLCJmaXhUeXBvIiwiY2xpY2tIYW5kbGVyIiwiZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJoYXNDaGlsZE5vZGVzIiwiY29tcHV0ZXJNb3ZlIiwiaW50cm9QYWdlIiwicGFnZUhvbGRlciIsInNldEF0dHJpYnV0ZSIsImhlYWRlciIsInRpdGxlIiwiYnRuSG9sZGVyIiwic2luZ2xlUGxheWVyQnRuIiwibXVsdGlQbGF5ZXJCdG4iLCJkcmF3Rmlyc3RQYWdlIiwicGFnZUNvbnRhaW5lciIsImxvZ29EaXYiLCJ0aXR0bGUiLCJzZXRUaW1lb3V0IiwidGVtcGxhdGVTaGlwR3JpZCIsInNlY29uZFBhZ2UiLCJzdHJhdGVneUJvYXJkIiwiYnRucyIsInRlbXBsYXRlIiwiaW5uZXJIVE1MIiwic2hpcHNQbGFjZW1lbnQiLCJlbGVtZW50IiwicmFuZG9tUGxhY2VtZW50IiwibmV3UGxheWVyIiwiY29udGFpbmVyIiwicGxheUJ0biIsInNoaXBzQ29udGFpbmVyIiwiZGlzcGxheSIsInNldFNoaXBzUGxhY2UiLCJyYW5kb21seVBsYWNlU2hpcHMiLCJzaGlwcyIsImhpdHMiLCJtaXNzZWQiLCJrZWVwTmFtZSIsIlBsYXllciIsInNoaXBzQ29vcmRpbmF0ZXMiLCJjb3VudERvd25QYWdlIiwicGFzc1NjcmVlbiIsImNvdW50ZG93biIsInVwZGF0ZUNvdW50ZG93blVJIiwiZWxlIiwibWluaUZsZWV0cyIsInNoaXBzRGl2Iiwic3Vua1NoaXBBcnJheSIsImNvbG9yIiwiZm9yRWFjaCIsInNoaXAiLCJzdW5rU2hpcCIsIndpbm5lckRpdiIsImhvbGRlciIsImZvcm1UZW1wbGF0ZSIsIm1pbmlTaGlwQm9hcmQiLCJkaXZBcnJheSIsInJlUG9zaXRpb24iLCJzaGlwc0FycmF5IiwiYWxsU2hpcFBvc2l0aW9ucyIsImNlbGxzVG9SZW1vdmVkIiwic2xpY2UiLCJjZWxsIiwidG9TdHJpbmciLCJzcGxpY2UiLCJpbmRleE9mIiwicGxhY2VQbGF5ZXJTaGlwSG9yaXpvbnRhbCIsImNvb3JkaW5hdGVzIiwiY29udmVydEluZGV4Iiwic2hpcENlbGxzIiwicGxhY2VWZXJ0aWNhbCIsInRha2VuQ2VsbHMiLCJwb3NpdGlvbnMiLCJwbGFjZVJhbmRvbSIsInBsYWNlUGxheWVyU2hpcFZlcnRpY2FsIiwicGxhY2VIb3Jpem9udGFsIiwiYWxsb3dEcm9wIiwicHJldmVudERlZmF1bHQiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImlkIiwiZHJvcCIsImRhdGEiLCJnZXREYXRhIiwiZHJhZ2dlZCIsImdldEVsZW1lbnRCeUlkIiwic2hpcERpcmVjdGlvbiIsImdldFNoaXBEaXJlY3Rpb25DbGFzcyIsInNoaXBJbmRleCIsIndoaWNoU2hpcENsaWNrZWQiLCJzaGlwTmFtZSIsImFsbENsYXNzTmFtZSIsImNsYXNzTmFtZSIsInNwbGl0IiwiZGlyZWN0aW9uQ2xhc3MiLCJmbGlwIiwicmVzdWx0IiwicG9zaXRpb25UZW1wU2hpcCIsInJlbW92ZSIsImRpcmVjdGlvbiIsImZpcnN0Q29vcmRpbmF0ZSIsInRlbXBTaGlwIiwiU2hpcCIsInRlbXBTaGlwcyIsInRlbXBCb2FyZCIsIkdhbWVCb2FyZCIsImlzQ29vcmRpbmF0ZUZyZWUiLCJuZXdQb3NpdGlvbiIsInJlbW92ZUNvb3JkaW5hdGUiLCJhcnJheSIsInNoaXBQb3NpdGlvbiIsInRha2VuUG9zaXRpb25zIiwicG9zaXRpb24iLCJkcmF3U2hpcHMiLCJkaXZIb2xkZXIiLCJkaXYiLCJkcmFnU2hpcHMiLCJzcXVhcmVzIiwic3F1YXJlIiwidG90YWxMZW5ndGgiLCJyZWR1Y2UiLCJ0b3RhbCIsImNyZWF0ZUJvYXJkIiwiYWxsQ29vcmRpbmF0ZXMiLCJpbnZlcnNlSGFzaE1hcCIsImludmVyc2VDb29yZGluYXRlIiwicm93IiwiY29sIiwiTWFwIiwiayIsInNldCIsIlBvc2l0aW9uIiwic2hpcExlbmd0aCIsImhvcml6b250YWwiLCJ2ZXJ0aWNhbCIsInR3b0RpbWVuc2lvbkFycmF5IiwicmFuZG9tRnJlZUNvb3JkaW5hdGUiLCJyYW5kb21OdW0iLCJyYW5kb21DZWxsIiwicmVsYXRlZENvb3JkaW5hdGUiLCJpbmNsdWRlcyIsIm51bSIsInJhbmRvbSIsInJhbmRvbWx5UG9zaXRpb24iLCJzaWRlIiwic3BhY2VUYWtlbiIsImNoZWNrQ29vcmRpbmF0ZSIsImlzSGl0Iiwib25lRGltZW5zaW9uQXJyYXkiLCJjYXJyaWVyIiwiYmF0dGxlU2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbCIsInBpY2tlZE51bSIsImNvbXB1dGVyU2xvdCIsIm5leHRIaXRzIiwibmVpZ2hib3JTbG90cyIsImFkamFjZW50U2xvdCIsInZhbGlkU3BvdCIsIm1vdmUiLCJyYW5kb21TcG90IiwibmV4dFRyeSIsImFsbFNwb3RzIiwic3BvdCIsInN1bSIsIl9kb21Db21wb25lbnQiLCJib2FyZFdyYXBwZXIiLCJmaXJzdFBsYXllciIsInNlY29uZFBsYXllciIsImhhc2htYXAiLCJtYXRjaGVzIiwidmFsdWUiLCJyZXBsYWNlIiwicHV0U2hpcHMiLCJkcmFnQW5kRHJvcCIsInNpemUiLCJib2FyZHMiLCJ0dXJuRGl2IiwiZGFzaEJvYXJkIiwid2lubmVyRGl2SG9sZGVyIiwiY2xlYXIiLCJjbG9zZSIsInJlcG9zaXRpb24iLCJ4byJdLCJzb3VyY2VSb290IjoiIn0=