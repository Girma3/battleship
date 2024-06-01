import { version } from "html-webpack-plugin";

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
 *GameBoard().placeShip(coordinate, length) - method that receive one coordinate and length of ship and return object that is  array of coordinates on board vertical and horizontal.
 *GameBoard().receiveAttack(coordinate) - method that receive coordinate and record if it is hit or miss by checking ship positions.
 *GameBoard().createBoard(row, col) - method that accept row and col and create board and return board and hashmap that contain
 *  number as key and coordinate as value(0 - [0,0]...99,[9,9]) and reverse of another has map coordinate as key and value as number
 * @param {*} a
 * @param {*} b
 * @returns
 */
function GameBoard() {
  function createBoard(row = 10, column = 10) {
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

  function Position(number, length) {
    const board = createBoard(10, 10);
    const getCoordinate = board.allCoordinates.get(number);
    const vertical = [];
    const horizontal = [];
    if (number >= 0 && number < 10) {
      for (let i = 0; i < length; i++) {
        horizontal.push([getCoordinate[0] + i, getCoordinate[1]]);
        vertical.push([getCoordinate[0], getCoordinate[1] + i]);
      }
    }

    return { horizontal, vertical };
  }

  function placeShip(firstCoordinate, length) {
    return Position(firstCoordinate, length);
  }

  return {
    createBoard,
    placeShip,
  };
}

function sum(a, b) {
  return a + b;
}

export { sum, Ship, GameBoard };
