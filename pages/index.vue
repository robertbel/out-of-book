<script setup>
const state = useStore();

await fetchGames();
const games = computed(() => state.value.games || []);
const loading = computed(() => games.value.length === 0);
</script>

<template>
  <div class="page-title">
    <h1>Games</h1>
  </div>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <Table :games="games" />
  </div>
</template>
