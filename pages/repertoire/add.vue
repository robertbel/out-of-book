<template>
  <h1>Add repertoire</h1>
  <div class="board">
    <div class="chessboard">
      <client-only>
        <TheChessboard @board-created="(api) => (boardAPI = api)" @move="updatePgn(boardAPI)" />
        <template #placeholder>
          <ChessboardLoader />
        </template>
      </client-only>
      <div class="notes">
        <input type="text" v-model="moveComment"><button @click="addCommentToMove(boardAPI, moveComment)">Add</button>
      </div>
    </div>
    <aside class="side">
      <div class="moves">
        {{ currentPgn }}
      </div>
      <div class="options">
        <div class="played-as">Played as: {{ playedAs }}</div>
        <div class="flip" @click="flipBoard(boardAPI)">Flip board</div>
      </div> 
    </aside>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const playedAs = ref('white');
const boardAPI = ref();
const currentPgn = ref();
const moveComment = ref();

function updatePgn(api) {
  currentPgn.value = api.getPgn();
}

function flipBoard(api, playedAs) {
  try {
    api.toggleOrientation();

    playedAs.value = playedAs.value === 'white' ? 'black' : 'white';
  } catch (error) {
    console.error("Failed to flip: ", error);
  }
}

function addCommentToMove(api, comment) {
  api.game.setComment(comment);
  moveComment.value = '';
  currentPgn.value = api.getPgn();
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