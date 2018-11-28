const catMap: Cat = {
  accessory: 16,
  body: 15,
  eyes: 15,
  fur: 10,
  mouth: 10
};
const hex = "0123456789ABCDE";

export class Game {
  grid: Card[];
  pattern: number[];

  constructor(public size: number, private difficulty: number) {
    this.grid = [];
    for (let i = 0; i < Math.pow(this.size, 2); i++) {
      this.grid.push(new Card(this.getRandomCat(), this.getRandomHex()));
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

  private getRandomCat(): Cat {
    const randomCat: Cat = {
      accessory: Math.floor(Math.random() * catMap.accessory),
      body: Math.floor(Math.random() * catMap.body),
      eyes: Math.floor(Math.random() * catMap.eyes),
      fur: Math.floor(Math.random() * catMap.fur),
      mouth: Math.floor(Math.random() * catMap.mouth)
    };

    return this.grid.some(
      panel =>
        panel.cat.accessory === randomCat.accessory &&
        panel.cat.body === randomCat.body &&
        panel.cat.eyes === randomCat.eyes &&
        panel.cat.fur === randomCat.fur &&
        panel.cat.mouth === randomCat.mouth
    )
      ? this.getRandomCat()
      : randomCat;
  }

  private getRandomHex(): string {
    let randomHex = "#";
    for (let i = 0; i < 6; i++) {
      randomHex += hex[Math.floor(Math.random() * hex.length)];
    }
    return this.grid.some(panel => panel.hex === randomHex)
      ? this.getRandomHex()
      : randomHex;
  }
}

export class Card {
  isActive = false;
  constructor(public cat: Cat, public hex: string) {}
}

class Cat {
  accessory: number;
  body: number;
  eyes: number;
  fur: number;
  mouth: number;
}
