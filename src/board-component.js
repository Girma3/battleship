//function draw ships with hit and miss for the owner
function firstBoard(shipCoordinate, hit, miss) {
  // Create a 2D grid of cells
  const cells = [];
  for (let i = 0; i < 10; i++) {
    cells[i] = [];
    for (let j = 0; j < 10; j++) {
      cells[i][j] = "";
    }
  }
  // Mark the coordinates on the grid
  for (const [a, b] of shipCoordinate) {
    cells[a][b] = "ship";
  }
  for (const [x, y] of hit) {
    if (cells[x][y] === "ship") {
      cells[x][y] = "hit";
    }
  }
  for (const [x, y] of miss) {
    if (cells[x][y] !== "ship") {
      cells[x][y] = "miss";
    }
  }
  // Create a container for the grid
  const grids = document.createElement("div");
  grids.classList.add("board");
  // Create buttons for each cell
  for (let i = 0; i < 100; i++) {
    const button = document.createElement("button");
    button.textContent = cells[Math.floor(i / 10)][i % 10];
    button.dataset.index = i;
    button.classList.add("grid-cell");
    if (cells[Math.floor(i / 10)][i % 10] === "ship") {
      button.textContent = "";
      button.classList.add("ship");
      const dot = document.createElement("button");
      dot.classList.add("target-dot");
      dot.style.backgroundColor = "#4b2929";
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "hit") {
      button.textContent = "";
      button.classList.add("ship");
      const dot = document.createElement("button");
      dot.classList.add("target-dot");
      dot.classList.add("hit-strike");
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "miss") {
      button.textContent = "";
      const dot = document.createElement("button");
      dot.classList.add("missed-strike");
      button.appendChild(dot);
    }
    grids.appendChild(button);
  }
  return grids;
}
//function  draw miss and hit and revel ship if it hit used to
//show for opponent by hiding ships when it render first
function strikeBoard(shipCoordinate, hit, miss) {
  // Create a 2D grid of cells
  const cells = [];
  for (let i = 0; i < 10; i++) {
    cells[i] = [];
    for (let j = 0; j < 10; j++) {
      cells[i][j] = "";
    }
  }
  // mark the coordinates on the grid
  for (const [a, b] of shipCoordinate) {
    cells[a][b] = "ship";
  }
  for (const [x, y] of hit) {
    if (cells[x][y] === "ship") {
      cells[x][y] = "hit";
    }
  }
  for (const [x, y] of miss) {
    if (cells[x][y] !== "ship") {
      cells[x][y] = "miss";
    }
  }
  // Create a container for the grid
  const grids = document.createElement("div");
  grids.classList.add("board");
  // Create buttons for each cell
  for (let i = 0; i < 100; i++) {
    const button = document.createElement("button");
    button.textContent = cells[Math.floor(i / 10)][i % 10];
    button.dataset.index = i;
    button.classList.add("grid-cell");
    if (cells[Math.floor(i / 10)][i % 10] === "hit") {
      button.textContent = "";
      button.classList.add("ship");
      const dot = document.createElement("button");
      dot.classList.add("target-dot");
      dot.style.backgroundColor = "red";
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "miss") {
      button.textContent = "";
      const dot = document.createElement("button");
      dot.classList.add("missed-strike");
      button.appendChild(dot);
    } else if (cells[Math.floor(i / 10)][i % 10] === "ship") {
      button.textContent = "";
    }
    grids.appendChild(button);
  }
  return grids;
}
//draw 10 X 10 board
function drawGrids() {
  const grid = document.createElement("div");
  grid.classList.add("board");
  for (let i = 0; i < 100; i++) {
    const button = document.createElement("button");
    button.dataset.index = i;
    button.classList.add("grid-cell");
    grid.appendChild(button);
  }
  return grid;
}
export { firstBoard, strikeBoard, drawGrids };
