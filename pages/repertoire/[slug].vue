<template>
  <div class="game">
    <div class="back">
      <NuxtLink to="/">
        Back to homepage {{ active }}
      </NuxtLink>
    </div>
    <client-only>
      <TheChessboard class="beebee" />
    </client-only>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
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