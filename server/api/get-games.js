import { sql } from '@vercel/postgres';

export default defineEventHandler(async () => {
  try {
    const result = await sql`
      SELECT * FROM chess_games ORDER BY id DESC;
    `;

    return result.rows;
  } catch (error) {
    throw error;
  }
});
