import AStar from "./a-star";
const aStar = new AStar();

const backgroundFill = "#f1f1f1";
const visitedColor = "lightblue";
const targetColor = "gold";
const startColor = "green";
const pathColor = "cornflowerblue";

let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let start = { x: 3, y: 5 };
let target = { x: 0, y: 0 };

let addObstacle = (x, y) => {
  clearPath();
  if (grid[x][y] == 1) {
    grid[x][y] = 0;
    tiles[x][y].style.backgroundColor = backgroundFill;
  } else {
    grid[x][y] = 1;
    tiles[x][y].style.backgroundColor = "gray";
  }
};

// TODO: reconsider
let mouseDown = false;
document.body.onmousedown = function() {
  mouseDown = true;
};
document.body.onmouseup = function() {
  mouseDown = false;
};

// Grid creation
let tiles = [];
grid.forEach((row, rowIndex) => {
  let thisRow = [];
  tiles.push(thisRow);
  let rowElement = document.createElement("div");
  rowElement.style.display = "flex";
  document.getElementById("playground").appendChild(rowElement);
  row.forEach((item, itemindex) => {
    let tile = document.createElement("div");
    tile.className = "tile";
    if (item === 1) {
      tile.style.backgroundColor = "gray";
    }

    tile.x = rowIndex;
    tile.y = itemindex;

    thisRow.push(tile);
    rowElement.appendChild(tile);
  });
});

// START
function paintSearch() {
  let result = aStar.search(grid, start, target, true);
  let { search, path } = result;
  console.log(search);

  if (search.length == 0) {
    alert("No se encontró una ruta");
    return;
  }
  let paintSearchTile = () => {
    let nextTile = tiles[search[0].x][search[0].y];
    // si no es el nodo target o el inicial, píntalo
    if (nextTile != tiles[target.x][target.y] && nextTile != tiles[start.x][start.y]) {
      nextTile.style.backgroundColor = visitedColor;
    }
    search.shift();
    if (search.length == 0) { // detener interval
      clearInterval(intervalId);
      paintPath(path);
    }
  };
  let intervalId = setInterval(paintSearchTile, 50);
}

function paintPath(path) {
  path.pop(); // para no pintar el target
  path.forEach(element => {
    tiles[element.x][element.y].style.backgroundColor = pathColor;
  });
}

function selectNewStart() {
  clearPath();
  tiles[start.x][start.y].style.backgroundColor = backgroundFill;
  forAllTiles(tile => {
    tile.onmousedown = () => {
      console.log("New start tile selected");
      tile.style.backgroundColor = startColor;
      start.x = tile.x;
      start.y = tile.y;

      addTileBehavior();
    };
  });
}

function selectNewTarget() {
  clearPath();
  tiles[target.x][target.y].style.backgroundColor = backgroundFill;
  forAllTiles(tile => {
    tile.onmousedown = () => {
      console.log("New target tile selected");
      tile.style.backgroundColor = targetColor;
      target.x = tile.x;
      target.y = tile.y;

      addTileBehavior();
    };
  });
}

function addTileBehavior() {
  forAllTiles(tile => {
    tile.onmousedown = () => addObstacle(tile.x, tile.y);
  });
  tiles[start.x][start.y].onmousedown = selectNewStart;
  tiles[target.x][target.y].onmousedown = selectNewTarget;
}

function paintStartAndTarget() {
  tiles[start.x][start.y].style.backgroundColor = startColor;
  tiles[target.x][target.y].style.backgroundColor = targetColor;
}

function clearPath() {
  forAllTiles(tile => {
    if (
      tile.style.backgroundColor == visitedColor ||
      tile.style.backgroundColor == pathColor
    ) {
      tile.style.backgroundColor = backgroundFill;
    }
  });
}

function clearObstacles() {
  grid.forEach((row, rowIndex) => {
    row.forEach((item, i) => {
      grid[rowIndex][i] = 0;
    });
  });

  forAllTiles(tile => {
    if (tile.style.backgroundColor == "gray") {
      tile.style.backgroundColor = backgroundFill;
    }
  });

  clearPath();
}

function forAllTiles(callback) {
  tiles.forEach(row => {
    row.forEach(element => {
      callback(element);
    });
  });
}

paintStartAndTarget();
document.getElementById("start-btn").onclick = () => {
  clearPath();
  paintSearch();
};

document.getElementById("delete-obstacles-btn").onclick = () => {
  clearObstacles();
};

addTileBehavior();
