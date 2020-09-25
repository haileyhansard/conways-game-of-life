import React, { useState, useEffect, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

import Grid from './Grid';
import GameControls from './GameControls';
import MainButtons from './MainButtons';
import PresetConfigurations from './PresetConfigurations';

//these 8 operations represent the movements of the neighbors. subtract 1 to go up a row, increase the row value to go down one.
//each operation represents a cell location 
const operations = [
	[-1, 0],
	[-1, 1],
	[-1, -1],
	[0, 1],
	[0, -1],
	[1, 1],
	[1, 0],
	[1, -1],
];

// let Toad = require('../../assets/Game_of_life_toad.gif');

const presets = [
	{
		name: "Toad",
		matrix: [[0, 0], [1, -1], [1, 0], [0, 1], [0, 2], [1, 1]],
		startingPoint: 0,
  	},
	{
		name: "Glider",
		matrix: [[1, 0], [1, -1], [1, 1], [0, 1], [-1, 0]],
		startingPoint: [1, 1],
	},
	{
		name: "Quad Blinker",
		matrix: [[0, 0], [-1, 0], [0, -1], [0, 1], [1, 0]],
		startingPoint: 0,
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
	const [speed, setSpeed] = useState(1000);
	const [running, setRunning] = useState(false); //when button is clicked, running the simulation is toggled on and off

	//this will allow 'running' to continue and not change its value unless intended
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
    	setGrid(generateEmptyGrid(numRows));
		setGeneration(0);
		setRunning(false);
		setSpeed(1000);
  	}
	
	  //function that checks the position of the neighboring cells to determine how many neighbors surround a live cell, using npm package immer with keyword 'produce' to give us access to current grid and a new copy of the grid that is being changed.
	const checkNeighbors = useCallback(g => {
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
	}, [numRows])
	

  	const runSimulation = useCallback(() => {
    // see if not currently running, then return
    	if (!runningRef.current) {
      	return;
    	}
    //whenever ^^ this is false, it will die, our kill condition for the recursive function

    // simulate the game by checking the neighboring cells
		setGrid(checkNeighbors);

		setGeneration(g => g + 1); //counts the generations
    	setTimeout(runSimulation, speedRef.current);  //setTimeout for seconds between iterations
  	}, [checkNeighbors]);

	const createPresetGrid = (matrix, startingPoint) => {
    	let row;
    	let col;
    	if (!startingPoint) {
      		const mid = Math.floor(numRows / 2);
      		row = mid;
      		col = mid;
    	} else {
      		row = startingPoint[0];
      		col = startingPoint[1];
    	}
    	clearGrid();
		setGrid(g => produce(g, presetGrid => {
      		matrix.forEach(([x, y]) => {
        		const newRow = row + x;
        		const newCol = col + y;
        		presetGrid[newRow][newCol] = 1;
      		});
      		return presetGrid;
    	}));
  	}

	return (
		<div className="App">
    		<header className="App-header">
    			<h1>John Conway's Game of Life</h1>
      		</header>
      		<main>
        		<div className="left-grid-and-controls">
					<MainButtons 
						  runSimulation={runSimulation}
						  clearGrid={clearGrid}
						  setGrid={setGrid}
						  running={running}
						  setRunning={setRunning}
						  runningRef={runningRef}
						  numRows={numRows}
					/>
					<div className="grid-card">
						<div className="settings">
							<h3>Generation: {generation}</h3>
							<h3>Speed: {(1/(speed/1000)).toFixed(1)} gen/sec</h3>
							<h3>Grid Size: {numRows} x {numRows}</h3>
          				</div>
						<Grid 
							grid={grid} 
					  		setGrid={setGrid} 
					  		running={running} 
						/>
					</div>
					<GameControls
						running={running}
						numRows={numRows}
						setNumRows={setNumRows}
						generation={generation}
						setGeneration={setGeneration}
						speed={speed}
						setSpeed={setSpeed}
					/>
        		</div>
				<div className="right-rules-and-presets">
					<div className="rules-section">
						<h2>Rules</h2>
						<p>1. Any live cell with 2 or 3 live neighbors survives.</p>
						<p>2. Any dead cell with 3 live neighbors becomes a live cell.</p>
						<p>3. All other live cells die in the next generation. Similarly, all other dead cells remain dead.</p>
					</div>
        			<div className="presets-section">
						<h2>Presets</h2>
						<p>Click on one of the common configurations below to start the game with a preset. How many generations will it last?</p>
						<div className="presets-list">
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
					<div>
						<h2>Create  your own!</h2>
						<p>Click on any cells to activate them, then click the Start! button to watch your creation live or die. Have fun!</p>
					</div>
				</div>
      		</main>
    	</div> //end div for App
  	);
};

export default App;
