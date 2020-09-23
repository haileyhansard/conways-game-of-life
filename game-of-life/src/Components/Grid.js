import React from 'react';
import produce from 'immer';


const Grid = ({ grid, setGrid }) => {

    const activateColor = (rowIndex, colIndex) => {    
      setGrid(g => {
        return produce(g, gridCopy => {
          gridCopy[rowIndex][colIndex]
        ? gridCopy[rowIndex][colIndex] = 0
        : gridCopy[rowIndex][colIndex] = 1;
        })
      })
    }
  
    return (
      <div className="grid">
        {grid.map((row, i1) => {
          return <div key={'row' + i1} className="row">
              {row.map((col, i2) => {
                return (
                  <div 
                    key={'col' + i2}
                    className={col ? "cell alive" : "cell"} 
                    onClick={() => activateColor(i1, i2)} 
                  />)
            })}
          </div>
        })}
      </div>
    );
  }

export default Grid;