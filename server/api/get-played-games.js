const USERNAME = process.env.CHESS_USERNAME || 'luffyyyyyyyy';

async function processGameData(playedGames, username) {
  const players = [];

  for (const game of playedGames) {
    players.push(username);
    players.push(getOpponentName(game, username));
  }

  await insertPlayers(players);

  for (const game of playedGames) {
    const opponentName = getOpponentName(game, username);
    const playedAs = getPlayedAs(game, username);
    const gameResult = getGameResult(game, username);

    const playerId = await getPlayerId(username);
    const opponentId = await getPlayerId(opponentName);

    await insertGame(game, playerId, opponentId, playedAs, gameResult);
  }
}

export default defineEventHandler(async () => {
  try {
    const { currentYear, currentMonth } = getCurrentYearMonth();
    const fetchedGamesData = await fetchGames(USERNAME, currentYear, currentMonth);
    const playedGames = fetchedGamesData.games;

    if (playedGames) {
      await processGameData(playedGames, USERNAME);
    }

    return {
      playedGames
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});
