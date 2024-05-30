/* eslint-disable no-undef */
import { sum, Ship } from "./utility";
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
describe("board", () => {
  test("is ship position vertical", () => {
    expect(submarine.positions).toContain("0,0");
    expect(submarine.positions).toContain("0,1");
    expect(submarine.positions).toContain("0,2");
  });
});
