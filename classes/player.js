export class Player {
    cards = [];
    points = 0;

    addCard(card) {
        this.cards.push(card);
        this.points += card.points;
    }

    removeAllCard() {
        this.cards = [];
        this.points = 0;
    }
}