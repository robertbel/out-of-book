<template>
  <div>
    {{ lines }}
    <div v-for="game in games" :key="game.id">
      <TheChessboard @board-created="(api) => (loadPgn(api, game?.pgn))" />
      <p>{{ game?.pgn }}</p>
      <p>{{ game?.date_played }}</p>
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
