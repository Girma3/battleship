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
    const coordinate = 0; // [0,0];
    const length = 3;

    expect(GameBoard().placeShip(coordinate, length).vertical).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });
});
describe("is ", () => {
  test("vertical position ", () => {
    const patrolShip = Ship("patrol", 2, 0);
    patrolShip.positions = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    GameBoard().receiveAttack([0, 1]);
    expect(patrolShip.hits).toEqual(1);
  });
});
