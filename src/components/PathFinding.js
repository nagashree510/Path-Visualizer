import React, { useState, useEffect } from "react";
import Node from "./Node";
import { visualizeBFS } from "../algorithm/bfs";
import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  getInitialGrid,
  getNewGridWithWallToggled,
} from "../utils/grid";
import "./PathFinding.css";
import img from "../../src/logo.50d5c895.svg";

const windowWidth = Math.floor(window.innerWidth / 22);
const windowHeight = Math.floor((window.innerHeight - 150) / 21);

const PathFinding = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  const resetAll = () => {
      setGrid(getInitialGrid());

      for (let row = 0; row < windowHeight; row++) {	
        for (let col = 0; col < windowWidth; col++) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }

    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start";
		document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish";
  }

  const resetExceptWalls = () => {

    for (let row = 0; row < windowHeight; row++) {	
			for (let col = 0; col < windowWidth; col++) {
				//if current node is not a wall then reset all classes & if it is not a wall then do nothing i.e node-wall class will remain
				if(!grid[row][col].isWall){	
					document.getElementById(`node-${row}-${col}`).className = "node"
				}
				grid[row][col].isVisited = false;
				grid[row][col].prevNode = null;
			}
		}

    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start";
		document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish";

    setGrid(grid);

  }

  const runBFS = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    visualizeBFS(grid, startNode, finishNode);
  };

  return (
    <>
      <nav className="nav">
        <img src={img} alt="jiujkj"className="img"></img>
        <div className="symbol">
        <div className="item">
        <div className="node node-start"></div>
        <div >Start Node</div>
        </div>
        <div className="item">
        <div className="node node-finish"></div>
        <div >End Node</div>
        </div>
        <div className="item">
        <div className="node node-wall"></div>
        <div >Wall</div>
        </div>
        </div>

        <div className="button">
        <button onClick={resetAll} className="button button-reset" > Reset All</button>
        <button onClick={resetExceptWalls} className="button button-reset" > Reset (Keep Walls)</button>
        <button onClick={runBFS} className="button visualize" > Visualise Shortest Path</button>
        </div>
      </nav>

      <div className="grid" key={"a"}>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <>
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                      row={row}
                    />
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathFinding;
