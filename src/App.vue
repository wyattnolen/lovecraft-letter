<template>
  <div id="app">
    <router-view />
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
      deck: ["0", "1", "2"]
    };
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      this.shuffleDeck();
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
    }
  }
};
</script>

<style lang="scss"></style>
