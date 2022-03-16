import React, { useState } from 'react';
import '../App.css'

const Card = ({cardId, name, effects, selectCard, deselectCard, activeCard}) => {
  const [enabled, setEnabled] = useState(true);
  const [selected, setSelected] = useState(false);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  function isSelected()
  {
    return activeCard&&activeCard.id==cardId
  }

  function handleClick(cardId){
    if(isSelected()){
      deselectCard();
    }
    else {
      selectCard(cardId);
    }
  }

  return (
    <div 
      onClick = {()=>handleClick(cardId)}
      className = {isSelected()?'card selected':'card'}
    >
      <h3>{name}</h3>
      {effects.gainBlock && <p>Gain {effects.gainBlock} <span className='statusEffect'>Block</span></p>}
      {effects.dealDamage && <p>Deal {effects.dealDamage} Damage</p>}
      {effects.draw && <p>Draw {effects.draw}</p>}
      {effects.applyVulnerable && <p>Apply {effects.applyVulnerable} Vulnerable</p>}
    </div>
  )
}

export default Card;