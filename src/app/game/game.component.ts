import { Component, HostBinding, OnInit } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Game } from "./game";
import { MenuService } from "../menu/menu.service";

@Component({
  selector: "mc-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  @HostBinding("style.grid-template-rows") rows: SafeStyle;
  @HostBinding("style.grid-template-columns") columns: SafeStyle;

  allowClicks = false;
  game: Game;
  guesses: number[] = [];
  timeMs: number;
  timeouts: number[] = [];

  constructor(
    private domSanitzer: DomSanitizer,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.newGame();
    this.setEvents();
  }

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
    const difficulty = this.menuService.form.get("difficulty").value;
    const size = this.menuService.form.get("size").value;
    this.game = new Game(size, difficulty);
    this.rows = this.domSanitzer.bypassSecurityTrustStyle(
      `repeat(${size}, 1fr)`
    );
    this.columns = this.domSanitzer.bypassSecurityTrustStyle(
      `repeat(${size}, 1fr)`
    );

    this.guesses = [];
    this.showGamePattern();
  }

  private showGamePattern() {
    this.timeMs = this.menuService.form.get("timing").value * 1000;
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
    this.game.grid.forEach(card => (card.isActive = false));
    this.allowClicks = false;
    for (let i = 0; i < this.game.pattern.length; i++) {
      this.timeouts.push(
        window.setTimeout(() => {
          this.game.grid[this.game.pattern[i]].isActive = true;
          this.timeouts.push(
            window.setTimeout(() => {
              this.game.grid[this.game.pattern[i]].isActive = false;
            }, this.timeMs / 2)
          );
          // 1 second delay for rendering
        }, 1000 + i * this.timeMs)
      );
    }
    this.timeouts.push(
      window.setTimeout(() => {
        this.allowClicks = true;
      }, 1000 + this.game.pattern.length * this.timeMs)
    );
  }

  private setEvents() {
    this.menuService.showPattern$.asObservable().subscribe(() => {
      this.showGamePattern();
    });
    this.menuService.form.valueChanges.subscribe(() => {
      if (!this.menuService.form.valid) return;
      this.newGame();
    });
  }
}
