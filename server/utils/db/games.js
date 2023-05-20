import { sql } from '@vercel/postgres';

export async function insertGame(game, playerId, opponentId, playedAs, gameResult) {
  try {
    await sql`
      INSERT INTO games (player_id, opponent_id, repertoire_id, game_link, played_as, result, pgn)
      VALUES (${playerId}, ${opponentId}, null, ${game.url}, ${playedAs}, ${gameResult}, ${game.pgn})
    `;
  } catch (error) {
    console.error('Failed to insert game:', error);
    throw error;
  }
}

export async function getGameId(game) {
  try {
    const result = await sql`
      SELECT id FROM games WHERE game_link = ${game.url};
    `;
    return result.rows[0].id;
  } catch (error) {
    console.error(`Failed to get game id for: ${game}`, error);
    throw error;
  }
}