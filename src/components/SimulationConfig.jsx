import React, { useState, useEffect } from 'react';
import { JASS_CARDS } from '../logic/cards';
import './SimulationConfig.css';

const SUITS = ['eichel', 'rosen', 'schellen', 'schilten'];
const VALUES = ['ass', 'koenig', 'ober', 'under', 'banner', 'neun', 'acht', 'sieben', 'sechs'];

const displayValue = (value) => {
  if (value === 'koenig') return 'König';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const SimulationConfig = ({ selectedCards, onStart, isLoading }) => {
  const [targetSuit, setTargetSuit] = useState(null);
  const [targetValue, setTargetValue] = useState(null);
  const [opponentType, setOpponentType] = useState(null); // 'partner' | 'opponents_one' | 'opponents_none'
  const [comparator, setComparator] = useState(null); // 'atLeast' | 'atMost'
  const [condition, setCondition] = useState(null);

  const availableCards = JASS_CARDS.filter(
    card => !selectedCards.some(sc => sc.id === card.id)
  );

  // Reset target card if it becomes unavailable (e.g. user changes hand)
  useEffect(() => {
    if (targetSuit && targetValue) {
      const targetId = `${targetSuit}-${targetValue}`;
      if (!availableCards.some(c => c.id === targetId)) {
        setTargetSuit(null);
        setTargetValue(null);
      }
    }
  }, [selectedCards, availableCards, targetSuit, targetValue]);

  const maxPossibleInSuit = targetSuit 
    ? 9 - selectedCards.filter(c => c.suit === targetSuit).length 
    : 0;

  // Auto-calculate as soon as all inputs are set
  useEffect(() => {
    const ready = selectedCards.length >= 9 && targetSuit && targetValue && opponentType && comparator && condition;
    if (!ready || isLoading) return;
    const targetId = `${targetSuit}-${targetValue}`;
    const payload = {
      targetCard: JASS_CARDS.find(c => c.id === targetId),
      opponentType,
      comparator,
      condition,
      numSimulations: 10000,
      method: 'exact'
    };
    onStart(payload);
  }, [selectedCards, targetSuit, targetValue, opponentType, comparator, condition, isLoading, onStart]);

  const isValueDisabled = (value) => {
    if (!targetSuit) return true;
    const cardId = `${targetSuit}-${value}`;
    return !availableCards.some(c => c.id === cardId);
  };

  return (
    <div className="simulation-config-container">
      <div className="sentence">
        <div className="sentence-row">Wie gross ist die Wahrscheinlichkeit, dass</div>

        <div className="choice-grid-suits three-cols">
          <button className={`choice-btn ${opponentType === 'partner' ? 'selected' : ''}`} onClick={() => setOpponentType('partner')} disabled={selectedCards.length < 9}>mein Partner</button>
          <button className={`choice-btn ${opponentType === 'opponents_one' ? 'selected' : ''}`} onClick={() => setOpponentType('opponents_one')} disabled={selectedCards.length < 9}>ein Gegner</button>
          <button className={`choice-btn ${opponentType === 'opponents_none' ? 'selected' : ''}`} onClick={() => setOpponentType('opponents_none')} disabled={selectedCards.length < 9}>kein Gegner</button>
        </div>

        <div className="choice-grid-suits">
          {SUITS.map(suit => (
            <button 
              key={suit}
              className={`choice-btn ${targetSuit === suit ? 'selected' : ''}`}
              onClick={() => { setTargetSuit(suit); setTargetValue(null); }}
              disabled={selectedCards.length < 9}
            >
              {suit.charAt(0).toUpperCase() + suit.slice(1)}
            </button>
          ))}
        </div>

        <div className="choice-grid-values">
          {VALUES.map(value => (
            <button 
              key={value}
              className={`choice-btn ${targetValue === value ? 'selected' : ''}`}
              onClick={() => setTargetValue(value)}
              disabled={isValueDisabled(value)}
            >
              {displayValue(value)}
            </button>
          ))}
        </div>

        <div className="choice-grid-suits three-cols">
          <button className={`choice-btn ${comparator === 'atLeast' ? 'selected' : ''}`} onClick={() => setComparator('atLeast')} disabled={selectedCards.length < 9}>mindestens</button>
          <button className={`choice-btn ${comparator === 'exact' ? 'selected' : ''}`} onClick={() => setComparator('exact')} disabled={selectedCards.length < 9}>genau</button>
          <button className={`choice-btn ${comparator === 'atMost' ? 'selected' : ''}`} onClick={() => setComparator('atMost')} disabled={selectedCards.length < 9}>höchstens</button>
        </div>

        <div className="choice-grid-values">
          {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              className={`choice-btn ${condition === num ? 'selected' : ''}`}
              onClick={() => setCondition(num)}
              disabled={selectedCards.length < 9 || (targetSuit ? num > maxPossibleInSuit : true)}
            >
              {num === 1 ? 'blutt' : `zu ${num}.`}
            </button>
          ))}
        </div>

        <div className="sentence-row">hat?</div>
      </div>
    </div>
  );
};

export default SimulationConfig;
