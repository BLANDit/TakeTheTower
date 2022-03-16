import React, { useState } from 'react';
import '../App.css'

const Combatant = ({combatant, onEnemyClick}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  return (
    <div 
      onClick = {()=>onEnemyClick(combatant.id)}
      className = 'combatant'
    >
      <div></div>
      <div>
        {combatant.intent && <div className = 'intent'>
          {(combatant.intent.gainBlock) && <span className='intentBlock'>🛡️</span>}
          {(combatant.intent.gainStrength) && <span className='intentBuff'>🌟</span>}
          {(combatant.intent.dealDamage) && <span className='intentAttack'>🗡️{combatant.intent.dealDamage + (combatant.status.strength?combatant.status.strength:0)}</span>}
        </div>}
      </div>
      <div className='combatantImageOuter'>
        {combatant.imageURL&&<img className='combatantImage' src={combatant.HP>0?combatant.imageURL:''}></img>}
      </div>
      <span className='combatantName' className={combatant.HP>0?'combatantName':'combatantNameDead'}>{combatant.name}</span>
      <div className = 'condition'>
        {combatant.HP>0 && <span>❤️: <span className='health'>{combatant.HP&&combatant.HP>0?combatant.HP:0}</span></span>}
        {combatant.HP>0 && <span>🛡️: <span className='block'>{combatant.block&&combatant.block>0?combatant.block:0}</span></span>}
      </div>
      <div className = 'statuses'>
        {(combatant.status.vulnerable>0) && <span className='statusIcon'> 💔</span>}
        {(combatant.status.vulnerable>0)&&<span className='statusSubscript'>{combatant.status.vulnerable}</span>}
        {(combatant.status.strength>0) && <span className='statusIcon'> 💪</span>}
        {(combatant.status.strength>0)&&<span className='statusSubscript'>{combatant.status.strength}</span>}
      </div>
      <div></div>
    </div>
  )
}

export default Combatant;