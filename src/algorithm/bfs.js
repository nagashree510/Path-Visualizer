import Buckets from 'buckets-js';

const windowWidth = Math.floor(window.innerWidth / 22);
const windowHeight = Math.floor((window.innerHeight - 150) / 21);

const isValid = (row, col, grid) => {

    return row>=0 && row<windowHeight && col>=0 && col<windowWidth && !grid[row][col].isVisited;
}

export const bfs = (grid, startNode, finishNode) => {

  const visitedNodesInOrder = [];

  let dx = [0,0,-1,1];
  let dy = [1,-1,0,0];

  const { row :rowStart , col : colStart} = startNode;
  const { row :rowEnd , col : colEnd} = finishNode;


  let q = Buckets.Queue();
  q.enqueue(grid[rowStart][colStart]);
  grid[rowStart][colStart].isVisited = true;
  
  while(!q.isEmpty()) {
    
    let currentNode = q.peek();
    // console.log(currentNode);
    const { row : currRow, col : currCol} = currentNode;
    q.dequeue();

    if(grid[currRow][currCol].isWall) continue;

    visitedNodesInOrder.push(currentNode);

    if(currentNode === grid[rowEnd][colEnd]){
        // console.log("finish");
        break;
    }

    for(let i=0; i<4; i++){

        let r = currRow + dx[i];
        let c = currCol + dy[i];

        if(isValid(r,c,grid)){

            q.enqueue(grid[r][c]);
            grid[r][c].isVisited = true;
            grid[r][c].previousNode = currentNode;
        }
    }
  }
    return visitedNodesInOrder;  
}


export const visualizeBFS = (grid, startNode, finishNode) => {

    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
    
}

const animateBFS = (visitedNodesInOrder, nodesInShortestPathOrder) =>  {

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  }

// Backtracks from the finishNode to find the shortest path with the help of previous node

export const getNodesInShortestPathOrder = (finishNode) => {
  
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  // as the previoiusNode of starting node is NULL
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
