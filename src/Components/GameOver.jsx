import React from 'react'
import GameState from './GameState';

function GameOver({ gameState }) {
    switch (gameState) {
        case GameState.inprogress:
            return <div></div>;
        case GameState.playerXWins:
            return <div className='game-over'>X Wins</div>
        case GameState.playerOWins:
            return <div className='game-over'>O Wins</div>
        case GameState.draw:
            return <div className='game-over'>Draw! Play again</div>
        default:
            return <div></div>
    }
}

export default GameOver
