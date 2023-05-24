// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function fixMoveTurn() {
//   // Get all games
//   const games = await prisma.games.findMany({
//     include: {
//       moves: {
//         orderBy: { id: 'asc' } // Order moves by move_number
//       }
//     }
//   });

//   // Iterate through each game
//   for (const game of games) {
//     let playedAs = game.played_as;

//     console.log(`Processing game_id: ${game.id}`);

//     // Iterate through each move in the current game
//     for (const move of game.moves) {
//       // Update move_turn based on the player's turn

//       try {
//         // Update the move in the database
//         await prisma.moves.update({
//           where: { id: move.id },
//           data: { move_turn: playedAs }
//         });

//         console.log(`Updated move_id: ${move.id} in game_id: ${game.id} with new move_turn: ${playedAs}`);
//       } catch (error) {
//         console.error(`Error updating move_id: ${move.id} in game_id: ${game.id}. Error: ${error.message}`);
//       }

//       // Switch turns
//       if (playedAs === 'w') {
//         playedAs = 'b';
//       } else {
//         playedAs = 'w';
//       }
//     }
//   }
// }

// fixMoveTurn().catch(e => {
//   console.error(`An error occurred during the process: ${e.message}`);
//   process.exit(1);
// }).finally(async () => {
//   await prisma.$disconnect();
// });
