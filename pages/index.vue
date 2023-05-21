<script setup>
const { data: games } = await useFetch('/api/games');
</script>

<template>
  <main class="main">
    <Table v-if="games" :games="games" />
    <div v-else>No games found.</div>
  </main>
</template>

<style>
.main {
  margin: 0 auto;
  max-width: 900px;
}
</style>
