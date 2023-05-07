<template>
  <main>
    <Table :games="data?.chessGames" :lines="lala?.chessLines" />
  </main>
</template>

<script setup>
const { data: gamesRes } = useFetch('/api/get-games')
const { data: openingsRes } = useFetch('/api/get-openings')

const data = gamesRes || {}
const lala = openingsRes || {}
</script>
