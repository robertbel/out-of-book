import { createPool } from '@vercel/postgres';

export default defineEventHandler(async () => {
  const db = createPool();
  try {
    const { rows: chessGames } = await db.query('SELECT * FROM chess_games ORDER BY id DESC');
    return {
      chessGames: chessGames,
    };
  } catch (error) {
    throw error;
  }
});
