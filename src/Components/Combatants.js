import React, { useState } from 'react';
import '../App.css'
import Combatant from './Combatant';

const Combatants = ({combatants, onEnemyClick}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  const combatantList = combatants.map((combatant)=><Combatant
    key={combatant.id}
    combatant={combatant}
    onEnemyClick={onEnemyClick}
    >
    </Combatant>);

  return (
    <div 
      className = 'combatants'
    >
        {combatantList}
    </div>
  )
}

export default Combatants;