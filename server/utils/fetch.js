import axios from 'axios';

const CHESS_API_BASE = 'https://api.chess.com/pub';

export async function fetchGames(username, year, month) {
  try {
    const url = `${CHESS_API_BASE}/player/${username}/games/${year}/${month}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch games, status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error in fetchGames:', error);
    throw error;
  }
}