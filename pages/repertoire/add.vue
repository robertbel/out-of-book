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
        <input type="text"><button>Add comment</button>
      </div>
    </div>
    <aside class="side">
      <div class="moves" v-if="history">
        <div v-for="(move, index) in history" :key="index" class="move">
          <div @click="setPosition(index)" class="move-notation" :class="{ active: index === currentIndex }">{{ index }} - {{ move.san }}</div>
          <div v-if="index === currentIndex && index !== history.length - 1" @click="changePositionTo(pgnHistory[index], index)" class="icon-change-to">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div class="options">
        <div class="navigation">
          <button class="arrow left" @click="setPosition(currentIndex - 1)" :disabled="currentIndex < 1">
            prev
          </button>
          <button class="arrow right" @click="setPosition(currentIndex + 1)" :disabled="currentIndex === null || currentIndex === history.length - 1">
            next
          </button>
        </div>
        <div class="flip" @click="flipBoard()">Flip board</div>
      </div>
    </aside>
  </div>
  <!-- <pre>
    {{ pgnHistory }}
  </pre> -->
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
    lastMove: true,
  },
};

const updateHistory = () => {
  if (boardAPI.value) {
    history.value = boardAPI.value.getHistory({ verbose: true });
    pgnHistory.value.push(boardAPI.value.getPgn());
    currentIndex.value = history.value.length - 1;
  }
};

const setPosition = (index) => {
  if (boardAPI.value) {
    const toFen = history.value[index].after;
    const highlightMove = [history.value[index].from, history.value[index].to];

    boardAPI.value.board.set({ viewOnly: true, fen: toFen, lastMove: highlightMove });
    currentIndex.value = index;

    //Make board editable again if last move is selected
    if (index === history.value.length - 1) {
      boardAPI.value.board.set({ viewOnly: false });
    }
  }
}

const changePositionTo = (pgn, index) => {
  if (boardAPI.value) {
    setPosition(index);
    currentIndex.value = null;
    boardAPI.value.board.set({ viewOnly: false });
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
}

.move {
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.move-notation {
  flex-grow: 1;
  padding: 1rem;
}

.move-notation.active {
  background-color: yellow;
}

.icon-change-to {
  width: 1rem;
}

.options {
  display: flex;
  justify-content: space-between;
}

.navigation {
  display: flex;
}

.navigation .arrow {
  width: 2rem;
  cursor: pointer;
}
</style>