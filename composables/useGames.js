export const useGames = () => {
  const games = useState('games', () => [])
  const isLoading = useState('isLoading', () => false)
  const isFetching = useState('isFetching', () => false)

  const getGames = async () => {
    isLoading.value = true
    const result = await fetch('/api/get-games')
    const newData = await result.json()
    games.value = newData
    isLoading.value = false
  }

  const fetchData = async () => {
    isFetching.value = true
    await fetch('/api/get-played-games')
    await getGames()
    isFetching.value = false
  }

  return { games, isLoading, isFetching, getGames, fetchData }
}
