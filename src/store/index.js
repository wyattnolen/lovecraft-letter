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
        isCurrentPlayer: false,
        isHuman: true,
        isReadyToPickCard: false,
        roundWins: [],
      },
      {
        id: "p2",
        hand: [],
        discard: [],
        isStillPlaying: true,
        isCurrentPlayer: false,
        isHuman: false,
        isReadyToPickCard: false,
        roundWins: [],
      },
      {
        id: "p3",
        hand: [],
        discard: [],
        isStillPlaying: true,
        isCurrentPlayer: true,
        isHuman: false,
        isReadyToPickCard: false,
        roundWins: [],
      },
    ],
  },
  getters: {
    allPlayerIds: (state) => {
      let ids = [];
      for (var i = 0; i < state.players.length; i++) {
        ids.push(state.players[i].id);
      }
      return ids;
    },
    currentPlayerId: (state) => {
      return state.players.find((player) => player.isCurrentPlayer === true).id;
    },
    playersHand: (state) => (id) => {
      return state.players.find((player) => player.id === id).hand;
    },
    isPlayerHuman: (state) => (id) => {
      return state.players.find((player) => player.id === id).isHuman;
    },
    timeToChoosePlayerId: (state) => {
      let player = state.players.find(
        (player) => player.isReadyToPickCard === true
      );
      player = typeof player != "undefined" ? player.id : "";
      return player;
    },
  },
  mutations: {
    addCardToPlayerHand(state, payload) {
      let player = state.players.find(
        (player) => player.id === payload.playerId
      );
      player.hand.push(payload.card);
    },
    removeCardFromPlayerHand(state, payload) {
      let player = state.players.find(
        (player) => player.id === payload.playerId
      );
      let index = player.hand.indexOf(payload.card);
      player.hand.splice(index, 1);
      player.discard.push(payload.card);
      console.log("played", player);
    },
    // setReadyToPickCard (state, payload) {
    //   let player = state.players.find(player => player.id === payload.playerId)
    //   player.isReadyToPickCard = payload,
    // },
    setNextCurrentPlayer(state, payload) {
      let nextActivePlayerFound = false;
      let numberOfPlayers = state.players.length;
      let currentPlayerIndex = state.players.findIndex(
        (player) => player.id === payload.playerId
      );
      let nextPlayerIndex = currentPlayerIndex + 1;

      //while loop
      while (nextActivePlayerFound === false) {
        //if next is greater than the index of players, then set back to zero
        nextPlayerIndex =
          nextPlayerIndex > numberOfPlayers - 1 ? 0 : nextPlayerIndex;

        //if next player is the current player, then increment by 1
        nextPlayerIndex =
          nextPlayerIndex == currentPlayerIndex
            ? nextPlayerIndex + 1
            : nextPlayerIndex;
        if (state.players[nextPlayerIndex].isStillPlaying === true) {
          state.players[currentPlayerIndex].isCurrentPlayer = false;
          state.players[nextPlayerIndex].isCurrentPlayer = true;

          nextActivePlayerFound = true;
        }
      }
    },
    setTimeToChoose: (state, payload) => {
      let nextActivePlayerFound = false;
      let numberOfPlayers = state.players.length;
      let currentPlayerIndex = state.players.findIndex(
        (player) => player.id === payload.playerId
      );
      let nextPlayerIndex = currentPlayerIndex + 1;

      //while loop
      while (nextActivePlayerFound === false) {
        //if next is greater than the index of players, then set back to zero
        nextPlayerIndex =
          nextPlayerIndex > numberOfPlayers - 1 ? 0 : nextPlayerIndex;

        //if next player is the current player, then increment by 1
        nextPlayerIndex =
          nextPlayerIndex == currentPlayerIndex
            ? nextPlayerIndex + 1
            : nextPlayerIndex;
        if (state.players[nextPlayerIndex].isStillPlaying === true) {
          state.players[currentPlayerIndex].isReadyToPickCard = false;
          state.players[nextPlayerIndex].isReadyToPickCard = true;

          nextActivePlayerFound = true;
        }
      }
    },
    setReadyToPickCard: (state, { playerId, status }) => {
      state.players[playerId].isReadyToPickCard = status;
    },
  },
  actions: {
    nextPlayerTurn: ({ commit, state }, payload) => {
      //Need to rewrite to match new parameters
      console.log(payload.playerId);
      let nextPlayerFound = false;
      let numberOfPlayers = state.players.length;
      let currentPlayerIndex = state.players.findIndex(
        (player) => player.id === payload.playerId
      );
      let nextPlayerIndex = currentPlayerIndex + 1;

      //while loop
      while (nextPlayerFound === false) {
        //if next is greater than the index of players, then set back to zero
        nextPlayerIndex =
          nextPlayerIndex > numberOfPlayers - 1 ? 0 : nextPlayerIndex;

        //if next player is the current player, then increment by 1
        nextPlayerIndex =
          nextPlayerIndex == currentPlayerIndex
            ? nextPlayerIndex + 1
            : nextPlayerIndex;
        if (state.players[nextPlayerIndex].isStillPlaying === true) {
          commit("setReadyToPickCard", {
            playerId: currentPlayerIndex,
            status: false,
          });
          commit("setReadyToPickCard", {
            playerId: nextPlayerIndex,
            status: true,
          });

          // state.players[currentPlayerIndex].isReadyToPickCard = false;
          // state.players[nextPlayerIndex].isReadyToPickCard = true;

          nextPlayerFound = true;
        }
      }
    },
  },
  modules: {},
});
