import React, { useState } from "react";

function Pokemon({ name, image, onMatch }) {
  const [flipped, setFlipped] = useState(false);
  const [matched, setMatched] = useState(false);

  const handleClick = () => {
    // setFlipped(!flipped);
    // onMatch(name, setMatched);
    if (!matched) {
      setFlipped(!flipped);
      onMatch(name, setMatched);
    }
  };
  return (
    <div
      className={`pokemon-card ${flipped ? "flipped" : ""} ${
        matched ? "matched" : ""
      }`}
      onClick={handleClick}
    >
      <div className="card-front">
        <h2>Flip Me</h2>
      </div>
      <div className="card-back">
        <p>{name}</p>
        <img src={image} alt={name} />
      </div>
    </div>
  );
}

export default Pokemon;
