<template>
  <h1>Add repertoire</h1>
  <div class="board">
    <div class="chessboard">
      {{ orientation }}
      <client-only>
        <TheChessboard @move="handleMove" :board-config="boardConfig" />
        <template #placeholder>
          <ChessboardLoader />
        </template>
      </client-only>
    </div>
    <aside class="side">
      <div class="moves">
        <ul>
          <li v-for="move in moves">{{ move.san }}</li>
        </ul>
      </div>
      <div class="options" @click="flipBoard">Flip board</div>
    </aside>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const orientation = ref('white');
const moves = ref([]);
const boardConfig = ref({
  coordinates: true,
  orientation: orientation.value,
  events: {
    change: () => {
      // called after the situation changes on the board
      console.log('Something changed!');
    },
    move: (from, to, capture) => {
      // the move function fires after each move on the board, you can access the values from, to, and capture
      console.log(from, to, capture);
    },
    select(key) {
      // called when a square is selected
      // the param key is the square being selected: e.g. d2 or e2...
      console.log(key);
    },
  },
});

function handleMove(move) {
  moves.value.push(move);
  console.log(move);
}

function flipBoard() {
  if (orientation.value === 'white') {
    orientation.value = 'black';
  } else {
    orientation.value = 'white';
  }
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