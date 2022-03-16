import React, { useState } from 'react';
import '../App.css'

const DrawPile = ({drawPile}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  return (
    <div 
      onClick = {handleClick}
      className = 'drawPile'
    >
      Draw Pile 
      <div>{drawPile.length}</div>
    </div>
  )
}

export default DrawPile;