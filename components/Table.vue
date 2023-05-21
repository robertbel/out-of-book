<template>
  <div class="games">
    <div v-for="game in games" :key="game.id" class="game">
      <client-only>
        <NuxtLink :to="`/repertoire/${game.id}`" @click.native="active = game.id">
          <TheChessboard class="beebee" :class="{ active: active === game.id }" :board-config="{ ...boardConfig, orientation: game?.played_as === 'w' ? 'white' : 'black' }" @board-created="(api) => (loadPgn(api, game?.pgn, game?.game_id))" />
        </NuxtLink>
      </client-only>
      <div class="pgn">
        <div>
          <NuxtLink :to="`/repertoire/${game.id}`" @click.native="active = game.id">{{ game?.id }}</NuxtLink>
        </div>
        <div>{{ game }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

const active = useState();
console.log(useState('active'));

const props = defineProps({
  games: {
    type: Array,
    required: true,
  }
})

const boardConfig = {
  coordinates: true,
};

const loadPgn = (api, pgn, gameId) => {
  api.loadPgn(pgn);
  active.value = gameId; // Assuming you want to mark this game as active
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
}

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
</style>
