import React from 'react';
import produce from 'immer';


const Grid = ({ grid, setGrid, running }) => {

    const activateColor = (rowIndex, colIndex) => {    
      setGrid(g => {
        return produce(g, gridCopy => {
          gridCopy[rowIndex][colIndex]
        ? gridCopy[rowIndex][colIndex] = 0
        : gridCopy[rowIndex][colIndex] = 1;
        })
      })
      // setGrid(() => {
      //   const gridCopy = grid.map(row => [...row]);
      //   gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] ? 0 : 1;
      //   return gridCopy;
      // })
    }
  
    return (
      <div className="grid">
        {grid.map((row, i1) => (
          <div key={'row' + i1} className="row">
            {row.map((col, i2) => (
              <div 
                key={'col' + i2}
                className={col ? "cell alive" : "cell"} 
                onClick={running ? null : () => activateColor(i1, i2)} 
              />
            ))}
          </div>
        ))}
      </div>
    );
};

export default Grid;