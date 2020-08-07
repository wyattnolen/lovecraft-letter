<template>
  <div id="app">
    <router-view />
    <p><span>Deck: </span> {{ deck }}</p>
    <p><span>Removed Card: </span> {{ removedCard }}</p>
    <p><span>Player's Hand: </span>{{playerHand}}</p>
    <p><span>Computer's Hand: </span>{{computerHand}}</p>
    <p @click="drawCard()">Draw Card</p>
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
        }
      },
      deck: ["0", "1", "2"],
      removedCard: "",
      playerHand: [],
      computerHand: []
    };
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      this.shuffleDeck();
      this.removeTopCard();
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
    addTopCardBack() {
      this.deck.push(this.removedCard);
      this.removedCard = "";
    },
    drawCard() {
      // If there are cards that can be drawn...
      if (this.deck.length > 0) {
        // ...Add the top card from the deck to the current player's hand
        this.playerHand.push(this.deck[0]);

        // ...Remove that top card from the deck
        this.deck.splice(0, 1);
      }
    }
  }
};
</script>

<style lang="scss">
span {
  font-weight: bold;
}
</style>
