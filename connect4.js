"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
// Stylistically preferable to use let when mutating

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    const row = [];

    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }

    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  // Creates top row of game board (where the click input happens), set it's id to column-top, and adds a click event listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Creates individual top cells, sets their ids to their x coordinate, and adds them to the top row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    const tableRow = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const tableCell = document.createElement("td");
      tableCell.setAttribute("id", `c-${y}-${x}`);
      tableRow.append(tableCell);
    }

    htmlBoard.append(tableRow);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  return 5;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const tableSpot = document.getElementById(`c-${y}-${x}`);

  const piece = document.createElement("div");
  piece.classList = `piece p${currPlayer}`; // 'piece p1'

  tableSpot.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  // get x from ID of clicked cell
  const x = +evt.target.id; // col

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x); // row
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // update the board variable
  board[y][x] = currPlayer;
  // console.log(board);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // const tieGame = board.every((cell) => cell !== null); // true or false
  // check if each element in each row if null
  const tieGame = board.every(row => row.every((cell) => cell !== null));
  // console.log("board", board, "tie game", tieGame);
  if(tieGame){
    endGame("Tie Game!")
  }




  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // use a ternary to switch players
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();


