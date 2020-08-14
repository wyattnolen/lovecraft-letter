<template>
  <div class="card">
    <span class="card__name" v-html="getCardPropVal('title', card)"></span>
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
    }
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
      ]
    };
  },
  computed: {},
  methods: {
    getCardPropVal(prop, id) {
      return this.cards.find(card => card.id === id)[prop];
    },
    test(card) {
      console.log("test", card);
    }
  }
};
</script>

<style scoped lang="scss"></style>
