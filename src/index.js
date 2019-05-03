import AStar from "./a-star";
const aStar = new AStar();

const backgroundFill = "#f1f1f1";

let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


let start = { x: 8, y: 14 };
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

paintStartAndTarget();
document.getElementById("start-btn").onclick = () => {
  clearPath();
  paintPath();
};

document.getElementById("delete-obstacles-btn").onclick = () => {
  clearObstacles();
};

// START
function paintPath() {
  let path = aStar.search(grid, start, target, true);
  console.log(path);

  if (path.length == 0) {
    alert("No se encontró una ruta");
    return;
  }
  let paintTile = () => {
    if (path.length != 1) {
      tiles[path[0].x][path[0].y].style.backgroundColor = "lightblue";
    }
    path.shift();
    if (path.length == 0) {
      clearInterval(intervalId);
    }
  };
  let intervalId = setInterval(paintTile, 100);
}

function selectNewStart() {
  clearPath();
  tiles[start.x][start.y].style.backgroundColor = backgroundFill;
  forAllTiles(tile => {
    tile.onmousedown = () => {
      console.log("New start tile selected");
      tile.style.backgroundColor = "green";
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
      tile.style.backgroundColor = "gold";
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
  tiles[start.x][start.y].style.backgroundColor = "green";
  tiles[target.x][target.y].style.backgroundColor = "gold";
}

function clearPath() {
  forAllTiles(tile => {
    if (tile.style.backgroundColor == "lightblue") {
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

addTileBehavior();
