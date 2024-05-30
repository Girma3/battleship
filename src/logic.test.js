/* eslint-disable no-undef */
import { sum } from "./utility";
/*eslint no-undef: "error"*/
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

const submarine = Ship("submarine", 3);
describe("submarine", () => {
  test("is length"),
    () => {
      expect(submarine.length).toBeEqual(3);
    };
  test("is sunk", () => {
    expect(submarine.isSunk()).toBeFalsy();
  });
});
