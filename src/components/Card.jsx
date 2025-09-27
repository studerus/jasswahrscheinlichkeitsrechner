import React from 'react';
import './Card.css';

const Card = ({ card, onSelect, isSelected, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(card);
    }
  };

  return (
    <div 
      className={`card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <img 
        src={card.image} 
        alt={card.label} 
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="card-fallback">
        {card.label}
      </div>
    </div>
  );
};

export default Card;
