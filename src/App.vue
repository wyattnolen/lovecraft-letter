<template>
  <div id="app">
    <router-view />
    <p>
      <span>Card:</span>
      <Card></Card>
    </p>
    <p>
      <span>Deck:</span>
      {{ deck }}
    </p>
    <p>
      <span>Removed Card:</span>
      {{ removedCard }}
    </p>
    <p>
      <span>Player's Hand:</span>
      {{ player.hand }}
    </p>
    <p>
      <span>Computer's Hand:</span>
      {{ computer.hand }}
    </p>
    <p>
      <span>Whose Turn is it:</span>
      {{ playerTurn }}
    </p>
    <ul v-if="timeToChoose">
      <li v-for="card in player.hand" :key="card" @click="playCard(card)">
        {{ card }}
      </li>
    </ul>
    <p>
      <span>Selected Card:</span>
      {{ selectedCard }}
    </p>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "App",
  components: {
    Card
  },
  data: function() {
    return {
      cards: {
        c0: {
          id: "0",
          value: "0",
          title: "Mi-Go Braincase"
        },
        c1: {
          id: "1",
          value: "1",
          title: "Investigators"
        },
        c2: {
          id: "2",
          value: "1",
          title: "Investigators"
        },
        c3: {
          id: "3",
          value: "1",
          title: "Investigators"
        },
        c4: {
          id: "4",
          value: "1",
          title: "Investigators"
        },
        c5: {
          id: "5",
          value: "1",
          title: "Investigators"
        }
      },
      deck: ["0", "1", "2", "3", "4", "5"],
      removedCard: "",
      players: {
        player: {
          id: 1,
          hand: [],
          discard: [],
          isStillPlaying: true,
          roundWins: []
        },
        computer: {
          id: 2,
          hand: [],
          discard: [],
          isStillPlaying: true,
          roundWins: []
        },
      },
      player: {
        id: 1,
        hand: [],
        discard: [],
        isStillPlaying: true,
        roundWins: []
      },
      computer: {
        id: 2,
        hand: [],
        discard: [],
        isStillPlaying: true,
        roundWins: []
      },
      playerTurn: 'player',
      timeToChoose: false,
      selectedCard: "",
      roundEnd: false,
      gameEnd: false
    };
  },
  created() {
    this.start();
  },
  watch: {
    playerTurn: function () {
      if (!this.roundEnd) {
        this.addCardtoHand();
        this.chooseCard();
        this.checkRoundEnd();
      }
    },
  },
  methods: {
    start() {
      this.shuffleDeck();
      this.removeTopCard();
      this.drawInitialHand();
      this.setPlayerTurn();
      // this.addTopCardBack();
    },

    checkRoundEnd() {
     // temp logic, just to prevent endless loop.
     if (this.deck.length == 0) {
       return (this.roundEnd = true);
     }
    },

/* START Deck Functions */
    shuffleDeck() {
      var array = this.deck;
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    },

    removeTopCard() {
      this.removedCard = this.deck[0];
      this.deck.splice(0, 1);
    },

    addTopCardBack() {
      this.deck.push(this.removedCard);
      this.removedCard = "";
    },

/* END Deck Functions */


/* START Player Functions */
    getCurrentPlayer() {
      return this.playerTurn;
    },

    drawInitialHand() {
        // Each player draws a card
        this.addCardtoHand('player');
        this.addCardtoHand('computer');
    },

    addCardtoHand(player) {
      var currentPlayer = (typeof(player) !== 'undefined') ? player : this.getCurrentPlayer();

      // If there are cards that can be drawn...
      if (this.deck.length > 0) {
        // ...Add the top card from the deck to the current player's hand
        this.[currentPlayer].hand.push(this.deck[0]);
        console.log(currentPlayer + ' drew ' + this.deck[0]);
        // ...Remove that top card from the deck
        this.deck.splice(0, 1);
      }
    },

    chooseCard() {
      // If player...
      if (this.playerTurn == 'player') {
        // Let them select which card they want to play
        this.timeToChoose = true;
      }
      // If computer...
      else {
        // Go through checks to determine what card should be played
        this.playCard(this.computer.hand[0]);
      }
    },

    playCard(card) {

      console.log(this.playerTurn + " played " + card);

      // Remove the selected card from the current player's hand
      var index = this.[this.playerTurn].hand.indexOf(this.selectedCard);
      this.[this.playerTurn].hand.splice(index,1);

      this.timeToChoose = false;
      this.setPlayerTurn();
    },

    setPlayerTurn() {
      this.playerTurn = (this.playerTurn == 'player') ? 'computer' : 'player';
    },
/* END Player Functions */

  }
};
</script>

<style lang="scss">
span {
  font-weight: bold;
}
</style>
