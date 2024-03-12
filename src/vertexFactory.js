import LinkedListFactory from './LinkedListFactory.js';

function VertexFactory(label = undefined) {
  let edgeList = LinkedListFactory();
  let previous = null;
  let visited = false;

  function getLabel() {
    return label;
  }

  function setLabel(newLabel) {
    label = newLabel;
  }

  function hasPrevious() {
    return previous !== null;
  }

  function getPrevious() {
    return previous;
  }

  function setPrevious(prev) {
    previous = prev;
  }

  function isVisited() {
    return visited;
  }

  function visit() {
    visited = true;
  }

  function unvisit() {
    visited = false;
  }

  function connect(vertex) {
    edgeList.append(vertex);
  }

  function getEdgeList() {
    return edgeList;
  }

  function clearEdgeList() {
    edgeList = LinkedListFactory();
  }

  return {
    getLabel,
    setLabel,
    hasPrevious,
    getPrevious,
    setPrevious,
    isVisited,
    visit,
    unvisit,
    getEdgeList,
    connect,
    clearEdgeList,
  };
}

export default VertexFactory;
