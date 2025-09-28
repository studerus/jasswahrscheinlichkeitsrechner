import { useState, useEffect, useRef } from 'react'
import './App.css'
import CardGrid from './components/CardGrid'
import SimulationConfig from './components/SimulationConfig';
import { runSimulation, runExact } from './logic/jassLogic';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [selectedCards, setSelectedCards] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const MAX_SELECTED_CARDS = 9;

  const swipeContainerRef = useRef(null);
  const isMobileView = window.innerWidth <= 768;

  // Reset result whenever the selection of cards changes
  useEffect(() => {
    setSimulationResult(null);
  }, [selectedCards]);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    if (isMobileView) {
      setVh();
      window.addEventListener('resize', setVh);
      window.addEventListener('orientationchange', setVh);

      return () => {
        window.removeEventListener('resize', setVh);
        window.removeEventListener('orientationchange', setVh);
      };
    }
  }, [isMobileView]);

  // Auto-swipe on mobile when 9 cards selected
  useEffect(() => {
    const el = swipeContainerRef.current;
    if (!el) return;
    if (!isMobileView) return;
    const targetLeft = selectedCards.length >= MAX_SELECTED_CARDS ? el.clientWidth : 0;
    el.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [selectedCards.length, isMobileView]);

  const handleCardSelect = (card) => {
    setSelectedCards(prevSelected => {
      const isSelected = prevSelected.some(sc => sc.id === card.id);
      if (isSelected) {
        return prevSelected.filter(sc => sc.id !== card.id);
      } else {
        if (prevSelected.length < MAX_SELECTED_CARDS) {
          return [...prevSelected, card];
        }
      }
      return prevSelected;
    });
  };

  const handleStartSimulation = async (config) => {
    setIsLoading(true);
    setSimulationResult(null);
    
    let result;
    if (config.method === 'exact') {
      result = runExact(selectedCards, config);
    } else {
      result = await runSimulation(selectedCards, config);
    }
    setSimulationResult(result);
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Jass-Wahrscheinlichkeitsrechner</h1>
      </header>
      {/* Desktop/tablet layout */}
      <main className="main-layout">
        {/* Left: cards selection */}
        <div className="cards-column">
          <div className="desktop-instruction">Ich habe folgende Karten: <span className="desktop-counter">({selectedCards.length} / {MAX_SELECTED_CARDS})</span></div>
          <CardGrid 
            selectedCards={selectedCards}
            onCardSelect={handleCardSelect}
            maxSelection={MAX_SELECTED_CARDS}
          />
        </div>
        {/* Right: scenario (left) and result (right) */}
        <div className="controls-column">
          <SimulationConfig 
            selectedCards={selectedCards}
            onStart={handleStartSimulation}
            isLoading={isLoading}
          />
          <div className="results-column">
            <ResultDisplay isLoading={isLoading} result={simulationResult} />
          </div>
        </div>
      </main>

      {/* Mobile swipe layout */}
      <section className="swipe-container" ref={swipeContainerRef}>
        <div className="swipe-page">
          <CardGrid 
            selectedCards={selectedCards}
            onCardSelect={handleCardSelect}
            maxSelection={MAX_SELECTED_CARDS}
          />
        </div>
        <div className="swipe-page">
          <SimulationConfig 
            selectedCards={selectedCards}
            onStart={handleStartSimulation}
            isLoading={isLoading}
          />
          <div className="results-column">
            <ResultDisplay isLoading={isLoading} result={simulationResult} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
