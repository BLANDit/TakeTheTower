import React, { useState } from 'react';
import '../App.css'

const Combatant = ({combatant, onEnemyClick}) => {
  const [enabled, setEnabled] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  let healthBarStyle={
    'display': 'inline-grid',
    'gridTemplateColumns' : combatant.HP/combatant.maxHP*100 + '% 1fr'
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
      <div className = 'condition'>
        {combatant.HP>0 && <div style={healthBarStyle} className='healthBar'><div className='healthBarBackground'></div><div className='healthBarInner' style={combatant.block>0?{'backgroundColor':'#00F'}:{'backgroundColor':'#F00'}}></div><div className='healthBarText'>{combatant.HP}/{combatant.maxHP}</div></div>}
        {combatant.team == "A" && combatant.HP>0 && combatant.block > 0 && <span className={'blockOuter' + combatant.team}><span className="blockIcon">🛡️</span><span className='block'>{combatant.block&&combatant.block>0?combatant.block:0}</span></span>}
        {combatant.team == "B" && combatant.HP>0 && combatant.block > 0 && <span className={'blockOuter' + combatant.team}><span className='block'>{combatant.block&&combatant.block>0?combatant.block:0}</span><span className="blockIcon">🛡️</span></span>}
      </div>
      <div className = 'statusesOuter'>
        <div className = 'statuses'>
          <div className='status'>
            {(combatant.status.vulnerable>0) && <span className='statusIcon'> 💔</span>}
            {(combatant.status.vulnerable>0)&&<span className='statusSubscript'>{combatant.status.vulnerable}</span>}
          </div>
          <div className='status'>
            {(combatant.status.strength>0) && <span className='statusIcon'> 💪</span>}
            {(combatant.status.strength>0)&&<span className='statusSubscript'>{combatant.status.strength}</span>}
          </div>
        </div>
      </div>
      <span className={combatant.HP>0?'combatantName':'combatantNameDead'} onMouseEnter={()=>setNameVisible(true)} onMouseLeave={()=>setNameVisible(false)}>{nameVisible?combatant.name:''}</span>
      <div></div>
    </div>
  )
}

export default Combatant;