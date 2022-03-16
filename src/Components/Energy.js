import React, { useState } from 'react';
import '../App.css'

const Energy = ({energy, maxEnergy}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  return (
    <div className = 'energy'>
        <div className='energyInner'>{energy}/{maxEnergy}</div>
    </div>
  )
}

export default Energy;