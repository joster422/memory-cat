import { Component } from "@angular/core";
import { Game } from "./game";
import { Form } from "./form/form";

import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
  selector: "mc-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent {
  allowClicks = false;
  form = new Form();
  game = new Game(this.form.size, this.form.difficulty);
  guesses: number[] = [];
  timeouts: number[] = [];
  gridTemplateRowsColumns?: SafeStyle;

  constructor(private domSanitizer: DomSanitizer) {}

  click(index: number) {
    if (!this.allowClicks) return;
    this.guesses.push(index);
    this.checkGuess();
  }

  invertHex(hex: string): string {
    return `#${`000000${(0xffffff ^ parseInt(hex.substring(1), 16)).toString(
      16
    )}`.slice(-6)}`;
  }

  private checkGuess() {
    if (!this.game.isCorrect(this.guesses)) {
      this.newGame();
      console.log("lose");
      return;
    }

    if (this.guesses.length >= this.game.pattern.length) {
      this.newGame();
      console.log("win");
    }
  }

  private newGame() {
    this.game = new Game(this.form.size, this.form.difficulty);
    this.gridTemplateRowsColumns = this.domSanitizer.bypassSecurityTrustStyle(
      `repeat(${this.form.size}, 1fr)`
    );
    this.showGamePattern();
  }

  private showGamePattern() {
    const timeMs = this.form.timing * 1000;
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
    this.guesses = [];
    this.game.grid.forEach(card => (card.isActive = false));
    this.allowClicks = false;
    for (let i = 0; i < this.game.pattern.length; i++) {
      this.timeouts.push(
        window.setTimeout(() => {
          this.game.grid[this.game.pattern[i]].isActive = true;
          this.timeouts.push(
            window.setTimeout(() => {
              this.game.grid[this.game.pattern[i]].isActive = false;
            }, timeMs / 2)
          );
        }, i * timeMs)
      );
    }
    this.timeouts.push(
      window.setTimeout(() => {
        this.allowClicks = true;
      }, this.game.pattern.length * timeMs)
    );
  }
}
