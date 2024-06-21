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
  const color = null;
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
    color,
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
    return { board, allCoordinates, inverseCoordinate };
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
    return { horizontal, vertical };
  }

  function placeVertical(coordinate, ship) {
    const shipCells = Position(coordinate, ship.length).vertical;
    console.log(isCoordinateFree(shipCells, shipsPositions));
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
  function changeOverLapPositions(coordinate) {
    const findEmptyCell = coordinate;
    const xCoordinate = coordinate[0];
    const ycoordinate = coordinate[1];
    if (checkCoordinate(coordinate, shipsPositions) === false) {
      //add 1 to ycoordinate and check recursively if true return that coordinate
      // and add 1 to make gap ane return that coordinate
      return coordinate;
    } else {
      return changeOverLapPositions([xCoordinate + 1, y]);
    }
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

  function isCoordinateFree(array, arrayTwo) {
    let result = true;
    arrayTwo.forEach((inner) => {
      array.forEach((number) => {
        if ((number.toString() === inner.toString()) === true) {
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
    newPosition.forEach((coordinate) => {
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
        console.log(result);
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
    array.forEach((position) => {
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
      shipsArray.forEach((ship) => {
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
    twoDimensionArray.forEach((coordinate) => {
      oneDimensionArray.push(coordinate);
    });
  }
  function sunkShips() {
    const result = [];
    shipsArray.forEach((ship) => {
      if (ship.isSunk() === true) {
        result.push(ship.shipName);
      }
    });
    return result;
  }
  function changeColor(color) {
    shipsArray.forEach((ship) => {
      if (ship.isSunk() === true) {
        ship.color = color;
      }
    });
  }
  return {
    placeVertical,
    placeHorizontal,
    placeRandom,
    receiveAttack,
    isHit,
    isSunk,
    sunkShips,
    changeColor,
    coordinatesHashMap,
    inverseHashMap,
    missedShots,
    hitShots,
    shipsPositions,
  };
}
function Player(name, ships) {
  const board = GameBoard(ships);
  return {
    board,
    name,
  };
}

function sum(a, b) {
  return a + b;
}
export { sum, Ship, GameBoard, Player };
