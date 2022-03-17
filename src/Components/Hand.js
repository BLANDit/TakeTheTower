import React, { useState } from 'react';
import '../App.css'
import Card from './Card';

const Hand = ({hand, selectCard, deselectCard, activeCard, energyRemaining}) => {
  const [enabled, setEnabled] = useState(true);

  function handleClick(e) {
    //setEnabled(!enabled);
  }

  return (
    <div className = 'hand'>
        {hand.length > 0 && hand.map((card)=><Card
          card={card}
          selectCard={selectCard}
          deselectCard={deselectCard}
          activeCard={activeCard}
          cardId={card.id}
          key={card.id}
          name={card.name}
          type={card.type}
          effects={card.effects}
          energyRemaining={energyRemaining}
        ></Card>)}
    </div>
  )
}

export default Hand;