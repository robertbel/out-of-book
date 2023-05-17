export const useGames = () => {
  const games = useState('games', () => [])
  const isLoading = useState('isLoading', () => false)
  const isFetching = useState('isFetching', () => false)

  const getGames = async () => {
    isLoading.value = true
    const { data } = await useFetch('/api/get-games')
    games.value = data
    isLoading.value = false
  }

  const fetchData = async () => {
    isFetching.value = true
    await useFetch('/api/get-played-games')
    await getGames()
    isFetching.value = false
  }

  return { games, isLoading, isFetching, getGames, fetchData }
}
