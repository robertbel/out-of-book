import { getGame } from '../../data/games'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const game = await getGame(id);

  if (!game) {
    const notFoundError = createError({
      statusCode: 404,
      statusMessage: 'Game not found ',
    })
    sendError(event, notFoundError)
  }

  return game
})