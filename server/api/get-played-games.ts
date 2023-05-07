import axios from 'axios';
import { createPool, sql } from '@vercel/postgres';

async function seed() {
  const db = createPool();

  // Drop the existing table if it exists
  await sql`
    DROP TABLE IF EXISTS chess_games;
  `;

  // Create the table with the correct structure
  const createTable = await sql`
    CREATE TABLE chess_games (
      id SERIAL PRIMARY KEY,
      game_data JSONB NOT NULL
    );
  `;

  console.log(`Created "chess_games" table`);
  return createTable;
}


async function storeGameData(gameData) {
  try {
    const db = createPool();
    const games = gameData.games;

    for (const game of games) {
      const jsonData = JSON.stringify(game);
      console.log(jsonData);
      await sql`
        INSERT INTO chess_games (game_data)
        VALUES (${jsonData});
      `;
    }

    console.log('Game data stored successfully');
  } catch (error) {
    console.error('Error storing game data:', error);
  }
}


export default defineEventHandler(async () => {
  const startTime = Date.now();
  const db = createPool();

  try {
    // Ensure the table exists before fetching and storing data
    await seed();

    const response = await axios.get('https://api.chess.com/pub/player/luffyyyyyyyy/games/2023/05');
    const data = response.data;

    if (data) {
      await storeGameData(data);
    }

    const duration = Date.now() - startTime;
    return {
      data: data,
      duration: duration
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});

