/**
 *ship  has name,length and hits,position as property and isSunk and hit as method
 *ship.position - is an array that hold coordinates of the ship.
 *ship.isSunk() - to check the ship is sunk or not return boolean
 *ship.hit(ship.hits) - increase ship hits on by one each time it is called.
 * @param {*} shipName
 * @param {*} length
 */
function Ship(shipName, length, hits = 0) {
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
    isSunk,
  };
}
/**
 *GameBoard - object that has this methods.
 *GameBoard().placeVertical(ship, coordinate, length) - method that receive ship object, one coordinate and length of ship and return array of coordinates on vertical place on board .
 *GameBoard().placeHorizontal(ship, coordinate, length) - method that receive ship object, one coordinate and length of ship and return array of coordinates on horizontal place on board .
 *GameBoard().receiveAttack(coordinate) - method that receive coordinate and record if it is hit or miss by checking ship positions.
 *GameBoard().createBoard(row, col) - method that accept row and col and create board and return board and hashmap that contain
 *number as key and coordinate as value(0 - [0,0]...99,[9,9]) and reverse of another has map coordinate as key and value as number
 * GameBoard().isSunk() - return boolean if all ship on the board is sunk or not.
 * GameBoard().isMiss(board, coordinate) && GameBoard().isHit(board, coordinate) -  check the coordinate is hit or miss
 *GameBoard().missedShots - return array of coordinates for missed shots.
 *GameBoard().targetHit - return array of coordinates for hit shots.
 * GameBoard().shipsPositions - return array of coordinate occupied by the ships.
 * @param {*} a
 * @param {*} b
 * @returns
 */
