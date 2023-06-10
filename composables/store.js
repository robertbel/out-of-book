export const useStore = () =>
  useState("store", () => ({
    games: {},
  }));

export function fetchGames() {
  const state = useStore();

  return loadReactiveState(
    () =>
      Object.keys(state.value.games).length
        ? Object.values(state.value.games)
        : undefined,
    (games) => {
      games.filter(Boolean).forEach((game) => {
        if (state.value.games[game.id]) {
          Object.assign(state.value.games[game.id], game);
        } else {
          state.value.games[game.id] = game;
        }
      });
    },
    () => $fetch("/api/games")
  );
}

export function fetchGame(id) {
  const state = useStore();

  return loadReactiveState(
    () => state.value.games[id],
    (game) => {
      state.value.games[id] = game;
    },
    () => $fetch(`/api/games/${id}`)
  );
}

export async function loadReactiveState(getter, setter, fetcher, initialData) {
  const reactiveData = computed({
    get: getter,
    set: setter,
  });

  const isFetching = ref(false);

  if (reactiveData.value == null) {
    if (initialData != null) {
      reactiveData.value = initialData;
    }

    const fetchData = async () => {
      try {
        isFetching.value = true;
        const fetchedData = await fetcher();
        if (reactiveData.value != null) {
          reactiveData.value = Object.assign(reactiveData.value, fetchedData);
        } else {
          reactiveData.value = fetchedData;
        }
      } catch (e) {
        console.error(e);
        reactiveData.value = undefined;
      } finally {
        isFetching.value = false;
      }
    };

    if (process.client) {
      fetchData();
    } else {
      await fetchData();
    }
  }

  return reactive({
    isLoading: isFetching,
    data: reactiveData,
  });
}
