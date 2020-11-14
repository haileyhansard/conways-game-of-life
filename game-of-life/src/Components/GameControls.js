import React from 'react';

const GameControls = props => {
    const {
        running,
        numRows,
        setNumRows,
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
        if (speed < 4000) setSpeed(speed + 300)
    }

    const faster = () => {
        if (speed > 300) setSpeed(speed - 300)
    }

    return (
        <div className="game-controls">
            <div className="control-buttons">
                <button onClick={slower}>- Speed</button>
                <button onClick={faster}>+ Speed</button>
                <button disabled={running} onClick={decreaseSize}> - Size</button>
                <button disabled={running} onClick={increaseSize}>+ Size</button>
            </div>
        </div>
    )
}

export default GameControls;