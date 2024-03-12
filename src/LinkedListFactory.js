import NodeFactory from './NodeFactory.js';

function LinkedListFactory() {
  let headNode = null;
  let tailNode = null;
  let nodeSize = 0;

  function incrementSize() {
    nodeSize += 1;
  }

  function decrementSize() {
    nodeSize -= 1;
  }

  function size() {
    return nodeSize;
  }

  function head() {
    return headNode;
  }

  function tail() {
    return tailNode;
  }

  function append(value) {
    if (tailNode === null) {
      tailNode = NodeFactory(value, null);
      headNode = tailNode;
    } else {
      tailNode.nextNode = NodeFactory(value, null);
      tailNode = tailNode.nextNode;
    }
    incrementSize();
  }

  function prepend(value) {
    if (headNode === null) {
      headNode = NodeFactory(value, null);
      tailNode = headNode;
    } else {
      headNode = NodeFactory(value, headNode);
    }
    incrementSize();
  }

  function at(index) {
    if (index > nodeSize - 1) return null;
    let tmp = headNode;
    for (let i = 1; i <= index; i += 1) {
      tmp = tmp.nextNode;
    }
    return tmp.value;
  }

  function pop() {
    if (headNode === null) {
      return;
    }
    if (headNode === tailNode) {
      headNode = null;
      tailNode = null;
      decrementSize();
    } else {
      let tmp = headNode;
      while (tmp.nextNode !== tailNode) {
        tmp = tmp.nextNode;
      }
      tmp.nextNode = null;
      tailNode = tmp;
      decrementSize();
    }
  }

  function contains(value) {
    let isNodeFound = false;
    let tmp = headNode;

    while (tmp !== null && !isNodeFound) {
      if (tmp.value === value) isNodeFound = true;
      tmp = tmp.nextNode;
    }

    return isNodeFound;
  }

  function find(value) {
    let index = -1;
    let found = false;
    let tmp = headNode;

    while (tmp !== null && !found) {
      index += 1;
      if (tmp.value === value) found = true;
      tmp = tmp.nextNode;
    }

    if (index < 0) return null;
    return index;
  }

  function insertAt(value, index) {
    if (index >= 0 && index <= nodeSize) {
      let prev = null;
      let tmp = headNode;
      for (let i = 1; i <= index; i += 1) {
        prev = tmp;
        tmp = tmp.nextNode;
      }
      if (index === 0) {
        headNode = NodeFactory(value, headNode);
        if (index === nodeSize) tailNode = headNode;
      } else {
        prev.nextNode = NodeFactory(value, tmp);
        if (index === nodeSize) tailNode = prev.nextNode;
      }
      incrementSize();
    }
  }

  function removeAt(index) {
    if (index >= 0 && index < nodeSize) {
      let prev = null;
      let tmp = headNode;
      for (let i = 1; i <= index; i += 1) {
        prev = tmp;
        tmp = tmp.nextNode;
      }
      if (index === 0) {
        headNode = headNode.nextNode;
        tmp.nextNode = null;
        if (index === nodeSize - 1) tailNode = headNode;
      } else {
        prev.nextNode = tmp.nextNode;
        tmp.nextNode = null;
        if (index === nodeSize - 1) tailNode = prev;
      }
      decrementSize();
    }
  }

  function toString() {
    let linkedString = '';
    let tmp = headNode;

    while (tmp !== null) {
      linkedString = linkedString.concat(`( ${tmp.value} ) -> `);
      tmp = tmp.nextNode;
    }

    linkedString = linkedString.concat('null');
    return linkedString;
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    insertAt,
    removeAt,
    toString,
  };
}

export default LinkedListFactory;
