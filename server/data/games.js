import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getGames() {
  const games = await prisma.games.findMany()
  return games
}