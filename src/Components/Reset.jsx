import React from 'react'
import GameState from './GameState'

function Reset({ onButtonClick, gameState }) {
    if (gameState === GameState.inprogress) {
        return;
    }
    return (
        <button onClick={onButtonClick}
            className='reset-button'>Reset</button>
    )
}

export default Reset
