import React, { useEffect, useState } from 'react'
import Board from './Board'
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
import gameOverSoundAsset from '../Sounds/src_sounds_game_over.wav';
import clickSoundAsset from '../Sounds/src_sounds_click.wav';


const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;


const PLAYER_X = "X";
const PLAYER_O = "O";



const winningCombinations = [
    //rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },


    //columns
    { combo: [0, 3, 6], strikeClass: "strike-col-1" },
    { combo: [1, 4, 7], strikeClass: "strike-col-2" },
    { combo: [2, 5, 8], strikeClass: "strike-col-3" },

    //diagonal
    { combo: [0, 4, 8], strikeClass: 'strike-diagonal-1' },
    { combo: [2, 4, 6], strikeClass: 'strike-diagonal-2' },
];

function checkWinner(tiles, setStrikeClass, setGameState) {

    for (const { combo, strikeClass } of winningCombinations) {
        const tileValue1 = tiles[combo[0]]
        const tileValue2 = tiles[combo[1]]
        const tileValue3 = tiles[combo[2]]

        if (
            tileValue1 !== '' &&
            tileValue1 === tileValue2 &&
            tileValue1 === tileValue3
        ) {
            setStrikeClass(strikeClass);

            if (tileValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins)
            } else {
                setGameState(GameState.playerOWins)
            }
            return;

        }
    }

    const areAllTilesFilledIn = tiles.every((tile) => tile !== '');
    if (areAllTilesFilledIn) {
        setGameState(GameState.draw);
    }

}

function TicTacToe() {

    const [tiles, setTiles] = useState(Array(9).fill(''));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inprogress);

    function handleTileClick(index) {
        if (gameState !== GameState.inprogress) {
            return;
        }

        if (tiles[index] !== '') {
            return;
        }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);

        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O)
        } else {
            setPlayerTurn(PLAYER_X)
        }
    }

    function handleReset() {
        setGameState(GameState.inprogress);
        setTiles(Array(9).fill(''));
        setPlayerTurn(PLAYER_X);
        setStrikeClass();
    }

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles])

    useEffect(() => {
        if (tiles.some((tile) => tile !== '')) {
            clickSound.play();
        }
    }, [tiles])

    useEffect(() => {
        if (gameState !== GameState.inprogress) {
            gameOverSound.play();
        }
    }, [gameState])

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board
                playerTurn={playerTurn}
                onTileClick={handleTileClick}
                tiles={tiles}
                strikeClass={strikeClass} />
            <GameOver gameState={gameState} />
            <Reset gameState={gameState}
                onButtonClick={handleReset} />
        </div>
    )
}

export default TicTacToe
