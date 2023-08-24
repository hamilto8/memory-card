import { useState, useEffect } from "react";
import "./App.css";
import Pokemon from "./Pokemon";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const apiURL = " https://pokeapi.co/api/v2/";

  useEffect(() => {
    const fetchPokemonList = async () => {
      const result = await fetch(apiURL + "pokemon?limit=6");
      const data = await result.json();

      const pokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();

          return {
            name: data.name,
            image: data.sprites.front_default,
          };
        })
      );

      const duplicatedPokemonData = [...pokemonData, ...pokemonData];
      const shuffledPokemonData = shuffleArray(duplicatedPokemonData);

      setPokemonList(shuffledPokemonData);
    };
    fetchPokemonList();
  }, []);

  const handleMatch = (name, setMatched) => {
    setFlippedCards([...flippedCards, name]);
    if (flippedCards.length === 1 && flippedCards[0] === name) {
      setScore(score + 1);
      setMatched(true);
      setFlippedCards([]);
    } else if (flippedCards.length === 2) {
      if (flippedCards[0] === flippedCards[1]) {
        setScore(score + 1);
        setMatched(true);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <>
      <div>
        <h1>Memory Game</h1>
        <h2>Score: {score}</h2>
        <div className="pokemon-grid">
          {pokemonList.map((pokemon, idx) => (
            <Pokemon
              key={idx}
              name={pokemon.name}
              image={pokemon.image}
              onMatch={handleMatch}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
