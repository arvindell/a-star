import AStar from "./a-star";

const aStar = new AStar();

let grid = [
  [0, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 1]
];

let start = { x: 0, y: 0 };
let end = { x: 13, y: 2 };
let result = aStar.search(grid, start, end, true);
console.log(result);
