<template>
  <main class="main">
    <div class="actions">
      <button @click="fetchData" :disabled="isLoading">Fetch Data</button>
      <span v-if="isFetching">Getting new games ...</span>
    </div>
    <Table :games="gamesData.chessGames" :lines="openingsData.chessLines" />
    <span v-if="isLoading">Loading games ...</span>
  </main>
</template>

<script setup>
const { data: openingsData } = useFetch('/api/get-openings');

const gamesData = ref({ chessGames: [] });
const isFetching = ref(false);
const isLoading = ref(false);

const getGames = async () => {
  isLoading.value = true;
  const result = await fetch('/api/get-games');
  const newData = await result.json();
  gamesData.value = newData;
  isLoading.value = false;
}

const fetchData = async () => {
  isFetching.value = true;
  await fetch('/api/get-played-games');
  await getGames();
  isFetching.value = false;
}

onMounted(() => {
  // Initial data fetch
  getGames();
});

</script>



<style>
.main {
  margin: 0 auto;
  max-width: 900px;
}
</style>
