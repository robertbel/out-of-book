import { createPool } from '@vercel/postgres';

export default defineEventHandler(async () => {
  const db = createPool();
  try {
    const { rows: chessLines } = await db.query('SELECT chess_lines.id, chess_lines.line_name, chess_lines.pgn, chess_openings.opening_name FROM chess_lines JOIN chess_openings ON chess_lines.opening_id = chess_openings.id');
    return {
      chessLines: chessLines,
    };
  } catch (error) {
    throw error;
  }
});
