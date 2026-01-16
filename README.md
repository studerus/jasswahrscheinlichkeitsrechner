# 🃏 Jass-Wahrscheinlichkeitsrechner

Ein interaktiver Rechner zur Berechnung von Wahrscheinlichkeiten beim Schweizer Kartenspiel **Jass**. Finde heraus, wie wahrscheinlich es ist, dass dein Partner oder deine Gegner bestimmte Karten auf der Hand haben.

🔗 **[Live-Demo](https://jasswahrscheinlichkeitsrechner.vercel.app/)**

![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)

## ✨ Features

- **Kartenauswahl**: Wähle deine 9 Handkarten aus dem traditionellen Schweizer Jass-Deck (Eichel, Rosen, Schellen, Schilten)
- **Flexible Szenarien**: Berechne Wahrscheinlichkeiten für verschiedene Spielsituationen:
  - Hat mein **Partner** eine bestimmte Karte?
  - Hat **einer der Gegner** eine bestimmte Karte?
  - Hat **keiner der Gegner** eine bestimmte Karte?
- **Bedingungen**: Definiere zusätzliche Bedingungen wie "mindestens", "genau" oder "höchstens" X Karten derselben Farbe
- **Exakte Berechnung**: Nutzt hypergeometrische Verteilung für präzise Wahrscheinlichkeiten
- **Responsive Design**: Optimiert für Desktop und Mobile mit Swipe-Navigation

## 🚀 Installation

```bash
# Repository klonen
git clone <repository-url>
cd jasssimulator

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## 📖 Verwendung

1. **Karten auswählen**: Klicke auf die 9 Karten, die du auf der Hand hast
2. **Szenario definieren**: Wähle aus:
   - Wer soll die Karte haben? (Partner / Einer der Gegner / Keiner der Gegner)
   - Welche Farbe? (Eichel / Rosen / Schellen / Schilten)
   - Welcher Wert? (Ass, König, Ober, Under, Banner, 9, 8, 7, 6)
   - Bedingung? (mindestens / genau / höchstens X Karten der gleichen Farbe)
3. **Ergebnis**: Die Wahrscheinlichkeit wird automatisch berechnet und angezeigt

### Beispiel

> *"Wie gross ist die Wahrscheinlichkeit, dass einer der Gegner das Eichel-Ass mindestens zu 3. hat?"*

Dies berechnet die Wahrscheinlichkeit, dass ein Gegner das Eichel-Ass besitzt UND dabei mindestens 3 Eichel-Karten auf der Hand hat.

## 🛠️ Technologien

- **React 19** - UI-Framework
- **Vite 7** - Build-Tool & Entwicklungsserver
- **Recharts** - Diagramm-Bibliothek für Visualisierungen
- **ESLint** - Code-Qualität

## 📁 Projektstruktur

```
jasssimulator/
├── public/
│   └── cards/           # Kartenbilder (GIF)
├── src/
│   ├── components/
│   │   ├── Card.jsx           # Einzelne Kartenkomponente
│   │   ├── CardGrid.jsx       # Kartenraster zur Auswahl
│   │   ├── ResultDisplay.jsx  # Ergebnisanzeige
│   │   └── SimulationConfig.jsx # Konfigurationsoberfläche
│   ├── logic/
│   │   ├── cards.js           # Kartendefinitionen
│   │   └── jassLogic.js       # Wahrscheinlichkeitsberechnung
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🧮 Mathematischer Hintergrund

Die exakte Berechnung basiert auf der **hypergeometrischen Verteilung**:

- **N** = 26 (verbleibende Karten nach Abzug deiner Hand und der Zielkarte)
- **K** = Anzahl verbleibender Karten der Zielfarbe
- **n** = 8 (Handkarten eines Spielers minus Zielkarte)
- **m** = Bedingung (Anzahl Karten der gleichen Farbe)

Die Wahrscheinlichkeit wird dann mit dem Faktor 1/3 (Partner) oder 2/3 (Gegner) gewichtet, da die Zielkarte mit gleicher Wahrscheinlichkeit bei jedem der drei anderen Spieler liegen kann.

## 📜 Scripts

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Startet den Entwicklungsserver |
| `npm run build` | Erstellt einen Production-Build |
| `npm run preview` | Vorschau des Production-Builds |
| `npm run lint` | Führt ESLint aus |

## 📄 Lizenz

Dieses Projekt ist für private/Bildungszwecke bestimmt.

---

*Viel Spass beim Jassen! 🇨🇭*
