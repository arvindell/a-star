import AStar from "./a-star";

const aStar = new AStar();

let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let elements = [];
grid.forEach(row => {
  elements.push([]);
  let rowElement = document.createElement("div");
  rowElement.style.display = "flex";
  document.getElementById("playground").appendChild(rowElement);
  row.forEach(item => {
    let tile = document.createElement("div");
    tile.className = "tile";
    if (item === 1) {
      tile.style.backgroundColor = "gray";
    }
    elements.push(tile);
    rowElement.appendChild(tile);
  });
});

let start = { x: 0, y: 0 };
let end = { x: 5, y: 2 };
let result = aStar.search(grid, start, end, true);
console.log(result);

document.getElementById("start-btn").onclick = () => {
  console.log("started btn");
};
