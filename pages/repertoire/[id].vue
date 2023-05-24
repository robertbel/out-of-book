<template>
  <div class="game">
    <div class="back">
      <NuxtLink to="/">
        Back to homepage
      </NuxtLink>
    </div>
    <client-only placeholder="Loading...">
      <TheChessboard class="beebee" :board-config="{ ...boardConfig, orientation: game?.played_as === 'w' ? 'white' : 'black' }" @board-created="(api) => (loadPgn(api, game?.pgn))" />
      <template #placeholder>
        <ChessboardLoader />
      </template>
    </client-only>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const route = useRoute();
console.log(route.params);
const { data: game } = await useFetch('/api/games/' + route.params.id);

const boardConfig = {
  coordinates: true,
  viewOnly: true,
  animation: {
    enabled: false
  }
};

const loadPgn = (api, pgn) => {
  api.loadPgn(pgn);
};
</script>

<style scoped>
.back {
  max-width: 700px;
  margin-inline: auto;
  padding-block: 0.5rem;
}

.beebee {
  view-transition-name: selected-board;
}
</style>