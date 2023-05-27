<template>
  <h1>Add repertoire</h1>
  <div class="board">
    <div class="chessboard">
      <client-only>
        <TheChessboard @board-created="(api) => (boardAPI = api)" @move="moveMade(boardAPI)" />
        <template #placeholder>
          <ChessboardLoader />
        </template>
      </client-only>
      <div class="notes">
        <input type="text" v-model="moveComment"><button @click="addCommentToMove(boardAPI, moveComment)">Add</button>
      </div>
    </div>
    <aside class="side">
      <div class="moves" v-if="moves">
        <div v-for="move of moves[0].moves" class="move">
          {{ move.notation.notation }} <span v-if="move.commentAfter">{{ move.commentAfter }}</span>
        </div>
      </div>
      <div class="options">
        <div class="played-as">Played as: {{ playedAs }}</div>
        <div class="flip" @click="flipBoard(boardAPI)">Flip board</div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { parse } from '@mliebelt/pgn-parser'
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const playedAs = ref('white');
const boardAPI = ref();
const currentPgn = ref();
const moves = ref();
const moveComment = ref();

function moveMade(api) {
  currentPgn.value = api.getPgn();
  moves.value = parse(currentPgn.value);
}

function flipBoard(api) {
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
  moveMade(api);
}
</script>

<style scoped>
.board {
  margin-inline: auto;
  max-width: 900px;
  display: grid;
  grid-template-columns: 1fr 20rem;
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

.moves {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.move {
  padding-block: 1rem;
  border-bottom: 1px solid #eee;
}
</style>