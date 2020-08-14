import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [
      {
        id: "p1",
        hand: [],
        discard: [],
        isStillPlaying: true,
        isCurrentPlayer: true,
        roundWins: [],
      },
      {
        id: "p2",
        hand: [],
        discard: [],
        isStillPlaying: true,
        isCurrentPlayer: false,
        roundWins: []
      },
    ],

  },
  getters: {
    allPlayerIds: (state) => {
      let ids = [];
      for (var i = 0; i < state.players.length; i++) {
        ids.push(state.players[i].id);
      }
      return ids
    },
    currentPlayerId: (state) => {
      return state.players.find(player => player.isCurrentPlayer === true).id
    },
    playersHand: (state) => (id) => {
      return state.players.find(player => player.id === id).hand
    },
  },
  mutations: {
    addCardToPlayerHand (state, payload) {
      let player = state.players.find(player => player.id === payload.playerId)
      player.hand.push(payload.card);
    },
  },
  actions: {
    setNextCurrentPlayer (state, payload) {
      let nextActivePlayerFound = false;
      let numberOfPlayers = state.players.length;
      let currentPlayerIndex = state.players.findIndex(player => player.id === payload.playerId);

      state.players[currentPlayerIndex].isCurrentPlayer === false;

      //while loop
      while(nextActivePlayerFound === false) {
        if (currentPlayerIndex >= numberOfPlayers) {
          currentPlayerIndex = 0;
        }
        else {
          currentPlayerIndex += 1;
        }

        if (state.players[currentPlayerIndex].isStillPlaying === true) {
          state.players[currentPlayerIndex].isCurrentPlayer = true;
          nextActivePlayerFound = true;
        }
      }
    }
  },
  modules: {}
});
