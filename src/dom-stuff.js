import { Ship, GameBoard, Player } from "./utility";
function drawBoard() {
  const grid = document.createElement("div");
  grid.classList.add("board");
  grid.addEventListener("click", (e) => {
    console.log(e.target.dataset.index);
  });
  const boardObj = GameBoard();
  const board = boardObj.createBoard(10, 10);
  const coordinates = board.allCoordinates;
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    grid.appendChild(cell);
  }
  return grid;
}
function createPlayer(name) {
  return Player(name);
}

function positionShips(name) {
  const player = Player(name);
  const board = player.board.createBoard(10, 10);
  const coordinates = board.allCoordinates;
  const reverseCoordinate = board.inverseCoordinate;
  const takenCells = player.board.shipsPosition;

  const carrier = Ship("carrier", 5, 0);
  const battleShip = Ship("battleShip", 4, 0);
  const destroyer = Ship("destroyer", 3, 0);
  const submarine = Ship("submarine", 3, 0);
  const patrol = Ship("patrol", 2, 0);

  //return coordinates as number to mark  the board later
  const carrierPlace = verticalPlace(carrier, reverseCoordinate);
  const battleShipPlace = verticalPlace(battleShip, reverseCoordinate);
  const destroyerPlace = verticalPlace(destroyer, reverseCoordinate);
  const submarinePlace = verticalPlace(submarine, reverseCoordinate);
  const patrolPlace = verticalPlace(patrol, reverseCoordinate);
  const ships = [carrier, battleShip, destroyer, submarine, patrol];
  const shipsCoordinates = [
    carrierPlace,
    battleShipPlace,
    destroyerPlace,
    submarinePlace,
    patrolPlace,
  ];

  console.log(player.board.shipsPosition);
  // function that return numbers of array converted from coordinates position [0,0] to 0 etc to mark the board
  function placeHorizontal(ship, coordinate) {
    return convertTonumber(
      player.board.placeHorizontal(ship, reverseCoordinate),
      reverseCoordinate
    );
  }
  function verticalPlace(ship, reverseCoordinate) {
    return player.board.placeVertical(ship, reverseCoordinate);
  }

  //function to  add style on cell to draw ship
  function addStyle(array, name) {
    for (let i = 0; i < array.length; i++) {
      const ship = document.querySelector(`[data-index = '${array[i]}']`);
      ship.style.border = "2px solid blue";
      ship.textContent = `${name}`;
    }
  }

  addStyle(convertTonumber(carrierPlace, reverseCoordinate), carrier.shipName);
  addStyle(
    convertTonumber(destroyerPlace, reverseCoordinate),
    destroyer.shipName
  );
  addStyle(
    convertTonumber(submarinePlace, reverseCoordinate),
    submarine.shipName
  );
  addStyle(
    convertTonumber(battleShipPlace, reverseCoordinate),
    battleShip.shipName
  );
  addStyle(convertTonumber(patrolPlace, reverseCoordinate), patrol.shipName);
}

//coordinate to number
function convertTonumber(array, hashmap) {
  console.log(array);
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(hashmap.get(array[i].toString()));
  }
  return result;
}

export { drawBoard, createPlayer, positionShips };
