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
      selectedCard: "",
      roundEnd: false,
      gameEnd: false,
      // getCurrentPlayerId: this.$store.getters.currentPlayerId,
    };
  },
  computed: {
    getAllPlayersId() {
      return this.$store.getters.allPlayerIds;
    },
    getCurrentPlayerId() {
      return this.$store.getters.currentPlayerId;
    },
  },
  created() {
    this.start();
  },
  watch: {
    getCurrentPlayerId: function () {
      if (!this.roundEnd) {
        console.log('app watch fired');
        this.addCardtoHand();
        this.setTimeToChoose()
        this.checkRoundEnd();
      }
    },
  },
  methods: {
    start() {
      console.log('game started');
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

    reset() {

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
        playerIds.forEach((id) => {
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

    setTimeToChoose(){
      console.log('set ' + this.getCurrentPlayerId + ' time to choose');
      this.$store.commit({
        type: 'setTimeToChoose',
        playerId: this.getCurrentPlayerId,
      });
    },

    setPlayerTurn() {
      console.log('set player turn');
      this.$store.commit({
            type: 'setNextCurrentPlayer',
            playerId: this.getCurrentPlayerId,
          });
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
