
import React from 'react';

 const PresetConfigurations = ({name, matrix, startingPoint, createPresetGrid}) => {
  return (
    <div onClick={() => createPresetGrid(matrix, startingPoint)}>
      {name}
    </div>
  )
 } 

export default PresetConfigurations;

//TODO: if time, add Pulsar, 5 cell line, or blinker later