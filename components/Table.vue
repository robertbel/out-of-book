<template>
  <div class="games">
    <div v-for="game in games" :key="game.id" class="game">
      <NuxtLink :to="`/repertoire/${game.id}`" @click.native="active = game.id;">
        <TheChessboard class="beebee" :class="{ active: active === game.id }" :board-config="{ ...boardConfig, orientation: game?.orientation }" @board-created="(api) => (loadPgn(api, game?.game_data.pgn, game?.game_id))" />
      </NuxtLink>
      <div class="pgn">
        <p>
          <NuxtLink :to="`/repertoire/${game.id}`" @click.native="active = game.id">Id: {{ game?.game_id }}</NuxtLink>
        </p>
        <p>Color: {{ game?.orientation }}</p>
        <pre>{{ game?.game_data.pgn }}</pre>
        <!-- <pre>{{ notations[game?.game_id] }}</pre> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { parse } from '@mliebelt/pgn-parser';
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const active = useState();

const props = defineProps({
  games: {
    type: Array,
    required: true,
  }
})

const boardConfig = {
  coordinates: true,
};

const parsedGames = ref({});

const notations = computed(() => {
  const notations = {};
  for (const game in parsedGames.value) {
    notations[game] = parsedGames.value[game].moves.map(move => move.notation.notation);
  }
  return notations;
});

const loadPgn = (api, pgn, gameId) => {
  api.loadPgn(pgn);
  const game = parse(pgn, { startRule: "game" });
  parsedGames.value[gameId] = game;
};
</script>

<style scoped>
.beebee.active {
  view-transition-name: selected-board;
  contain: layout;
}

.game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-block-end: 2rem;
}

.main-wrap {
  width: 100%;
  /* page-transition-tag: chess-game;
  contain: paint; */
  /* view-transition-name: selected-game;
  contain: layout; */
}

/* .main-wrap.active {
  view-transition-name: selected-film;
  contain: layout;
} */

.image {
  width: 200px;
}

.image img {
  width: 100%;
}

.pgn pre {
  white-space: pre-wrap;
  font-size: 0.75rem;
}

/* @keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes slide-from-right {
  from {
    transform: translateX(30px);
  }
}

@keyframes slide-to-left {
  to {
    transform: translateX(-30px);
  }
}

::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
} */
</style>
