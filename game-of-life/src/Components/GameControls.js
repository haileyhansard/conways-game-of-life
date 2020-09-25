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
        if (speed < 2000) setSpeed(speed + 300)
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

//TODO:
// x UPDATE: this now is fixed. --  it seems like the game is not playing on the increased grid size, it adds random cells but they do not play.
// x UPDATE: this is how its supposed to work. -- the generations keep running even after all cells have stopped moving. need to fix this.
// - if time, add Pulsar, 5 cell line, or blinker preset configs to PresetConfigurations
// x UPDATE: added gen/sec to disaply. -- make sense of the speed display. right now its Speed: 100. 100 what? Make it gen/sec if possible
// if time, add images for each preset to show an example