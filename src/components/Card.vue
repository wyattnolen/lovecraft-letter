<template>
  <div class="card">
    <span class="card__name" v-html="getCardPropVal('title', card)"></span>
    <span v-if="getTimeToChoose === playerId" @click="playCard(card)">Play Card</span>
    {{ card }}
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: {
      type: String,
      required: true
    },
    playerId: {
        type: String,
        required: true
    },
  },
  data: function() {
    return {
      cards: [
        {
          id: "0",
          value: "0",
          title: "Mi-Go Braincase"
        },
        {
          id: "1",
          value: "1",
          title: "Investigators"
        },
        {
          id: "2",
          value: "1",
          title: "Investigators"
        },
        {
          id: "3",
          value: "1",
          title: "Investigators"
        },
        {
          id: "4",
          value: "1",
          title: "Investigators"
        },
        {
          id: "5",
          value: "1",
          title: "Investigators"
        }
      ],
      isCurrentPlayerHuman: false,
      timeToChoose: false,
      pickedCard: "0",
      roundEnd: false,
    };
  },
  computed: {
    getCurrentPlayerId() {
      console.log('getCurrentPlayerId', this.$store.getters.currentPlayerId)
      return this.$store.getters.currentPlayerId;
    },
    getTimeToChoose() {
      console.log('getTimeToChoose', this.$store.getters.timeToChoosePlayerId)
      return this.$store.getters.timeToChoosePlayerId;
    }
  },
  watch: {
    getTimeToChoose: function () {
      console.log('card watch triggered');
      if (!this.roundEnd) {``
        this.chooseCard();
      }
    },
  },
  methods: {
    getCardPropVal(prop, id) {
      return this.cards.find(card => card.id === id)[prop];
    },

    chooseCard() {
      // If player...
      if (this.isPlayerHuman(this.getCurrentPlayerId)) {
        // Let them select which card they want to play
        this.timeToChoose = true;
      }
      // If computer...
      else {
        // Go through checks to determine what card should be played
        this.timeToChoose = false;
        this.playCard(this.pickedCard);
      }
    },

    isPlayerHuman(id) {
      return this.$store.getters.isPlayerHuman(id);
    },

    playCard(card) {
      console.log(this.getCurrentPlayerId + " played " + card);
      this.pickedCard = card;
      // Remove the selected card from the current player's hand

      this.$store.commit({
        type: 'removeCardFromPlayerHand',
        card: this.pickedCard,
        playerId: this.getCurrentPlayerId,
      });

      this.timeToChoose = false;
      this.setPlayerTurn();
    },

    setPlayerTurn() {
      this.$store.commit({
            type: 'setNextCurrentPlayer',
            playerId: this.getCurrentPlayerId,
          });
    },
  }
};
</script>

<style scoped lang="scss"></style>
