import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function insertMoves(allMoves) {
  await prisma.$transaction(
    allMoves.map(move => {
      return prisma.moves.create({ data: move })
    })
  )
}