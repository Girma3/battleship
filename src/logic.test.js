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
    const carrier = Ship("carrier", 3);
    const ships = [];
    ships.push(carrier);
    const position = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    expect(GameBoard(ships).placeVertical([0, 0], carrier)).toEqual(
      expect.arrayContaining(position)
    );
  });
});
describe("is game board return horizontal position", () => {
  test("vertical position ", () => {
    const carrier = Ship("carrier", 3);
    const ships = [];
    ships.push(carrier);
    const position = [
      [0, 0],
      [1, 0],
      [2, 0],
    ];
    expect(GameBoard(ships).placeHorizontal([0, 0], carrier)).toEqual(
      expect.arrayContaining(position)
    );
  });
});
describe("is ", () => {
  test("check the attack ", () => {
    const patrolShip = Ship("patrol", 2);
    const ships = [];
    ships.push(patrolShip);
    const board = GameBoard(ships);
    const place = board.placeVertical([0, 0], patrolShip); // place is array must contain [[0,0],[0,1]]
    const attack = board.receiveAttack([0, 1]);
    const anotherAttack = board.receiveAttack([1, 4]); // missed shot
    expect(board.hitShots).toEqual(expect.arrayContaining([[0, 1]]));
    expect(board.missedShots).toEqual(expect.arrayContaining([[1, 4]]));
  });
});
