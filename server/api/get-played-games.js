import axios from 'axios';
import { sql } from '@vercel/postgres';

const CHESS_API_BASE = 'https://api.chess.com/pub';
const USERNAME = process.env.CHESS_USERNAME || 'luffyyyyyyyy'; // Fallback to 'luffyyyyyyyy' if not set in environment

function determineOrientation(game, username) {
  if (game.white.username.toLowerCase() === username.toLowerCase()) {
    return "white";
  } else if (game.black.username.toLowerCase() === username.toLowerCase()) {
    return "black";
  }

  console.log(`Unable to determine orientation for game: ${game.uuid}`);
  return null;
}

async function insertGame(game, username) {
  const gameId = game.uuid;
  const jsonData = JSON.stringify(game);
  const orientation = determineOrientation(game, username);

  if (orientation) {
    await sql`
      INSERT INTO chess_games (game_id, game_data, orientation)
      VALUES (${gameId}, ${jsonData}, ${orientation})
      ON CONFLICT (game_id) DO NOTHING;
    `;
  }
}

async function storeGameData(gameData, username) {
  try {
    const games = gameData.games;
    for (const game of games) {
      await insertGame(game, username);
    }
    console.log('Game data stored successfully');
  } catch (error) {
    console.error('Error storing game data:', error);
  }
}

export default defineEventHandler(async () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const url = `${CHESS_API_BASE}/player/${USERNAME}/games/${currentYear}/${currentMonth}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data) {
      await storeGameData(data, USERNAME);
    }

    return {
      data
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
