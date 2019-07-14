import { Cat } from './cat';
import { Card } from './card/card';

const catAccessoryTotal = 16;
const catBodyTotal = 15;
const catEyesTotal = 15;
const catFurTotal = 10;
const catMouthTotal = 10;
const hexMap = "0123456789ABCDE";

export class Game {
  grid: Card[];
  pattern: number[];

  constructor(public size: number, private difficulty: number) {
    this.grid = [];
    for (let i = 0; i < Math.pow(this.size, 2); i++) {
      this.grid.push(new Card(this.getRandomCat(), this.getRandomHex(), Math.random() >= 0.5));
    }
    this.pattern = [];
    for (let i = 0; i < this.difficulty; i++) {
      this.pattern.push(Math.floor(Math.random() * Math.pow(this.size, 2)));
    }
  }

  isCorrect(guesses: number[]): boolean {
    return guesses.every(
      (guess, index) =>
        index >= this.difficulty || guess === this.pattern[index]
    );
  }

  getRandomCat(): Cat {
    const cat = new Cat(
      Math.floor(Math.random() * catAccessoryTotal),
      Math.floor(Math.random() * catBodyTotal),
      Math.floor(Math.random() * catEyesTotal),
      Math.floor(Math.random() * catFurTotal),
      Math.floor(Math.random() * catMouthTotal)
    );
    return this.grid.some(
      panel =>
        panel.cat.accessory === cat.accessory &&
        panel.cat.body === cat.body &&
        panel.cat.eyes === cat.eyes &&
        panel.cat.fur === cat.fur &&
        panel.cat.mouth === cat.mouth
    )
      ? this.getRandomCat()
      : cat;
  }

  getRandomHex(): string {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      hex += hexMap[Math.floor(Math.random() * hexMap.length)];
    }
    return this.grid.some(panel => panel.hex === hex)
      ? this.getRandomHex()
      : hex;
  }
}