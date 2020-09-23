import React, { useState, useEffect, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

import Grid from './Grid';
import GameControls from './GameControls';
import PresetConfigurations from './PresetConfigurations';

// const numRows = 25;
//const numCols = 25;

//these 8 operations represent the movements of the neighbors. subtract 1 to go up a row, increase the row value to go down one.
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


const presets = [
  { name: "Toad", 
    matrix: [[0,0], [1, -1], [1, 0],[0, 1], [0, 2], [1,1]], 
    startingPoint: 0
  },
  { name: "Glider", 
    matrix: [[1, 0], [1, -1], [1, 1], [0, 1], [-1, 0]], 
    startingPoint: [1, 1]
  },
  { name: "Quad Blinker", 
    matrix: [[0, 0], [-1, 0], [0, -1], [0, 1], [1, 0]], 
    startingPoint: 0
  },
];

//generate initial empty grid with equal number of rows/columns
const generateEmptyGrid = numRows => {
  const rows = []; //array of rows
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let k = 0; k < numRows; k++) {
      row.push(0) //row of zeros
    }
    rows.push(row); //add initialized rows onto rows array
    //0 means dead, 1 means alive
  }

  return rows;
};

function App() {
  const [numRows, setNumRows] = useState(25);
  const [grid, setGrid] = useState(generateEmptyGrid(numRows));
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [running, setRunning] = useState(false); //when button is clicked, running the simulation is toggled on and off
  
  //this will allow 'running' to continue and not change its value unless until intended
  const runningRef = useRef(running); 
  runningRef.current = running

  const speedRef = useRef(speed);
  speedRef.current = speed;

  console.log(grid);

  useEffect(() => {
    setGrid(generateEmptyGrid(numRows))
  }, [numRows])

  useEffect(() => {
    speedRef.current = speed;
  }, [speed])
  
  const clearGrid = () => {
    setGrid(generateEmptyGrid(numRows))
    setGeneration(0)
  }
  

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
          for (let k = 0; k < numRows; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newRow = i + x;
              const newCol = k + y;
              // check the bounds to make sure it can't go farther than the grid boundaries
              if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numRows) {
                neighbors += g[newRow][newCol];
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

    setGeneration(g => g +1); //counts the generations
    setTimeout(runSimulation, speedRef.current);  //setTimeout for seconds between iterations
  }, []);

  const createPresetGrid = (matrix, startingPoint) => {
    let row;
    let col;
    if (!startingPoint) {
      const mid = Math.floor(numRows/2);
      row = mid;
      col = mid;
    }
    else {
      row = startingPoint[0];
      col = startingPoint[1];
    }

    clearGrid();

    setGrid(g => produce(g, presetGrid => {
      matrix.forEach(([x,y]) => {
        const newRow = row + x;
        const newCol = col + y;
        presetGrid[newRow][newCol] = 1;
      })

      return presetGrid ;
    }));
  }

  return (
    <div className="App">
      <main>
      <header className="App-header">
        <h1>John Conway's Game of Life</h1>
      </header>
      <Grid grid={grid} setGrid={setGrid} running={running} />

      <GameControls 
        setGrid={setGrid}
        runSimulation={runSimulation}
        clearGrid={clearGrid}
        running={running}
        setRunning={setRunning}
        runningRef={runningRef}
        numRows={numRows}
        setNumRows={setNumRows}
        generation={generation}
        setGeneration={setGeneration}
        speed={speed}
        setSpeed={setSpeed}
      />

      <div>
        <h2>Presets</h2>
        <div>
          {presets.map(preset => {
            return <PresetConfigurations 
            key={presets.name} 
            {...preset}
            numRows={numRows} 
            clearGrid={clearGrid} 
            createPresetGrid={createPresetGrid}
            />
          })}
        </div>
      </div>


      <h2>Generation: {generation}</h2>
      <h2>Speed: {speed}</h2>
      <h2>Grid Size: {numRows} x {numRows}</h2>
      <h2>Rules</h2>
        <p>Any live cell with two or three live neighbors survives.</p>
        <p>Any dead cell with three live neighbors becomes a live cell.</p>
        <p>All other live cells die in the next generation. Similarly, all other dead cells remain dead.</p>
      </main>
    </div> //end div for App
  );
};

export default App;
