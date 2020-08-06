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
      deck: ["0", "1", "2"],
    };
  },
  created() {
    this.displayInitialMap();
  },
  methods: {
    displayInitialMap() {
      console.log(this.cards);
    }
  }
};
</script>

<style lang="scss"></style>
