import { sql } from '@vercel/postgres';

export async function insertGame(game, playerId, opponentId, playedAs, gameResult) {
  try {
    await sql`
      INSERT INTO games (player_id, opponent_id, repertoire_id, game_link, played_as, result)
      VALUES (${playerId}, ${opponentId}, null, ${game.url}, ${playedAs}, ${gameResult})
    `;
  } catch (error) {
    console.error('Failed to insert game:', error);
    throw error;
  }
}