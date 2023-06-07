<template>
  <div class="page-title">
    <h1>Add repertoire</h1>
  </div>
  <div class="board">
    <div class="chessboard">
      <client-only>
        <TheChessboard
          @board-created="(api) => (boardAPI = api)"
          @move="updateHistory"
          :board-config="boardConfig"
        />
        <template #placeholder>
          <ChessboardLoader />
        </template>
      </client-only>
    </div>
    <aside class="side">
      <div class="moves-container">
        <div class="moves" v-if="history">
          <div v-for="(move, index) in history" :key="index" class="move">
            <div
              @click="viewPosition(index)"
              class="move-data"
              :class="{ active: index === currentIndex }"
            >
              <div class="move-san">
                {{ move.san }}
              </div>
              <div class="move-options">
                <div class="comment icon-change-to" v-if="comments[index]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  v-if="index === currentIndex && index !== history.length - 1"
                  @click="setPosition(pgnHistory[index], index)"
                  class="icon-change-to"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div class="options">
      <div class="navigation">
        <button
          class="arrow left"
          @click="viewPosition(currentIndex - 1)"
          :disabled="currentIndex < 1"
        >
          prev
        </button>
        <button
          class="arrow right"
          @click="viewPosition(currentIndex + 1)"
          :disabled="
            currentIndex === null || currentIndex === history.length - 1
          "
        >
          next
        </button>
      </div>
      <div class="flip" @click="flipBoard()">Flip board</div>
    </div>
    <div class="notes">
      <textarea
        class="note-field"
        id="note"
        v-model="commentInput"
        @input="addComment"
      ></textarea>
    </div>
  </div>
  <pre>
    {{ comments }}
  </pre>
  <pre>
    {{ pgnHistory }}
  </pre>
  <pre v-if="history">
    {{ history }}
  </pre>
</template>

<script setup>
import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css";

const boardAPI = ref();
const history = ref([]);
const pgnHistory = ref([]);
const currentIndex = ref(null);
const comments = ref([]);
const commentInput = ref("");

const boardConfig = {
  highlight: {
    lastMove: true,
  },
};

const addComment = () => {
  if (boardAPI.value && currentIndex.value !== null) {
    boardAPI.value.game.setComment(commentInput.value);
    comments.value[currentIndex.value] = commentInput.value;
  }
};

const updateHistory = () => {
  if (boardAPI.value) {
    history.value = boardAPI.value.getHistory({ verbose: true });
    pgnHistory.value.push(boardAPI.value.getPgn());
    currentIndex.value = history.value.length - 1;

    // Make sure the comments sync up with the new move
    const remainingComments = comments.value.slice(0, history.value.length);
    comments.value = [...remainingComments];

    commentInput.value = "";
  }
};

const viewPosition = (index) => {
  if (boardAPI.value) {
    const toFen = history.value[index].after;
    const highlightMove = [history.value[index].from, history.value[index].to];

    boardAPI.value.board.set({
      viewOnly: true,
      fen: toFen,
      lastMove: highlightMove,
    });
    currentIndex.value = index;

    commentInput.value = comments.value[currentIndex.value];

    //Make board editable again if last move is selected
    if (index === history.value.length - 1) {
      boardAPI.value.board.set({ viewOnly: false });
    }
  }
};

const setPosition = (pgn, index) => {
  if (boardAPI.value) {
    viewPosition(index);

    currentIndex.value = null;
    pgnHistory.value.length = index;

    boardAPI.value.board.set({ viewOnly: false });
    boardAPI.value.loadPgn(pgn);
  }
};

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
  grid-template-rows: 1fr 4rem auto;
  grid-template-areas:
    "board sidebar"
    "board options"
    "notes .";
}

.chessboard {
  grid-area: board;
}

.main-wrap {
  width: 100%;
}

.side {
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  color: var(--background);
  border-radius: 0 0.5rem 0 0;
  padding-top: 0.5rem;
}

.moves-container {
  min-height: 100%;
  height: 0;
  overflow-y: scroll;
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

.move-data {
  flex-grow: 1;
  padding: 1rem;
  display: flex;
}

.move-data.active {
  background-color: #9bc70069;
}

.move-san {
  flex-grow: 1;
}

.move-options {
  display: flex;
  gap: 0.5rem;
}

.icon-change-to {
  width: 1rem;
}

.options {
  grid-area: options;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 0.5rem 0;
}

.notes {
  grid-area: notes;
  padding-block: 1rem;
}

.note-field {
  width: 100%;
}

.navigation {
  display: flex;
  gap: 0.5rem;
}

.navigation .arrow {
  cursor: pointer;
}
</style>
