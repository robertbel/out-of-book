import { getGames } from '../../data/games'

export default defineEventHandler(async () => {
  return await getGames()
})