import { Ship, Player } from "./utility";
import { strikeBoard, firstBoard } from "./bn";

const carrier = Ship("carrier", 5);
const battleShip = Ship("battleShip", 4);
const destroyer = Ship("destroyer", 3);
const submarine = Ship("submarine", 3);
const patrol = Ship("patrol", 2);
//
const ships = [carrier, battleShip, destroyer, submarine, patrol];
const playerOne = Player("kings", ships);
const playerTwo = Player("cold", ships);
//function that place ships randomly
function initialBoard(player) {
  ships.forEach((ship) => {
    player.board.placeRandom(ship);
  });
  return player;
}
//const placePlayerOneSHip = initialBoard(playerOne);
//const placePlayerTwoShip = initialBoard(playerTwo);
/*
*GameFlow - object that has 3 methods one to change player turn ,,second to create board using player info, 
*           third to update board state
*GameFlow().printBoard(player) - draw board using player hit,miss and ship position array,
 return 10 x 10 board one with ship shown the other without the ship to show the opponent striking state on the board. 
*/

function GameFlow() {
  const placePlayerOneSHip = initialBoard(playerOne);
  const placePlayerTwoShip = initialBoard(playerTwo);
  const players = [playerOne, playerTwo];
  let activePlayer = players[0];
  const changeTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getPlayer = () => activePlayer;

  const printBoard = (player) => {
    const missStrikes = player.board.missedShots;
    const hitStrikes = player.board.hitShots;
    const allTheShips = player.board.shipsPositions;
    const allCoordinateHashmap = player.board.coordinatesHashmap;
    const shipBoardState = firstBoard(allTheShips, hitStrikes, missStrikes);
    const strikeBoardState = strikeBoard(allTheShips, hitStrikes, missStrikes);
    return {
      shipBoardState,
      strikeBoardState,
    };
  };
  const printNewBoard = () => {
    //draw current player board state using opponent hit and miss
    //then draw striking board using current player hit and miss on opponent board
    changeTurn();
    const shipBoard = printBoard(getPlayer()).shipBoardState;
    changeTurn();
    const strikeBoard = printBoard(getPlayer()).strikeBoardState;

    return {
      shipBoard,
      strikeBoard,
    };
  };
  const playerRound = (player, clickedNum) => {
    const coordinate = player.board.coordinatesHashMap.get(Number(clickedNum));
    player.board.receiveAttack(coordinate);
    printNewBoard();
    changeTurn();
  };
  printNewBoard();
  return {
    getPlayer,
    playerRound,
    printNewBoard,
  };
}
/**
 * function that update the screen using game flow function
 */
function screenController() {
  const game = GameFlow();
  const turn = document.querySelector(".player-turn");
  const playerOneShipsBoard = document.querySelector(".board-one");
  const playerOneStrikeBoard = document.querySelector(".board-two");
  const playerTwoShipsBoard = document.querySelector(".board-three");
  const playerTwoStrikeBoard = document.querySelector(".board-four");
  const updateScreen = () => {
    playerOneShipsBoard.textContent = "";
    playerOneStrikeBoard.textContent = "";
    playerTwoShipsBoard.textContent = "";
    playerTwoStrikeBoard.textContent = "";
    //render
    turn.textContent = `${game.getPlayer().name}`;

    playerOneShipsBoard.appendChild(game.printNewBoard().shipBoard);
    // playerTwoShipsBoard.appendChild(game.printNewBoard().shipBoard);
    // playerOneStrikeBoard.appendChild(game.printNewBoard().strikeBoard);
    playerOneStrikeBoard.appendChild(game.printNewBoard().strikeBoard);
  };
  function clickHandler(e) {
    const player = game.getPlayer();
    game.playerRound(player, e);
    updateScreen();
  }
  playerOneStrikeBoard.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    console.log(e.target);
    clickHandler(index);
  });
  playerTwoStrikeBoard.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    console.log(e.target);
    clickHandler(index);
  });
  //initial render
  updateScreen();
}
//screenController();
export { screenController };
