<script setup>
definePageMeta({
  middleware: (from) => {
    if (from.path === "/") {
      return navigateTo("/games");
    }
  },
});
</script>

<template>
  <div>Index</div>
</template>
