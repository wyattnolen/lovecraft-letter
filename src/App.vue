<template>
  <div id="app">
    <router-view />
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
      <span>Player's turn?:</span>
      {{ playerTurn }}
    </p>
    <ul v-if="timeToChoose">
      <li v-for="card in player.hand" :key="card" @click="playCard(card)">{{ card }}</li>
    </ul>
    <p>
      <span>Selected Card:</span>
      {{ selectedCard }}
    </p>
  </div>
</template>

<script>
export default {
  name: "App",
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
      player: {
        hand: [],
        discard: [],
        roundWins: []
      },
      computer: {
        hand: [],
        discard: [],
        roundWins: []
      },
      playerTurn: true,
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
        this.drawCard();
        this.chooseCard();
        this.checkRoundEnd();
      }
    },
  },
  methods: {
    start() {
      this.shuffleDeck();
      this.removeTopCard();
      this.setPlayerTurn();
      // this.addTopCardBack();
    },
    shuffleDeck() {
      var array = this.deck;
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    },
    removeTopCard() {
      this.removedCard = this.deck[0];
      this.deck.splice(0, 1);
    },
    checkRoundEnd() {
     // temp logic, just to prevent endless loop.
     if (this.deck.length == 0) {
       return (this.roundEnd = true);
     }
    },
    determineCurrentPlayer() {
      var currentPlayer = this.playerTurn ? 'player' : 'computer';
      console.log('current player: ', currentPlayer);
      return currentPlayer;
    },
    drawCard() {
      var currentPlayer = this.determineCurrentPlayer();
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
      if (this.playerTurn) {
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
      // Determine who the current player is
      var currentPlayer = this.determineCurrentPlayer();

      console.log(currentPlayer + " played " + card);

      // Remove the selected card from the current player's hand
      var index = this.[currentPlayer].hand.indexOf(this.selectedCard);
      this.[currentPlayer].hand.splice(index,1);

      this.timeToChoose = false;
      this.setPlayerTurn();
    },
    setPlayerTurn() {
      this.playerTurn = !this.playerTurn;
    },
    addTopCardBack() {
      this.deck.push(this.removedCard);
      this.removedCard = "";
    },
  }
};
</script>

<style lang="scss">
span {
  font-weight: bold;
}
</style>
