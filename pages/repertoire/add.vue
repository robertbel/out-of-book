<template>
  <h1>Add repertoire</h1>
  <div class="board">
    <div class="chessboard">
      <client-only>
        <TheChessboard @board-created="(api) => (boardAPI = api)" @move="updateHistory" :board-config="boardConfig" />
        <template #placeholder>
          <ChessboardLoader />
        </template>
      </client-only>
      <div class="notes">
        <input type="text"><button>Add</button>
      </div>
    </div>
    <aside class="side">
      <div class="moves" v-if="history">
        <div v-for="(move, index) in history" :key="index" class="move">
          <div @click="setPosition(move, index)" class="move-notation" :class="{ active: index === currentIndex }">{{ move.san }}</div>
          <div v-if="index === currentIndex && index !== history.length - 1" @click="changePositionTo(move, pgnHistory[index], index)" class="icon-change-to">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div class="options">
        <div class="flip" @click="flipBoard()">Flip board</div>
      </div>
    </aside>
  </div>
  <!-- this is just for development, so i know what my history looks like -->
  <pre v-if="history">
    {{ history }}
  </pre>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const boardAPI = ref();
const history = ref([]);
const pgnHistory = ref([]);
const currentIndex = ref(null);

const boardConfig = {
  highlight: {
    lastMove: true, // highlight the last move on the board
  },
};

const updateHistory = () => {
  if (boardAPI.value) {
    history.value = boardAPI.value.getHistory({ verbose: true });
    pgnHistory.value.push(boardAPI.value.getPgn());
    currentIndex.value = history.value.length - 1;
  }
};

const setPosition = (move, index) => {
  if (boardAPI.value) {
    const toFen = move.after;
    const highlightMove = [move.from, move.to];

    boardAPI.value.board.set({ fen: toFen, lastMove: highlightMove });
    currentIndex.value = index;
  }
}

const changePositionTo = (move, pgn, index) => {
  if (boardAPI.value) {
    setPosition(move, index);
    currentIndex.value = null;
    boardAPI.value.loadPgn(pgn);
  }
}

const flipBoard = () => {
  try {
    boardAPI.value.toggleOrientation();
  } catch (error) {
    console.error("Failed to flip: ", error);
  }
};
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
  gap: 0.5rem;
}

.move {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  cursor: pointer;
}

.move-notation {
  flex-grow: 1;
}

.move-notation.active {
  background-color: yellow;
}

.icon-change-to {
  width: 1rem;
}
</style>