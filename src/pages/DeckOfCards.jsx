import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@mui/material";
import '../DeckOfCards.css';

function DeckOfCards() {
  const [deck, setDeck] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/start_game`);
      const { deck } = response.data;
      setDeck(deck);
      setGameStarted(true);
    } catch (error) {
      console.error('Error starting the game:', error);
    }
  };

  const drawCard = async (cardType) => {
    try {
      if (deck.length === 0) {
        setNoCardsLeft(true);
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/draw_card_to_win`);
      const { message, card } = response.data;
      alert(message); 
      setDeck(deck.filter((c) => c !== card));
    } catch (error) {
      console.error('Error drawing card:', error);
    }
  };


  return (
    <div className='main_container'>
      <h1>Deck of Cards</h1>
      <div className='start_game_now'>
        <Button  variant="contained" color="primary"  className="start-button" onClick={startGame}>Start Game</Button>
      </div>
      <div className="card-container">
        {gameStarted && (
          <>
            <div className="card" onClick={() => drawCard('Cat')}>
              <span role="img" aria-label="cat">😼</span> Cat Card
            </div>
            <div className="card" onClick={() => drawCard('Defuse')}>
              <span role="img" aria-label="defuse">🙅‍♂️</span> Defuse Card
            </div>
            <div className="card" onClick={() => drawCard('Shuffle')}>
              <span role="img" aria-label="shuffle">🔀</span> Shuffle Card
            </div>
            <div className="card" onClick={() => drawCard('Exploding Kitten')}>
              <span role="img" aria-label="exploding-kitten">💣</span> Exploding Kitten Card
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeckOfCards;
