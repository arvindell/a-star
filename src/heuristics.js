export default class Heuristics {
  static manhattan(node1, node2) {
    let d1 = Math.abs(node2.x - node1.x);
    let d2 = Math.abs(node2.y - node1.y);
    return d1 + d2;
  }

  static euclidean(node1, node2) {
    return Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2);
  }

  static zero() {
    return 0;
  }

}
