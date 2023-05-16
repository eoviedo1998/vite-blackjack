/*Elaborado por Emanuel De Jesús Oviedo López.
Espero que este juego sea de su agrado :)
*/
import _ from "underscore";
import { Blackjack } from "./classes/blackjack";
import { Player } from "./classes/player";

(() => {
  const [buttonForNewGame, buttonForGiveCard, buttonForFinishTurn] = document.querySelector('.buttons-container').children;
  const [humanPlayerCounter, dealerCounter] = document.querySelectorAll('.points-counters');
  const [humanPlayerCardContainer, dealerCardContainer] = document.querySelectorAll('.card-container');

  let game;
  buttonForGiveCard.disabled = true;
  buttonForFinishTurn.disabled = true;

  let refresh = function () {
    const cardsContainers = [humanPlayerCardContainer, dealerCardContainer];
    const players = [game.humanPlayer, game.dealer];

    cardsContainers.forEach((element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });

    players.forEach((player, index) => {
      player.cards.forEach((card) => {
        let image = document.createElement('img');
        image.className = "w-25 d-inline-block card";
        image.src = `./images/cards/${card.figure}${card.suit}.png`;
        cardsContainers[index].append(image);
      });
    });

    humanPlayerCounter.innerText = game.humanPlayer.points;
    dealerCounter.innerText = game.dealer.points;
  }

  buttonForFinishTurn.addEventListener('click', () => {
    buttonForGiveCard.disabled = true;
    buttonForFinishTurn.disabled = true;

    let dealerWantsACard = Math.random() < 0.2;

    if (game.dealer.points <= 16) {
      const card = game.deck.pop()

      if (card.figure === 'A') {
        card.points = (card.points + game.dealer.points <= 21) ? 11 : 1;
      }

      game.dealer.addCard(card);
    }

    while (dealerWantsACard && game.dealer.points <= 21) {
      const card = game.deck.pop()

      if (card.figure === 'A') {
        card.points = (card.points + game.dealer.points <= 21) ? 11 : 1;
      }

      game.dealer.addCard(card);
      dealerWantsACard = Math.random() < 0.2;
    }

    refresh();

    const isDraw = game.dealer.points <= 21 && game.humanPlayer.points === game.dealer.points;
    const isDealerTheWinner = game.dealer.points <= 21 && game.humanPlayer.points < game.dealer.points;

    setTimeout(() => {
      if (isDraw) {
        alert('It\'s a draw');
      } else if (isDealerTheWinner) {
        alert('You lose!');
      } else {
        alert('You win!');
      }
    }, 500);

  });

  buttonForNewGame.addEventListener('click', () => {
    buttonForFinishTurn.disabled = false;
    buttonForGiveCard.disabled = false;
    game = new Blackjack(new Player(), new Player());
    game.deck = _.shuffle(game.deck);
    game.humanPlayer.addCard(game.deck.pop());
    game.humanPlayer.addCard(game.deck.pop());
    game.dealer.addCard(game.deck.pop());
    game.dealer.addCard(game.deck.pop());
    refresh();
    alert('A new match will start');


  });

  buttonForGiveCard.addEventListener('click', () => {
    const card = game.deck.pop();

    if (card.figure === 'A') {
      card.points = confirm('Do you want a value of 11 points for your card?') ? 11 : 1;
    }

    game.humanPlayer.addCard(card);
    const isDealerTheWinner = 21 < game.humanPlayer.points;
    refresh();

    setTimeout(() => {
      if (isDealerTheWinner) {
        buttonForFinishTurn.disabled = true;
        buttonForGiveCard.disabled = true;
        alert('You lose!');
      }

    }, 500);

  });
})();

