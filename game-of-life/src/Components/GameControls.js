import React from 'react';

const GameControls = props => {
    const {
        generateEmptyGrid,
        runSimulation,
        clearGrid,
        setGrid,
        running,
        setRunning,
        runningRef,
        numRows,
        setNumRows,
        generation,
        setGeneration,
        speed,
        setSpeed,
    } = props;

    const increaseSize = () => {
        if (numRows < 40) setNumRows(numRows + 5)
        setGeneration(0)
    }

    const decreaseSize = () => {
        if (numRows > 20) setNumRows(numRows - 5)
        setGeneration(0)
    }

    const slower = () => {
        if (speed < 2000) setSpeed(speed +250)
    }

    const faster = () => {
        if (speed > 250) setSpeed(speed - 250)
    }

    return (
        <div className="game-controls">
            <div className="first-set-buttons">
                <button 
                    onClick={() => { 
                        setRunning(!running);
                        if (!running) {
                        runningRef.current = true;
                        runSimulation()
                        }
                    }}
                >
                    {running ? 'Stop' : 'Start' }
                </button>
                
                <button onClick={() => clearGrid()}>Clear Grid</button>
                
                
                <button
                    onClick={() => {
                        const rows = [];
                        for (let i = 0; i < numRows; i++) {
                            const row =[]
                            for (let k = 0; k < numRows; k++) {
                                row.push(Math.random() > 0.7 ? 1 : 0)
                            } //70% chance of getting a 0
                            rows.push(row)
                        }
                        setGrid(rows);
                    }}
                > 
                    Randomize!
                </button>
            </div>
                <button onClick={slower}>Slower</button>
                <button onClick={faster}>Faster</button>
                <button disabled={running} onClick={decreaseSize}>Decrease Grid Size</button>
                <button disabled={running} onClick={increaseSize}>Increase Grid Size</button>
        </div>
    )
}

export default GameControls;

//TODO:
// -  it seems like the game is not playing on the increased grid size, it adds random cells but they do not play.
// x UPDATE: this is how its supposed to work. -- the generations keep running even after all cells have stopped moving. need to fix this.
// - if time, add Pulsar, 5 cell line, or blinker preset configs to PresetConfigurations
// - make sense of the speed display. right now its Speed: 100. 100 what? Make it gen/sec if possible
// if time, add images for each preset to show an example