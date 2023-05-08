import axios from 'axios';
import { sql } from '@vercel/postgres';

async function storeGameData(gameData) {
  try {
    const games = gameData.games;

    for (const game of games) {
      const gameId = game.uuid;
      const jsonData = JSON.stringify(game);

      await sql`
        INSERT INTO chess_games (game_id, game_data)
        VALUES (${gameId}, ${jsonData})
        ON CONFLICT (game_id) DO NOTHING;
      `;
    }

    console.log('Game data stored successfully');
  } catch (error) {
    console.error('Error storing game data:', error);
  }
}

export default defineEventHandler(async () => {
  console.log('Cron job triggered');

  const username = 'luffyyyyyyyy';
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const url = `https://api.chess.com/pub/player/${username}/games/${currentYear}/${currentMonth}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data) {
      await storeGameData(data);
    }

    return {
      data
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
