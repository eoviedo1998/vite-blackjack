import { Card } from "./card";

export class Blackjack {
    deck = [];
    dealer;
    humanPlayer;
  
    constructor(humanPlayer, dealer) {
        this.humanPlayer = humanPlayer;
        this.dealer = dealer;
        const suits = ['C', 'D', 'H', 'S'];
        const figures = [...[...Array(11).keys()].filter((number) => number > 1), 'J', 'Q', 'K', 'A'];
        this.deck = figures.map(
            (figure) => suits.map((suit) => new Card(suit, figure)))
            .reduce((previousCardsGroup, currentCardsGroup) => currentCardsGroup.concat(previousCardsGroup));
    }
  }