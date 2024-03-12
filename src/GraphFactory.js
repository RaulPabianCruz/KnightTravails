import VertexFactory from './vertexFactory.js';
import HashMapFactory from './HashMapFactory.js';

function GraphFactory() {
  let vertices = HashMapFactory();

  function addVertex(label) {
    const tempVertex = VertexFactory(label);
    vertices.set(label, tempVertex);
  }

  function addEdge(label1, label2) {
    const vertex1 = vertices.get(label1);
    const vertex2 = vertices.get(label2);
    if (vertex1 !== null && vertex2 !== null) vertex1.connect(vertex2);
  }

  function getVertices() {
    return vertices;
  }

  function resetVertices() {
    const vertexArray = vertices.values();
    for (let i = 0; i < vertexArray.length; i += 1) {
      vertexArray[i].unvisit();
    }
  }

  function getShortestPath(label1, label2) {
    resetVertices();

    const originVertex = vertices.get(label1);
    const endVertex = vertices.get(label2);
    let done = false;
    const vertexQueue = [];
    const path = [];

    originVertex.visit();
    vertexQueue.push(originVertex);

    while (!done && vertexQueue.length !== 0) {
      const frontVertex = vertexQueue.shift();
      let counter = 0;
      const edges = frontVertex.getEdgeList();
      const numOfEdges = edges.size();

      while (!done && counter < numOfEdges) {
        const nextNeighbor = edges.at(counter);
        if (!nextNeighbor.isVisited()) {
          nextNeighbor.visit();
          nextNeighbor.setPrevious(frontVertex);
          vertexQueue.push(nextNeighbor);
        }
        if (nextNeighbor === endVertex) done = true;
        counter += 1;
      }
    }

    path.push(endVertex.getLabel());
    let vertex = endVertex;
    while (vertex.hasPrevious()) {
      vertex = vertex.getPrevious();
      path.push(vertex.getLabel());
    }
    return path;
  }

  function clear() {
    vertices = HashMapFactory();
  }

  return { addVertex, addEdge, getVertices, getShortestPath, clear };
}

export default GraphFactory;
