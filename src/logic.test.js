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
  test("horizontal position ", () => {
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
describe("is receive attack  record shots", () => {
  test("check the attack ", () => {
    const patrolShip = Ship("patrol", 2);
    const destroyer = Ship("destroyer", 3);
    const ships = [];
    ships.push(patrolShip);
    ships.push(destroyer);
    const board = GameBoard(ships);
    const place = board.placeVertical([0, 0], patrolShip); // place is array must contain [[0,0],[0,1]]
    const placeDestroyer = board.placeVertical([4, 5], destroyer);
    const attack = board.receiveAttack([0, 1]);
    const destroyerAttack = board.receiveAttack([4, 5]);
    const anotherAttack = board.receiveAttack([1, 4]); // missed shot
    expect(board.shipsPositions).toEqual(expect.arrayContaining([[4, 6]]));
    expect(board.hitShots).toEqual(expect.arrayContaining([[0, 1]]));
    expect(board.hitShots).toEqual(expect.arrayContaining([[4, 5]]));
    expect(board.missedShots).toEqual(expect.arrayContaining([[1, 4]]));
    expect(patrolShip.hits).toEqual(1);
  });
});
describe("change overlap positions", () => {
  test("force vertical change", () => {
    const patrolShip = Ship("patrol", 2);
    const destroyer = Ship("destroyer", 3);
    const ships = [];
    ships.push(patrolShip);
    ships.push(destroyer);
    const board = GameBoard(ships);
    const placePatrol = board.placeVertical([0, 0], patrolShip); // place is array must contain [[0,0],[0,1]]
    const placeDestroyer = board.placeVertical([0, 0], destroyer);
    const destroyerPosition = destroyer.positions;
    console.log(destroyerPosition);
    const position = [[0, 1]];
    expect(destroyerPosition).toEqual(expect.not.arrayContaining(position));
  });
});
