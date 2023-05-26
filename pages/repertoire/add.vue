<template>
  <h1>Add repertoire</h1>
  <div class="board">
    <div class="chessboard">
      <client-only>
        <TheChessboard @board-created="(api) => (boardAPI = api)" @move="mov(boardAPI)" />
        <template #placeholder>
          <ChessboardLoader />
        </template>
      </client-only>
      <div class="notes">
        <input type="text" v-model="note"><button @click="com(boardAPI, note)">Add</button>
      </div>
    </div>
    <aside class="side">
      <div class="moves">
        {{ currPgn }}
      </div>
      <div class="options">
        <div class="played-as">Played as: {{ playedAs }}</div>
        <div class="flip" @click="flip(boardAPI)">Flip board</div>
      </div> 
    </aside>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const playedAs = ref('white');
const boardAPI = ref();
const currPgn = ref();
const note = ref();

function mov(api) {
  currPgn.value = api.getPgn();
}

function flip(api) {
  api.toggleOrientation();
  if(playedAs.value === 'white') {
    playedAs.value = 'black';
  } else {
    playedAs.value = 'white';
  }
}

function com(api, comment) {
  api.game.setComment(comment)
  currPgn.value = api.getPgn();
}
</script>

<style scoped>
.board {
  margin-inline: auto;
  max-width: 700px;
  display: grid;
  grid-template-columns: 1fr 10rem;
  gap: 1rem;
}

.main-wrap {
  width: 100%;
}

.side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>