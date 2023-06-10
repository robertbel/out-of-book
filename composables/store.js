export const useStore = () =>
  useState("store", () => ({
    games: [],
  }));

export function fetchGames() {
  const state = useStore();

  return loadReactiveState(
    () => (state.value.games.length ? state.value.games : undefined),
    (games) => {
      state.value.games = games;
    },
    () => $fetch("/api/games")
  );
}

export function fetchGame(id) {
  const state = useStore();

  return loadReactiveState(
    () => state.value.games.find((game) => game.id === id),
    (game) => {
      const gameIndex = state.value.games.findIndex((game) => game.id === id);
      state.value.games[gameIndex] = game;
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
