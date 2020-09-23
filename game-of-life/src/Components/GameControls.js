import React from 'react';

const GameControls = ({ setRunning, running, runningRef, runSimulation, setGrid, generateEmptyGrid }) => {
    return (
        <div className="game-controls">
            <button 
                onClick={() => { 
                    setRunning(!running);
                    if (!running) {
                    runningRef.current = true;
                    runSimulation();
                    }
                }}
            >
                {running ? 'Stop' : 'Start' }
            </button>
            <button
                onClick={() => {
                    setGrid(generateEmptyGrid());
                }}
            > 
                Clear Grid
            </button>
        </div>
    )
}

export default GameControls;