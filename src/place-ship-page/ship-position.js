import { GameBoard, Ship } from "../utility";
function rePosition(player, shipsArray, ship) {
  //if the ship is length 2 buts it's position property
  // contain more than 2 coordinate remove those except the last two and update
  const allShipPositions = player.board.shipsPositions;
  const cellsToRemoved = shipsArray.slice(0, shipsArray.length - ship.length);
  cellsToRemoved.forEach((cell) => {
    allShipPositions.forEach((coordinate) => {
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
    if (result !==  false) {
      ship.classList.remove(`${shipName}-horizontal`);
      ship.classList.add(`${shipName}-vertical`);
    }
  } else if (shipDirection === "vertical") {
    const result = positionTempShip(ships, index, "horizontal", newPlayer);

    if (result !==false) {
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
    const tempShip = Ship(ships[index].shipName, ships[index].length);
    const tempShips = [];
    tempShips.push(tempShip);
    const tempBoard = GameBoard(tempShip);
    if (direction === "horizontal") {
      tempBoard.placeVertical(firstCoordinate, tempShip);
    } else if (direction === "vertical") {
      tempBoard.placeHorizontal(firstCoordinate, tempShip);
    }
    //check the new position except the first coordinate
    const result = isCoordinateFree(
      tempShip.positions.slice(1),
      player.board.shipsPositions
    );
    if (result === true) {
      //update ship position in ship and player object
      const newPosition = tempShip.positions;
      removeCoordinate(ships[index].positions, player.board.shipsPositions);
      ships[index].positions = [];
      ships[index].positions = newPosition;
      newPosition.forEach((coordinate) => {
        player.board.shipsPositions.push(coordinate);
      });
    }
    return result;
  }
}
//get specific ship from ships object array
function whichShipClicked(array, shipName) {
  let index = null;
  array.forEach((ship) => {
    if ((ship.shipName.toString() === shipName.toString()) === true) {
      index = array.indexOf(ship);
      return index;
    }
  });
  return index;
}
//remove coordinate for flip ships
function removeCoordinate(shipPosition, takenPositions) {
  shipPosition.forEach((position) => {
    takenPositions.forEach((coordinate) => {
      if (coordinate.toString() === position.toString()) {
        takenPositions.splice(takenPositions.indexOf(coordinate), 1);
      }
    });
  });
}
//check the cell is free
function isCoordinateFree(shipPosition, takenPositions) {
  let result = true;
  shipPosition.forEach((cell) => {
    takenPositions.forEach((coordinate) => {
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
  ships.forEach((ship) => {
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
  shipsDiv.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      drag(e);
    });
    ship.addEventListener("click", (e) => {
      flip(e, newPlayer);
    });
  });
  //drop zone or grid cells
  squares.forEach((square) => {
    square.addEventListener("dragover", (e) => {
      allowDrop(e);
    });
    square.addEventListener("drop", (e) => {
      drop(e, newPlayer);
      const totalLength = newPlayer.board.shipsArray.reduce((total, ship) => {
        return (total += ship.length);
      }, 0);
      //check all ship length sum is equal to total ship dropped and update player object
      if (newPlayer.board.shipsPositions.length === totalLength) {
        playBtn.style.display = "block";
      }
    });
  });
}
function randomlyPlaceShips(player) {
  player.board.shipsArray.forEach((ship) => {
    player.board.placeRandom(ship);
  });
  return player;
}
export { drawGrids, dragShips, randomlyPlaceShips };
