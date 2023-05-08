<template>
  <main class="main">
    <Table :games="data?.chessGames" :lines="lala?.chessLines" />
  </main>
</template>

<script setup>
const { data: gamesRes } = useFetch('/api/get-games');
const { data: openingsRes } = useFetch('/api/get-openings')

const data = gamesRes || {};
const lala = openingsRes || {}

const getGames = async () => {
  console.log('Called!');
  const result = await fetch('/api/get-games');
  const newData = await result.json();
  data.chessGames = newData.chessGames;
}

onMounted(() => {
  watchEffect(async () => {
    const intervalId = setInterval(() => {
      getGames();
    }, 2000);

    onUnmounted(() => {
      clearInterval(intervalId);
    });
  });
});
</script>


<style>
.main {
  margin: 0 auto;
  max-width: 900px;
}
</style>
