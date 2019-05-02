import AStar from "./a-star";
const aStar = new AStar();


let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let addObstacle = (x, y) => {
  grid[x][y] = 1;
  elements[x][y].style.backgroundColor = "gray";
};

let mouseDown = false;
document.body.onmousedown = function() {
  mouseDown = true;
};
document.body.onmouseup = function() {
  mouseDown = false;
};


// Grid creation
let elements = [];
grid.forEach((row, rowIndex) => {
  let thisRow = [];
  elements.push(thisRow);
  let rowElement = document.createElement("div");
  rowElement.style.display = "flex";
  document.getElementById("playground").appendChild(rowElement);
  row.forEach((item, itemindex) => {
    let tile = document.createElement("div");
    tile.className = "tile";
    if (item === 1) {
      tile.style.backgroundColor = "gray";
    }

    tile.onmouseenter = () => {
      if (mouseDown) {
        addObstacle(rowIndex, itemindex);
      }
    };
    tile.onmousedown = () => addObstacle(rowIndex, itemindex);

    thisRow.push(tile);
    rowElement.appendChild(tile);
  });
});

let start = { x: 5, y: 13 };
let end = { x: 0, y: 0 };




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
  let path = aStar.search(grid, start, end, true);
  console.log(path);

  if (path.length == 0) {
    alert("No se encontró una ruta");
    return;
  }
  let paintTile = () => {
    if (path.length != 1) {
      elements[path[0].x][path[0].y].style.backgroundColor = "lightblue";
    }
    path.shift();
    if (path.length == 0) {
      clearInterval(intervalId);
    }
  };
  let intervalId = setInterval(paintTile, 100);
}



function paintStartAndTarget() {
  elements[start.x][start.y].style.backgroundColor = "green";
  elements[end.x][end.y].style.backgroundColor = "gold";
}

function clearPath() {
  elements.forEach(row => {
    row.forEach(element => {
      if (element.style.backgroundColor == "lightblue") {
        element.style.backgroundColor = "white";
      }
    });
  });
}

function clearObstacles() {
  
  grid.forEach((row, rowIndex) => {
    row.forEach((item, i) => {
      grid[rowIndex][i] = 0;
    });
  });

  // visualmente
  elements.forEach(row => {
    row.forEach(element => {
      if (element.style.backgroundColor == "gray") {
        element.style.backgroundColor = "white";
      }
    });
  });

  clearPath();
}
