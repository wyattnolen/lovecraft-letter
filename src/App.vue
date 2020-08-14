<template>
  <div id="app">
    <article class="gameboard">
      <section class="gameboard__playerboards" v-for="playerId in getAllPlayersId" :key="playerId">
        <PlayerBoard :player-id="playerId"></PlayerBoard>
      </section>
    </article>


      <span @click="updateTest()">Change targetId</span>
  </div>
</template>

<script>
import PlayerBoard from "@/components/PlayerBoard.vue";

export default {
  name: "App",
  components: {
    PlayerBoard
  },
  data: function() {
    return {
      deck: ["0", "1", "2", "3", "4", "5"],
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
        // this.chooseCard();
        this.checkRoundEnd();
      }
    },
  },
  computed: {
    getAllPlayersId() {
      return this.$store.getters.allPlayerIds;
    },
    getCurrentPlayerId() {
      return this.$store.getters.currentPlayerId;
    },
  },
  methods: {
    updateTest() {
      this.someIdProp = (this.someIdProp == '1') ? '2' : '1';
    },
    start() {
      this.shuffleDeck();
      this.removeTopCard();
      this.drawInitialHand();
      this.setPlayerTurn();
      // this.addTopCardBack();
    },

    checkRoundEnd() {
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
      this.deck.splice(0, 1);
    },

    addTopCardBack() {
      this.deck.push(this.removedCard);
      this.removedCard = "";
    },

/* END Deck Functions */


/* START Player Functions */
    drawInitialHand() {
        // Each player draws a card
        let playerIds = this.getAllPlayersId;
        console.log('get all playerIds', playerIds);
        playerIds.forEach((id) => {
          console.log('player (for each)', id);
          this.addCardtoHand(id);
        });
    },

    addCardtoHand(id) {
      var currentPlayerId = (typeof(id) !== 'undefined') ? id : this.getCurrentPlayerId;
      console.log('currentPlayerId', currentPlayerId);

      // If there are cards that can be drawn...
      if (this.deck.length > 0) {
        let drawnCard = this.deck[0];
        // ...Add the top card from the deck to the current player's hand
        console.log(currentPlayerId + ' drew ' + drawnCard);
          this.$store.commit({
            type: 'addCardToPlayerHand',
            card: drawnCard,
            playerId: currentPlayerId,
          });
        // ...Remove that top card from the deck
        this.removeTopCard();
      }
    },

    // chooseCard() {
    //   // If player...
    //   if (this.playerTurn == 'player') {
    //     // Let them select which card they want to play
    //     // this.timeToChoose = true;
    //   }
    //   // If computer...
    //   else {
    //     // Go through checks to determine what card should be played
    //     // this.playCard(this.computer.hand[0]);
    //   }
    // },

    // playCard(card) {

    //   console.log(this.playerTurn + " played " + card);

    //   // Remove the selected card from the current player's hand
    //   var index = this.[this.playerTurn].hand.indexOf(this.selectedCard);
    //   this.[this.playerTurn].hand.splice(index,1);

    //   this.timeToChoose = false;
    //   this.setPlayerTurn();
    // },

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
