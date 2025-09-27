import { JASS_CARDS } from './cards';

// Fisher-Yates (aka Knuth) Shuffle algorithm
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const checkCondition = (hand, targetCard, comparator, condition) => {
  // must have target
  const hasTargetCard = hand.some(card => card.id === targetCard.id);
  if (!hasTargetCard) return false;
  // count same suit, including target
  const countSameSuit = hand.filter(card => card.suit === targetCard.suit).length;
  if (comparator === 'atMost') {
    return countSameSuit <= condition;
  }
  // default: atLeast
  return countSameSuit >= condition;
};

export const runSimulation = (playerHand, { targetCard, opponentType, comparator, condition, numSimulations }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const remainingCards = JASS_CARDS.filter(
        card => !playerHand.some(playerCard => playerCard.id === card.id)
      );
      let successCount = 0;
      for (let i = 0; i < numSimulations; i++) {
        const shuffledDeck = shuffleArray([...remainingCards]);
        const opponent1Hand = shuffledDeck.slice(0, 9);
        const opponent2Hand = shuffledDeck.slice(9, 18);
        const partnerHand = shuffledDeck.slice(18, 27);

        const opponent1Met = checkCondition(opponent1Hand, targetCard, comparator, condition);
        const opponent2Met = checkCondition(opponent2Hand, targetCard, comparator, condition);
        const partnerMet = checkCondition(partnerHand, targetCard, comparator, condition);

        let success = false;
        if (opponentType === 'opponents_one') {
          success = opponent1Met || opponent2Met;
        } else if (opponentType === 'opponents_none') {
          success = !opponent1Met && !opponent2Met;
        } else if (opponentType === 'partner') {
          success = partnerMet;
        }
        if (success) successCount++;
      }
      const probability = (successCount / numSimulations) * 100;
      resolve(probability);
    }, 50);
  });
};

// --- Exact probability (closed-form) ---
const combination = (n, k) => {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = (result * (n - k + i)) / i;
  }
  return result;
};

const hypergeometricTail = (N, K, n, m) => {
  // P[Y >= m]
  if (m <= 0) return 1;
  const maxJ = Math.min(n, K);
  if (m > maxJ) return 0;
  const denom = combination(N, n);
  let sum = 0;
  for (let j = m; j <= maxJ; j++) {
    sum += combination(K, j) * combination(N - K, n - j);
  }
  return sum / denom;
};

export const runExact = (playerHand, { targetCard, opponentType, comparator, condition }) => {
  const h = playerHand.filter(c => c.suit === targetCard.suit).length;
  const S = 9 - h; // includes target
  if (S <= 0) return 0;

  const m = Math.max(0, condition - 1); // additional beyond target
  const N = 26;
  const K = Math.max(0, S - 1);
  const n = 8;

  // pMeet: probability a given opponent (who has the target) meets the comparator
  const pAtLeast = hypergeometricTail(N, K, n, m); // P[Y >= m]
  const pAtMost = 1 - hypergeometricTail(N, K, n, m + 1); // P[Y <= m]
  const pMeet = comparator === 'atMost' ? pAtMost : pAtLeast;

  let probability;
  if (opponentType === 'opponents_one') {
    probability = (2 / 3) * pMeet * 100;
  } else if (opponentType === 'opponents_none') {
    // True if partner has target (1/3) OR opponent has target (2/3) and fails comparator
    probability = (1 - (2 / 3) * pMeet) * 100;
  } else if (opponentType === 'partner') {
    probability = (1 / 3) * pMeet * 100;
  } else {
    probability = 0;
  }
  return probability;
};
