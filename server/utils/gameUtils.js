function getPlayerColor(game, myUsername) {
  const myUsernameLower = myUsername.toLowerCase();

  if (game.white.username.toLowerCase() === myUsernameLower) {
    return 'white';
  } else if (game.black.username.toLowerCase() === myUsernameLower) {
    return 'black';
  } else {
    return null;
  }
}

export function getOpponentName(game, myUsername) {
  const playerColor = getPlayerColor(game, myUsername);

  if (playerColor) {
    return game[playerColor === 'white' ? 'black' : 'white'].username;
  } else {
    throw new Error(`Username ${myUsername} does not match any player in the game.`);
  }
}

export function getPlayedAs(game, myUsername) {
  const playerColor = getPlayerColor(game, myUsername);

  if (playerColor) {
    return playerColor[0]; // return 'w' for 'white' and 'b' for 'black'
  }
  console.log(`Unable to determine orientation for game: ${game.uuid}`);
  return null;
}

export function getGameResult(game, myUsername) {
  const playerColor = getPlayerColor(game, myUsername);

  if (playerColor) {
    return game[playerColor].result;
  }
  console.log(`Username ${myUsername} not found in game data`);
  return null;
}

