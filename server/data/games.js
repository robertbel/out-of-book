import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getGames() {
  const games = await prisma.games.findMany({
    include: {
      repertoires: true, // Include repertoire data
      moves: true, // Include game moves
    }
  });

  for (let game of games) {
    if (game.repertoires) {
      // Fetch repertoire moves
      const repertoireMoves = await prisma.moves.findMany({
        where: { repertoire_id: game.repertoires.id },
        orderBy: { move_number: 'asc' },
      });

      // Compare game and repertoire moves
      game.deviation = findDeviation(game.moves, repertoireMoves);
    }
  }

  return games;
}

function findDeviation(gameMoves, repertoireMoves) {
  // Iterating over the game moves
  for (let i = 0; i < gameMoves.length; i++) {
    // If the game move doesn't match the repertoire move, we've found the deviation
    if (gameMoves[i].move_notation !== repertoireMoves[i]?.move_notation) {
      return gameMoves[i]; // Return the game move object
    }
  }

  // If all the game moves match the repertoire moves, there was no deviation
  return null;
}

export async function getGame(id) {
  const game = await prisma.games.findUnique({
    where: {
      id: parseInt(id),
    }
  })
  return game
}