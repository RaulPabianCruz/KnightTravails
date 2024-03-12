import GraphFactory from './GraphFactory.js';

const chessBoard = GraphFactory();
for (let i = 0; i < 8; i += 1) {
  for (let j = 0; j < 8; j += 1) {
    chessBoard.addVertex(`[${i},${j}]`);
  }
}

for (let i = 0; i < 8; i += 1) {
  for (let j = 0; j < 8; j += 1) {
    const currVertex = `[${i},${j}]`;
    if (i + 2 < 8) {
      if (j + 1 < 8) chessBoard.addEdge(currVertex, `[${i + 2},${j + 1}]`);
      if (j - 1 >= 0) chessBoard.addEdge(currVertex, `[${i + 2},${j - 1}]`);
    }
    if (i - 2 >= 0) {
      if (j + 1 < 8) chessBoard.addEdge(currVertex, `[${i - 2},${j + 1}]`);
      if (j - 1 >= 0) chessBoard.addEdge(currVertex, `[${i - 2},${j - 1}]`);
    }
    if (j + 2 < 8) {
      if (i + 1 < 8) chessBoard.addEdge(currVertex, `[${i + 1},${j + 2}]`);
      if (i - 1 >= 0) chessBoard.addEdge(currVertex, `[${i - 1},${j + 2}]`);
    }
    if (j - 2 >= 0) {
      if (i + 1 < 8) chessBoard.addEdge(currVertex, `[${i + 1},${j - 2}]`);
      if (i - 1 >= 0) chessBoard.addEdge(currVertex, `[${i - 1},${j - 2}]`);
    }
  }
}

function KnightTravails(coor1, coor2) {
  const tempArray = chessBoard.getShortestPath(coor1, coor2);
  console.log(
    `=> You made it in ${tempArray.length} moves! Here is your path: `,
  );
  while (tempArray.length !== 0) {
    console.log(tempArray.pop());
  }
}

KnightTravails('[0,0]', '[7,7]');