function GameBoard() {
  const allShips = [];
  const shipsPosition = [];
  const targetHit = [];
  const missedShots = [];
  function createBoard(row, column) {
    const allCoordinates = new Map();
    const inverseCoordinate = new Map();
    const board = [];
    let k = 0;
    for (let i = 0; i < row; i++) {
      board[i] = [];
    }
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < column; y++) {
        board[x][y] = [x, y];
        allCoordinates.set(k, [x, y]);
        inverseCoordinate.set([x, y].toString(), k);
        k++;
      }
    }
    return { board, allCoordinates, inverseCoordinate };
  }
  // function to position on 10 x 10 board
  function Position(number, length) {
    const board = createBoard(10, 10);
    const getCoordinate = board.allCoordinates.get(number);
    let vertical = [];
    let horizontal = [];
    const reverseH = [];
    const reverseV = [];
    const x = getCoordinate[0];
    const y = getCoordinate[1];

    if (x + length < 10 && y + length < 10) {
      for (let i = 0; i < length; i++) {
        horizontal.push([x + i, y]);
        vertical.push([x, y + i]);
        //[0,0], [ 5,0]
      }
    } else if (x + length >= 10 && y + length >= 10) {
      for (let i = 0; i < length; i++) {
        reverseV.push([x, y - i]);
        reverseH.push([x - i, y]);
        //[9,9]
        horizontal = reverseH;
        vertical = reverseV;
      }

      horizontal = reverseH;
      vertical = reverseV;
    } else if (x + length >= 10 && y + length < 10) {
      for (let i = 0; i < length; i++) {
        reverseV.push([x, y + i]);
        reverseH.push([x - i, y]);
      }
      //[9,2]
      horizontal = reverseH;
      vertical = reverseV;
    } else if (x + length < 10 && y + length >= 10) {
      for (let i = 0; i < length; i++) {
        reverseV.push([x, y - i]);
        reverseH.push([x + i, y]);
      }
      //[1,9]
      horizontal = reverseH;
      vertical = reverseV;
    }
    return { horizontal, vertical };
  }
  function randomNum() {
    return Math.floor(Math.random() * 100);
  }
  //function turn coordinate to number using the board hasmap
  function convertTonumber(array, hashmap) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(hashmap.get(array[i].toString()));
    }
    return result;
  }
  //function that convert coordinate to number and return random number that exclude the coordinates in  array
  function shipCoordinate(array, hashmap) {
    const number = randomNum();
    if (array.length <= 0) return number;
    const coordinateToNum = convertTonumber(array, hashmap);
    return freeCell(randomNum, coordinateToNum);
  }
  //generate random number that is not occupied or not the part of an array
  function freeCell(cb, array) {
    const number = cb();
    if (array.length <= 0) return number;
    if (array.includes(number) === false) {
      return number;
    } else {
      return freeCell(cb, array);
    }
  }
  //function that compare generate coordinates of array  and occupied coordinate array return boolean
  function checkCell(array, arrayTwo) {
    for (let i = 0; i < arrayTwo.length; i++) {
      if (array.includes(arrayTwo[i])) {
        return true;
      }
    }
    return false;
  }
  //function that return coordinates of array for ship using random number generated  and
  // that exclude already occupied coordinates
  // reverse coordinate is hashmap that contain coordinate as key and number as value ([0,0] , 0)
  function placeHorizontal(ship, reverseCoordinate) {
    const place = Position(
      shipCoordinate(shipsPosition, reverseCoordinate),
      ship.length
    );
    const occupied = convertTonumber(shipsPosition, reverseCoordinate);
    const current = convertTonumber(place.horizontal, reverseCoordinate);
    if (shipsPosition.length <= 5 || checkCell(current, occupied) === false) {
      place.horizontal.forEach((coordinate) => {
        shipsPosition.push(coordinate.toString());
        ship.positions.push(coordinate.toString());
      });
      return place.horizontal;
    } else {
      placeHorizontal(ship, reverseCoordinate);
    }
  }
  function placeVertical(ship, reverseCoordinate) {
    const place = Position(
      shipCoordinate(shipsPosition, reverseCoordinate),
      ship.length
    );
    const occupied = convertTonumber(shipsPosition, reverseCoordinate);
    const current = convertTonumber(place.vertical, reverseCoordinate);
    if (shipsPosition.length <= 5 || checkCell(current, occupied) === false) {
      place.vertical.forEach((coordinate) => {
        shipsPosition.push(coordinate.toString());
        ship.positions.push(coordinate.toString());
      });
      return place.vertical;
    } else {
      placeVertical(ship, reverseCoordinate);
    }
  }
  function receiveAttack(coordinate) {
    const shot = isHit(shipsPosition, coordinate.toString());
    if (shot === true) {
      targetHit.push(coordinate.toString());
      whichShip(allShips, coordinate);
      return true;
    } else {
      missedShots.push(coordinate.toString());
      return false;
    }
  }
  function isHit(array, number) {
    return array.includes(number);
  }
  function isMiss(array, number) {
    let result = false;
    array.forEach((shot) => {
      if ((shot === number) === true) {
        return (result = true);
      }
    });
    return result;
  }
  //method to call hit on specific ship
  function whichShip(allShips, coordinate) {
    allShips.forEach((ship) => {
      ship.positions.forEach((position) => {
        if (coordinate.toString() === position) {
          ship.hit();
        }
      });
    });
  }

  function isAllShipSunk(arrayOne, arrayTwo) {
    return arrayOne.length === arrayTwo.length ? true : false;
  }

  return {
    shipsPosition,
    missedShots,
    targetHit,
    createBoard,
    receiveAttack,
    placeHorizontal,
    placeVertical,
    isMiss,
    isHit,
    isAllShipSunk,
  };
}
/**
 * Player()- object that has player name and board for each players
 *
 */
function Player(name) {
  return {
    name,
    board: GameBoard(),
  };
}

function sum(a, b) {
  return a + b;
}
//
const blue = Player("blues");
const bo = Ship("vb", 3, 0);
const pat = Ship("nm", 2, 0);
const destroy = Ship("nm", 4, 0);
const submarine = Ship("nm", 3, 0);
const bat = Ship("nm", 5, 0);
const board = blue.board.createBoard(10, 10);
const coordinate = board.allCoordinates;
const rev = board.inverseCoordinate;
const place = blue.board.placeVertical(bo, rev);
const batplace = blue.board.placeVertical(bat, rev);

const patPlace = blue.board.placeHorizontal(pat, rev);

const dest = blue.board.placeVertical(destroy, rev);
const sub = blue.board.placeVertical(submarine, rev);

export { sum, Ship, GameBoard, Player };
