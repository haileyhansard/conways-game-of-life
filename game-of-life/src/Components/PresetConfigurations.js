
import React from 'react';

 const PresetConfigurations = ({name, matrix, startingPoint, createPresetGrid}) => {
  return (
    <div className="each-preset" onClick={() => createPresetGrid(matrix, startingPoint)}>
      {name}
    </div>
  )
 } 

export default PresetConfigurations;

