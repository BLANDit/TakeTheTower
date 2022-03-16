import React, { useState } from 'react';
import '../App.css'

const Relics = ({name, effects}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  return (
    <div 
      onClick = {handleClick}
      className = 'relics'
    >
    </div>
  )
}

export default Relics;