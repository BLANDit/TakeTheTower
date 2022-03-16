import React, { useState } from 'react';

const EndTurnButton = ({endCurrentTurn}) =>{
    return(
        <button className = 'endTurnButton' onClick={()=>endCurrentTurn()}>End Turn</button>
    );
}

export default EndTurnButton;