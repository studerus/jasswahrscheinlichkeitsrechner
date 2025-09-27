import React from 'react';
import Card from './Card';
import { JASS_CARDS, CARDS_BY_SUIT } from '../logic/cards';
import './CardGrid.css';

const CardGrid = ({ selectedCards, onCardSelect, maxSelection }) => {
  const isDisabled = selectedCards.length >= maxSelection;

  const renderCard = (card, index) => {
    if (!card) return null;
    const isSelected = selectedCards.some(sc => sc.id === card.id);
    return (
      <Card 
        key={card.id || index}
        card={card}
        onSelect={onCardSelect}
        isSelected={isSelected}
        isDisabled={!isSelected && isDisabled}
      />
    );
  };

  return (
    <div className="card-grid-container">
      {/* Desktop header removed; provided by parent for alignment */}
      
      {/* --- DESKTOP GRID --- */}
      <div className="card-grid-desktop">
        {JASS_CARDS.map(renderCard)}
      </div>

      {/* --- MOBILE GRID --- */}
      <div className="card-grid-mobile">
        <div className="mobile-header">
          <span>Ich habe folgende Karten:</span>
          <span className="badge">{selectedCards.length}/{maxSelection}</span>
        </div>
        {CARDS_BY_SUIT.map((suitGroup) => (
          <div className="suit-block" key={suitGroup[0].suit}>
            {suitGroup.map(renderCard)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
