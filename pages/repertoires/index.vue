<script setup>
const { data: repertoires } = await useFetch('/api/repertoires')
</script>

<template>
  <div class="page-title">
    <h1>Repertoires</h1>
  </div>
  <div>
    <NuxtLink class="button-link" to="/repertoires/add">Add repertoire</NuxtLink>
  </div>
  <div class="repertoires">
    <div class="repertoire-item" v-for="rep in repertoires" :key="rep.id">
      <NuxtLink :to="`/repertoires/${rep.id}`">{{ rep.repertoire_name }}</NuxtLink>
    </div>
  </div>
</template>

<style scoped>

.repertoires {
  margin-block-start: 2rem;
}
.repertoire-item {
  padding-block: 0.5rem;
  border-block-end: 1px solid #393939;
}

.repertoire-item a {
  color: lightblue;
  text-decoration: none;

}
</style>
