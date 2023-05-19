<script setup>
import { useGames } from '~/composables/useGames';

const { games, isLoading, isFetching, getGames, fetchData } = useGames();

if (games.value.length === 0) {
  getGames()
}

</script>

<template>
  <main class="main">
    <div class="actions">
      <button @click="fetchData" :disabled="isLoading">Fetch Data</button>
      <span v-if="isFetching">Getting new games ...</span>
      <NuxtLink to="/test">Test</NuxtLink>
    </div>
    <Table v-if="games" :games="games" />
    <span v-else-if="isLoading">Loading games ...</span>
    <span v-else>No games found.</span>
  </main>
</template>

<style>
.main {
  margin: 0 auto;
  max-width: 900px;
}
</style>
