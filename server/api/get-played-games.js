const USERNAME = process.env.CHESS_USERNAME || 'luffyyyyyyyy';

async function processGameData(playedGames, username) {
  // Insert players
  const allPlayers = [];

  for (const game of playedGames) {
    allPlayers.push(username);
    allPlayers.push(getOpponentName(game, username));
  }

  await insertPlayers(allPlayers);

  // Insert games
  for (const game of playedGames) {
    const opponentName = getOpponentName(game, username);
    const playedAs = getPlayedAs(game, username);
    const gameResult = getGameResult(game, username);

    const playerId = await getPlayerId(username);
    const opponentId = await getPlayerId(opponentName);

    await insertGame(game, playerId, opponentId, playedAs, gameResult);
  }

  // Insert moves
  let allMoves = [];

  for (const game of playedGames) {
    const gameId = await getGameId(game);
    const moves = getMovesFromPgn(game.pgn);

    for (const moveSet of moves) {
      for (const move of moveSet) {
        const moveNumber = move.moveNumber;
        const notation = move.notation.notation;

        allMoves.push({
          game_id: gameId,
          move_number: moveNumber,
          move_notation: notation,
          move_comment: null,
          move_turn: 'w'
        });
      }
    }
  }

  await insertMoves(allMoves);
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
