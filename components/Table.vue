<template>
  <div class="games">
    <!-- {{ lines }} -->
    <div v-for="game in games" :key="game.id" class="game">
      <TheChessboard @board-created="(api) => (loadPgn(api, game?.game_data.pgn))" />
      <div class="pgn">
        <pre>{{ game?.game_data.pgn }}</pre>
      </div>

    </div>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const props = defineProps({
  games: {
    type: Array,
    required: true,
  },
  lines: {
    type: Array,
    required: true,
  },
})

const loadPgn = (api, pgn) => {
  api.loadPgn(pgn);
};
</script>

<style>
.games {}

.game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-block-end: 2rem;
}

.main-wrap {
  width: 100%;
}

.pgn pre {
  white-space: pre-wrap;
}


pre {
  font-size: 0.75rem;

}
</style>
