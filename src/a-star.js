import Heuristics from "./heuristics";

export default class AStar {
  search(grid, start, target, heuristic) {
    // Crear objetos nodos a partir de arreglo
    let nodes = [];
    for (let x = 0; x < grid.length; x++) {
      nodes[x] = [];
      for (let y = 0; y < grid[x].length; y++) {
        nodes[x][y] = {
          isObstacle: grid[x][y] === 1,
          visited: false,
          closed: false,
          g: 0,
          h: 0,
          f: 0,
          x,
          y
        };
      }
    }

    let startNode = nodes[start.x][start.y];
    let targetNode = nodes[target.x][target.y];

    heuristic = Heuristics.manhattan;

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

      // El resultado se ha encontrado
      if (currentNode === targetNode) {
        let node = currentNode;
        let path = [];
        while (node.parent) {
          path.push(node);
          node = node.parent;
        }
        return path.reverse();
      }

      openList.remove(lowestCostIndex);
      currentNode.closed = true;

      let children = this.getChildren(nodes, currentNode);
      children.forEach(child => {
        if (child.closed || child.isObstacle) {
          // saltar al siguiente hijo
          return;
        }

        // si el hijo está en la lista open
        if (!child.visited) {
          //  La primera vez que se visita el nodo
          child.h = heuristic(child, targetNode);
          child.visited = true;
          openList.push(child);
        }
        child.parent = currentNode;
        child.g = currentNode.g + 1;
        child.f = child.g + child.h;
      });
    }
    console.log("No se encontró una ruta");
    return [];
  }

  getChildren(grid, node) {
    let children = [];
    let { x, y } = node;

    // arriba
    if (grid[x - 1] && grid[x - 1][y]) {
      children.push(grid[x - 1][y]);
    }

    // abajo
    if (grid[x + 1] && grid[x + 1][y]) {
      children.push(grid[x + 1][y]);
    }

    // izquierda
    if (grid[x][y - 1]) {
      children.push(grid[x][y - 1]);
    }

    // derecha
    if (grid[x][y + 1]) {
      children.push(grid[x][y + 1]);
    }
    console.log("children");
    console.log(children);
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
