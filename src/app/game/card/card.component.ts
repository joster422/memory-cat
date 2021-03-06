import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'mem-cat-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: Card;
  @Input() disabled = false;
  @Input() timeout = 1000;

  @Output() action = new EventEmitter();

  constructor() { }

  invertHex(hex: string): string {
    return `#${`000000${(0xffffff ^ parseInt(hex.substring(1), 16)).toString(
      16
    )}`.slice(-6)}`;
  }
}