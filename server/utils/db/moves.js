import { sql } from '@vercel/postgres';

export async function insertMove(gameId, moveNumber, notation) {
  try {
    await sql`
          INSERT INTO moves (game_id, repertoire_id, move_number, move_notation, move_comment, move_turn)
          VALUES (${gameId}, null, ${moveNumber}, ${notation}, null, 'w');
      `;
  } catch (error) {
    console.error(`Failed to insert move: ${moveNumber}`, error);
  }
}