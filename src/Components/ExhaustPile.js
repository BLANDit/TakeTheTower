import React, { useState } from 'react';
import '../App.css'

const ExhaustPile = ({exhaustPile}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  return (
    <div 
      onClick = {handleClick}
      className = 'exhaustPile'
    >
      <span>Exhaust Pile</span>
      <div>
        {exhaustPile.length}
      </div>
    </div>
  )
}

export default ExhaustPile;