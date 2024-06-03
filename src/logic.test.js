/* eslint-disable no-undef */
import { sum, Ship, GameBoard } from "./utility";
/*eslint no-undef: "error"*/
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

const submarine = Ship("submarine", 3, 0);
submarine.hit();
submarine.hit();
submarine.hit();
describe("submarine", () => {
  test("is length", () => {
    expect(submarine.length).toEqual(3);
  });
  test("number of hits", () => {
    expect(submarine.hits).toEqual(3);
  });
  test("is sunk", () => {
    expect(submarine.isSunk()).toBeTruthy();
  });
});

describe("is game board return vertical position", () => {
  test("vertical position ", () => {
    const carrier = Ship("carrier", 3, 0);
    const coordinate = 0; // [0,0];
    const length = 3;

    expect(GameBoard().placeVertical(carrier, coordinate, length)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });
});
describe("is ", () => {
  test("check the attack ", () => {
    const patrolShip = Ship("patrol", 2, 0);
    const board = GameBoard();
    const place = board.placeVertical(patrolShip, 0, 2); // 0 is [0,0] in coordinate on board
    const attack = board.receiveAttack([0, 1]); // place is array must contain [[0,0],[0,1]]
    const anotherAttack = board.receiveAttack([1, 4]);
    const thirdAttack = board.receiveAttack([0, 0]);
    expect(attack).toBeTruthy();
    expect(anotherAttack).toBeFalsy();
    expect(patrolShip.hits).toEqual(2);
    expect(board.isMiss(board.missedShots, [1, 4].toString())).toBeTruthy();
    expect(board.isHit(board.shipsPosition, [0, 0].toString())).toBeTruthy();
  });
});
