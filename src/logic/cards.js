const SUITS = ['eichel', 'rosen', 'schellen', 'schilten'];
const VALUES = ['ass', 'koenig', 'ober', 'under', 'banner', 'neun', 'acht', 'sieben', 'sechs'];

export const JASS_CARDS = SUITS.flatMap(suit => 
  VALUES.map(value => ({
    id: `${suit}-${value}`,
    suit,
    value,
    label: `${suit.charAt(0).toUpperCase() + suit.slice(1)} ${value.charAt(0).toUpperCase() + value.slice(1)}`,
    image: `/cards/${suit}-${value}.gif`
  }))
);

// Group cards by suit for the new mobile layout
export const CARDS_BY_SUIT = SUITS.map(suit => 
  JASS_CARDS.filter(card => card.suit === suit)
);
