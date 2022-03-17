import './App.css';
import { useContext, useState, useEffect } from 'react';
import Header from './Components/Header';
import Hand from './Components/Hand';
import Combatants from './Components/Combatants';
import DrawPile from './Components/DrawPile';
import DiscardPile from './Components/DiscardPile';
import ExhaustPile from './Components/ExhaustPile';
import Relics from './Components/Relics';
import EndTurnButton from './Components/EndTurnButton';
import Energy from './Components/Energy';
import allCards from './cards.json';

function App() {
  const [combatants, setCombatants] = useState([
    {
      id: 0,
      name: "Beauregard",
      team: "A",
      HP: 70,
      maxHP: 70,
      block: 0,
      energy: 3,
      maxEnergy: 3,
      status: {},
      imageURL: "images/Beauregard.png",
    },
    {
      id: 1,
      name: "Strider",
      team: "B",
      HP: 46,
      maxHP: 46,
      block: 0,
      status: {},
      intent: {},
      imageURL: "images/Strider.png"
    },
    {
      id: 2,
      name: "Strider",
      team: "B",
      HP: 46,
      maxHP: 46,
      block: 0,
      status: {},
      intent: {},
      imageURL: "images/Strider.png"
    },
  ])

  const [enemyIntents, setEnemyIntents] = useState([
    {
      id: 0,
      name: 'Bellow',
      gainStrength: 4,
      gainBlock: 6,
      requiresTarget: false,
    },
    {
      id: 1,
      name: 'Chomp',
      dealDamage: 12,
      requiresTarget: true,
    },
    {
      id: 2,
      name: 'Thrash',
      dealDamage: 7,
      gainBlock: 5,
      requiresTarget: true,
    },
  ]);

  const [phase, setPhase] = useState('init');
  const [turnCounter, setTurnCounter] = useState(1);

  let newCardId = 0;
  let newCardQueue = ['Bash', 'Strike', 'Strike', 'Strike', 'Strike', 'Strike', 'Defend', 'Defend', 'Defend', 'Iron Wave', 'Pommel Strike', 'Shrug It Off'];
  let deck = [];
  while(newCardQueue.length > 0){
    let cardCopy = {...createCard(newCardQueue.pop())}
    deck.push(cardCopy);
  }
  let drawPileCopy;
  let discardPileCopy;
  let handCopy;
  let combatantsCopy;
  let activeCombatant;

  function saveStateCopies(){
    drawPileCopy = drawPile;
    discardPileCopy = discardPile;
    handCopy = hand;
    combatantsCopy = combatants;
    activeCombatant = combatantsCopy.find((combatant)=>combatant.id===activeCombatantId);
  }

  function createCard(cardName){
    let newCard = allCards.find((card)=>card.name === cardName);
    newCard.id = newCardId++;
    return newCard;
  }

  useEffect(()=>{
    if(phase === 'init'){
      drawPileCopy = deck;
      discardPileCopy = [];
      handCopy = [];
      setPhase('beginTurn')
    } else if(phase === 'beginTurn'){
      if(activeCombatantId === combatantsCopy.find((combatant)=>combatant.team === 'A').id){
        activeCombatant.energy = activeCombatant.maxEnergy;
        setPhase('draw');
        draw(5);
        let enemies = combatantsCopy.filter((combatant)=>combatant.team != activeCombatant.team)
        //const intentId = turnCounter % enemyIntents.length;
        enemies.map((enemy)=>enemy.intent = enemyIntents[parseInt(Math.random()*enemyIntents.length)]);
        console.log(enemies);
      } else{
        
      }
      combatantsCopy.filter((combatant)=>combatant.id == activeCombatantId).map((combatant)=>combatant.block = 0);
      setDrawPile(drawPileCopy);
      setDiscardPile(discardPileCopy);
      setHand(handCopy);
      setCombatants(combatantsCopy);
    }
  })

  function draw(amount){
    let drawRemaining = amount;
    while(drawRemaining > 0 && drawPileCopy.length + discardPileCopy.length > 0){
      if(drawPileCopy.length > 0){
        let randomIndex = parseInt(Math.random()*drawPileCopy.length);
        handCopy.push(drawPileCopy.splice(randomIndex, 1)[0]);
        drawRemaining--;
      } else {
        drawPileCopy = discardPileCopy;
        discardPileCopy = [];
      }
    }
  }

  function discard(discarded){
    discardPileCopy = ([...discardPileCopy, hand.find((card)=>card.id==discarded.id)])
    handCopy = (hand.filter((card)=>(card.id != discarded.id)))
  }

  const [hand, setHand] = useState([
  ])

  const [drawPile, setDrawPile] = useState([...deck])

  const [discardPile, setDiscardPile] = useState([
  ])

  const [exhaustPile, setexhaustPile] = useState([
  ])

  const [activeCard, setActiveCard] = useState(null);

  const [activeCombatantId, setActiveCombatantId] = useState(0)

  function handleEnemyClick(enemyId) {
    if(activeCard && activeCard.requiresTarget){
      const targetedEnemy = combatants.find((combatant)=>combatant.id===enemyId);
      if(activeCombatant.team != targetedEnemy.team){
        playActiveCard(enemyId);
      }
    }
  }

  function handleBattlefieldClick(){
    if(activeCard){
      if(!activeCard.requiresTarget){
        playActiveCard();
      }
    }
  }

  function selectCard(cardId) {
    const selectedCard = hand.find((card)=>card.id===cardId);
    if(activeCombatant.energy >= selectedCard.cost){
      setActiveCard(selectedCard);
    }
  }

  function deselectCard() {
    setActiveCard(null);
  }

  function playActiveCard(targetId) {
    const cardPlayed = activeCard;
    activeCombatant.energy -= cardPlayed.cost;

    let targetCombatant = activeCard.requiresTarget ? combatantsCopy.find((element)=>(element.id == targetId)) : null;

    if(cardPlayed.effects.dealDamage){
      let damage = cardPlayed.effects.dealDamage;
      if(activeCombatant.status.strength) damage += activeCombatant.status.strength;
      if(targetCombatant.status.vulnerable) damage = parseInt(damage*1.5);
      let damageRemaining = damage;
      if(targetCombatant.block >= damageRemaining){
        targetCombatant.block -= damageRemaining;
      }
      else{
        damageRemaining -= targetCombatant.block;
        targetCombatant.block = 0;
        targetCombatant.HP -= damageRemaining;
      }
    }
    if(cardPlayed.effects.gainBlock){
      activeCombatant.block += cardPlayed.effects.gainBlock;
    }
    if(cardPlayed.effects.draw){
      draw(cardPlayed.effects.draw);
    }
    if(cardPlayed.effects.applyVulnerable){
      targetCombatant.status.vulnerable = targetCombatant.status.vulnerable?targetCombatant.status.vulnerable+cardPlayed.effects.applyVulnerable:cardPlayed.effects.applyVulnerable;
    }

    combatantsCopy = combatantsCopy.filter((combatant)=>combatant.HP>0);
    if(combatantsCopy.length < 2) activeCombatant.dialogue = "Well, that wasn't so bad . . .";

    discard(activeCard);

    setActiveCard(null);

    setHand(handCopy);
    setDrawPile(drawPileCopy);
    setDiscardPile(discardPileCopy);
    setCombatants(combatantsCopy);
  }

  function executeIntent(){
    const intent = activeCombatant.intent;

    let targetCombatant = intent.requiresTarget ? combatantsCopy.find((combatant)=>(combatant.team == 'A')) : null;

    if(intent.dealDamage){
      let damage = intent.dealDamage;
      if(activeCombatant.status.strength) damage += activeCombatant.status.strength;
      if(targetCombatant.status.vulnerable) damage = parseInt(damage*1.5);
      let damageRemaining = damage;
      if(targetCombatant.block >= damageRemaining){
        targetCombatant.block -= damageRemaining;
      }
      else{
        damageRemaining -= targetCombatant.block;
        targetCombatant.block = 0;
        targetCombatant.HP -= damageRemaining;
      }
    }
    if(intent.gainBlock){
      activeCombatant.block += intent.gainBlock;
    }
    if(intent.applyVulnerable){
      targetCombatant.status.vulnerable = targetCombatant.status.vulnerable?targetCombatant.status.vulnerable+intent.applyVulnerable:intent.applyVulnerable;
    }
    if(intent.gainStrength){
      activeCombatant.status.strength = activeCombatant.status.strength?activeCombatant.status.strength+intent.gainStrength:intent.gainStrength;
    }

    activeCombatant.intent = {};

    setHand(handCopy);
    setDrawPile(drawPileCopy);
    setDiscardPile(discardPileCopy);
    setCombatants(combatantsCopy);
  }

  function endCurrentTurn(){
    activeCombatant.status.vulnerable = activeCombatant.status.vulnerable>0?activeCombatant.status.vulnerable-1:0;

    if(activeCombatantId === combatantsCopy.find((combatant)=>combatant.team == 'A').id){
      setDrawPile(drawPileCopy);
      setActiveCard(null);
      setDiscardPile([...discardPileCopy, ...handCopy]);
      setHand([]);
    } else{
      executeIntent();
      setTurnCounter(turnCounter+1);
    }
    let activeCombatantIndex = (combatantsCopy.indexOf(activeCombatant) + 1)%combatantsCopy.length;
    if(combatantsCopy[activeCombatantIndex]){
      setActiveCombatantId(combatantsCopy[activeCombatantIndex].id);
    }
    
    //setActiveCombatantId((activeCombatantId+1)%combatants.length);
    setPhase('beginTurn');
  }

  return (
    <div className='app'>
      {saveStateCopies()}
      <Header></Header>
      <div className = 'infoBar'></div>
      <Relics className = "relics"></Relics>
      <div className = 'battlefieldOuter'>
        <div className = 'battlefield' onClick={handleBattlefieldClick}>
          <Combatants combatants={combatants} onEnemyClick={handleEnemyClick}></Combatants>
        </div>
        <div className = 'battlefieldBackground'></div>
      </div>
      {activeCombatant.team == 'A' && <div className = 'deck'>
        <div className='energyOuter'>
          <Energy energy={combatants.find((combatant)=>combatant.id===activeCombatantId).energy} maxEnergy={combatants.find((combatant)=>combatant.id===activeCombatantId).maxEnergy}></Energy>
        </div>
        <DrawPile drawPile={drawPile}></DrawPile>
        <Hand hand={hand} selectCard={selectCard} deselectCard={deselectCard} activeCard={activeCard} energyRemaining={activeCombatant.energy}></Hand>
        <EndTurnButton endCurrentTurn={endCurrentTurn}></EndTurnButton>
        {exhaustPile.length > 0 && <ExhaustPile exhaustPile = {exhaustPile}></ExhaustPile> }
        <DiscardPile discardPile = {discardPile}></DiscardPile>
      </div>}
      {activeCombatant.team != 'A' && <div className='enemyDeck' style={{'gridTemplateColumns': combatantsCopy.map((combatant)=>1/combatants.length*100+'%').join(' ')}}>
        <div className='intentExplainer' style={{'gridArea':'1/'+(combatantsCopy.indexOf(activeCombatant)+1)+'/2/'+(combatantsCopy.indexOf(activeCombatant)+2)}}>
          {activeCombatant.intent.dealDamage && <span>Enemy intends to attack for {activeCombatant.intent.dealDamage+(activeCombatant.status.strength?activeCombatant.status.strength:0)}!</span>}
          {activeCombatant.intent.gainBlock && <span>Enemy intends to block</span>}
          {activeCombatant.intent.gainStrength && <span>Enemy intends to buff itself</span>}
        </div>
        <button className='advanceButton' onClick={()=>endCurrentTurn()} style={{'gridArea':'2/'+(combatantsCopy.indexOf(activeCombatant)+1)+'/3/'+(combatantsCopy.indexOf(activeCombatant)+2)}}>
          <span>Advance</span>
        </button>
      </div>}
    </div>
    
  );
}

export default App;
