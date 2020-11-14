import React from 'react';

const MainButtons = props => {
    const {
        runSimulation,
        clearGrid,
        setGrid,
        running,
        setRunning,
        runningRef,
        numRows,
    } = props;

    return (
        <div className="main-buttons">
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
                    {running ? 'Stop' : 'Start!' }
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
        </div>
    );
};

export default MainButtons;