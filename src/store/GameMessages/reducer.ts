import { GameMessage, GameMessagesActionTypes, ADD_GAME_MESSAGE } from './types'

const initialState: GameMessage[] = []

export function GameMessagesReducer(
  state = initialState,
  action: GameMessagesActionTypes,
): GameMessage[] {
  switch (action.type) {
    case ADD_GAME_MESSAGE:
      return state.concat(action.payload)
    default:
      return state
  }
}
