import { GameData, GameDataActionTypes, CREATE_ITEM } from './types'

const initialState: GameData = {
  nextItemId: 1,
  items: [],
}

export function AccountReducer(
  state = initialState,
  action: GameDataActionTypes,
) {
  switch (action.type) {
    case CREATE_ITEM:
      const newItem = {
        ...action.payload,
        id: state.nextItemId,
      }

      return {
        ...state,
        nextItemId: state.nextItemId + 1,
        items: [...state.items, newItem],
      }

    default:
      return state
  }
}
