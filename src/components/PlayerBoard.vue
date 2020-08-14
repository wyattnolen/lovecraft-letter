<template>
    <div class="playerboard">
      <div class="playerboard__inner">
        <ul class="playerboard__hand">
          <li v-for="card in playerHand" :key="card"><Card :card="card"></Card></li>
        </ul>
         <p v-html="playerId"></p>
      </div>
    </div>
</template>


<script>
import Card from "@/components/Card.vue";

export default {
  name: "PlayerBoard",
  components: {
    Card
  },
  props: {
    playerId: {
        type: String,
        required: true
    },
    deck: {
      type: Array,
      require: true
    },
  },
  computed: {
  },
  data: function() {
    return {
      playerHand: this.$store.getters.playersHand(this.playerId),
    }
  },
  created() {
  },
  watch: {
  },
};
</script>

<style scoped lang="scss">
</style>