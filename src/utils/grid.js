export const START_NODE_ROW = 10;
export const START_NODE_COL = 15;
export const FINISH_NODE_ROW = 5;
export const FINISH_NODE_COL = 50;

const windowWidth = Math.floor(window.innerWidth / 22);
const windowHeight = Math.floor((window.innerHeight - 150) / 21);


const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };


  export const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < windowHeight; row++) {
      const currentRow = [];
      for (let col = 0; col < windowWidth; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
  
    return grid;
  };

export const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
  
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };