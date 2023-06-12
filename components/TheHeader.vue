<template>
  <header class="header">
    <nav class="navigation">
      <NuxtLink class="navigation-item" to="/games">Games</NuxtLink>
      <NuxtLink class="navigation-item" to="/repertoires">Repertoires</NuxtLink>
      <NuxtLink class="navigation-item" to="/study">Study</NuxtLink>
    </nav>
    <div class="user">
      <div class="user-avatar"></div>
      <div class="user-name">Luffyyyyyyyy</div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding-inline: 4rem;
  padding-block: 2rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #393939;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.navigation-item {
  text-decoration: none;
  font-size: 0.8125rem;
  line-height: 1;
  color: var(--font-color);
  text-transform: uppercase;
  letter-spacing: 0.3rem;
}

.user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  background-color: var(--font-color);
  width: 1.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
}
.user-name {
  line-height: 1;
}
</style>
