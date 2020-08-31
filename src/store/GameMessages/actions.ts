import { GameMessage, GameMessagesActionTypes, ADD_GAME_MESSAGE } from './types'

export function addGameMessage(
  newMessage: GameMessage,
): GameMessagesActionTypes {
  return {
    type: ADD_GAME_MESSAGE,
    payload: newMessage,
  }
}
