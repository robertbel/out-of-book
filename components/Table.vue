<template>
  <div>
    <div v-for="dbrecord in dbrecords" :key="dbrecord.id">
      <TheChessboard @board-created="(api) => (loadPgn(api, dbrecord?.pgn))" />
      <p>{{ dbrecord?.pgn }}</p>
      <p>{{ dbrecord?.date_played }}</p>
    </div>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const props = defineProps({
  dbrecords: {
    type: Array,
    required: true,
  }
})

const loadPgn = (api, pgn) => {
  api.loadPgn(pgn);
};
</script>
