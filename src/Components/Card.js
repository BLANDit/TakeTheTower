import React, { useState } from 'react';
import '../App.css'

const Card = ({card, cardId, name, effects, selectCard, deselectCard, activeCard, energyRemaining}) => {
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

  function determineCardClass(){
    let className = 'card ';
    if(isSelected()) className += ' selected';
    console.log(energyRemaining);
    if(energyRemaining < card.cost) className += ' disabled';
    return className;
  }

  return (
    <div 
      onClick = {()=>handleClick(cardId)}
      className = {determineCardClass()}
    >
      <div className='cardCost'>{card.cost}</div>
      <div className={'cardTypeStripe' + card.type}></div>
      <h3>{name}</h3>
      <div className = 'cardEffects'>
        {effects.gainBlock && <p>Gain {effects.gainBlock} <span className='statusEffect'>Block</span></p>}
        {effects.dealDamage && <p>Deal {effects.dealDamage} Damage</p>}
        {effects.draw && <p>Draw {effects.draw}</p>}
        {effects.applyVulnerable && <p>Apply {effects.applyVulnerable} Vulnerable</p>}
      </div>
    </div>
  )
}

export default Card;