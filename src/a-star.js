import Heuristics from "./heuristics";

export default class AStar {
  search(grid, start, target, heuristic, gToBeSet) {
    let search = [];

    // Crear objetos nodos a partir de arreglo
    let nodes = [];
    for (let x = 0; x < grid.length; x++) {
      nodes[x] = [];
      for (let y = 0; y < grid[x].length; y++) {
        nodes[x][y] = {
          x,
          y,
          isObstacle: grid[x][y] === 1,
          visited: false,
          closed: false,
          g: 0,
          h: 0,
          f: 0
        };
      }
    }

    let startNode = nodes[start.x][start.y];
    let targetNode = nodes[target.x][target.y];

    let openList = [];
    openList.push(startNode);

    while (openList.length > 0) {
      let lowestCostIndex = 0;
      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowestCostIndex].f) {
          lowestCostIndex = i;
        }
      }
      let currentNode = openList[lowestCostIndex];

      openList.remove(lowestCostIndex);
      currentNode.closed = true;

      // El resultado se ha encontrado
      if (currentNode === targetNode) {
        let node = currentNode;
        let path = [];
        while (node.parent) {
          path.push(node);
          node = node.parent;
        }
        return { search, path: path.reverse() };
      }

      let children = this.getChildren(nodes, currentNode);
      console.log("children at " + currentNode.x + "," + currentNode.y);
      console.log(children);
      children.forEach(child => {
        if (child.closed || child.isObstacle) {
          // saltar al siguiente hijo
          return;
        }

        let gScore;
        if (gToBeSet === null) {
          gScore =
            currentNode.g + (this.isDiagonal(child, currentNode) ? 2 : 1);
        } else {
          gScore = gToBeSet;
        }

        let gIsBetter = false;

        if (!child.visited) {
          child.visited = true;
          gIsBetter = true;
          child.h = heuristic(child, targetNode);
          openList.push(child);
          search.push(child);
        } else if (gScore < child.g) {
          gIsBetter = true;
        }

        if (gIsBetter) {
          child.parent = currentNode;
          child.g = gScore;
          child.f = child.g + child.h;
        }
      });
    }
    console.log("No se encontró una ruta");
    return [];
  }

  isDiagonal(tile1, tile2) {
    return tile1.x != tile2.x && tile1.y != tile2.y;
  }

  getChildren(grid, node) {
    let children = [];
    let { x, y } = node;
    let child;

    // norte
    child = grid[x - 1];
    if (child && child[y]) {
      children.push(child[y]);
    }

    // este
    child = grid[x];
    if (child && child[y - 1]) {
      children.push(child[y - 1]);
    }

    // sur
    child = grid[x + 1];
    if (child && child[y]) {
      children.push(child[y]);
    }

    // oeste
    child = grid[x];
    if (child && child[y + 1]) {
      children.push(child[y + 1]);
    }

    // noreste
    child = grid[x - 1];
    if (child && child[y + 1]) {
      children.push(child[y + 1]);
    }

    // noroeste
    child = grid[x - 1];
    if (child && child[y - 1]) {
      children.push(child[y - 1]);
    }

    // sureste
    child = grid[x + 1];
    if (child && child[y + 1]) {
      children.push(child[y + 1]);
    }

    // suroeste
    child = grid[x + 1];
    if (child && child[y - 1]) {
      children.push(child[y - 1]);
    }

    return children;
  }
}

// funciones de utilidad
Array.prototype.indexOf = function(elt /*, from*/) {
  let len = this.length;
  let from = Number(arguments[1]) || 0;
  from = from < 0 ? Math.ceil(from) : Math.floor(from);
  if (from < 0) {
    from += len;
  }
  for (; from < len; from++) {
    if (from in this && this[from] === elt) {
      return from;
    }
  }
  return -1;
};

Array.prototype.remove = function(from, to) {
  let rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
