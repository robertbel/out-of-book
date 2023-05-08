<template>
  <main class="main">
    <Table :games="gamesData.chessGames" :lines="openingsData.chessLines" />
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const { data: openingsData } = useFetch('/api/get-openings');

const gamesData = ref({ chessGames: [] });

const getGames = async () => {
  console.log('Called!');
  const result = await fetch('/api/get-games');
  const newData = await result.json();
  gamesData.value = newData;
}

onMounted(() => {
  // Initial data fetch
  getGames();

  // Fetch data every 10 seconds
  const intervalId = setInterval(() => {
    getGames();
  }, 2000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>

<style>
.main {
  margin: 0 auto;
  max-width: 900px;
}
</style>
