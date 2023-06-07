<template>
  <div class="page-title">
    <h1>Details</h1>
  </div>
  <div>
    <client-only>
      <TheChessboard
        class="beebee"
        :board-config="{
          ...boardConfig,
          orientation: game?.played_as === 'w' ? 'white' : 'black',
        }"
        @board-created="(api) => loadFen(api, game?.deviation.fen_notation)"
      />
      <template #placeholder>
        <ChessboardLoader />
      </template>
    </client-only>
    <pre>{{ game }}</pre>
  </div>
</template>

<script setup>
import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css";

const route = useRoute();

const { data: game } = await useFetch("/api/games/" + route.params.id);

const boardConfig = {
  coordinates: true,
  viewOnly: true,
  animation: {
    enabled: false,
  },
};

const loadFen = (api, fen) => {
  api.setPosition(fen);
};
</script>

<style scoped>
.beebee {
  view-transition-name: selected-board;
}
</style>
