<script setup>
const { data: games } = await useFetch("/api/games");
</script>

<template>
  <div class="page-title">
    <h1>Games</h1>
  </div>
  <Table v-if="games" :games="games" />
  <div v-else>No games found.</div>
</template>
