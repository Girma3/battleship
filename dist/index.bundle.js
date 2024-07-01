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
    if (result !== false) {
      ship.classList.remove(`${shipName}-horizontal`);
      ship.classList.add(`${shipName}-vertical`);
    }
  } else if (shipDirection === "vertical") {
    const result = positionTempShip(ships, index, "horizontal", newPlayer);
    if (result !== false) {
      ship.classList.remove(`${shipName}-vertical`);
      ship.classList.add(`${shipName}-horizontal`);
    }
  }

  //function accept ships array, index  of the ship,flip direction and player  to replicate that ship in
  //different positions(direction) and return boolean for each position and flip for valid direction
  function positionTempShip(ships, index, direction, player) {
    const firstCoordinate = ships[index].positions[0];
    //when ship clicked outside the board return undefiend
    if (firstCoordinate === undefined) return undefined;
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
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,kBAAkB;EAClB,gBAAgB;EAChB,4DAA2E;AAC7E;AACA,kCAAkC;AAClC;EACE,kBAAkB;EAClB,4BAA4B;EAC5B,kBAAkB;EAClB,gBAAgB;EAChB;mBACiB;AACnB;AACA,wCAAwC;AACxC;EACE,kBAAkB;EAClB,kCAAkC;EAClC,kBAAkB;EAClB,gBAAgB;EAChB;mBACiB;AACnB;AACA,iCAAiC;AACjC;EACE,kBAAkB;EAClB,2BAA2B;EAC3B,kBAAkB;EAClB,gBAAgB;EAChB;mBACiB;AACnB;AACA,oCAAoC;AACpC;EACE,kBAAkB;EAClB,8BAA8B;EAC9B,kBAAkB;EAClB,gBAAgB;EAChB;mBACiB;AACnB;AACA;EACE,SAAS;AACX;AACA;EACE,YAAY;EACZ,iBAAiB;EACjB,yBAAyB;EACzB,yDAAoD;EACpD;yBACuB;EACvB,2BAA2B;EAC3B,4BAA4B;EAC5B,wBAAwB;AAC1B;AACA;EACE,eAAe;EACf,mBAAmB;AACrB;AACA,aAAa;AACb;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,uBAAuB;EACvB,aAAa;EACb,yCAAyC;EACzC,yDAAkD;EAClD,4BAA4B;EAC5B,2BAA2B;EAC3B,sBAAsB;AACxB;AACA;EACE,eAAe;EACf,iCAAiC;EACjC,gBAAgB;EAChB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,4BAA4B;EAC5B,sBAAsB;EACtB,iBAAiB;EACjB,gBAAgB;EAChB,uBAAuB;EACvB,8BAA8B;AAChC;AACA;EACE,aAAa;EACb,qBAAqB;AACvB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,WAAW;AACb;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,qBAAqB;EACrB,iBAAiB;EACjB,gBAAgB;EAChB,kCAAkC;EAClC,oCAAoC;EACpC,8BAA8B;EAC9B,sBAAsB;AACxB;AACA;EACE,8BAA8B;AAChC;AACA;EACE,kCAAkC;EAClC,mBAAmB;AACrB;AACA;EACE,iCAAiC;EACjC,gBAAgB;AAClB;;AAEA,sBAAsB;AACtB;EACE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,iBAAiB;EACjB,8BAA8B;AAChC;AACA;;;EAGE,2BAA2B;AAC7B;;AAEA;EACE,aAAa;AACf;AACA,cAAc;AACd;EACE,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,iBAAiB;EACjB,MAAM;EACN,8BAA8B;EAC9B,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,sBAAsB;EACtB,uBAAuB;AACzB;AACA;EACE,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,qCAAqC;EACrC,YAAY;AACd;AACA;EACE,eAAe;AACjB;AACA;EACE,YAAY;EACZ,eAAe;EACf,eAAe;AACjB;AACA,iCAAiC;;AAEjC;;EAEE,aAAa;EACb,6BAA6B;EAC7B,yBAAyB;EACzB,eAAe;EACf,mBAAmB;EACnB,eAAe;AACjB;;AAEA,eAAe;AACf;EACE,8BAA8B;EAC9B,aAAa;AACf;AACA;EACE,oCAAoC;EACpC,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;AACjB;AACA;EACE,YAAY;EACZ,UAAU;EACV,eAAe;EACf,qBAAqB;EACrB,oCAAoC;EACpC,kBAAkB;EAClB,SAAS;AACX;AACA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,eAAe;EACf,gBAAgB;AAClB;AACA,aAAa;AACb;EACE,2BAA2B;AAC7B;AACA;EACE,YAAY;EACZ,eAAe;EACf,qBAAqB;EACrB,8BAA8B;AAChC;;AAEA;EACE,WAAW;EACX,SAAS;EACT,cAAc;AAChB;AACA;;EAEE,kBAAkB;EAClB,cAAc;EACd,UAAU;EACV,cAAc;EACd,kBAAkB;AACpB;AACA;EACE,QAAQ;EACR,SAAS;EACT,cAAc;AAChB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;EACT,iCAAiC;EACjC,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,gBAAgB;EAChB,mBAAmB;EACnB,aAAa;EACb,mBAAmB;EACnB,sCAAsC;AACxC;AACA;EACE,aAAa;EACb,sBAAsB;AACxB;AACA;EACE,eAAe;EACf,qBAAqB;EACrB,YAAY;EACZ,gBAAgB;EAChB,2BAA2B;AAC7B;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;EACZ,eAAe;AACjB","sourcesContent":["@font-face {\n  font-display: swap;\n  font-family: \"Graduate\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/graduate-v17-latin-regular.woff2\") format(\"woff2\");\n}\n/* archivo-black-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Archivo Black\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/archivo-black-v21-latin-regular.woff2\")\n    format(\"woff2\");\n}\n/* nanum-gothic-coding-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Nanum Gothic Coding\";\n  font-style: normal;\n  font-weight: 300;\n  src: url(\"./assets/fonts/nanum-gothic-coding-v21-latin-regular.woff2\")\n    format(\"woff2\");\n}\n/* germania-one-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Germania One\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/germania-one-v20-latin-regular.woff2\")\n    format(\"woff2\");\n}\n/* share-tech-mono-regular - latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Share Tech Mono\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/share-tech-mono-v15-latin-regular.woff2\")\n    format(\"woff2\");\n}\n* {\n  margin: 0;\n}\nbody {\n  width: 100vw;\n  min-height: 100vh;\n  background-color: #000000;\n  background-image: url(./assets/images/set-ships.jpg);\n  font-family: \"Graduate\", \"Share Tech Mono\", \"Germania One\", monospace, Arial,\n    Helvetica, sans-serif;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: inherit;\n}\nbutton {\n  cursor: pointer;\n  letter-spacing: 1px;\n}\n/*intro page*/\n.intro-page {\n  display: flex;\n  flex-direction: column;\n  gap: 20%;\n  background-color: black;\n  height: 100vh;\n  font-family: Arial, Helvetica, sans-serif;\n  background-image: url(\"./assets/images/ships.jpg\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n}\n.header {\n  padding: 1.5rem;\n  background-color: rgb(15, 15, 15);\n  color: aliceblue;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: all ease-in-out 2s;\n}\n\n.logo {\n  font-family: \"Archivo Black\";\n  letter-spacing: 0.3rem;\n  font-size: 2.3rem;\n  font-weight: 300;\n  text-shadow: 0 1px blue;\n  transition: all ease-in-out 2s;\n}\n.logo:hover {\n  color: yellow;\n  transform: scale(1.2);\n}\n.game-options {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 0.5rem;\n}\n.game-option-btns {\n  padding: 1rem;\n  border: 2px solid white;\n  border-radius: 0.3rem;\n  font-size: 1.2rem;\n  font-weight: 600;\n  font-family: \"Nanum Gothic Coding\";\n  text-shadow: -1px -2px 2px #0000007d;\n  transition: all ease-in-out 1s;\n  letter-spacing: 0.2rem;\n}\n.game-option-btns:hover {\n  border: 2px solid rgb(0, 0, 0);\n}\n.multi-players-btn {\n  background-color: rgb(203, 226, 4);\n  color: rgb(0, 0, 0);\n}\n.single-player-btn {\n  background-color: rgb(22, 145, 0);\n  color: aliceblue;\n}\n\n/*ship placement page*/\n.ships-grid {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: rgb(3 30 70);\n}\n.drag-btn,\n.randomize-btn,\n.play-btn {\n  font-family: \"Germania One\";\n}\n\n.players-name {\n  display: flex;\n}\n/* count down*/\n.pass-screen {\n  position: absolute;\n  z-index: 1000;\n  width: 100vw;\n  min-height: 100vh;\n  top: 0;\n  background-color: rgb(0, 0, 0);\n  display: none;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  font-family: \"Graduate\";\n}\n.counter {\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 30%;\n  border-radius: 1rem;\n  border: 0.2rem solid rgb(174, 0, 255);\n  color: brown;\n}\n.counter-board {\n  font-size: 4rem;\n}\n.msg-text {\n  color: beige;\n  font-size: 2rem;\n  padding: 0.5rem;\n}\n/*players board,mini ships board*/\n\n.players-board,\n.mini-ship-holder {\n  display: flex;\n  justify-content: space-evenly;\n  background-color: #292929;\n  flex-wrap: wrap;\n  align-items: center;\n  padding: 0.4rem;\n}\n\n/*winner modal*/\n.winner-board {\n  background-color: antiquewhite;\n  padding: 1rem;\n}\n.winner-holder {\n  box-shadow: -2px 0px 8px 3px #41cc2f;\n  border: none;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0.2rem;\n}\n.winner-modal {\n  border: none;\n  width: 20%;\n  padding: 0.5rem;\n  border-radius: 0.4rem;\n  box-shadow: -2px 0px 8px 3px #000000;\n  position: relative;\n  left: 30%;\n}\n.rematch-btn {\n  border: 2px solid green;\n  border-radius: 3px;\n  padding: 0.3rem;\n  font-weight: 500;\n}\n/*form style*/\ninput {\n  font-family: \"Germania One\";\n}\n.player-name-input {\n  border: none;\n  padding: 0.9rem;\n  border-radius: 0.2rem;\n  background-color: antiquewhite;\n}\n\n.player-name-input:focus ~ .player-one-label {\n  top: 0.3rem;\n  left: 20%;\n  color: #19d500;\n}\n.player-two-label,\n.player-one-label {\n  position: relative;\n  bottom: 2.8rem;\n  left: 1rem;\n  color: #60635f;\n  transition: all 2s;\n}\n.player-name-input:focus ~ .player-two-label {\n  top: 20%;\n  left: 20%;\n  color: #19d500;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 3rem;\n  background-color: rgb(39, 34, 34);\n  opacity: 0.8;\n  width: fit-content;\n  padding: 2rem;\n  margin: auto;\n  margin-top: 1rem;\n  border-radius: 1rem;\n  height: 350px;\n  color: antiquewhite;\n  font-family: \"Germania One\", monospace;\n}\n.input-holder {\n  display: flex;\n  flex-direction: column;\n}\n.submit-btn {\n  padding: 0.4rem;\n  border-radius: 0.3rem;\n  border: none;\n  font-weight: 500;\n  font-family: \"Germania One\";\n}\n.submit-btn:hover {\n  background-color: yellow;\n}\n.player-turn {\n  text-align: center;\n  font-size: 1.5rem;\n  color: aliceblue;\n  background-color: #000000;\n  opacity: 0.8;\n  padding: 0.5rem;\n}\n"],"sourceRoot":""}]);
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
    boardWrapper.style.display = "none";
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sbUdBQW1HLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxPQUFPLFFBQVEsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLE1BQU0sVUFBVSxZQUFZLE1BQU0sTUFBTSxVQUFVLFlBQVksTUFBTSxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFX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QUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUNBQW1DO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLE9BQU8sYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLFVBQVUsS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLFlBQVksTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxPQUFPLFlBQVksT0FBTyxLQUFLLFVBQVUsS0FBSyxVQUFVLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsS0FBSyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sYUFBYSxPQUFPLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLE9BQU8sVUFBVSxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksTUFBTSxVQUFVLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFN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TyxLQUFLLENBQUM2SCxVQUFVLENBQUM7RUFDeEQ7QUFDRjtBQUNBLFNBQVM4SCxVQUFVQSxDQUFBLEVBQUc7RUFDcEIsSUFBSWYsV0FBVyxDQUFDNU8sS0FBSyxDQUFDSyxjQUFjLENBQUNxQixNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQy9DLE1BQU1rTyxFQUFFLEdBQUcsSUFBQW5KLGVBQU0sRUFBQ25FLGFBQWEsRUFBRXNNLFdBQVcsQ0FBQy9HLFVBQVUsQ0FBQztJQUN4RDtJQUNBK0csV0FBVyxHQUFHZ0IsRUFBRTtFQUNsQjtFQUNBLElBQUlmLFlBQVksQ0FBQzdPLEtBQUssQ0FBQ0ssY0FBYyxDQUFDcUIsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNoRCxNQUFNa08sRUFBRSxHQUFHLElBQUFuSixlQUFNLEVBQUNsRSxhQUFhLEVBQUVzTSxZQUFZLENBQUNoSCxVQUFVLENBQUM7SUFDekQ7SUFDQWdILFlBQVksR0FBR2UsRUFBRTtFQUNuQjtBQUNGO0FBQ0EsU0FBU1YsUUFBUUEsQ0FBQSxFQUFHO0VBQ2xCLE1BQU1qSixjQUFjLEdBQUduSSxRQUFRLENBQUNnRSxhQUFhLENBQUMsd0JBQXdCLENBQUM7RUFDdkVtRSxjQUFjLENBQUN4SCxLQUFLLENBQUN5SCxPQUFPLEdBQUcsTUFBTTtFQUNyQyxJQUFJNEksT0FBTyxDQUFDTSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0lBQ3BCTyxVQUFVLENBQUMsQ0FBQztJQUNaLElBQUE5Siw2QkFBZSxFQUFDK0ksV0FBVyxDQUFDO0VBQzlCLENBQUMsTUFBTSxJQUFJRSxPQUFPLENBQUNNLElBQUksR0FBRyxDQUFDLEVBQUU7SUFDM0JPLFVBQVUsQ0FBQyxDQUFDO0lBQ1osSUFBQTlKLDZCQUFlLEVBQUNnSixZQUFZLENBQUM7RUFDL0I7QUFDRixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ib2FyZC1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20tY29tcG9uZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2Utc2hpcC1wYWdlL3NoaXAtcG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91dGlsaXR5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2Utc2hpcC1wYWdlL3NoaXBzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZS1zaGlwLXBhZ2Uvc2hpcHMuY3NzPzQyN2MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2Z1bmN0aW9uIGRyYXcgc2hpcHMgd2l0aCBoaXQgYW5kIG1pc3MgZm9yIHRoZSBvd25lclxuZnVuY3Rpb24gZmlyc3RCb2FyZChzaGlwQ29vcmRpbmF0ZSwgaGl0LCBtaXNzKSB7XG4gIC8vIENyZWF0ZSBhIDJEIGdyaWQgb2YgY2VsbHNcbiAgY29uc3QgY2VsbHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY2VsbHNbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gXCJcIjtcbiAgICB9XG4gIH1cbiAgLy8gTWFyayB0aGUgY29vcmRpbmF0ZXMgb24gdGhlIGdyaWRcbiAgZm9yIChjb25zdCBbYSwgYl0gb2Ygc2hpcENvb3JkaW5hdGUpIHtcbiAgICBjZWxsc1thXVtiXSA9IFwic2hpcFwiO1xuICB9XG4gIGZvciAoY29uc3QgW3gsIHldIG9mIGhpdCkge1xuICAgIGlmIChjZWxsc1t4XVt5XSA9PT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgbWlzcykge1xuICAgIGlmIChjZWxsc1t4XVt5XSAhPT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgfVxuICB9XG4gIC8vIENyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGdyaWRcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkcy5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIC8vIENyZWF0ZSBidXR0b25zIGZvciBlYWNoIGNlbGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcInNoaXBcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcInRhcmdldC1kb3RcIik7XG4gICAgICBkb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNGIyOTI5XCI7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9IGVsc2UgaWYgKGNlbGxzW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gXCJoaXRcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcInRhcmdldC1kb3RcIik7XG4gICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImhpdC1zdHJpa2VcIik7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoZG90KTtcbiAgICB9IGVsc2UgaWYgKGNlbGxzW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJtaXNzZWQtc3RyaWtlXCIpO1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGRvdCk7XG4gICAgfVxuICAgIGdyaWRzLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cbiAgcmV0dXJuIGdyaWRzO1xufVxuLy9mdW5jdGlvbiAgZHJhdyBtaXNzIGFuZCBoaXQgYW5kIHJldmVsIHNoaXAgaWYgaXQgaGl0IHVzZWQgdG9cbi8vc2hvdyBmb3Igb3Bwb25lbnQgYnkgaGlkaW5nIHNoaXBzIHdoZW4gaXQgcmVuZGVyIGZpcnN0XG5mdW5jdGlvbiBzdHJpa2VCb2FyZChzaGlwQ29vcmRpbmF0ZSwgaGl0LCBtaXNzKSB7XG4gIC8vIENyZWF0ZSBhIDJEIGdyaWQgb2YgY2VsbHNcbiAgY29uc3QgY2VsbHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY2VsbHNbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gXCJcIjtcbiAgICB9XG4gIH1cbiAgLy8gbWFyayB0aGUgY29vcmRpbmF0ZXMgb24gdGhlIGdyaWRcbiAgZm9yIChjb25zdCBbYSwgYl0gb2Ygc2hpcENvb3JkaW5hdGUpIHtcbiAgICBjZWxsc1thXVtiXSA9IFwic2hpcFwiO1xuICB9XG4gIGZvciAoY29uc3QgW3gsIHldIG9mIGhpdCkge1xuICAgIGlmIChjZWxsc1t4XVt5XSA9PT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBbeCwgeV0gb2YgbWlzcykge1xuICAgIGlmIChjZWxsc1t4XVt5XSAhPT0gXCJzaGlwXCIpIHtcbiAgICAgIGNlbGxzW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgfVxuICB9XG4gIC8vIENyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGdyaWRcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkcy5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIC8vIENyZWF0ZSBidXR0b25zIGZvciBlYWNoIGNlbGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcImhpdFwiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWRvdFwiKTtcbiAgICAgIGRvdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGRvdCk7XG4gICAgfSBlbHNlIGlmIChjZWxsc1tNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09IFwibWlzc1wiKSB7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkLXN0cmlrZVwiKTtcbiAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkb3QpO1xuICAgIH0gZWxzZSBpZiAoY2VsbHNbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSBcInNoaXBcIikge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gICAgZ3JpZHMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICByZXR1cm4gZ3JpZHM7XG59XG4vL2RyYXcgMTAgWCAxMCBib2FyZFxuZnVuY3Rpb24gZHJhd0dyaWRzKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICBncmlkLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cbiAgcmV0dXJuIGdyaWQ7XG59XG5leHBvcnQgeyBmaXJzdEJvYXJkLCBzdHJpa2VCb2FyZCwgZHJhd0dyaWRzIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIsIGNvbXB1dGVyTW92ZSB9IGZyb20gXCIuL3V0aWxpdHkuanNcIjtcbmltcG9ydCB7IHN0cmlrZUJvYXJkLCBmaXJzdEJvYXJkLCBkcmF3R3JpZHMgfSBmcm9tIFwiLi9ib2FyZC1jb21wb25lbnQuanNcIjtcbmltcG9ydCB7XG4gIGRyYWdTaGlwcyxcbiAgcmFuZG9tbHlQbGFjZVNoaXBzLFxufSBmcm9tIFwiLi9wbGFjZS1zaGlwLXBhZ2Uvc2hpcC1wb3NpdGlvbi5qc1wiO1xuXG5sZXQgY291bnQgPSAzO1xubGV0IHdpbm5lck1zZyA9IFtdO1xuLypcbipHYW1lRmxvdyAtIG9iamVjdCB0aGF0IGhhcyAzIG1ldGhvZHMgb25lIHRvIGNoYW5nZSBwbGF5ZXIgdHVybixzZWNvbmQgdG8gY3JlYXRlIGJvYXJkIHVzaW5nIHBsYXllciBpbmZvLCBcbiogICAgICAgICAgIHRoaXJkIHRvIHVwZGF0ZSBib2FyZCBzdGF0ZVxuKkdhbWVGbG93KCkucHJpbnRCb2FyZChwbGF5ZXIpIC0gZHJhdyBib2FyZCB1c2luZyBwbGF5ZXIgaGl0LG1pc3MgYW5kIHNoaXAgcG9zaXRpb24gYXJyYXksXG4gcmV0dXJuIDEwIHggMTAgYm9hcmQgb25lIHdpdGggc2hpcCBzaG93biwgdGhlIG90aGVyIHdpdGhvdXQgdGhlIHNoaXAgdW5sZXNzIGl0IGhpdCB0byBzaG93IHRoZSBvcHBvbmVudCBzdHJpa2luZyBzdGF0ZSBvbiB0aGUgYm9hcmQuIFxuKi9cblxuZnVuY3Rpb24gR2FtZUZsb3cocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgbGV0IGlzR2FtZUVuZCA9IGZhbHNlO1xuICBjb25zdCBwbGF5ZXJzID0gW3BsYXllck9uZSwgcGxheWVyVHdvXTtcbiAgbGV0IGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgYWN0aXZlUGxheWVyID0gYWN0aXZlUGxheWVyID09PSBwbGF5ZXJzWzBdID8gcGxheWVyc1sxXSA6IHBsYXllcnNbMF07XG4gIH07XG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IGFjdGl2ZVBsYXllcjtcbiAgY29uc3QgcHJpbnRCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBnZXRQbGF5ZXIoKTtcbiAgICBjb25zdCBtaXNzU3RyaWtlcyA9IHBsYXllci5ib2FyZC5taXNzZWRTaG90cztcbiAgICBjb25zdCBoaXRTdHJpa2VzID0gcGxheWVyLmJvYXJkLmhpdFNob3RzO1xuICAgIGNvbnN0IGFsbFRoZVNoaXBzID0gcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zO1xuICAgIGNvbnN0IHNoaXBCb2FyZFN0YXRlID0gZmlyc3RCb2FyZChhbGxUaGVTaGlwcywgaGl0U3RyaWtlcywgbWlzc1N0cmlrZXMpO1xuICAgIGNvbnN0IHN0cmlrZUJvYXJkU3RhdGUgPSBzdHJpa2VCb2FyZChhbGxUaGVTaGlwcywgaGl0U3RyaWtlcywgbWlzc1N0cmlrZXMpO1xuICAgIGNvbnN0IHVwZGF0ZVN1bmtTaGlwID0gcGxheWVyLmJvYXJkLnN1bmtTaGlwcygpO1xuICAgIHJldHVybiB7XG4gICAgICBzaGlwQm9hcmRTdGF0ZSxcbiAgICAgIHN0cmlrZUJvYXJkU3RhdGUsXG4gICAgICB1cGRhdGVTdW5rU2hpcCxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHByaW50TmV3Qm9hcmQgPSAoKSA9PiB7XG4gICAgLy9kcmF3IGN1cnJlbnQgcGxheWVyIGJvYXJkIHN0YXRlIHVzaW5nIG9wcG9uZW50IGhpdCBhbmQgbWlzc1xuICAgIC8vdGhlbiBkcmF3IHN0cmlraW5nIGJvYXJkIHVzaW5nIGN1cnJlbnQgcGxheWVyIGhpdCBhbmQgbWlzcyBvbiBvcHBvbmVudCBib2FyZFxuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBjb25zdCBvcHBvbmVudE5hbWUgPSBnZXRQbGF5ZXIoKS5uYW1lO1xuICAgIGNvbnN0IG9wcG9uZW50UGxheWVyU2hpcFN0YXRlID0gcHJpbnRCb2FyZChnZXRQbGF5ZXIoKSkudXBkYXRlU3Vua1NoaXA7XG4gICAgY29uc3Qgb3Bwb25lbnRTdHJpa2VCb2FyZCA9IHByaW50Qm9hcmQoZ2V0UGxheWVyKCkpLnN0cmlrZUJvYXJkU3RhdGU7XG4gICAgY2hhbmdlVHVybigpO1xuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQgPSBwcmludEJvYXJkKGdldFBsYXllcigpKS5zaGlwQm9hcmRTdGF0ZTtcbiAgICBjb25zdCBjdXJyZW50UGxheWVyU2hpcFN0YXRlID0gcHJpbnRCb2FyZChnZXRQbGF5ZXIoKSkudXBkYXRlU3Vua1NoaXA7XG4gICAgY29uc3QgY3VycmVudFBsYXllck5hbWUgPSBnZXRQbGF5ZXIoKS5uYW1lO1xuICAgIHJldHVybiB7XG4gICAgICBvcHBvbmVudE5hbWUsXG4gICAgICBjdXJyZW50UGxheWVyTmFtZSxcbiAgICAgIGN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQsXG4gICAgICBvcHBvbmVudFN0cmlrZUJvYXJkLFxuICAgICAgb3Bwb25lbnRQbGF5ZXJTaGlwU3RhdGUsXG4gICAgICBjdXJyZW50UGxheWVyU2hpcFN0YXRlLFxuICAgIH07XG4gIH07XG4gIGNvbnN0IHBsYXllclJvdW5kID0gKHBsYXllciwgY2xpY2tlZE51bSkgPT4ge1xuICAgIGlmIChpc0dhbWVFbmQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHBsYXllci5ib2FyZC5jb29yZGluYXRlc0hhc2hNYXAuZ2V0KE51bWJlcihjbGlja2VkTnVtKSk7XG4gICAgLy9hdHRhY2sgb3Bwb25lbnQgYm9hcmQgYnkgY2hhbmdpbmcgdHVybiB0byBndCBvcHBvbmVudCBib2FyZFxuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBnZXRQbGF5ZXIoKS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuICAgIGRlY2xhcmVXaW5uZXIoZ2V0UGxheWVyKCkpO1xuICAgIGNoYW5nZVR1cm4oKTtcbiAgICBkZWNsYXJlV2lubmVyKHBsYXllcik7XG4gICAgcHJpbnROZXdCb2FyZCgpO1xuICAgIC8vYW5ub3VuY2Ugd2lubmVyIGlmIGl0IGZvdW5kXG4gICAgaWYgKHdpbm5lck1zZy5sZW5ndGggPiAwKSB7XG4gICAgICB3aW5uZXJNb2RhbCh3aW5uZXJNc2cucG9wKCkpO1xuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2lubmVyLW1vZGFsXVwiKTtcbiAgICAgIG1vZGFsLnNob3dNb2RhbCgpO1xuICAgICAgaXNHYW1lRW5kID0gdHJ1ZTtcbiAgICAgIHBsYXllck9uZSA9IG51bGw7XG4gICAgICBwbGF5ZXJUd28gPSBudWxsO1xuICAgICAgd2lubmVyTXNnID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZVR1cm4oKTtcbiAgICB9XG4gICAgLy9zdG9yZSB3aW5uZXIgbWVzc2FnZSB3aGVuIHN0YXRlIGNoYW5nZSBpbiB0aGUgYWJvdmUgd2hlbiB3ZSBjaGFuZ2UgdHVybnNcbiAgICBmdW5jdGlvbiBkZWNsYXJlV2lubmVyKHBsYXllcikge1xuICAgICAgaWYgKHdpbm5lcihwbGF5ZXIpID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5uZXJNc2cucHVzaCh3aW5uZXIocGxheWVyKSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vZnVuY3Rpb24gcmV0dXJuIHN0cmluZyB0byBkZWNsYXJlIHdobyB3b24gYW5kIGxvc3QgaWYgdGhlIGdhbWUgZW5kXG4gICAgZnVuY3Rpb24gd2lubmVyKHBsYXllcikge1xuICAgICAgLy8gZ2FtZSBlbmRzIHdoZW4gcGxheWVyIG1ldGhvZCBpc1N1bmsoKSByZXR1cm4gdHJ1ZVxuICAgICAgY29uc3QgZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPSBwbGF5ZXJPbmUuYm9hcmQuaXNTdW5rKCk7XG4gICAgICBjb25zdCBzZWNvbmRQbGF5ZXJTdW5rU2hpcHMgPSBwbGF5ZXJUd28uYm9hcmQuaXNTdW5rKCk7XG4gICAgICBjb25zdCBwbGF5ZXJPbmVOYW1lID0gcGxheWVyT25lLm5hbWU7XG4gICAgICBjb25zdCBwbGF5ZXJUd29OYW1lID0gcGxheWVyVHdvLm5hbWU7XG4gICAgICBsZXQgbXNnO1xuICAgICAgaWYgKGZpcnN0UGxheWVyU3Vua1NoaXBzID09PSBmYWxzZSAmJiBzZWNvbmRQbGF5ZXJTdW5rU2hpcHMgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gbXNnO1xuICAgICAgZWxzZSBpZiAoZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPT09IHRydWUgJiYgcGxheWVyLm5hbWUgPT09IHBsYXllck9uZU5hbWUpIHtcbiAgICAgICAgbXNnID0gYCR7cGxheWVyVHdvTmFtZX0gd29uIPCfjolgO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmlyc3RQbGF5ZXJTdW5rU2hpcHMgPT09IHRydWUgJiZcbiAgICAgICAgcGxheWVyLm5hbWUgPT09IHBsYXllck9uZU5hbWVcbiAgICAgICkge1xuICAgICAgICBtc2cgPSBgJHtwbGF5ZXJPbmVOYW1lfSBsb3N0YDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHNlY29uZFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJlxuICAgICAgICBwbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lTmFtZVxuICAgICAgKSB7XG4gICAgICAgIG1zZyA9IGAke3BsYXllck9uZU5hbWV9IHdvbiDwn46JYDtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHNlY29uZFBsYXllclN1bmtTaGlwcyA9PT0gdHJ1ZSAmJlxuICAgICAgICBwbGF5ZXIubmFtZSA9PT0gcGxheWVyVHdvTmFtZVxuICAgICAgKSB7XG4gICAgICAgIG1zZyA9IGAke3BsYXllclR3b05hbWV9IGxvc3RgO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1zZztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRQbGF5ZXIsXG4gICAgcGxheWVyUm91bmQsXG4gICAgcHJpbnROZXdCb2FyZCxcbiAgICBpc0dhbWVFbmQsXG4gIH07XG59XG4vLyBmdW5jdGlvbiB0aGF0IHVwZGF0ZSB0aGUgc2NyZWVuIHVzaW5nIGdhbWUgZmxvdyBmdW5jdGlvblxuZnVuY3Rpb24gc2NyZWVuQ29udHJvbGxlcihwbGF5ZXJPbmUsIHBsYXllclR3bywgc29sb1BsYXllciwgaXNHYW1lRW5kKSB7XG4gIGNvbnN0IGdhbWUgPSBHYW1lRmxvdyhwbGF5ZXJPbmUsIHBsYXllclR3bywgaXNHYW1lRW5kKTtcbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLXR1cm5cIik7XG4gIGNvbnN0IHBsYXllck9uZVNoaXBzQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLW9uZVwiKTtcbiAgY29uc3QgcGxheWVyT25lU3RyaWtlQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXR3b1wiKTtcbiAgY29uc3QgZmlyc3RQbGF5ZXJTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW9uZS1taW5pLXNoaXBzXCIpO1xuICBjb25zdCBzZWNvbmRQbGF5ZXJTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLXR3by1taW5pLXNoaXBzXCIpO1xuICBmaXJzdFBsYXllclNoaXBzLnRleHRDb250ZW50ID0gXCJcIjtcbiAgc2Vjb25kUGxheWVyU2hpcHMudGV4dENvbnRlbnQgPSBcIlwiO1xuICAvL2NvbnN0IHBsYXllck9uZUZpcnN0Q2hhciA9IHBsYXllck9uZS5uYW1lLmNoYXJBdCgwKTtcbiAgLy9jb25zdCBwbGF5ZXJUd29GaXJzdENoYXIgPSBwbGF5ZXJUd28ubmFtZS5jaGFyQXQoMCk7XG5cbiAgY29uc3QgdXBkYXRlU2NyZWVuID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllck9uZUZpcnN0Q2hhciA9IHBsYXllck9uZS5uYW1lLmNoYXJBdCgwKTtcbiAgICBjb25zdCBwbGF5ZXJUd29GaXJzdENoYXIgPSBwbGF5ZXJUd28ubmFtZS5jaGFyQXQoMCk7XG4gICAgaWYgKGdhbWUuaXNHYW1lRW5kID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vbWV0aG9kIHRvIGNoYW5nZSBhbmQgdXBkYXRlIHBsYXllciBmbGVldCBiYXNlZCBvbiBjdXJyZW50IHBsYXllciBmb3IgdGhlIG1pbmkgZmxlZXRcbiAgICBjb25zdCBidWlsZERhc2hib2FyZCA9ICgpID0+IHtcbiAgICAgIGlmIChnYW1lLmdldFBsYXllcigpLm5hbWUgPT09IHBsYXllck9uZS5uYW1lKSB7XG4gICAgICAgIGRyYXdNaW5pU2hpcHMoZmlyc3RQbGF5ZXJTaGlwcywgcGxheWVyT25lRmlyc3RDaGFyKTtcbiAgICAgICAgZHJhd01pbmlTaGlwcyhzZWNvbmRQbGF5ZXJTaGlwcywgcGxheWVyVHdvRmlyc3RDaGFyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYXdNaW5pU2hpcHMoZmlyc3RQbGF5ZXJTaGlwcywgcGxheWVyVHdvRmlyc3RDaGFyKTtcbiAgICAgICAgZHJhd01pbmlTaGlwcyhzZWNvbmRQbGF5ZXJTaGlwcywgcGxheWVyT25lRmlyc3RDaGFyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGJ1aWxkRGFzaGJvYXJkKCk7XG5cbiAgICB0dXJuLnRleHRDb250ZW50ID0gYCR7Z2FtZS5nZXRQbGF5ZXIoKS5uYW1lfSdzIHR1cm5gO1xuICAgIHBsYXllck9uZVNoaXBzQm9hcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHBsYXllck9uZVN0cmlrZUJvYXJkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIC8vZ3JhYiBhbGwgbWluaSBzaGlwIGJ5IHVzaW5nIHBsYXllciBuYW1lXG4gICAgY29uc3QgcGxheWVyT25lRGFzaEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cGxheWVyT25lRmlyc3RDaGFyfWApO1xuICAgIGNvbnN0IFBsYXllck9uZU1pbmlTaGlwcyA9XG4gICAgICBwbGF5ZXJPbmVEYXNoQm9hcmQucXVlcnlTZWxlY3RvckFsbChcIi5taW5pLXNoaXAtc2l6ZVwiKTtcbiAgICBjb25zdCBwbGF5ZXJUd29EYXNoQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXJUd29GaXJzdENoYXJ9YCk7XG4gICAgY29uc3QgcGxheWVyVHdvTWluaVNoaXBzID1cbiAgICAgIHBsYXllclR3b0Rhc2hCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1pbmktc2hpcC1zaXplXCIpO1xuICAgIC8vdXBkYXRlIG1pbmkgc2hpcHMgaWYgaXQgaGl0XG4gICAgY29uc3QgcGxheWVyT25lU3Vua1NoaXBzID0gZ2FtZS5wcmludE5ld0JvYXJkKCkuY3VycmVudFBsYXllclNoaXBTdGF0ZTtcbiAgICBjb25zdCBwbGF5ZXJUd29TdW5rU2hpcHMgPSBnYW1lLnByaW50TmV3Qm9hcmQoKS5vcHBvbmVudFBsYXllclNoaXBTdGF0ZTtcbiAgICAvL21ldGhvZCB0byB1cGRhdGUgc2hpcHMgYmFzZWQgb24gY3VycmVudCBwbGF5ZXJcbiAgICBjb25zdCB1cGRhdGVEYXNoQm9hcmQgPSAoKSA9PiB7XG4gICAgICBpZiAoZ2FtZS5nZXRQbGF5ZXIubmFtZSA9PT0gcGxheWVyT25lLm5hbWUpIHtcbiAgICAgICAgdXBkYXRlTWluaVNoaXBzKFBsYXllck9uZU1pbmlTaGlwcywgcGxheWVyT25lU3Vua1NoaXBzLCBcInJlZFwiKTtcbiAgICAgICAgdXBkYXRlTWluaVNoaXBzKHBsYXllclR3b01pbmlTaGlwcywgcGxheWVyVHdvU3Vua1NoaXBzLCBcInJlZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZU1pbmlTaGlwcyhQbGF5ZXJPbmVNaW5pU2hpcHMsIHBsYXllck9uZVN1bmtTaGlwcywgXCJyZWRcIik7XG4gICAgICAgIHVwZGF0ZU1pbmlTaGlwcyhwbGF5ZXJUd29NaW5pU2hpcHMsIHBsYXllclR3b1N1bmtTaGlwcywgXCJyZWRcIik7XG4gICAgICB9XG4gICAgfTtcbiAgICB1cGRhdGVEYXNoQm9hcmQoKTtcbiAgICAvL3VwZGF0ZSB0aGUgYm9hcmRzXG4gICAgcGxheWVyT25lU2hpcHNCb2FyZC5hcHBlbmRDaGlsZChcbiAgICAgIGdhbWUucHJpbnROZXdCb2FyZCgpLmN1cnJlbnRQbGF5ZXJTaGlwQm9hcmRcbiAgICApO1xuICAgIHBsYXllck9uZVN0cmlrZUJvYXJkLmFwcGVuZENoaWxkKGdhbWUucHJpbnROZXdCb2FyZCgpLm9wcG9uZW50U3RyaWtlQm9hcmQpO1xuICAgIGlmIChzb2xvUGxheWVyID09PSBmYWxzZSkge1xuICAgICAgY291bnRkb3duTW9kYWwoYFBhc3MgdGhlIGRldmljZSB0byAke2dhbWUuZ2V0UGxheWVyKCkubmFtZX1gKTtcbiAgICB9XG4gICAgZml4VHlwbyhwbGF5ZXJPbmUubmFtZSwgcGxheWVyVHdvLm5hbWUpO1xuICB9O1xuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xuICAgIGNvbnN0IHBsYXllciA9IGdhbWUuZ2V0UGxheWVyKCk7XG4gICAgZ2FtZS5wbGF5ZXJSb3VuZChwbGF5ZXIsIGUpO1xuICAgIHVwZGF0ZVNjcmVlbigpO1xuICB9XG5cbiAgcGxheWVyT25lU3RyaWtlQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgIGNvbnN0IHBsYXllciA9IGdhbWUuZ2V0UGxheWVyKCk7XG4gICAgLy9jaGVjayBjbGlja2VkIGNlbGwgaXMgZnJlZVxuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkIHx8IGUudGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgIGNsaWNrSGFuZGxlcihpbmRleCk7XG4gICAgdXBkYXRlU2NyZWVuKCk7XG4gICAgLy9mb3Igc29sbyBwbGF5ZXJcbiAgICBpZiAoXG4gICAgICBwbGF5ZXIubmFtZSAhPT0gXCJhaVwiICYmXG4gICAgICBwbGF5ZXIubmFtZSA9PT0gXCJ5b3VcIiAmJlxuICAgICAgZS50YXJnZXQuaGFzQ2hpbGROb2RlcygpICE9PSB0cnVlXG4gICAgKSB7XG4gICAgICBnYW1lLnBsYXllclJvdW5kKHBsYXllciwgY29tcHV0ZXJNb3ZlKHBsYXllcikpO1xuICAgICAgdXBkYXRlU2NyZWVuKCk7XG4gICAgfVxuICB9KTtcbiAgLy9pbml0aWFsIHJlbmRlclxuICB1cGRhdGVTY3JlZW4oKTtcbn1cbi8vaW50cm8gcGFnZVxuZnVuY3Rpb24gaW50cm9QYWdlKCkge1xuICBjb25zdCBwYWdlSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGFnZUhvbGRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImludHJvLXBhZ2VcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhlYWRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxvZ28taG9sZGVyXCIpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZVNoaXBcIjtcblxuICBjb25zdCBidG5Ib2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidG5Ib2xkZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnYW1lLW9wdGlvbnNcIik7XG4gIGNvbnN0IHNpbmdsZVBsYXllckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNpbmdsZVBsYXllckJ0bi50ZXh0Q29udGVudCA9IFwic2luZ2xlLXBsYXllclwiO1xuICBzaW5nbGVQbGF5ZXJCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaW5nbGUtcGxheWVyLWJ0blwiKTtcbiAgc2luZ2xlUGxheWVyQnRuLmNsYXNzTGlzdC5hZGQoXCJnYW1lLW9wdGlvbi1idG5zXCIpO1xuICBjb25zdCBtdWx0aVBsYXllckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG11bHRpUGxheWVyQnRuLnRleHRDb250ZW50ID0gXCJZb3UgdnMgRnJpZW5kXCI7XG4gIG11bHRpUGxheWVyQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibXVsdGktcGxheWVycy1idG5cIik7XG4gIG11bHRpUGxheWVyQnRuLmNsYXNzTGlzdC5hZGQoXCJnYW1lLW9wdGlvbi1idG5zXCIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBidG5Ib2xkZXIuYXBwZW5kQ2hpbGQoc2luZ2xlUGxheWVyQnRuKTtcbiAgYnRuSG9sZGVyLmFwcGVuZENoaWxkKG11bHRpUGxheWVyQnRuKTtcbiAgcGFnZUhvbGRlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBwYWdlSG9sZGVyLmFwcGVuZENoaWxkKGJ0bkhvbGRlcik7XG4gIHJldHVybiBwYWdlSG9sZGVyO1xufVxuXG5mdW5jdGlvbiBkcmF3Rmlyc3RQYWdlKCkge1xuICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBhZ2UtY29udGFpbmVyXVwiKTtcbiAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnRyb1BhZ2UoKSk7XG4gIGNvbnN0IGxvZ29EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ28taG9sZGVyXCIpO1xuICBjb25zdCB0aXR0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIik7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRpdHRsZS5jbGFzc0xpc3QuYWRkKFwibG9nb1wiKTtcbiAgICBsb2dvRGl2LmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG4gIH0sIDApO1xufVxuLy9kcmF3IHNoaXAgcGxhY2VtZW50IHBhZ2VcbmZ1bmN0aW9uIHRlbXBsYXRlU2hpcEdyaWQoKSB7XG4gIGNvbnN0IHNlY29uZFBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdHJhdGVneUJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3RyYXRlZ3lCb2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xuICBzdHJhdGVneUJvYXJkLmFwcGVuZENoaWxkKGRyYXdHcmlkcygpKTtcbiAgY29uc3QgYnRucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRlbXBsYXRlID0gYFxuICA8ZGl2IGNsYXNzPVwic2hpcHMtY29udGFpbmVyXCIgZGF0YS1zaGlwcy1jb250YWluZXI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBsYWNlLXNoaXBzLWJ0bnNcIj5cbiAgICA8YnV0dG9uXG4gICAgICBhcmlhLWxhYmVsPVwicGxhY2Ugc2hpcHMgYnkgZHJhZ2dpbmdcIlxuICAgICAgY2xhc3M9XCJkcmFnLWJ0blwiXG4gICAgICBkYXRhLWRyb3AtYnRuXG4gICAgPlxuICAgICAgRHJhZyAmIERyb3Agc2hpcHNcbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICBhcmlhLWxhYmVsPVwicGxhY2Ugc2hpcHMgcmFuZG9tbHlcIlxuICAgICAgY2xhc3M9XCJyYW5kb21pemUtYnRuXCJcbiAgICAgIGRhdGEtcmFuZG9tLWJ0blxuICAgID5cbiAgICAgIFJhbmRvbWl6ZVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJwbGF5LWJ0blwiPlBsYXk8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiBgO1xuICBidG5zLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICBzZWNvbmRQYWdlLmFwcGVuZENoaWxkKHN0cmF0ZWd5Qm9hcmQpO1xuICBzZWNvbmRQYWdlLmFwcGVuZENoaWxkKGJ0bnMpO1xuICByZXR1cm4gc2Vjb25kUGFnZTtcbn1cbi8vZnVuY3Rpb24gdG8gYXR0YWNoIHNoaXAgdGVtcGxhdGUgdG8gZG9tXG5mdW5jdGlvbiBzaGlwc1BsYWNlbWVudChlbGVtZW50KSB7XG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHRlbXBsYXRlU2hpcEdyaWQoKSk7XG59XG4vL1xuZnVuY3Rpb24gcmFuZG9tUGxhY2VtZW50KG5ld1BsYXllcikge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheS1idG5cIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNoaXBzLWNvbnRhaW5lcl1cIik7XG4gIHNoaXBzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaWYgKG5ld1BsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBzZXRTaGlwc1BsYWNlID0gcmFuZG9tbHlQbGFjZVNoaXBzKG5ld1BsYXllcik7XG4gICAgY29uc3Qgc2hpcHMgPSBuZXdQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnM7XG4gICAgY29uc3QgaGl0cyA9IG5ld1BsYXllci5ib2FyZC5oaXRTaG90cztcbiAgICBjb25zdCBtaXNzZWQgPSBuZXdQbGF5ZXIuYm9hcmQubWlzc2VkU2hvdHM7XG4gICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZmlyc3RCb2FyZChzaGlwcywgaGl0cywgbWlzc2VkKSk7XG4gICAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGtlZXBOYW1lID0gbmV3UGxheWVyLm5hbWU7XG4gICAgbmV3UGxheWVyID0gbnVsbDtcbiAgICBuZXdQbGF5ZXIgPSBQbGF5ZXIoa2VlcE5hbWUsIHNoaXBzKTtcbiAgICBjb25zdCBzZXRTaGlwc1BsYWNlID0gcmFuZG9tbHlQbGFjZVNoaXBzKG5ld1BsYXllcik7XG4gICAgY29uc3Qgc2hpcHNDb29yZGluYXRlcyA9IG5ld1BsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucztcbiAgICBjb25zdCBoaXRzID0gbmV3UGxheWVyLmJvYXJkLmhpdFNob3RzO1xuICAgIGNvbnN0IG1pc3NlZCA9IG5ld1BsYXllci5ib2FyZC5taXNzZWRTaG90cztcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmaXJzdEJvYXJkKHNoaXBzQ29vcmRpbmF0ZXMsIGhpdHMsIG1pc3NlZCkpO1xuICAgIHBsYXlCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfVxufVxuLy9jb3VudGRvd24gcGFnZSB0aGF0IGFjY2VwdCBtZXNzYWdlIGFuZCBoaWRlIG90aGVyIGNvbnRlbnRcbmZ1bmN0aW9uIGNvdW50RG93blBhZ2UobXNnKSB7XG4gIGNvbnN0IHBhc3NTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3Mtc2NyZWVuXCIpO1xuICBjb25zdCB0ZW1wbGF0ZSA9IGAgXG4gICAgIDxkaXYgY2xhc3M9XCJtc2ctdGV4dFwiIGRhdGEtbXNnPiR7bXNnfTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvdW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvdW50ZXItYm9hcmRcIiBkYXRhLWNvdW50LWRvd24+PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICBwYXNzU2NyZWVuLmlubmVySFRNTCA9IHRlbXBsYXRlO1xufVxuZnVuY3Rpb24gY291bnRkb3duTW9kYWwobXNnKSB7XG4gIGNvbnN0IHBhc3NTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhc3Mtc2NyZWVuXCIpO1xuICBpZiAoY291bnQgPCAwKSB7XG4gICAgY291bnQgPSAzO1xuICB9XG4gIGNvdW50RG93blBhZ2UobXNnKTtcbiAgY291bnRkb3duKCk7XG59XG5mdW5jdGlvbiB1cGRhdGVDb3VudGRvd25VSSgpIHtcbiAgY29uc3QgcGFzc1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFzcy1zY3JlZW5cIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb3VudC1kb3duXVwiKS50ZXh0Q29udGVudCA9IGNvdW50O1xuICBpZiAoY291bnQgPT09IDApIHtcbiAgICBwYXNzU2NyZWVuLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBwYXNzU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfSBlbHNlIHtcbiAgICBwYXNzU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3VudGRvd24oKSB7XG4gIGlmIChjb3VudCA+PSAwKSB7XG4gICAgdXBkYXRlQ291bnRkb3duVUkoKTtcbiAgICBjb3VudC0tO1xuICAgIHNldFRpbWVvdXQoY291bnRkb3duLCAxMDAwKTtcbiAgfVxufVxuLy9mdW5jdGlvbiB0byBkcmF3IG1pbmkgc2hpcHMgdG8gc2hvdyBzaGlwICBzdW5rIHN0YXRlIGJ5IGNyZWF0aW5nIGNsYXNzIG5hbWUgdXNpbmcgcGxheWVyIG5hbWUgdG8gdXBkYXRlXG5mdW5jdGlvbiBkcmF3TWluaVNoaXBzKGVsZSwgcGxheWVyKSB7XG4gIGNvbnN0IG1pbmlGbGVldHMgPSBgXG4gIDxkaXYgY2xhc3M9XCJmbGVldC1ob2xkZXIgJHtwbGF5ZXJ9XCI+XG4gICAgPGRpdiBjbGFzcz1cIm1pbmktc2hpcC1vd25lclwiPiR7cGxheWVyfTwvZGl2PlxuPGRpdiBjbGFzcz1cIm1pbmktY2FycmllciAgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J2NhcnJpZXInPjwvZGl2PlxuPGRpdiBjbGFzcz1cIm1pbmktYmF0dGxlU2hpcCAgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J2JhdHRsZVNoaXAnPjwvZGl2PlxuPGRpdiBjbGFzcz1cInNhbWUtc2l6ZS1zaGlwc1wiPlxuICA8ZGl2IGNsYXNzPVwibWluaS1kZXN0cm95ZXIgIG1pbmktc2hpcC1zaXplXCIgZGF0YS1uYW1lPSdkZXN0cm95ZXInPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWluaS1zdWJtYXJpbmUgbWluaS1zaGlwLXNpemVcIiBkYXRhLW5hbWU9J3N1Ym1hcmluZSc+PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtaW5pLXBhdHJvbCBtaW5pLXNoaXAtc2l6ZVwiIGRhdGEtbmFtZT0ncGF0cm9sJz48L2Rpdj5cbjwvZGl2PmA7XG4gIGVsZS5pbm5lckhUTUwgPSBtaW5pRmxlZXRzO1xufVxuLy9mdW5jdGlvbiBhY2NlcHQgbWluaSBzaGlwcyBkaXZzLCBzdW5rIHNoaXAgbmFtZXMgYXMgYW4gYXJyYXkgYW5kIGNoYW5nZSBjb2xvciBvZiBkaXZzIHVzaW5nIGRhdGFzZXQgc2FtZSBhcyBzaGlwIG5hbWVcblxuZnVuY3Rpb24gdXBkYXRlTWluaVNoaXBzKHNoaXBzRGl2LCBzdW5rU2hpcEFycmF5LCBjb2xvcikge1xuICBpZiAoc3Vua1NoaXBBcnJheS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgc2hpcHNEaXYuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHN1bmtTaGlwQXJyYXkuZm9yRWFjaCgoc3Vua1NoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmRhdGFzZXQubmFtZSA9PT0gc3Vua1NoaXApIHtcbiAgICAgICAgc2hpcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgJHtjb2xvcn1gO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHdpbm5lck1vZGFsKG1zZykge1xuICBjb25zdCB3aW5uZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2lubmVyXVwiKTtcbiAgY29uc3QgaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdGVtcGxhdGUgPSBgICA8ZGlhbG9nIGRhdGEtd2lubmVyLW1vZGFsIGNsYXNzPVwid2lubmVyLW1vZGFsXCI+XG4gIDxkaXYgY2xhc3M9XCJ3aW5uZXItaG9sZGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cIndpbm5lci1ib2FyZFwiIGRhdGEtd2lubmVyPiR7bXNnfTwvZGl2PlxuICAgIDxidXR0b24gY2xhc3M9XCJyZW1hdGNoLWJ0blwiIGRhdGEtcmVtYXRjaC1idG4+UmVtYXRjaDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGlhbG9nPmA7XG4gIHdpbm5lckRpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGhvbGRlci5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgd2lubmVyRGl2LmFwcGVuZENoaWxkKGhvbGRlcik7XG59XG5cbi8vZm9ybSB0byBhY2NlcHQgcGxheWVycyBuYW1lXG5mdW5jdGlvbiBmb3JtVGVtcGxhdGUoZWxlKSB7XG4gIGNvbnN0IHRlbXBsYXRlID0gYCA8Zm9ybSBmb3I9XCJwbGF5ZXItbmFtZVwiPlxuPGRpdiBjbGFzcz1cImlucHV0LWhvbGRlclwiPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgaWQ9XCJwbGF5ZXItb25lLW5hbWVcIlxuICAgIGNsYXNzPVwicGxheWVyLW5hbWUtaW5wdXRcIlxuICAgIGRhdGEtcGxheWVyLW9uZVxuICAgIHJlcXVpcmVkXG4gIC8+XG4gIDxsYWJlbCBmb3I9XCJwbGF5ZXItb25lLW5hbWVcIiBjbGFzcz1cInBsYXllci1vbmUtbGFiZWxcIlxuICAgID5QbGF5ZXItT25lLU5hbWU6PC9sYWJlbFxuICA+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJpbnB1dC1ob2xkZXJcIj5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIGlkPVwicGxheWVyLXR3by1uYW1lXCJcbiAgICBjbGFzcz1cInBsYXllci1uYW1lLWlucHV0XCJcbiAgICBkYXRhLXBsYXllci10d29cbiAgICByZXF1aXJlZFxuICAvPlxuICA8bGFiZWwgZm9yPVwicGxheWVyLXR3by1uYW1lXCIgY2xhc3M9XCJwbGF5ZXItdHdvLWxhYmVsXCIgZGF0YS1wbGF5ZXJUd29cbiAgICA+UGxheWVyIFR3byBOYW1lOjwvbGFiZWxcbiAgPlxuPC9kaXY+XG48YnV0dG9uIGRhdGEtc3VibWl0LW5hbWUgY2xhc3M9XCJzdWJtaXQtYnRuXCIgPlN0YXJ0PC9idXR0b24+XG48L2Zvcm0+YDtcbiAgZWxlLmlubmVySFRNTCA9IHRlbXBsYXRlO1xufVxuXG4vL2ZpeCBncmFtbWVyXG5mdW5jdGlvbiBmaXhUeXBvKHBsYXllck9uZU5hbWUsIHBsYXllclR3b05hbWUpIHtcbiAgY29uc3QgbWluaVNoaXBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWluaS1zaGlwLW93bmVyXCIpO1xuICBjb25zdCB0dXJuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItdHVyblwiKTtcbiAgY29uc3QgZGl2QXJyYXkgPSBbLi4ubWluaVNoaXBCb2FyZF07XG4gIGRpdkFycmF5WzBdLnN0eWxlLmNvbG9yID0gXCIjMDBmZjNlXCI7XG4gIGRpdkFycmF5WzFdLnN0eWxlLmNvbG9yID0gXCIjMWZkMWNlXCI7XG4gIGlmIChwbGF5ZXJPbmVOYW1lICE9PSBcInlvdVwiKSB7XG4gICAgZGl2QXJyYXlbMF0udGV4dENvbnRlbnQgPSBgJHtwbGF5ZXJPbmVOYW1lfSdzIGZsZWV0YDtcbiAgICBkaXZBcnJheVsxXS50ZXh0Q29udGVudCA9IGAke3BsYXllclR3b05hbWV9J3MgZmxlZXRgO1xuICB9IGVsc2UgaWYgKHBsYXllck9uZU5hbWUgPT09IFwieW91XCIpIHtcbiAgICBkaXZBcnJheVswXS50ZXh0Q29udGVudCA9IGAke3BsYXllck9uZU5hbWV9J3JlIGZsZWV0YDtcbiAgICBkaXZBcnJheVsxXS50ZXh0Q29udGVudCA9IGAke3BsYXllclR3b05hbWV9J3MgZmxlZXRgO1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSBgWW91J3JlIHR1cm5gO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIHNjcmVlbkNvbnRyb2xsZXIsXG4gIHRlbXBsYXRlU2hpcEdyaWQsXG4gIHNoaXBzUGxhY2VtZW50LFxuICBkcmFnU2hpcHMsXG4gIGNvdW50ZG93bk1vZGFsLFxuICByYW5kb21QbGFjZW1lbnQsXG4gIGRyYXdGaXJzdFBhZ2UsXG4gIGludHJvUGFnZSxcbiAgZm9ybVRlbXBsYXRlLFxufTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCwgU2hpcCB9IGZyb20gXCIuLi91dGlsaXR5XCI7XG5mdW5jdGlvbiByZVBvc2l0aW9uKHBsYXllciwgc2hpcHNBcnJheSwgc2hpcCkge1xuICAvL2lmIHRoZSBzaGlwIGlzIGxlbmd0aCAyIGJ1dHMgaXQncyBwb3NpdGlvbiBwcm9wZXJ0eVxuICAvLyBjb250YWluIG1vcmUgdGhhbiAyIGNvb3JkaW5hdGUgcmVtb3ZlIHRob3NlIGV4Y2VwdCB0aGUgbGFzdCB0d28gYW5kIHVwZGF0ZVxuICBjb25zdCBhbGxTaGlwUG9zaXRpb25zID0gcGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zO1xuICBjb25zdCBjZWxsc1RvUmVtb3ZlZCA9IHNoaXBzQXJyYXkuc2xpY2UoMCwgc2hpcHNBcnJheS5sZW5ndGggLSBzaGlwLmxlbmd0aCk7XG4gIGNlbGxzVG9SZW1vdmVkLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBhbGxTaGlwUG9zaXRpb25zLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGlmIChjb29yZGluYXRlLnRvU3RyaW5nKCkgPT09IGNlbGwudG9TdHJpbmcoKSkge1xuICAgICAgICAvL3VwZGF0ZSBvYmpcbiAgICAgICAgYWxsU2hpcFBvc2l0aW9ucy5zcGxpY2UoYWxsU2hpcFBvc2l0aW9ucy5pbmRleE9mKGNvb3JkaW5hdGUpLCAxKTtcbiAgICAgICAgc2hpcHNBcnJheS5zcGxpY2Uoc2hpcHNBcnJheS5pbmRleE9mKGNlbGwpLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBwbGFjZVBsYXllclNoaXBIb3Jpem9udGFsKHBsYXllciwgaW5kZXgsIHNoaXApIHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBwbGF5ZXIuYm9hcmQuY29vcmRpbmF0ZXNIYXNoTWFwO1xuICBjb25zdCBjb252ZXJ0SW5kZXggPSBjb29yZGluYXRlcy5nZXQoTnVtYmVyKGluZGV4KSk7XG4gIGNvbnN0IHNoaXBDZWxscyA9IHBsYXllci5ib2FyZC5wbGFjZVZlcnRpY2FsKGNvbnZlcnRJbmRleCwgc2hpcCk7XG4gIGNvbnN0IHRha2VuQ2VsbHMgPSBzaGlwLnBvc2l0aW9ucztcbiAgaWYgKHNoaXAucG9zaXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vb2NjdXBpZWQgcmV0dXJuIG51bGxcbiAgICBpZiAoc2hpcENlbGxzID09PSBudWxsKSB7XG4gICAgICBwbGF5ZXIuYm9hcmQucGxhY2VSYW5kb20oc2hpcCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlUG9zaXRpb24ocGxheWVyLCB0YWtlbkNlbGxzLCBzaGlwKTtcbiAgfVxufVxuZnVuY3Rpb24gcGxhY2VQbGF5ZXJTaGlwVmVydGljYWwocGxheWVyLCBpbmRleCwgc2hpcCkge1xuICBjb25zdCBjb29yZGluYXRlcyA9IHBsYXllci5ib2FyZC5jb29yZGluYXRlc0hhc2hNYXA7XG4gIGNvbnN0IGNvbnZlcnRJbmRleCA9IGNvb3JkaW5hdGVzLmdldChOdW1iZXIoaW5kZXgpKTtcbiAgY29uc3QgdGFrZW5DZWxscyA9IHNoaXAucG9zaXRpb25zO1xuICBpZiAoc2hpcC5wb3NpdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlSG9yaXpvbnRhbChjb252ZXJ0SW5kZXgsIHNoaXApO1xuICB9IGVsc2Uge1xuICAgIHJlUG9zaXRpb24ocGxheWVyLCB0YWtlbkNlbGxzLCBzaGlwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3R3JpZHMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuICByZXR1cm4gZ3JpZDtcbn1cblxuZnVuY3Rpb24gYWxsb3dEcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuZnVuY3Rpb24gZHJhZyhlKSB7XG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGUudGFyZ2V0LmlkKTtcbn1cbmZ1bmN0aW9uIGRyb3AoZSwgbmV3UGxheWVyKSB7XG4gIGNvbnN0IHNoaXBzID0gbmV3UGxheWVyLmJvYXJkLnNoaXBzQXJyYXk7XG4gIGNvbnN0IGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgLy9pZiB0aGUgc2hpcCBpcyBvdmVyIG9uIHRoZSB0b3Agb2YgYW5vdGhlciBzaGlwIGl0IHJldHVybiB1bmRlZmluZWRcbiAgaWYgKGluZGV4ID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZGF0YSA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpO1xuICAgIGNvbnN0IGRyYWdnZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKTtcbiAgICBjb25zdCBzaGlwRGlyZWN0aW9uID0gZ2V0U2hpcERpcmVjdGlvbkNsYXNzKGRyYWdnZWQsIGRhdGEpO1xuICAgIGNvbnN0IHNoaXBJbmRleCA9IHdoaWNoU2hpcENsaWNrZWQoc2hpcHMsIGRhdGEpO1xuICAgIGUudGFyZ2V0LmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGlmIChzaGlwRGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgcGxhY2VQbGF5ZXJTaGlwSG9yaXpvbnRhbChuZXdQbGF5ZXIsIGluZGV4LCBzaGlwc1tzaGlwSW5kZXhdKTtcbiAgICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgcGxhY2VQbGF5ZXJTaGlwVmVydGljYWwobmV3UGxheWVyLCBpbmRleCwgc2hpcHNbc2hpcEluZGV4XSk7XG4gICAgfVxuICB9XG59XG5cbi8vIHB1dCBzaGlwIGRpcmVjdGlvbiBjbGFzcyBhdCBsYXN0IGFuZCB0byBjaGFuZ2UgaXQgdG8gaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuZnVuY3Rpb24gZ2V0U2hpcERpcmVjdGlvbkNsYXNzKGVsZW1lbnQsIG5hbWUpIHtcbiAgY29uc3Qgc2hpcE5hbWUgPSBuYW1lO1xuICBjb25zdCBhbGxDbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gIGNvbnN0IGRpcmVjdGlvbkNsYXNzID0gYWxsQ2xhc3NOYW1lW2FsbENsYXNzTmFtZS5sZW5ndGggLSAxXS5zcGxpdChcIi1cIik7XG4gIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBkaXJlY3Rpb25DbGFzc1sxXTtcbiAgcmV0dXJuIHNoaXBEaXJlY3Rpb247XG59XG4vL2ZsaXAgdGhlIHNoaXAgZGlyZWN0aW9uIG9uIGNsaWNrIGlmIGl0IGlzIHZhbGlkXG5mdW5jdGlvbiBmbGlwKGUsIG5ld1BsYXllcikge1xuICBjb25zdCBzaGlwcyA9IG5ld1BsYXllci5ib2FyZC5zaGlwc0FycmF5O1xuICBjb25zdCBzaGlwID0gZS50YXJnZXQ7XG4gIGNvbnN0IHNoaXBOYW1lID0gZS50YXJnZXQuaWQ7XG4gIGNvbnN0IHNoaXBEaXJlY3Rpb24gPSBnZXRTaGlwRGlyZWN0aW9uQ2xhc3Moc2hpcCwgc2hpcE5hbWUpO1xuICBjb25zdCBpbmRleCA9IHdoaWNoU2hpcENsaWNrZWQoc2hpcHMsIHNoaXBOYW1lKTtcblxuICBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBwb3NpdGlvblRlbXBTaGlwKHNoaXBzLCBpbmRleCwgXCJ2ZXJ0aWNhbFwiLCBuZXdQbGF5ZXIpO1xuICAgIGlmIChyZXN1bHQgIT09ICBmYWxzZSkge1xuICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKGAke3NoaXBOYW1lfS1ob3Jpem9udGFsYCk7XG4gICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoYCR7c2hpcE5hbWV9LXZlcnRpY2FsYCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHBvc2l0aW9uVGVtcFNoaXAoc2hpcHMsIGluZGV4LCBcImhvcml6b250YWxcIiwgbmV3UGxheWVyKTtcblxuICAgIGlmIChyZXN1bHQgIT09ZmFsc2UpIHtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShgJHtzaGlwTmFtZX0tdmVydGljYWxgKTtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChgJHtzaGlwTmFtZX0taG9yaXpvbnRhbGApO1xuICAgIH1cbiAgfVxuXG4gIC8vZnVuY3Rpb24gYWNjZXB0IHNoaXBzIGFycmF5LCBpbmRleCAgb2YgdGhlIHNoaXAsZmxpcCBkaXJlY3Rpb24gYW5kIHBsYXllciAgdG8gcmVwbGljYXRlIHRoYXQgc2hpcCBpblxuICAvL2RpZmZlcmVudCBwb3NpdGlvbnMoZGlyZWN0aW9uKSBhbmQgcmV0dXJuIGJvb2xlYW4gZm9yIGVhY2ggcG9zaXRpb24gYW5kIGZsaXAgZm9yIHZhbGlkIGRpcmVjdGlvblxuICBmdW5jdGlvbiBwb3NpdGlvblRlbXBTaGlwKHNoaXBzLCBpbmRleCwgZGlyZWN0aW9uLCBwbGF5ZXIpIHtcbiAgICBjb25zdCBmaXJzdENvb3JkaW5hdGUgPSBzaGlwc1tpbmRleF0ucG9zaXRpb25zWzBdO1xuICAgIC8vd2hlbiBzaGlwIGNsaWNrZWQgb3V0c2lkZSB0aGUgYm9hcmQgcmV0dXJuIHVuZGVmaWVuZFxuICAgIGlmIChmaXJzdENvb3JkaW5hdGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCB0ZW1wU2hpcCA9IFNoaXAoc2hpcHNbaW5kZXhdLnNoaXBOYW1lLCBzaGlwc1tpbmRleF0ubGVuZ3RoKTtcbiAgICBjb25zdCB0ZW1wU2hpcHMgPSBbXTtcbiAgICB0ZW1wU2hpcHMucHVzaCh0ZW1wU2hpcCk7XG4gICAgY29uc3QgdGVtcEJvYXJkID0gR2FtZUJvYXJkKHRlbXBTaGlwKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgdGVtcEJvYXJkLnBsYWNlVmVydGljYWwoZmlyc3RDb29yZGluYXRlLCB0ZW1wU2hpcCk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgdGVtcEJvYXJkLnBsYWNlSG9yaXpvbnRhbChmaXJzdENvb3JkaW5hdGUsIHRlbXBTaGlwKTtcbiAgICB9XG4gICAgLy9jaGVjayB0aGUgbmV3IHBvc2l0aW9uIGV4Y2VwdCB0aGUgZmlyc3QgY29vcmRpbmF0ZVxuICAgIGNvbnN0IHJlc3VsdCA9IGlzQ29vcmRpbmF0ZUZyZWUoXG4gICAgICB0ZW1wU2hpcC5wb3NpdGlvbnMuc2xpY2UoMSksXG4gICAgICBwbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnNcbiAgICApO1xuICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgIC8vdXBkYXRlIHNoaXAgcG9zaXRpb24gaW4gc2hpcCBhbmQgcGxheWVyIG9iamVjdFxuICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSB0ZW1wU2hpcC5wb3NpdGlvbnM7XG4gICAgICByZW1vdmVDb29yZGluYXRlKHNoaXBzW2luZGV4XS5wb3NpdGlvbnMsIHBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucyk7XG4gICAgICBzaGlwc1tpbmRleF0ucG9zaXRpb25zID0gW107XG4gICAgICBzaGlwc1tpbmRleF0ucG9zaXRpb25zID0gbmV3UG9zaXRpb247XG4gICAgICBuZXdQb3NpdGlvbi5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIHBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5wdXNoKGNvb3JkaW5hdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbi8vZ2V0IHNwZWNpZmljIHNoaXAgZnJvbSBzaGlwcyBvYmplY3QgYXJyYXlcbmZ1bmN0aW9uIHdoaWNoU2hpcENsaWNrZWQoYXJyYXksIHNoaXBOYW1lKSB7XG4gIGxldCBpbmRleCA9IG51bGw7XG4gIGFycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBpZiAoKHNoaXAuc2hpcE5hbWUudG9TdHJpbmcoKSA9PT0gc2hpcE5hbWUudG9TdHJpbmcoKSkgPT09IHRydWUpIHtcbiAgICAgIGluZGV4ID0gYXJyYXkuaW5kZXhPZihzaGlwKTtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaW5kZXg7XG59XG4vL3JlbW92ZSBjb29yZGluYXRlIGZvciBmbGlwIHNoaXBzXG5mdW5jdGlvbiByZW1vdmVDb29yZGluYXRlKHNoaXBQb3NpdGlvbiwgdGFrZW5Qb3NpdGlvbnMpIHtcbiAgc2hpcFBvc2l0aW9uLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgdGFrZW5Qb3NpdGlvbnMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKGNvb3JkaW5hdGUudG9TdHJpbmcoKSA9PT0gcG9zaXRpb24udG9TdHJpbmcoKSkge1xuICAgICAgICB0YWtlblBvc2l0aW9ucy5zcGxpY2UodGFrZW5Qb3NpdGlvbnMuaW5kZXhPZihjb29yZGluYXRlKSwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuLy9jaGVjayB0aGUgY2VsbCBpcyBmcmVlXG5mdW5jdGlvbiBpc0Nvb3JkaW5hdGVGcmVlKHNoaXBQb3NpdGlvbiwgdGFrZW5Qb3NpdGlvbnMpIHtcbiAgbGV0IHJlc3VsdCA9IHRydWU7XG4gIHNoaXBQb3NpdGlvbi5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgdGFrZW5Qb3NpdGlvbnMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgaWYgKGNlbGwudG9TdHJpbmcoKSA9PT0gY29vcmRpbmF0ZS50b1N0cmluZygpKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vZHJhdyBkcmFnZ2VkIGFuZCBkcm9wcGVkIHNoaXBzIHRvIGluaXRpYWxpemUsIGl0IHVzZSBzaGlwIG9iamVjdCBwcm9wZXJ0aWVzXG5mdW5jdGlvbiBkcmF3U2hpcHMoc2hpcHMpIHtcbiAgY29uc3QgZGl2SG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2SG9sZGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHJvcC1zaGlwc1wiKTtcbiAgZGl2SG9sZGVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3NoaXAuc2hpcE5hbWV9YCk7XG4gICAgZGl2LmRhdGFzZXQubGVuZ3RoID0gYCR7c2hpcC5sZW5ndGh9YDtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNpemVcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoYCR7c2hpcC5zaGlwTmFtZX0taG9yaXpvbnRhbGApO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICAgIGRpdkhvbGRlci5hcHBlbmRDaGlsZChkaXYpO1xuICB9KTtcbiAgcmV0dXJuIGRpdkhvbGRlcjtcbn1cblxuZnVuY3Rpb24gZHJhZ1NoaXBzKG5ld1BsYXllciwgc2hpcHMpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1jb250YWluZXJcIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNoaXBzLWNvbnRhaW5lcl1cIik7XG4gIGNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXktYnRuXCIpO1xuICBwbGF5QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRyYXdHcmlkcygpKTtcbiAgc2hpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBzaGlwc0NvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRyYXdTaGlwcyhzaGlwcykpO1xuICBzaGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGNvbnN0IHNoaXBzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG4gIHNoaXBzRGl2LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICAgIGRyYWcoZSk7XG4gICAgfSk7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGZsaXAoZSwgbmV3UGxheWVyKTtcbiAgICB9KTtcbiAgfSk7XG4gIC8vZHJvcCB6b25lIG9yIGdyaWQgY2VsbHNcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgICBhbGxvd0Ryb3AoZSk7XG4gICAgfSk7XG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICBkcm9wKGUsIG5ld1BsYXllcik7XG4gICAgICBjb25zdCB0b3RhbExlbmd0aCA9IG5ld1BsYXllci5ib2FyZC5zaGlwc0FycmF5LnJlZHVjZSgodG90YWwsIHNoaXApID0+IHtcbiAgICAgICAgcmV0dXJuICh0b3RhbCArPSBzaGlwLmxlbmd0aCk7XG4gICAgICB9LCAwKTtcbiAgICAgIC8vY2hlY2sgYWxsIHNoaXAgbGVuZ3RoIHN1bSBpcyBlcXVhbCB0byB0b3RhbCBzaGlwIGRyb3BwZWQgYW5kIHVwZGF0ZSBwbGF5ZXIgb2JqZWN0XG4gICAgICBpZiAobmV3UGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA9PT0gdG90YWxMZW5ndGgpIHtcbiAgICAgICAgcGxheUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJhbmRvbWx5UGxhY2VTaGlwcyhwbGF5ZXIpIHtcbiAgcGxheWVyLmJvYXJkLnNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHBsYXllci5ib2FyZC5wbGFjZVJhbmRvbShzaGlwKTtcbiAgfSk7XG4gIHJldHVybiBwbGF5ZXI7XG59XG5leHBvcnQgeyBkcmF3R3JpZHMsIGRyYWdTaGlwcywgcmFuZG9tbHlQbGFjZVNoaXBzIH07XG4iLCIvL2ltcG9ydCB7IHNoaXBzIH0gZnJvbSBcIi4vZG9tLXN0dWZmXCI7XG5cbi8qKlxuICpzaGlwICBoYXMgbmFtZSxsZW5ndGggYW5kIGhpdHMscG9zaXRpb24gYXMgcHJvcGVydHkgYW5kIGlzU3VuayBhbmQgaGl0IGFzIG1ldGhvZFxuICpzaGlwLnBvc2l0aW9uIC0gaXMgYW4gYXJyYXkgdGhhdCBob2xkIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGlwLlxuICpzaGlwLmlzU3VuaygpIC0gdG8gY2hlY2sgdGhlIHNoaXAgaXMgc3VuayBvciBub3QgcmV0dXJuIGJvb2xlYW5cbiAqc2hpcC5oaXQoc2hpcC5oaXRzKSAtIGluY3JlYXNlIHNoaXAgaGl0cyBvbiBieSBvbmUgZWFjaCB0aW1lIGl0IGlzIGNhbGxlZC5cbiAqIEBwYXJhbSB7Kn0gc2hpcE5hbWVcbiAqIEBwYXJhbSB7Kn0gbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIFNoaXAoc2hpcE5hbWUsIGxlbmd0aCkge1xuICBjb25zdCBoaXRzID0gMDtcbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIHRoaXMuaGl0cysrO1xuICB9XG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gbGVuZ3RoIDw9IHRoaXMuaGl0cyA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2hpcE5hbWUsXG4gICAgbGVuZ3RoLFxuICAgIGhpdHMsXG4gICAgcG9zaXRpb25zOiBbXSxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufVxuLyoqXG4gKiBHYW1lQm9hcmQuY3JlYXRlQm9hcmQgLSBjcmVhdGVzIGJvYXJkIHdpdGggW3gseV0gY29vcmRpbmF0ZSBiYXNlZCBvbiByb3cgYW5kIGNvbHVtbiBudW1iZXIgXG4gKiBhbmQgcmV0dXJuIGJvYXJkIGFuZCB0d28gaGFzaG1hcCB0aGF0IGNvbnRhaW4gbnVtYmVyIGFuZCBjb3JyZXNwb25kaW5nIGNvb3JkaW5hdGUoMCwgWzAsMF0pIGFuZCB0aGUgc2Vjb25kIG9uZSBpbnZlcnNlIChbMCwwXSwgMCkuXG4gKiBcbiAqIEdhbWVCb2FyZC5wb3NpdGlvbihhcnJheSxsZW5ndGgpIC0gYWNjZXB0IGNvb3JkaW5hdGVbeCwgeV0gYW5kIHNoaXAgbGVuZ3RoIHRoZW4gY2FsY3VsYXRlIHRoZSBzcGFjZSB0aGUgc2hpcCB0YWtlcyBvbiAxMCB4IDEwIGJvYXJkIGFuZCBcbiAqIHJldHVybiBhcnJheSBvZiBjb29yZGluYXRlcy5cbiAqXG4gKiBHYW1lQm9hcmQucmFuZG9tbHlQb3NpdGlvbihsZW5ndGgpIC0gYWNjZXB0IHNoaXAgbGVuZ3RoIHRoZW4gcmV0dXJuIHZlcnRpY2FsIG9yIGhvcml6b250YWwgY2VsbCBcbiAqIHRoYXQgdGhlIHNoaXAgd2lsbCB0YWtlcyBjb29yZGluYXRlcyBhcyBhbiBhcnJheSBieSBjYWxsaW5nIGl0IHNlbGYgcmVjdXJzaXZlbHkgaWYgdGhlIHBvc2l0aW9uIG9jY3VwaWVkLlxuICogXG4gKiBHYW1lQm9hcmQucGxhY2VWZXJ0aWNhbCAmJiBHYW1lQm9hcmQuIHBsYWNlSG9yaXpvbnRhbCAtIG1ldGhvZHMgdXNlIHRvIHBsYWNlIHNoaXAgbWFudWFsbHkgYnkgYWNjZXB0aW5nIGNvb3JkaW5hdGVzKFt4LHldIGFuZCBzaGlwKSByZXR1cm4gYXJyYXkgb2YgY29vcmRpbmF0ZSB0aGUgc2hpcCB3aWxsIHRha2UuXG4gKiBhbmQgdXBkYXRlIHNoaXBzIHBvc2l0aW9uIGFuZCBzdG9yZSBjb29yZGluYXRlIHRvIHRoZSBzaGlwLlxuICogIFxuICogR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sgLSBhY2NlcHQgY29vcmRpbmF0ZSBbeCx5XSAsY2hlY2sgaXQgaXMgbWlzc2VkIG9yIGhpdCBzaG90ICxyZXBvcnQgYWxsIHRoZSBzaGlwIGlzIHN1bmsgb3Igbm90IFxuICogYW5kIGNhbGwgaGl0IG9uIHNwZWNpZmljIHNoaXAgaWYgaXQgaXMgYSBoaXQuIFxuXG4gKi9cbmZ1bmN0aW9uIEdhbWVCb2FyZChzaGlwc0FycmF5KSB7XG4gIGNvbnN0IHNoaXBzUG9zaXRpb25zID0gW107XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoMTAsIDEwKTtcbiAgY29uc3QgY29vcmRpbmF0ZXNIYXNoTWFwID0gYm9hcmQuYWxsQ29vcmRpbmF0ZXM7XG4gIGNvbnN0IGludmVyc2VIYXNoTWFwID0gYm9hcmQuaW52ZXJzZUNvb3JkaW5hdGU7XG4gIGNvbnN0IG1pc3NlZFNob3RzID0gW107XG4gIGNvbnN0IGhpdFNob3RzID0gW107XG5cbiAgZnVuY3Rpb24gY3JlYXRlQm9hcmQocm93LCBjb2wpIHtcbiAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgIGNvbnN0IGFsbENvb3JkaW5hdGVzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGludmVyc2VDb29yZGluYXRlID0gbmV3IE1hcCgpO1xuICAgIGxldCBrID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgICBib2FyZFtpXSA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHJvdzsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNvbDsgeSsrKSB7XG4gICAgICAgIGJvYXJkW3hdW3ldID0gW3gsIHldO1xuICAgICAgICBhbGxDb29yZGluYXRlcy5zZXQoaywgW3gsIHldKTtcbiAgICAgICAgaW52ZXJzZUNvb3JkaW5hdGUuc2V0KFt4LCB5XS50b1N0cmluZygpLCBrKTtcbiAgICAgICAgaysrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBib2FyZCwgYWxsQ29vcmRpbmF0ZXMsIGludmVyc2VDb29yZGluYXRlIH07XG4gIH1cblxuICBmdW5jdGlvbiBQb3NpdGlvbihjb29yZGluYXRlLCBzaGlwTGVuZ3RoKSB7XG4gICAgY29uc3QgaG9yaXpvbnRhbCA9IFtdO1xuICAgIGNvbnN0IHZlcnRpY2FsID0gW107XG4gICAgY29uc3QgeCA9IGNvb3JkaW5hdGVbMF07XG4gICAgY29uc3QgeSA9IGNvb3JkaW5hdGVbMV07XG4gICAgLy9beCx5XSA9IGlmIHggKyBsZW5ndGggPCBsZW5ndGhcbiAgICBpZiAoeCArIHNoaXBMZW5ndGggPCAxMCAmJiB5ICsgc2hpcExlbmd0aCA8IDEwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBob3Jpem9udGFsLnB1c2goW3ggKyBpLCB5XSk7XG4gICAgICAgIHZlcnRpY2FsLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh4ICsgc2hpcExlbmd0aCA+PSAxMCAmJiB5ICsgc2hpcExlbmd0aCA+PSAxMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaG9yaXpvbnRhbC5wdXNoKFt4IC0gaSwgeV0pO1xuICAgICAgICB2ZXJ0aWNhbC5wdXNoKFt4LCB5IC0gaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeCArIHNoaXBMZW5ndGggPj0gMTAgJiYgeSArIHNoaXBMZW5ndGggPCAxMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaG9yaXpvbnRhbC5wdXNoKFt4IC0gaSwgeV0pO1xuICAgICAgICB2ZXJ0aWNhbC5wdXNoKFt4LCB5ICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeCArIHNoaXBMZW5ndGggPCAxMCAmJiB5ICsgc2hpcExlbmd0aCA+PSAxMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaG9yaXpvbnRhbC5wdXNoKFt4ICsgaSwgeV0pO1xuICAgICAgICB2ZXJ0aWNhbC5wdXNoKFt4LCB5IC0gaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBob3Jpem9udGFsLCB2ZXJ0aWNhbCB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbChjb29yZGluYXRlLCBzaGlwKSB7XG4gICAgY29uc3Qgc2hpcENlbGxzID0gUG9zaXRpb24oY29vcmRpbmF0ZSwgc2hpcC5sZW5ndGgpLnZlcnRpY2FsO1xuICAgIGlmIChpc0Nvb3JkaW5hdGVGcmVlKHNoaXBDZWxscywgc2hpcHNQb3NpdGlvbnMpID09PSBmYWxzZSkgcmV0dXJuIG51bGw7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwc1Bvc2l0aW9ucyk7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwLnBvc2l0aW9ucyk7XG4gICAgcmV0dXJuIHNoaXBDZWxscztcbiAgfVxuICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWwoY29vcmRpbmF0ZSwgc2hpcCkge1xuICAgIGNvbnN0IHNoaXBDZWxscyA9IFBvc2l0aW9uKGNvb3JkaW5hdGUsIHNoaXAubGVuZ3RoKS5ob3Jpem9udGFsO1xuICAgIGlmIChpc0Nvb3JkaW5hdGVGcmVlKHNoaXBDZWxscywgc2hpcHNQb3NpdGlvbnMpID09PSBmYWxzZSkgcmV0dXJuIG51bGw7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwc1Bvc2l0aW9ucyk7XG4gICAgdHdvRGltZW5zaW9uQXJyYXkoc2hpcENlbGxzLCBzaGlwLnBvc2l0aW9ucyk7XG4gICAgcmV0dXJuIHNoaXBDZWxscztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbUZyZWVDb29yZGluYXRlKCkge1xuICAgIGNvbnN0IHJhbmRvbU51bSA9IHJhbmRvbUNlbGwoMTAwKTtcbiAgICBjb25zdCByZWxhdGVkQ29vcmRpbmF0ZSA9IGNvb3JkaW5hdGVzSGFzaE1hcC5nZXQocmFuZG9tTnVtKTtcbiAgICBpZiAoc2hpcHNQb3NpdGlvbnMuaW5jbHVkZXMocmVsYXRlZENvb3JkaW5hdGUpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJlbGF0ZWRDb29yZGluYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmFuZG9tRnJlZUNvb3JkaW5hdGUoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcmFuZG9tQ2VsbChudW0pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQ29vcmRpbmF0ZUZyZWUoc2hpcFBvc2l0aW9uLCB0YWtlblBvc2l0aW9ucykge1xuICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgIHNoaXBQb3NpdGlvbi5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICB0YWtlblBvc2l0aW9ucy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIGlmIChjZWxsLnRvU3RyaW5nKCkgPT09IGNvb3JkaW5hdGUudG9TdHJpbmcoKSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gc2hpcERpcmVjdGlvbigpIHtcbiAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLnJhbmRvbSgpID49IDAuNTtcbiAgICByZXR1cm4gcmFuZG9tTnVtID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gIH1cbiAgZnVuY3Rpb24gcGxhY2VSYW5kb20oc2hpcCkge1xuICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gcmFuZG9tbHlQb3NpdGlvbihzaGlwLmxlbmd0aCk7XG4gICAgbmV3UG9zaXRpb24uZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgc2hpcC5wb3NpdGlvbnMucHVzaChjb29yZGluYXRlKTtcbiAgICAgIHNoaXBzUG9zaXRpb25zLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld1Bvc2l0aW9uO1xuICB9XG4gIGZ1bmN0aW9uIHJhbmRvbWx5UG9zaXRpb24oc2hpcExlbmd0aCkge1xuICAgIGNvbnN0IHNpZGUgPSBzaGlwRGlyZWN0aW9uKCk7XG4gICAgaWYgKHNpZGUgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gcmFuZG9tRnJlZUNvb3JkaW5hdGUoKTtcbiAgICAgIGNvbnN0IHNwYWNlVGFrZW4gPSBQb3NpdGlvbihjb29yZGluYXRlLCBzaGlwTGVuZ3RoKS5ob3Jpem9udGFsO1xuICAgICAgY29uc3QgcmVzdWx0ID0gaXNDb29yZGluYXRlRnJlZShzcGFjZVRha2VuLCBzaGlwc1Bvc2l0aW9ucyk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNwYWNlVGFrZW47XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJhbmRvbWx5UG9zaXRpb24oc2hpcExlbmd0aCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaWRlID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSByYW5kb21GcmVlQ29vcmRpbmF0ZSgpO1xuICAgICAgY29uc3Qgc3BhY2VUYWtlbiA9IFBvc2l0aW9uKGNvb3JkaW5hdGUsIHNoaXBMZW5ndGgpLnZlcnRpY2FsO1xuICAgICAgY29uc3QgcmVzdWx0ID0gaXNDb29yZGluYXRlRnJlZShzcGFjZVRha2VuLCBzaGlwc1Bvc2l0aW9ucyk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNwYWNlVGFrZW47XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJhbmRvbWx5UG9zaXRpb24oc2hpcExlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vZnVuY3Rpb24gdG8gY29tcGFyZSBjb29yZGluYXRlIGV4aXN0IGluIGFycmF5IG9mIGNvb3JkaW5hdGVzICBieSBjaGFuZ2luZyB0aGVtIHRvIHN0cmluZyBmaXJzdCByZXR1cm4gYm9vbGVhblxuXG4gIGZ1bmN0aW9uIGNoZWNrQ29vcmRpbmF0ZShjb29yZGluYXRlLCBhcnJheSkge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBhcnJheS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgaWYgKGNvb3JkaW5hdGUudG9TdHJpbmcoKSA9PT0gcG9zaXRpb24udG9TdHJpbmcoKSkge1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gaXNIaXQoY29vcmRpbmF0ZSwgYXJyYXkpIHtcbiAgICByZXR1cm4gY2hlY2tDb29yZGluYXRlKGNvb3JkaW5hdGUsIGFycmF5KTtcbiAgfVxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpIHtcbiAgICBpZiAoaXNIaXQoY29vcmRpbmF0ZSwgc2hpcHNQb3NpdGlvbnMpID09PSB0cnVlKSB7XG4gICAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgaWYgKGNoZWNrQ29vcmRpbmF0ZShjb29yZGluYXRlLCBzaGlwLnBvc2l0aW9ucykgPT09IHRydWUpIHtcbiAgICAgICAgICBzaGlwLmhpdCgpO1xuXG4gICAgICAgICAgaGl0U2hvdHMucHVzaChjb29yZGluYXRlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNIaXQoY29vcmRpbmF0ZSwgc2hpcHNQb3NpdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgbWlzc2VkU2hvdHMucHVzaChjb29yZGluYXRlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBzaGlwc1Bvc2l0aW9ucy5sZW5ndGggPD0gaGl0U2hvdHMubGVuZ3RoO1xuICB9XG4gIGZ1bmN0aW9uIHR3b0RpbWVuc2lvbkFycmF5KHR3b0RpbWVuc2lvbkFycmF5LCBvbmVEaW1lbnNpb25BcnJheSkge1xuICAgIHR3b0RpbWVuc2lvbkFycmF5LmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIG9uZURpbWVuc2lvbkFycmF5LnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gc3Vua1NoaXBzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goc2hpcC5zaGlwTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxhY2VWZXJ0aWNhbCxcbiAgICBwbGFjZUhvcml6b250YWwsXG4gICAgcGxhY2VSYW5kb20sXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBpc0hpdCxcbiAgICBpc1N1bmssXG4gICAgc3Vua1NoaXBzLFxuICAgIGNvb3JkaW5hdGVzSGFzaE1hcCxcbiAgICBpbnZlcnNlSGFzaE1hcCxcbiAgICBtaXNzZWRTaG90cyxcbiAgICBoaXRTaG90cyxcbiAgICBzaGlwc1Bvc2l0aW9ucyxcbiAgICBzaGlwc0FycmF5LFxuICB9O1xufVxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgY29uc3QgY2FycmllciA9IFNoaXAoXCJjYXJyaWVyXCIsIDUpO1xuICBjb25zdCBiYXR0bGVTaGlwID0gU2hpcChcImJhdHRsZVNoaXBcIiwgNCk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoXCJkZXN0cm95ZXJcIiwgMyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoXCJzdWJtYXJpbmVcIiwgMyk7XG4gIGNvbnN0IHBhdHJvbCA9IFNoaXAoXCJwYXRyb2xcIiwgMik7XG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIHN1Ym1hcmluZSwgYmF0dGxlU2hpcCwgZGVzdHJveWVyLCBwYXRyb2xdO1xuICBjb25zdCBib2FyZCA9IEdhbWVCb2FyZChzaGlwcyk7XG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgbmFtZSxcbiAgfTtcbn1cbi8vY29tcHV0ZXIgbW92ZSBmdW5jdGlvbiB0aGF0IHJldHVybiBudW1iZXIgbm90IHBpY2tlZCBhbmQgdHJ5IGFkamFjZW50IHNsb3QgaWYgaXQgaGl0IG90aGVyIHNoaXBcbmNvbnN0IHBpY2tlZE51bSA9IFtdO1xuZnVuY3Rpb24gY29tcHV0ZXJNb3ZlKHBsYXllcikge1xuICByZXR1cm4gY29tcHV0ZXJTbG90KCk7XG4gIGZ1bmN0aW9uIGNvbXB1dGVyU2xvdCgpIHtcbiAgICBjb25zdCBuZXh0SGl0cyA9IFtdO1xuICAgIGNvbnN0IGhpdHMgPSBwbGF5ZXIuYm9hcmQuaGl0U2hvdHM7XG4gICAgbGV0IG5laWdoYm9yU2xvdHMgPSBbXTtcbiAgICBpZiAoaGl0cy5sZW5ndGggPiAwKSB7XG4gICAgICBoaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICBhZGphY2VudFNsb3QoaGl0KTtcbiAgICAgICAgdmFsaWRTcG90KCk7XG4gICAgICB9KTtcblxuICAgICAgLy9pZiBiZXR0ZXIgc2xvdCBhcmUgYWxyZWFkeSBwaWNrZWQgdHVuIHRvIHJhbmRvbSBzcG90XG4gICAgICBpZiAobmV4dEhpdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IG1vdmUgPSByYW5kb21TcG90KCk7XG4gICAgICAgIHBpY2tlZE51bS5wdXNoKG1vdmUpO1xuICAgICAgICByZXR1cm4gbW92ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBuZXh0VHJ5ID0gbmV4dEhpdHNbbmV4dEhpdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIHBpY2tlZE51bS5wdXNoKG5leHRUcnkpO1xuICAgICAgICBuZXh0VHJ5ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5leHRIaXRzLnBvcCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV4dEhpdHMubGVuZ3RoID09PSAwICYmIGhpdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBtb3ZlID0gcmFuZG9tU3BvdCgpO1xuICAgICAgcGlja2VkTnVtLnB1c2gobW92ZSk7XG4gICAgICByZXR1cm4gbW92ZTtcbiAgICB9XG5cbiAgICAvL21ldGhvZCB0aGF0IHZlcmlmeSBhZGphY2VudCBzbG90IGlzIG5vdCBwaWNrZWQgYWxyZWFkeSBhbmQgcHV0IHRoZSBuZXcgb25lIGluIHRoZSBxdWV1ZVxuICAgIGZ1bmN0aW9uIHZhbGlkU3BvdCgpIHtcbiAgICAgIGlmIChuZWlnaGJvclNsb3RzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgY29uc3QgYWxsU3BvdHMgPSBwbGF5ZXIuYm9hcmQuaW52ZXJzZUhhc2hNYXA7XG4gICAgICBuZWlnaGJvclNsb3RzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgLy90dXJuIGNvb3JkaW5hdGUgdG8gbnVtYmVyIHVzaW5nIGhhc21hcFxuICAgICAgICBjb25zdCBzcG90ID0gYWxsU3BvdHMuZ2V0KGNvb3JkaW5hdGUudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmIChwaWNrZWROdW0uaW5jbHVkZXMoc3BvdCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgbmV4dEhpdHMucHVzaChzcG90KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBuZWlnaGJvclNsb3RzID0gW107XG4gICAgfVxuICAgIC8vbWV0aG9kIHRoYXQgZ2VuZXJhdGUgbmVpZ2hib3Igc3BvdCBmcm9tIGdpdmVuIGNvb3JkaW5hdGVcbiAgICBmdW5jdGlvbiBhZGphY2VudFNsb3QoaGl0KSB7XG4gICAgICBjb25zdCB4ID0gaGl0WzBdO1xuICAgICAgY29uc3QgeSA9IGhpdFsxXTtcbiAgICAgIGlmICh4ICsgMSA8IDEwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCArIDEsIHldKTtcbiAgICAgIH1cbiAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCAtIDEsIHldKTtcbiAgICAgIH1cbiAgICAgIGlmICh5ICsgMSA8IDEwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCwgeSArIDFdKTtcbiAgICAgIH1cbiAgICAgIGlmICh5IC0gMSA+PSAwKSB7XG4gICAgICAgIG5laWdoYm9yU2xvdHMucHVzaChbeCwgeSAtIDFdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9tZXRob2QgcmV0dXJuIHJhbmRvbSBudW1iZXIgZnJvbSAwIHRvIDEwMFxuICAgIGZ1bmN0aW9uIHJhbmRvbVNwb3QoKSB7XG4gICAgICBsZXQgbW92ZTtcbiAgICAgIGRvIHtcbiAgICAgICAgbW92ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICB9IHdoaWxlIChwaWNrZWROdW0uaW5jbHVkZXMobW92ZSkpO1xuICAgICAgcmV0dXJuIG1vdmU7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzdW0oYSwgYikge1xuICByZXR1cm4gYSArIGI7XG59XG5leHBvcnQgeyBzdW0sIFNoaXAsIEdhbWVCb2FyZCwgUGxheWVyLCBjb21wdXRlck1vdmUgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKmJvZHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMgMzAgNzApO1xufSovXG4uYm9hcmQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNnZtaW4pO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNnZtaW4pO1xuICBnYXA6IDJweDtcbiAgcGFkZGluZzogMC4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbn1cbi5ib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5wbGFjZS1zaGlwcy1idG5zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxcmVtO1xuICB3aWR0aDogODAlO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi10b3A6IDJweDtcbn1cblxuLmRyYWctYnRuLFxuLnBsYXktYnRuLFxuLm5leHQtYnRuLFxuLnJhbmRvbWl6ZS1idG4ge1xuICBwYWRkaW5nOiAwLjZyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XG59XG4ucGxheS1idG4sXG4ubmV4dC1idG4ge1xuICBkaXNwbGF5OiBub25lO1xuICBib3gtc2hhZG93OiAtMXB4IDBweCA5cHggM3B4ICNmZjAwZDQ7XG59XG4uZHJhZy1idG46aG92ZXIsXG4ucmFuZG9taXplLWJ0bjpob3ZlciB7XG4gIGNvbG9yOiBiZWlnZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59XG4uc2hpcHMtY29udGFpbmVyLFxuLmRyb3Atc2hpcHMge1xuICBkaXNwbGF5OiBub25lO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG4gIGdhcDogMnB4O1xuICBtYXgtaGVpZ2h0OiAyMDBweDtcbn1cblxuLmdyaWQtY2VsbCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5kcmFnZ2luZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbn1cbi5mbGV4LWhvcml6b250YWwge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLmZsZXgtdmVydGljYWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnN1Ym1hcmluZS1ob3Jpem9udGFsIHtcbiAgLS13aWR0aDogMztcbn1cbi5zdWJtYXJpbmUtdmVydGljYWwge1xuICAtLWhlaWdodDogMztcbn1cbi5jYXJyaWVyLWhvcml6b250YWwge1xuICAtLXdpZHRoOiA1O1xufVxuLmNhcnJpZXItdmVydGljYWwge1xuICAtLWhlaWdodDogNTtcbn1cbi5wYXRyb2wtaG9yaXpvbnRhbCB7XG4gIC0td2lkdGg6IDI7XG59XG4ucGF0cm9sLXZlcnRpY2FsIHtcbiAgLS1oZWlnaHQ6IDI7XG59XG4uZGVzdHJveWVyLWhvcml6b250YWwge1xuICAtLXdpZHRoOiAzO1xufVxuLmRlc3Ryb3llci12ZXJ0aWNhbCB7XG4gIC0taGVpZ2h0OiAzO1xufVxuLmJhdHRsZVNoaXAtaG9yaXpvbnRhbCB7XG4gIC0td2lkdGg6IDQ7XG59XG4uYmF0dGxlU2hpcC12ZXJ0aWNhbCB7XG4gIC0taGVpZ2h0OiA0O1xufVxuLnNoaXAge1xuICB3aWR0aDogNnZtaW47XG4gIGhlaWdodDogNnZtaW47XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwIDIwMyA1NCk7XG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcbiAgY3Vyc29yOiBncmFiYmluZztcbn1cbi5zaGlwLXNpemUge1xuICB3aWR0aDogY2FsYyg2dm1pbiAqIHZhcigtLXdpZHRoLCAxKSk7XG4gIGhlaWdodDogY2FsYyg2dm1pbiAqIHZhcigtLWhlaWdodCwgMSkpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHJpZ2h0OiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxLCAxNDcsIDEpO1xufVxuXG4udGFyZ2V0LWRvdCB7XG4gIGFzcGVjdC1yYXRpbzogMTtcbiAgd2lkdGg6IDAuOHJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuLm1pc3NlZC1zdHJpa2Uge1xuICBhc3BlY3QtcmF0aW86IDE7XG4gIHdpZHRoOiAwLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbi5taXNzZWQtc3RyaWtlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbiAgYm9yZGVyOiBub25lO1xufVxuLmhpdC1zdHJpa2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjUwMDAwO1xufVxuLyptaW5pIHNoaXBzIHN0eWxlKi9cbi5mbGVldC1ob2xkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5taW5pLXNoaXAtb3duZXIge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cbi5zYW1lLXNpemUtc2hpcHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDE1MHB4O1xufVxuLm1pbmktY2FycmllciB7XG4gIC0td2lkdGg6IDU7XG59XG4ubWluaS1iYXR0bGVTaGlwIHtcbiAgLS13aWR0aDogNDtcbn1cbi5taW5pLWRlc3Ryb3llciB7XG4gIC0td2lkdGg6IDM7XG59XG4ubWluaS1zdWJtYXJpbmUge1xuICAtLXdpZHRoOiAzO1xufVxuLm1pbmktcGF0cm9sIHtcbiAgLS13aWR0aDogMS41O1xufVxuLm1pbmktc2hpcC1zaXplIHtcbiAgd2lkdGg6IGNhbGMoNDBweCAqIHZhcigtLXdpZHRoLCAxKSk7XG4gIGhlaWdodDogMjBweDtcbiAgbWFyZ2luOiAycHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNjYgMTk4IDE2NSk7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wbGFjZS1zaGlwLXBhZ2Uvc2hpcHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7O0VBSUU7QUFDRjtFQUNFLGFBQWE7RUFDYix3Q0FBd0M7RUFDeEMscUNBQXFDO0VBQ3JDLFFBQVE7RUFDUixlQUFlO0VBQ2YsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFNBQVM7RUFDVCxVQUFVO0VBQ1YsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7Ozs7RUFJRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLFlBQVk7RUFDWixxQkFBcUI7QUFDdkI7QUFDQTs7RUFFRSxhQUFhO0VBQ2Isb0NBQW9DO0FBQ3RDO0FBQ0E7O0VBRUUsWUFBWTtFQUNaLHVCQUF1QjtBQUN6QjtBQUNBOztFQUVFLGFBQWE7RUFDYixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsYUFBYTtBQUNmO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFDQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsK0JBQStCO0VBQy9CLHFCQUFxQjtFQUNyQixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLG9DQUFvQztFQUNwQyxzQ0FBc0M7RUFDdEMsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUNBLG1CQUFtQjtBQUNuQjtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxVQUFVO0FBQ1o7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsVUFBVTtBQUNaO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLG1DQUFtQztFQUNuQyxZQUFZO0VBQ1osV0FBVztFQUNYLGtDQUFrQztBQUNwQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKmJvZHkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMgMzAgNzApO1xcbn0qL1xcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDZ2bWluKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA2dm1pbik7XFxuICBnYXA6IDJweDtcXG4gIHBhZGRpbmc6IDAuMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5wbGFjZS1zaGlwcy1idG5zIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBnYXA6IDFyZW07XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbn1cXG5cXG4uZHJhZy1idG4sXFxuLnBsYXktYnRuLFxcbi5uZXh0LWJ0bixcXG4ucmFuZG9taXplLWJ0biB7XFxuICBwYWRkaW5nOiAwLjZyZW07XFxuICBmb250LXNpemU6IDFyZW07XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxufVxcbi5wbGF5LWJ0bixcXG4ubmV4dC1idG4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGJveC1zaGFkb3c6IC0xcHggMHB4IDlweCAzcHggI2ZmMDBkNDtcXG59XFxuLmRyYWctYnRuOmhvdmVyLFxcbi5yYW5kb21pemUtYnRuOmhvdmVyIHtcXG4gIGNvbG9yOiBiZWlnZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG4uc2hpcHMtY29udGFpbmVyLFxcbi5kcm9wLXNoaXBzIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcXG4gIGdhcDogMnB4O1xcbiAgbWF4LWhlaWdodDogMjAwcHg7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5kcmFnZ2luZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XFxufVxcbi5mbGV4LWhvcml6b250YWwge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLmZsZXgtdmVydGljYWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5zdWJtYXJpbmUtaG9yaXpvbnRhbCB7XFxuICAtLXdpZHRoOiAzO1xcbn1cXG4uc3VibWFyaW5lLXZlcnRpY2FsIHtcXG4gIC0taGVpZ2h0OiAzO1xcbn1cXG4uY2Fycmllci1ob3Jpem9udGFsIHtcXG4gIC0td2lkdGg6IDU7XFxufVxcbi5jYXJyaWVyLXZlcnRpY2FsIHtcXG4gIC0taGVpZ2h0OiA1O1xcbn1cXG4ucGF0cm9sLWhvcml6b250YWwge1xcbiAgLS13aWR0aDogMjtcXG59XFxuLnBhdHJvbC12ZXJ0aWNhbCB7XFxuICAtLWhlaWdodDogMjtcXG59XFxuLmRlc3Ryb3llci1ob3Jpem9udGFsIHtcXG4gIC0td2lkdGg6IDM7XFxufVxcbi5kZXN0cm95ZXItdmVydGljYWwge1xcbiAgLS1oZWlnaHQ6IDM7XFxufVxcbi5iYXR0bGVTaGlwLWhvcml6b250YWwge1xcbiAgLS13aWR0aDogNDtcXG59XFxuLmJhdHRsZVNoaXAtdmVydGljYWwge1xcbiAgLS1oZWlnaHQ6IDQ7XFxufVxcbi5zaGlwIHtcXG4gIHdpZHRoOiA2dm1pbjtcXG4gIGhlaWdodDogNnZtaW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCAyMDMgNTQpO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbiAgY3Vyc29yOiBncmFiYmluZztcXG59XFxuLnNoaXAtc2l6ZSB7XFxuICB3aWR0aDogY2FsYyg2dm1pbiAqIHZhcigtLXdpZHRoLCAxKSk7XFxuICBoZWlnaHQ6IGNhbGMoNnZtaW4gKiB2YXIoLS1oZWlnaHQsIDEpKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMSwgMTQ3LCAxKTtcXG59XFxuXFxuLnRhcmdldC1kb3Qge1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgd2lkdGg6IDAuOHJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLm1pc3NlZC1zdHJpa2Uge1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgd2lkdGg6IDAuMnJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLm1pc3NlZC1zdHJpa2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmhpdC1zdHJpa2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1MDAwMDtcXG59XFxuLyptaW5pIHNoaXBzIHN0eWxlKi9cXG4uZmxlZXQtaG9sZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4ubWluaS1zaGlwLW93bmVyIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG4uc2FtZS1zaXplLXNoaXBzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxNTBweDtcXG59XFxuLm1pbmktY2FycmllciB7XFxuICAtLXdpZHRoOiA1O1xcbn1cXG4ubWluaS1iYXR0bGVTaGlwIHtcXG4gIC0td2lkdGg6IDQ7XFxufVxcbi5taW5pLWRlc3Ryb3llciB7XFxuICAtLXdpZHRoOiAzO1xcbn1cXG4ubWluaS1zdWJtYXJpbmUge1xcbiAgLS13aWR0aDogMztcXG59XFxuLm1pbmktcGF0cm9sIHtcXG4gIC0td2lkdGg6IDEuNTtcXG59XFxuLm1pbmktc2hpcC1zaXplIHtcXG4gIHdpZHRoOiBjYWxjKDQwcHggKiB2YXIoLS13aWR0aCwgMSkpO1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgbWFyZ2luOiAycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTY2IDE5OCAxNjUpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL2dyYWR1YXRlLXYxNy1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvYXJjaGl2by1ibGFjay12MjEtbGF0aW4tcmVndWxhci53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL25hbnVtLWdvdGhpYy1jb2RpbmctdjIxLWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9nZXJtYW5pYS1vbmUtdjIwLWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9zaGFyZS10ZWNoLW1vbm8tdjE1LWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9pbWFnZXMvc2V0LXNoaXBzLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ltYWdlcy9zaGlwcy5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIGZvbnQtZmFtaWx5OiBcIkdyYWR1YXRlXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSkgZm9ybWF0KFwid29mZjJcIik7XG59XG4vKiBhcmNoaXZvLWJsYWNrLXJlZ3VsYXIgLSBsYXRpbiAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiQXJjaGl2byBCbGFja1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pXG4gICAgZm9ybWF0KFwid29mZjJcIik7XG59XG4vKiBuYW51bS1nb3RoaWMtY29kaW5nLXJlZ3VsYXIgLSBsYXRpbiAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiTmFudW0gR290aGljIENvZGluZ1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pXG4gICAgZm9ybWF0KFwid29mZjJcIik7XG59XG4vKiBnZXJtYW5pYS1vbmUtcmVndWxhciAtIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICBmb250LWZhbWlseTogXCJHZXJtYW5pYSBPbmVcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KVxuICAgIGZvcm1hdChcIndvZmYyXCIpO1xufVxuLyogc2hhcmUtdGVjaC1tb25vLXJlZ3VsYXIgLSBsYXRpbiAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgZm9udC1mYW1pbHk6IFwiU2hhcmUgVGVjaCBNb25vXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19ffSlcbiAgICBmb3JtYXQoXCJ3b2ZmMlwiKTtcbn1cbioge1xuICBtYXJnaW46IDA7XG59XG5ib2R5IHtcbiAgd2lkdGg6IDEwMHZ3O1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fX30pO1xuICBmb250LWZhbWlseTogXCJHcmFkdWF0ZVwiLCBcIlNoYXJlIFRlY2ggTW9ub1wiLCBcIkdlcm1hbmlhIE9uZVwiLCBtb25vc3BhY2UsIEFyaWFsLFxuICAgIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGluaGVyaXQ7XG59XG5idXR0b24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG59XG4vKmludHJvIHBhZ2UqL1xuLmludHJvLXBhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDIwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIGhlaWdodDogMTAwdmg7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19ffSk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cbi5oZWFkZXIge1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNSwgMTUsIDE1KTtcbiAgY29sb3I6IGFsaWNlYmx1ZTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAycztcbn1cblxuLmxvZ28ge1xuICBmb250LWZhbWlseTogXCJBcmNoaXZvIEJsYWNrXCI7XG4gIGxldHRlci1zcGFjaW5nOiAwLjNyZW07XG4gIGZvbnQtc2l6ZTogMi4zcmVtO1xuICBmb250LXdlaWdodDogMzAwO1xuICB0ZXh0LXNoYWRvdzogMCAxcHggYmx1ZTtcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDJzO1xufVxuLmxvZ286aG92ZXIge1xuICBjb2xvcjogeWVsbG93O1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XG59XG4uZ2FtZS1vcHRpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xufVxuLmdhbWUtb3B0aW9uLWJ0bnMge1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1mYW1pbHk6IFwiTmFudW0gR290aGljIENvZGluZ1wiO1xuICB0ZXh0LXNoYWRvdzogLTFweCAtMnB4IDJweCAjMDAwMDAwN2Q7XG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAxcztcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcbn1cbi5nYW1lLW9wdGlvbi1idG5zOmhvdmVyIHtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDAsIDAsIDApO1xufVxuLm11bHRpLXBsYXllcnMtYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIwMywgMjI2LCA0KTtcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcbn1cbi5zaW5nbGUtcGxheWVyLWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMiwgMTQ1LCAwKTtcbiAgY29sb3I6IGFsaWNlYmx1ZTtcbn1cblxuLypzaGlwIHBsYWNlbWVudCBwYWdlKi9cbi5zaGlwcy1ncmlkIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMyAzMCA3MCk7XG59XG4uZHJhZy1idG4sXG4ucmFuZG9taXplLWJ0bixcbi5wbGF5LWJ0biB7XG4gIGZvbnQtZmFtaWx5OiBcIkdlcm1hbmlhIE9uZVwiO1xufVxuXG4ucGxheWVycy1uYW1lIHtcbiAgZGlzcGxheTogZmxleDtcbn1cbi8qIGNvdW50IGRvd24qL1xuLnBhc3Mtc2NyZWVuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxMDAwO1xuICB3aWR0aDogMTAwdnc7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICB0b3A6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcbiAgZGlzcGxheTogbm9uZTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZvbnQtZmFtaWx5OiBcIkdyYWR1YXRlXCI7XG59XG4uY291bnRlciB7XG4gIGFzcGVjdC1yYXRpbzogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAzMCU7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIHJnYigxNzQsIDAsIDI1NSk7XG4gIGNvbG9yOiBicm93bjtcbn1cbi5jb3VudGVyLWJvYXJkIHtcbiAgZm9udC1zaXplOiA0cmVtO1xufVxuLm1zZy10ZXh0IHtcbiAgY29sb3I6IGJlaWdlO1xuICBmb250LXNpemU6IDJyZW07XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cbi8qcGxheWVycyBib2FyZCxtaW5pIHNoaXBzIGJvYXJkKi9cblxuLnBsYXllcnMtYm9hcmQsXG4ubWluaS1zaGlwLWhvbGRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuNHJlbTtcbn1cblxuLyp3aW5uZXIgbW9kYWwqL1xuLndpbm5lci1ib2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFudGlxdWV3aGl0ZTtcbiAgcGFkZGluZzogMXJlbTtcbn1cbi53aW5uZXItaG9sZGVyIHtcbiAgYm94LXNoYWRvdzogLTJweCAwcHggOHB4IDNweCAjNDFjYzJmO1xuICBib3JkZXI6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuMnJlbTtcbn1cbi53aW5uZXItbW9kYWwge1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiAyMCU7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xuICBib3gtc2hhZG93OiAtMnB4IDBweCA4cHggM3B4ICMwMDAwMDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogMzAlO1xufVxuLnJlbWF0Y2gtYnRuIHtcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW47XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgcGFkZGluZzogMC4zcmVtO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLypmb3JtIHN0eWxlKi9cbmlucHV0IHtcbiAgZm9udC1mYW1pbHk6IFwiR2VybWFuaWEgT25lXCI7XG59XG4ucGxheWVyLW5hbWUtaW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDAuOXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XG59XG5cbi5wbGF5ZXItbmFtZS1pbnB1dDpmb2N1cyB+IC5wbGF5ZXItb25lLWxhYmVsIHtcbiAgdG9wOiAwLjNyZW07XG4gIGxlZnQ6IDIwJTtcbiAgY29sb3I6ICMxOWQ1MDA7XG59XG4ucGxheWVyLXR3by1sYWJlbCxcbi5wbGF5ZXItb25lLWxhYmVsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3R0b206IDIuOHJlbTtcbiAgbGVmdDogMXJlbTtcbiAgY29sb3I6ICM2MDYzNWY7XG4gIHRyYW5zaXRpb246IGFsbCAycztcbn1cbi5wbGF5ZXItbmFtZS1pbnB1dDpmb2N1cyB+IC5wbGF5ZXItdHdvLWxhYmVsIHtcbiAgdG9wOiAyMCU7XG4gIGxlZnQ6IDIwJTtcbiAgY29sb3I6ICMxOWQ1MDA7XG59XG5mb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogM3JlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM5LCAzNCwgMzQpO1xuICBvcGFjaXR5OiAwLjg7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgcGFkZGluZzogMnJlbTtcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICBoZWlnaHQ6IDM1MHB4O1xuICBjb2xvcjogYW50aXF1ZXdoaXRlO1xuICBmb250LWZhbWlseTogXCJHZXJtYW5pYSBPbmVcIiwgbW9ub3NwYWNlO1xufVxuLmlucHV0LWhvbGRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uc3VibWl0LWJ0biB7XG4gIHBhZGRpbmc6IDAuNHJlbTtcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtZmFtaWx5OiBcIkdlcm1hbmlhIE9uZVwiO1xufVxuLnN1Ym1pdC1idG46aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XG59XG4ucGxheWVyLXR1cm4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjb2xvcjogYWxpY2VibHVlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICBvcGFjaXR5OiAwLjg7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQiw0REFBMkU7QUFDN0U7QUFDQSxrQ0FBa0M7QUFDbEM7RUFDRSxrQkFBa0I7RUFDbEIsNEJBQTRCO0VBQzVCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7bUJBQ2lCO0FBQ25CO0FBQ0Esd0NBQXdDO0FBQ3hDO0VBQ0Usa0JBQWtCO0VBQ2xCLGtDQUFrQztFQUNsQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCO21CQUNpQjtBQUNuQjtBQUNBLGlDQUFpQztBQUNqQztFQUNFLGtCQUFrQjtFQUNsQiwyQkFBMkI7RUFDM0Isa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjttQkFDaUI7QUFDbkI7QUFDQSxvQ0FBb0M7QUFDcEM7RUFDRSxrQkFBa0I7RUFDbEIsOEJBQThCO0VBQzlCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7bUJBQ2lCO0FBQ25CO0FBQ0E7RUFDRSxTQUFTO0FBQ1g7QUFDQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLHlEQUFvRDtFQUNwRDt5QkFDdUI7RUFDdkIsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1Qix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFFBQVE7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QixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNDQUFzQztBQUN4QztBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0Usd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LWZhbWlseTogXFxcIkdyYWR1YXRlXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvZ3JhZHVhdGUtdjE3LWxhdGluLXJlZ3VsYXIud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbi8qIGFyY2hpdm8tYmxhY2stcmVndWxhciAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LWZhbWlseTogXFxcIkFyY2hpdm8gQmxhY2tcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9hcmNoaXZvLWJsYWNrLXYyMS1sYXRpbi1yZWd1bGFyLndvZmYyXFxcIilcXG4gICAgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG4vKiBuYW51bS1nb3RoaWMtY29kaW5nLXJlZ3VsYXIgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOYW51bSBHb3RoaWMgQ29kaW5nXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvbmFudW0tZ290aGljLWNvZGluZy12MjEtbGF0aW4tcmVndWxhci53b2ZmMlxcXCIpXFxuICAgIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuLyogZ2VybWFuaWEtb25lLXJlZ3VsYXIgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHZXJtYW5pYSBPbmVcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9nZXJtYW5pYS1vbmUtdjIwLWxhdGluLXJlZ3VsYXIud29mZjJcXFwiKVxcbiAgICBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbi8qIHNoYXJlLXRlY2gtbW9uby1yZWd1bGFyIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiU2hhcmUgVGVjaCBNb25vXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvc2hhcmUtdGVjaC1tb25vLXYxNS1sYXRpbi1yZWd1bGFyLndvZmYyXFxcIilcXG4gICAgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvaW1hZ2VzL3NldC1zaGlwcy5qcGcpO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHcmFkdWF0ZVxcXCIsIFxcXCJTaGFyZSBUZWNoIE1vbm9cXFwiLCBcXFwiR2VybWFuaWEgT25lXFxcIiwgbW9ub3NwYWNlLCBBcmlhbCxcXG4gICAgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogaW5oZXJpdDtcXG59XFxuYnV0dG9uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XFxufVxcbi8qaW50cm8gcGFnZSovXFxuLmludHJvLXBhZ2Uge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDIwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuL2Fzc2V0cy9pbWFnZXMvc2hpcHMuanBnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLmhlYWRlciB7XFxuICBwYWRkaW5nOiAxLjVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTUsIDE1LCAxNSk7XFxuICBjb2xvcjogYWxpY2VibHVlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAycztcXG59XFxuXFxuLmxvZ28ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJBcmNoaXZvIEJsYWNrXFxcIjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjNyZW07XFxuICBmb250LXNpemU6IDIuM3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICB0ZXh0LXNoYWRvdzogMCAxcHggYmx1ZTtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCAycztcXG59XFxuLmxvZ286aG92ZXIge1xcbiAgY29sb3I6IHllbGxvdztcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcXG59XFxuLmdhbWUtb3B0aW9ucyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMC41cmVtO1xcbn1cXG4uZ2FtZS1vcHRpb24tYnRucyB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LWZhbWlseTogXFxcIk5hbnVtIEdvdGhpYyBDb2RpbmdcXFwiO1xcbiAgdGV4dC1zaGFkb3c6IC0xcHggLTJweCAycHggIzAwMDAwMDdkO1xcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDFzO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG59XFxuLmdhbWUtb3B0aW9uLWJ0bnM6aG92ZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDAsIDAsIDApO1xcbn1cXG4ubXVsdGktcGxheWVycy1idG4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIwMywgMjI2LCA0KTtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxufVxcbi5zaW5nbGUtcGxheWVyLWJ0biB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIsIDE0NSwgMCk7XFxuICBjb2xvcjogYWxpY2VibHVlO1xcbn1cXG5cXG4vKnNoaXAgcGxhY2VtZW50IHBhZ2UqL1xcbi5zaGlwcy1ncmlkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzIDMwIDcwKTtcXG59XFxuLmRyYWctYnRuLFxcbi5yYW5kb21pemUtYnRuLFxcbi5wbGF5LWJ0biB7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCI7XFxufVxcblxcbi5wbGF5ZXJzLW5hbWUge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLyogY291bnQgZG93biovXFxuLnBhc3Mtc2NyZWVuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIHRvcDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJHcmFkdWF0ZVxcXCI7XFxufVxcbi5jb3VudGVyIHtcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMzAlO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIGJvcmRlcjogMC4ycmVtIHNvbGlkIHJnYigxNzQsIDAsIDI1NSk7XFxuICBjb2xvcjogYnJvd247XFxufVxcbi5jb3VudGVyLWJvYXJkIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG59XFxuLm1zZy10ZXh0IHtcXG4gIGNvbG9yOiBiZWlnZTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuLypwbGF5ZXJzIGJvYXJkLG1pbmkgc2hpcHMgYm9hcmQqL1xcblxcbi5wbGF5ZXJzLWJvYXJkLFxcbi5taW5pLXNoaXAtaG9sZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMC40cmVtO1xcbn1cXG5cXG4vKndpbm5lciBtb2RhbCovXFxuLndpbm5lci1ib2FyZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG4ud2lubmVyLWhvbGRlciB7XFxuICBib3gtc2hhZG93OiAtMnB4IDBweCA4cHggM3B4ICM0MWNjMmY7XFxuICBib3JkZXI6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwLjJyZW07XFxufVxcbi53aW5uZXItbW9kYWwge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgd2lkdGg6IDIwJTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXG4gIGJveC1zaGFkb3c6IC0ycHggMHB4IDhweCAzcHggIzAwMDAwMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IDMwJTtcXG59XFxuLnJlbWF0Y2gtYnRuIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVuO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZzogMC4zcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLypmb3JtIHN0eWxlKi9cXG5pbnB1dCB7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCI7XFxufVxcbi5wbGF5ZXItbmFtZS1pbnB1dCB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAwLjlyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbnRpcXVld2hpdGU7XFxufVxcblxcbi5wbGF5ZXItbmFtZS1pbnB1dDpmb2N1cyB+IC5wbGF5ZXItb25lLWxhYmVsIHtcXG4gIHRvcDogMC4zcmVtO1xcbiAgbGVmdDogMjAlO1xcbiAgY29sb3I6ICMxOWQ1MDA7XFxufVxcbi5wbGF5ZXItdHdvLWxhYmVsLFxcbi5wbGF5ZXItb25lLWxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJvdHRvbTogMi44cmVtO1xcbiAgbGVmdDogMXJlbTtcXG4gIGNvbG9yOiAjNjA2MzVmO1xcbiAgdHJhbnNpdGlvbjogYWxsIDJzO1xcbn1cXG4ucGxheWVyLW5hbWUtaW5wdXQ6Zm9jdXMgfiAucGxheWVyLXR3by1sYWJlbCB7XFxuICB0b3A6IDIwJTtcXG4gIGxlZnQ6IDIwJTtcXG4gIGNvbG9yOiAjMTlkNTAwO1xcbn1cXG5mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAzcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM5LCAzNCwgMzQpO1xcbiAgb3BhY2l0eTogMC44O1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgaGVpZ2h0OiAzNTBweDtcXG4gIGNvbG9yOiBhbnRpcXVld2hpdGU7XFxuICBmb250LWZhbWlseTogXFxcIkdlcm1hbmlhIE9uZVxcXCIsIG1vbm9zcGFjZTtcXG59XFxuLmlucHV0LWhvbGRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnN1Ym1pdC1idG4ge1xcbiAgcGFkZGluZzogMC40cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiR2VybWFuaWEgT25lXFxcIjtcXG59XFxuLnN1Ym1pdC1idG46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xcbn1cXG4ucGxheWVyLXR1cm4ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBjb2xvcjogYWxpY2VibHVlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcXG4gIG9wYWNpdHk6IDAuODtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NoaXBzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NoaXBzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vcGxhY2Utc2hpcC1wYWdlL3NoaXBzLmNzc1wiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vdXRpbGl0eS5qc1wiO1xuaW1wb3J0IHsgcmFuZG9tbHlQbGFjZVNoaXBzIH0gZnJvbSBcIi4vcGxhY2Utc2hpcC1wYWdlL3NoaXAtcG9zaXRpb24uanNcIjtcbmltcG9ydCB7XG4gIHNjcmVlbkNvbnRyb2xsZXIsXG4gIGRyYXdGaXJzdFBhZ2UsXG4gIHNoaXBzUGxhY2VtZW50LFxuICByYW5kb21QbGFjZW1lbnQsXG4gIGRyYWdTaGlwcyxcbiAgY291bnRkb3duTW9kYWwsXG4gIGZvcm1UZW1wbGF0ZSxcbn0gZnJvbSBcIi4vZG9tLWNvbXBvbmVudC5qc1wiO1xuXG5jb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBhZ2UtY29udGFpbmVyXVwiKTtcbmNvbnN0IGJvYXJkV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS13cmFwcGVyXCIpO1xuZHJhd0ZpcnN0UGFnZSgpO1xuYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbmxldCBwbGF5ZXJPbmVOYW1lO1xubGV0IHBsYXllclR3b05hbWU7XG5sZXQgZmlyc3RQbGF5ZXI7XG5sZXQgc2Vjb25kUGxheWVyO1xuLy9zdG9yZSBwbGF5ZXJzIG9iamVjdCBpbiBoYXNobWFwXG5jb25zdCBoYXNobWFwID0gbmV3IE1hcCgpO1xubGV0IHNvbG9QbGF5ZXIgPSBmYWxzZTtcbnBhZ2VDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiLm11bHRpLXBsYXllcnMtYnRuXCIpKSB7XG4gICAgc29sb1BsYXllciA9IGZhbHNlO1xuICAgIGJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZm9ybVRlbXBsYXRlKHBhZ2VDb250YWluZXIpO1xuICB9XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiW2RhdGEtc3VibWl0LW5hbWVdXCIpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHBsYXllck9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wbGF5ZXItb25lXVwiKTtcbiAgICBjb25zdCBwbGF5ZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcGxheWVyLXR3b1wiKTtcbiAgICAvL2F2b2lkIHNwYWNlIGZvciBjcmVhdGluZyBjbGFzcyAgbGF0ZXIgZm9yIGZsZWV0IGRhc2ggYm9hcmRcbiAgICBwbGF5ZXJPbmVOYW1lID0gcGxheWVyT25lLnZhbHVlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICBwbGF5ZXJUd29OYW1lID0gcGxheWVyVHdvLnZhbHVlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAvL3JldHVybiBpZiBwbGF5ZXJzIG5hbWUgc2FtZSBhbmQgZW1wdHlcbiAgICBpZiAoXG4gICAgICBwbGF5ZXJPbmVOYW1lID09PSBcIlwiIHx8XG4gICAgICBwbGF5ZXJUd29OYW1lID09PSBcIlwiIHx8XG4gICAgICAocGxheWVyT25lTmFtZSA9PT0gcGxheWVyVHdvTmFtZSkgPT09IHRydWVcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZmlyc3RQbGF5ZXIgPSBQbGF5ZXIocGxheWVyT25lTmFtZSk7XG4gICAgc2Vjb25kUGxheWVyID0gUGxheWVyKHBsYXllclR3b05hbWUpO1xuICAgIGNvdW50ZG93bk1vZGFsKGAke3BsYXllck9uZU5hbWV9IHNldCB0aGUgc2hpcHNgKTtcbiAgICBzaGlwc1BsYWNlbWVudChwYWdlQ29udGFpbmVyKTtcbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIltkYXRhLXJhbmRvbS1idG5cIikpIHtcbiAgICBwdXRTaGlwcygpO1xuICB9XG4gIGlmIChlLnRhcmdldC5tYXRjaGVzKFwiW2RhdGEtZHJvcC1idG5dXCIpKSB7XG4gICAgZHJhZ0FuZERyb3AoKTtcbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIi5wbGF5LWJ0blwiKSkge1xuICAgIHBhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGJvYXJkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGlmIChzb2xvUGxheWVyID09PSBmYWxzZSkge1xuICAgICAgY291bnRkb3duTW9kYWwoYCR7cGxheWVyVHdvTmFtZX0gc2V0IHRoZSBzaGlwc2ApO1xuICAgICAgYm9hcmRXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgc2hpcHNQbGFjZW1lbnQocGFnZUNvbnRhaW5lcik7XG5cbiAgICBpZiAoc29sb1BsYXllciA9PT0gdHJ1ZSAmJiBoYXNobWFwLnNpemUgPT09IDApIHtcbiAgICAgIC8vcmFuZG9tbHkgcGxhY2UgYWkgc2hpcHNcbiAgICAgIHJhbmRvbWx5UGxhY2VTaGlwcyhzZWNvbmRQbGF5ZXIpO1xuICAgICAgaGFzaG1hcC5zZXQocGxheWVyT25lTmFtZSwgZmlyc3RQbGF5ZXIpO1xuICAgICAgaGFzaG1hcC5zZXQocGxheWVyVHdvTmFtZSwgc2Vjb25kUGxheWVyKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBoYXNobWFwLmdldChwbGF5ZXJUd29OYW1lKSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBoYXNobWFwLmdldChwbGF5ZXJPbmVOYW1lKSAhPT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICBjb25zdCBwbGF5ZXJPbmUgPSBoYXNobWFwLmdldChwbGF5ZXJPbmVOYW1lKTtcbiAgICAgIGNvbnN0IHBsYXllclR3byA9IGhhc2htYXAuZ2V0KHBsYXllclR3b05hbWUpO1xuICAgICAgc2NyZWVuQ29udHJvbGxlcihwbGF5ZXJPbmUsIHBsYXllclR3bywgc29sb1BsYXllcik7XG4gICAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHBhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoaGFzaG1hcC5zaXplID09PSAwKSB7XG4gICAgICBoYXNobWFwLnNldChwbGF5ZXJPbmVOYW1lLCBmaXJzdFBsYXllcik7XG4gICAgfVxuICAgIGlmIChoYXNobWFwLnNpemUgPiAwKSB7XG4gICAgICBoYXNobWFwLnNldChwbGF5ZXJUd29OYW1lLCBzZWNvbmRQbGF5ZXIpO1xuICAgIH1cbiAgfVxuICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIi5zaW5nbGUtcGxheWVyLWJ0blwiKSkge1xuICAgIHNvbG9QbGF5ZXIgPSB0cnVlO1xuICAgIHBsYXllck9uZU5hbWUgPSBcInlvdVwiO1xuICAgIHBsYXllclR3b05hbWUgPSBcImFpXCI7XG4gICAgZmlyc3RQbGF5ZXIgPSBQbGF5ZXIocGxheWVyT25lTmFtZSk7XG4gICAgc2Vjb25kUGxheWVyID0gUGxheWVyKHBsYXllclR3b05hbWUpO1xuICAgIGNvdW50ZG93bk1vZGFsKFwic2V0IHRoZSBzaGlwc1wiKTtcbiAgICBzaGlwc1BsYWNlbWVudChwYWdlQ29udGFpbmVyKTtcbiAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9XG59KTtcbmNvbnN0IHdpbm5lck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLW1zZ1wiKTtcbndpbm5lck1zZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCIucmVtYXRjaC1idG5cIikpIHtcbiAgICAvL3Jlc2V0IHRoZSBwbGF5ZXIgYW5kIGRvbSBlbGVtZW50XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2lubmVyLW1vZGFsXVwiKTtcbiAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWRcIik7XG4gICAgY29uc3QgdHVybkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLXR1cm5cIik7XG4gICAgY29uc3QgZGFzaEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5taW5pLWRhc2gtYm9hcmRcIik7XG4gICAgY29uc3Qgd2lubmVyRGl2SG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItaG9sZGVyXCIpO1xuICAgIGNvbnN0IHdpbm5lck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWJvYXJkXCIpO1xuICAgIGZpcnN0UGxheWVyID0gbnVsbDtcbiAgICBzZWNvbmRQbGF5ZXIgPSBudWxsO1xuICAgIGhhc2htYXAuY2xlYXIoKTtcbiAgICBmaXJzdFBsYXllciA9IFBsYXllcihwbGF5ZXJPbmVOYW1lKTtcbiAgICBzZWNvbmRQbGF5ZXIgPSBQbGF5ZXIocGxheWVyVHdvTmFtZSk7XG4gICAgYm9hcmRzLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB0dXJuRGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBkYXNoQm9hcmQuZm9yRWFjaCgoZGl2KSA9PiB7XG4gICAgICBkaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4ge1xuICAgICAgYm9hcmQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0pO1xuICAgIHdpbm5lck1zZy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgd2lubmVyRGl2SG9sZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBmaXJzdFBsYXllciA9IFBsYXllcihwbGF5ZXJPbmVOYW1lKTtcbiAgICBzZWNvbmRQbGF5ZXIgPSBQbGF5ZXIocGxheWVyVHdvTmFtZSk7XG4gICAgbW9kYWwuY2xvc2UoKTtcbiAgICBwYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBib2FyZFdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHNoaXBzUGxhY2VtZW50KHBhZ2VDb250YWluZXIpO1xuICB9XG59KTtcbi8vZHJhZyBhbmQgZHJvcCBzaGlwIGJhc2VkIG9uIHNvbG8gb3IgbXVsdGkgcGxheWVyXG5mdW5jdGlvbiBkcmFnQW5kRHJvcCgpIHtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2hpcHMtY29udGFpbmVyXVwiKTtcbiAgc2hpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBpZiAoaGFzaG1hcC5zaXplIDwgMSkge1xuICAgIGlmIChmaXJzdFBsYXllci5ib2FyZC5zaGlwc1Bvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICByZXBvc2l0aW9uKCk7XG4gICAgfVxuICAgIGRyYWdTaGlwcyhmaXJzdFBsYXllciwgZmlyc3RQbGF5ZXIuYm9hcmQuc2hpcHNBcnJheSk7XG4gIH1cbiAgaWYgKGhhc2htYXAuc2l6ZSA+IDEpIHtcbiAgICBpZiAoc2Vjb25kUGxheWVyLmJvYXJkLnNoaXBzUG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlcG9zaXRpb24oKTtcbiAgICB9XG4gICAgZHJhZ1NoaXBzKHNlY29uZFBsYXllciwgc2Vjb25kUGxheWVyLmJvYXJkLnNoaXBzQXJyYXkpO1xuICB9XG59XG5mdW5jdGlvbiByZXBvc2l0aW9uKCkge1xuICBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHhvID0gUGxheWVyKHBsYXllck9uZU5hbWUsIGZpcnN0UGxheWVyLnNoaXBzQXJyYXkpO1xuICAgIC8vIGZpcnN0UGxheWVyID0gbnVsbDtcbiAgICBmaXJzdFBsYXllciA9IHhvO1xuICB9XG4gIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuc2hpcHNQb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHhvID0gUGxheWVyKHBsYXllclR3b05hbWUsIHNlY29uZFBsYXllci5zaGlwc0FycmF5KTtcbiAgICAvL3NlY29uZFBsYXllciA9IG51bGw7XG4gICAgc2Vjb25kUGxheWVyID0geG87XG4gIH1cbn1cbmZ1bmN0aW9uIHB1dFNoaXBzKCkge1xuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zaGlwcy1jb250YWluZXJdXCIpO1xuICBzaGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGlmIChoYXNobWFwLnNpemUgPCAxKSB7XG4gICAgcmVwb3NpdGlvbigpO1xuICAgIHJhbmRvbVBsYWNlbWVudChmaXJzdFBsYXllcik7XG4gIH0gZWxzZSBpZiAoaGFzaG1hcC5zaXplID4gMCkge1xuICAgIHJlcG9zaXRpb24oKTtcbiAgICByYW5kb21QbGFjZW1lbnQoc2Vjb25kUGxheWVyKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImZpcnN0Qm9hcmQiLCJzaGlwQ29vcmRpbmF0ZSIsImhpdCIsIm1pc3MiLCJjZWxscyIsImkiLCJqIiwiYSIsImIiLCJ4IiwieSIsImdyaWRzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYnV0dG9uIiwidGV4dENvbnRlbnQiLCJNYXRoIiwiZmxvb3IiLCJkYXRhc2V0IiwiaW5kZXgiLCJkb3QiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImFwcGVuZENoaWxkIiwic3RyaWtlQm9hcmQiLCJkcmF3R3JpZHMiLCJncmlkIiwiX3V0aWxpdHkiLCJyZXF1aXJlIiwiX2JvYXJkQ29tcG9uZW50IiwiX3NoaXBQb3NpdGlvbiIsImNvdW50Iiwid2lubmVyTXNnIiwiR2FtZUZsb3ciLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJpc0dhbWVFbmQiLCJwbGF5ZXJzIiwiYWN0aXZlUGxheWVyIiwiY2hhbmdlVHVybiIsImdldFBsYXllciIsInByaW50Qm9hcmQiLCJwbGF5ZXIiLCJtaXNzU3RyaWtlcyIsImJvYXJkIiwibWlzc2VkU2hvdHMiLCJoaXRTdHJpa2VzIiwiaGl0U2hvdHMiLCJhbGxUaGVTaGlwcyIsInNoaXBzUG9zaXRpb25zIiwic2hpcEJvYXJkU3RhdGUiLCJzdHJpa2VCb2FyZFN0YXRlIiwidXBkYXRlU3Vua1NoaXAiLCJzdW5rU2hpcHMiLCJwcmludE5ld0JvYXJkIiwib3Bwb25lbnROYW1lIiwibmFtZSIsIm9wcG9uZW50UGxheWVyU2hpcFN0YXRlIiwib3Bwb25lbnRTdHJpa2VCb2FyZCIsImN1cnJlbnRQbGF5ZXJTaGlwQm9hcmQiLCJjdXJyZW50UGxheWVyU2hpcFN0YXRlIiwiY3VycmVudFBsYXllck5hbWUiLCJwbGF5ZXJSb3VuZCIsImNsaWNrZWROdW0iLCJjb29yZGluYXRlIiwiY29vcmRpbmF0ZXNIYXNoTWFwIiwiZ2V0IiwiTnVtYmVyIiwicmVjZWl2ZUF0dGFjayIsImRlY2xhcmVXaW5uZXIiLCJsZW5ndGgiLCJ3aW5uZXJNb2RhbCIsInBvcCIsIm1vZGFsIiwicXVlcnlTZWxlY3RvciIsInNob3dNb2RhbCIsIndpbm5lciIsInVuZGVmaW5lZCIsInB1c2giLCJmaXJzdFBsYXllclN1bmtTaGlwcyIsImlzU3VuayIsInNlY29uZFBsYXllclN1bmtTaGlwcyIsInBsYXllck9uZU5hbWUiLCJwbGF5ZXJUd29OYW1lIiwibXNnIiwic2NyZWVuQ29udHJvbGxlciIsInNvbG9QbGF5ZXIiLCJnYW1lIiwidHVybiIsInBsYXllck9uZVNoaXBzQm9hcmQiLCJwbGF5ZXJPbmVTdHJpa2VCb2FyZCIsImZpcnN0UGxheWVyU2hpcHMiLCJzZWNvbmRQbGF5ZXJTaGlwcyIsInVwZGF0ZVNjcmVlbiIsInBsYXllck9uZUZpcnN0Q2hhciIsImNoYXJBdCIsInBsYXllclR3b0ZpcnN0Q2hhciIsImJ1aWxkRGFzaGJvYXJkIiwiZHJhd01pbmlTaGlwcyIsInBsYXllck9uZURhc2hCb2FyZCIsIlBsYXllck9uZU1pbmlTaGlwcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXJUd29EYXNoQm9hcmQiLCJwbGF5ZXJUd29NaW5pU2hpcHMiLCJwbGF5ZXJPbmVTdW5rU2hpcHMiLCJwbGF5ZXJUd29TdW5rU2hpcHMiLCJ1cGRhdGVEYXNoQm9hcmQiLCJ1cGRhdGVNaW5pU2hpcHMiLCJjb3VudGRvd25Nb2RhbCIsImZpeFR5cG8iLCJjbGlja0hhbmRsZXIiLCJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImhhc0NoaWxkTm9kZXMiLCJjb21wdXRlck1vdmUiLCJpbnRyb1BhZ2UiLCJwYWdlSG9sZGVyIiwic2V0QXR0cmlidXRlIiwiaGVhZGVyIiwidGl0bGUiLCJidG5Ib2xkZXIiLCJzaW5nbGVQbGF5ZXJCdG4iLCJtdWx0aVBsYXllckJ0biIsImRyYXdGaXJzdFBhZ2UiLCJwYWdlQ29udGFpbmVyIiwibG9nb0RpdiIsInRpdHRsZSIsInNldFRpbWVvdXQiLCJ0ZW1wbGF0ZVNoaXBHcmlkIiwic2Vjb25kUGFnZSIsInN0cmF0ZWd5Qm9hcmQiLCJidG5zIiwidGVtcGxhdGUiLCJpbm5lckhUTUwiLCJzaGlwc1BsYWNlbWVudCIsImVsZW1lbnQiLCJyYW5kb21QbGFjZW1lbnQiLCJuZXdQbGF5ZXIiLCJjb250YWluZXIiLCJwbGF5QnRuIiwic2hpcHNDb250YWluZXIiLCJkaXNwbGF5Iiwic2V0U2hpcHNQbGFjZSIsInJhbmRvbWx5UGxhY2VTaGlwcyIsInNoaXBzIiwiaGl0cyIsIm1pc3NlZCIsImtlZXBOYW1lIiwiUGxheWVyIiwic2hpcHNDb29yZGluYXRlcyIsImNvdW50RG93blBhZ2UiLCJwYXNzU2NyZWVuIiwiY291bnRkb3duIiwidXBkYXRlQ291bnRkb3duVUkiLCJlbGUiLCJtaW5pRmxlZXRzIiwic2hpcHNEaXYiLCJzdW5rU2hpcEFycmF5IiwiY29sb3IiLCJmb3JFYWNoIiwic2hpcCIsInN1bmtTaGlwIiwid2lubmVyRGl2IiwiaG9sZGVyIiwiZm9ybVRlbXBsYXRlIiwibWluaVNoaXBCb2FyZCIsImRpdkFycmF5IiwicmVQb3NpdGlvbiIsInNoaXBzQXJyYXkiLCJhbGxTaGlwUG9zaXRpb25zIiwiY2VsbHNUb1JlbW92ZWQiLCJzbGljZSIsImNlbGwiLCJ0b1N0cmluZyIsInNwbGljZSIsImluZGV4T2YiLCJwbGFjZVBsYXllclNoaXBIb3Jpem9udGFsIiwiY29vcmRpbmF0ZXMiLCJjb252ZXJ0SW5kZXgiLCJzaGlwQ2VsbHMiLCJwbGFjZVZlcnRpY2FsIiwidGFrZW5DZWxscyIsInBvc2l0aW9ucyIsInBsYWNlUmFuZG9tIiwicGxhY2VQbGF5ZXJTaGlwVmVydGljYWwiLCJwbGFjZUhvcml6b250YWwiLCJhbGxvd0Ryb3AiLCJwcmV2ZW50RGVmYXVsdCIsImRyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiaWQiLCJkcm9wIiwiZGF0YSIsImdldERhdGEiLCJkcmFnZ2VkIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaGlwRGlyZWN0aW9uIiwiZ2V0U2hpcERpcmVjdGlvbkNsYXNzIiwic2hpcEluZGV4Iiwid2hpY2hTaGlwQ2xpY2tlZCIsInNoaXBOYW1lIiwiYWxsQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJkaXJlY3Rpb25DbGFzcyIsImZsaXAiLCJyZXN1bHQiLCJwb3NpdGlvblRlbXBTaGlwIiwicmVtb3ZlIiwiZGlyZWN0aW9uIiwiZmlyc3RDb29yZGluYXRlIiwidGVtcFNoaXAiLCJTaGlwIiwidGVtcFNoaXBzIiwidGVtcEJvYXJkIiwiR2FtZUJvYXJkIiwiaXNDb29yZGluYXRlRnJlZSIsIm5ld1Bvc2l0aW9uIiwicmVtb3ZlQ29vcmRpbmF0ZSIsImFycmF5Iiwic2hpcFBvc2l0aW9uIiwidGFrZW5Qb3NpdGlvbnMiLCJwb3NpdGlvbiIsImRyYXdTaGlwcyIsImRpdkhvbGRlciIsImRpdiIsImRyYWdTaGlwcyIsInNxdWFyZXMiLCJzcXVhcmUiLCJ0b3RhbExlbmd0aCIsInJlZHVjZSIsInRvdGFsIiwiY3JlYXRlQm9hcmQiLCJhbGxDb29yZGluYXRlcyIsImludmVyc2VIYXNoTWFwIiwiaW52ZXJzZUNvb3JkaW5hdGUiLCJyb3ciLCJjb2wiLCJNYXAiLCJrIiwic2V0IiwiUG9zaXRpb24iLCJzaGlwTGVuZ3RoIiwiaG9yaXpvbnRhbCIsInZlcnRpY2FsIiwidHdvRGltZW5zaW9uQXJyYXkiLCJyYW5kb21GcmVlQ29vcmRpbmF0ZSIsInJhbmRvbU51bSIsInJhbmRvbUNlbGwiLCJyZWxhdGVkQ29vcmRpbmF0ZSIsImluY2x1ZGVzIiwibnVtIiwicmFuZG9tIiwicmFuZG9tbHlQb3NpdGlvbiIsInNpZGUiLCJzcGFjZVRha2VuIiwiY2hlY2tDb29yZGluYXRlIiwiaXNIaXQiLCJvbmVEaW1lbnNpb25BcnJheSIsImNhcnJpZXIiLCJiYXR0bGVTaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sIiwicGlja2VkTnVtIiwiY29tcHV0ZXJTbG90IiwibmV4dEhpdHMiLCJuZWlnaGJvclNsb3RzIiwiYWRqYWNlbnRTbG90IiwidmFsaWRTcG90IiwibW92ZSIsInJhbmRvbVNwb3QiLCJuZXh0VHJ5IiwiYWxsU3BvdHMiLCJzcG90Iiwic3VtIiwiX2RvbUNvbXBvbmVudCIsImJvYXJkV3JhcHBlciIsImZpcnN0UGxheWVyIiwic2Vjb25kUGxheWVyIiwiaGFzaG1hcCIsIm1hdGNoZXMiLCJ2YWx1ZSIsInJlcGxhY2UiLCJwdXRTaGlwcyIsImRyYWdBbmREcm9wIiwic2l6ZSIsImJvYXJkcyIsInR1cm5EaXYiLCJkYXNoQm9hcmQiLCJ3aW5uZXJEaXZIb2xkZXIiLCJjbGVhciIsImNsb3NlIiwicmVwb3NpdGlvbiIsInhvIl0sInNvdXJjZVJvb3QiOiIifQ==