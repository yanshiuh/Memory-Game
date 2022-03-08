import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Sound from "react-sound";

const cardsImages = [
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/grizzy-1.jpg", matched: false },
  { src: "/img/ghost-1.gif", matched: false },
  { src: "/img/cat-1.gif", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [matched, setMatched] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // start the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  function shuffleCards() {
    const shuffleCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5) // + swap, - remain
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }

  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <Sound
        url="/img/bg-music.mp3"
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true}
      />
      <h1>Magic Game</h1>
      <button style={{ marginRight: "50px" }} onClick={shuffleCards}>
        New Game
      </button>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop Music" : "Play Music"}
      </button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <div className="showTurns">Turns: {turns}</div>
    </div>
  );
}

export default App;
