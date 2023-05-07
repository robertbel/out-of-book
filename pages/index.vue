<template>
  <main class="main">
    <Table :games="data?.chessGames" :lines="lala?.chessLines" />
  </main>
</template>

<script setup>
const { data: gamesRes } = useFetch('/api/get-games')
const { data: openingsRes } = useFetch('/api/get-openings')

const data = gamesRes || {}
const lala = openingsRes || {}
</script>

<style>
.main {
  margin: 0 auto;
  max-width: 900px;
}
</style>