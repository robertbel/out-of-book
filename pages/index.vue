<template>
  <main class="main">
    <button @click="fetchData">Fetch Data</button>
    <Table :games="gamesData.chessGames" :lines="openingsData.chessLines" />
  </main>
</template>

<script setup>
const { data: openingsData } = useFetch('/api/get-openings');

const gamesData = ref({ chessGames: [] });

const getGames = async () => {
  console.log('Called!');
  const result = await fetch('/api/get-games');
  const newData = await result.json();
  gamesData.value = newData;
}

const fetchData = async () => {
  const result = await fetch('/api/get-played-games');
  const newData = await result.json();
  // Do something with newData if needed
  await getGames();
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
