import { Cat } from '../cat';

export class Card {
    isActive = false;

    constructor(
        public cat: Cat,
        public hex: string
    ) { }
}