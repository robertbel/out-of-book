import prisma from './prisma'

export async function getGames() {
  const games = await prisma.games.findMany()
  return games
}