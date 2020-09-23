import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

import Grid from './Grid';
import GameControls from './GameControls';
import {presets} from './PresetConfigurations';
import PresetConfigurations from './PresetConfigurations';

const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1,1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];
//these 8 operations represent the movements of the neighbors. subtract 1 to go up a row, increase the row value to go down one.

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let k = 0; k < numCols; k++) {
      row.push(0)
    }
    rows.push(row);
    //0 means dead, 1 means alive
  }

  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  console.log(grid);

  const [running, setRunning] = useState(false);
  //when button is clicked, running is toggled on and off

  
  const clearGrid = () => {
    setGrid(g => {
      return produce(g, gridCopy => {
        return gridCopy.map(row => {
          return row.map(col => {
            return 0;
          })
        })
      })
    })
  }
  
  const runningRef = useRef(running);
  runningRef.current = running

  const runSimulation = useCallback(() => {
    // see if not currently running, then return
    if (!runningRef.current) {
      return;
    } 
    //whenever ^^ this is false, it will die, our kill condition for the recursive function
    
    // simulate
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              // check the bounds to make sure it can't go farther than the grid boundaries
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    
    setTimeout(runSimulation, 100);
    //setTimeout for seconds between iterations
  }, []);

  return (
    <div className="App">
      <main>
      <header className="App-header">
        <h1>John Conway's Game of Life</h1>
      </header>
      <Grid grid={grid} setGrid={setGrid} />
      
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            
            setGrid(rows);
          }}
          > Randomize
      </button>
      
      
      <GameControls 
        setRunning={setRunning}
        running={running}
        runningRef={runningRef}
        runSimulation={runSimulation}
        clearGrid={clearGrid}
      />

      <div>
        <h2>Presets</h2>
      </div>


      <h2>Generations: {}</h2>
      <h2>Rules</h2>
        <p>Any live cell with two or three live neighbors survives.</p>
        <p>Any dead cell with three live neighbors becomes a live cell.</p>
        <p>All other live cells die in the next generation. Similarly, all other dead cells remain dead.</p>
      </main>
    </div> //end div for App
  );
};

export default App;
