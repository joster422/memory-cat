const catMap: Cat = {
  accessory: 16,
  body: 15,
  eyes: 15,
  fur: 10,
  mouth: 10
};
const hexMap = "0123456789ABCDE";

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

  getRandomCat(): Cat {
    const cat = new Cat(
      Math.floor(Math.random() * catMap.accessory),
      Math.floor(Math.random() * catMap.body),
      Math.floor(Math.random() * catMap.eyes),
      Math.floor(Math.random() * catMap.fur),
      Math.floor(Math.random() * catMap.mouth)
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

export class Card {
  isActive = false;
  constructor(public cat: Cat, public hex: string) {}
}

class Cat {
  constructor(
    public accessory: number,
    public body: number,
    public eyes: number,
    public fur: number,
    public mouth: number
  ) {}
}
