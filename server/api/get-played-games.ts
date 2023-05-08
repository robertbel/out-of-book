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
  const startTime = Date.now();

  try {
    const response = await axios.get('https://api.chess.com/pub/player/luffyyyyyyyy/games/2023/05');
    const data = response.data;

    if (data) {
      await storeGameData(data);
    }

    const duration = Date.now() - startTime; // ????
    return {
      data: data,
      duration: duration
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});

