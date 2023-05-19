import { sql } from '@vercel/postgres';

export async function insertPlayers(players) {
  const uniquePlayers = [...new Set(players)];

  for (const player of uniquePlayers) {
    try {
      await sql`
          INSERT INTO players (username)
          VALUES (${player})
          ON CONFLICT (username) DO NOTHING;
      `;
    } catch (error) {
      console.error(`Failed to insert player: ${player}`, error);
    }
  }
}

export async function getPlayerId(username) {
  try {
    const result = await sql`
      SELECT id FROM players WHERE username = ${username};
    `;
    return result.rows[0].id;
  } catch (error) {
    console.error(`Failed to get player id for username: ${username}`, error);
    throw error;
  }
}
