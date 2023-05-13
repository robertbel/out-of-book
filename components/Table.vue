<template>
  <div class="games">
    <div v-for="game in games" :key="game.id" class="game">
      <TheChessboard :board-config="{ ...boardConfig, orientation: game?.orientation }" @board-created="(api) => (loadPgn(api, game?.game_data.pgn, game?.game_id))" />
      <div class="pgn">
        <p>Id: {{ game?.game_id }}</p>
        <p>Color: {{ game?.orientation }}</p>
        <pre>{{ notations[game?.game_id] }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { parse } from '@mliebelt/pgn-parser';
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

const boardConfig = {
  coordinates: true,
};

const parsedGames = ref({});

const notations = computed(() => {
  const notations = {};
  for (const game in parsedGames.value) {
    notations[game] = parsedGames.value[game].moves.map(move => move.notation.notation);
  }
  return notations;
});

const loadPgn = (api, pgn, gameId) => {
  api.loadPgn(pgn);
  const game = parse(pgn, { startRule: "game" });
  parsedGames.value[gameId] = game;
};
</script>

<style>
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
  font-size: 0.75rem;
}
</style>
