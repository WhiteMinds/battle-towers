import { GameData, GameDataActionTypes, CREATE_ITEM } from './types'

const initialState: GameData = {
  itemMap: {},
}

export function GameDataReducer(
  state = initialState,
  action: GameDataActionTypes,
) {
  switch (action.type) {
    case CREATE_ITEM:
      const newItem = action.payload
      return {
        ...state,
        itemMap: {
          ...state.itemMap,
          [newItem.id]: newItem,
        },
      }

    default:
      return state
  }
}
