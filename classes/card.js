export class Card {
    points;
  
    constructor(suit, figure) {
        this.suit = suit;
        this.figure = figure;
  
        switch (figure) {
            case 'J':
            case 'Q':
            case 'K': {
                this.points = 10;
                break;
            }
            case 'A': {
                this.points = 11;
                break;
            }
            default: {
                this.points = parseInt(figure);
                break;
            }
        }
    }
  }