<template>
  <div class="games">
    <div v-for="game in games" :key="game.id">
      <div v-if="game.deviation" class="game">
        <client-only>
          <NuxtLink :to="`/repertoire/${game.id}`" @click.native="active = game.id">
            <TheChessboard class="beebee" :class="{ active: active === game.id }" :board-config="{ ...boardConfig, orientation: game?.played_as === 'w' ? 'white' : 'black' }" @board-created="(api) => (loadFen(api, game?.deviation.fen_notation))" />
          </NuxtLink>
          <template #placeholder>
            <ChessboardLoader />
          </template>
        </client-only>
        <div class="pgn">
          <div>
            ID: <NuxtLink :to="`/repertoire/${game.id}`" @click.native="active = game.id">{{ game?.id }}</NuxtLink>
          </div>
          <div v-if="game.deviation">Deviation in <strong>{{ game.repertoires?.repertoire_name }}</strong> repertoir on move <strong>{{ game.deviation }}</strong></div>
          <!-- <pre>{{ game }}</pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  viewOnly: true,
  animation: {
    enabled: false
  }
};

const loadFen = (api, fen) => {
  console.log(api.getLastMove());
  api.setPosition(fen);
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
  font-size: 0.5625rem;
}
</style>
