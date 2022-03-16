import React, { useState } from 'react';
import '../App.css'

const DiscardPile = ({discardPile}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    console.log(e);
    //setEnabled(!enabled);
  }

  return (
    <div 
      onClick = {handleClick}
      className = 'discardPile'
    >
      Discard Pile 
      <div>{discardPile.length}</div>
    </div>
  )
}

export default DiscardPile;