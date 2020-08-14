<template>
    <div class="test">
         <p v-html="someIdProp"></p>
         <span @click="test()">force</span>
    </div>
</template>


<script>
export default {
  name: "Deck",
  props: {
    someIdProp: {
        type: String,
        required: true
        }
  },
  data: function() {
    return {
    }
  },
  created() {
      console.log(this.someIdProp);
  },
  watch: {
    someIdProp: function () {
        console.log('cool');
    },
  },
};
</script>

<style scoped lang="scss">
</style>