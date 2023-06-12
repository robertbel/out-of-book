<template>
  <div class="games">
    <div v-for="(game, index) in games" :key="index">
      <div v-if="game.deviation" class="game">
        <client-only>
          <NuxtLink
            :to="`/repertoire/${game.id}`"
            @click.native="active = game.id"
          >
            <TheChessboard
              class="beebee"
              :class="{ active: active === game.id }"
              :board-config="{
                ...boardConfig,
                orientation: game?.played_as === 'w' ? 'white' : 'black',
              }"
              @board-created="
                (api) => loadFen(api, game?.deviation.fen_notation, game?.pgn)
              "
            />
          </NuxtLink>
          <template #placeholder>
            <ChessboardLoader />
          </template>
        </client-only>
        <div class="pgn">
          <div>
            ID:
            <NuxtLink
              :to="`/repertoire/${game.id}`"
              @click.native="active = game.id"
              >{{ game?.id }}</NuxtLink
            >
          </div>
          <div v-if="game.deviation">
            Deviation in
            <strong>{{ game.repertoires?.repertoire_name }}</strong> repertoir
            on move <strong>{{ game.deviation }}</strong>
          </div>
          <pre>{{ history[index] }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css";

const active = useState();

const props = defineProps({
  games: {
    type: Array,
    required: true,
  },
});

const history = ref([]);

const boardConfig = {
  coordinates: true,
  viewOnly: true,
  animation: {
    enabled: false,
  },
};

const loadFen = (api, fen, pgn) => {
  api.loadPgn(pgn);
  history.value.push(api.getHistory({ verbose: true }));
  api.setPosition(fen); //Position of deviation
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
