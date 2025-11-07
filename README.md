# Jass Probability Calculator

Interactive helper that estimates card distribution probabilities for the Swiss card game Jass. Players can model a nine-card hand, specify a target card, and instantly see how likely it is that the partner or opponents hold additional cards of the same suit.

## Features

- Select up to nine cards from the full Jass deck via desktop grid or mobile layout.
- Configure scenarios in prose form (who, suit, card rank, comparator, and count).
- Switch between exact probabilities based on the hypergeometric distribution and Monte Carlo simulation.
- Visualise outcomes with an animated donut chart driven by Recharts.
- Responsive, swipe-friendly layout that adapts to phones, tablets, and larger screens.

## Tech Stack

- React 18 + Vite 5
- Recharts for data visualisation
- CSS modules (global stylesheets) for layout and theming
- ESLint with the Vite React preset

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ (ships with recent Node.js releases)

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the printed URL (default `http://localhost:5173`) to access the app with hot module replacement.

### Build for Production

```bash
npm run build
```

The production-ready bundle is emitted to `dist/`. Serve it with any static web server (e.g. `npm run preview`).

## Usage Guide

1. Pick your nine-card hand in the left column (or the first swipe page on mobile). The selection counter ensures you never exceed the legal hand size.
2. Use the sentence-style configurator to define the probability question:
   - Choose who should meet the condition (`partner`, `one opponent`, or `no opponent`).
   - Pick the suit and rank for the target card you care about.
   - Decide whether the other player should have at least/exactly/at most *n* cards of that suit (including the target).
3. Once all inputs are satisfied, the app automatically runs the exact calculation (or the selected simulation) and renders the resulting percentage and chart.
4. Adjust any parameter to instantly reset and recompute a fresh scenario.

## Probability Model

Exact results derive from a hypergeometric formulation that models the distribution of remaining suit cards across the unknown hands. Monte Carlo simulation is available as an alternative and samples thousands of random deals using a Fisher–Yates shuffle to approximate the probability empirically.

## Project Structure

```
src/
  components/   Reusable UI pieces (card grid, configuration, results)
  logic/        Jass deck definition and probability utilities
  App.jsx       Root layout wiring components together
  main.jsx      Vite bootstrap
```

Static card art lives in `public/cards/` and is loaded directly by the browser.

## Available npm Scripts

- `npm run dev` – start the development server with HMR.
- `npm run build` – create an optimised production build in `dist/`.
- `npm run lint` – run ESLint over the source.
- `npm run preview` – serve the build output locally (requires prior build).

## Contributing

Feel free to open an issue or submit a pull request with improvements. When contributing, keep comments and user-facing copy consistent with the Swiss-German terminology used throughout the UI.
