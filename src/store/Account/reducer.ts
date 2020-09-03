import { Account, AccountActionTypes, OP_GOLD, ADD_ITEM } from './types'
import { createPlayer } from '@/models/entity'

const initialState: Account = {
  player: createPlayer({
    name: 'WhiteMind',
    health: 10,
    currentHealth: 10,
    attack: 2,
  }),
  gold: 0,
  inventory: [],
}

export function AccountReducer(
  state = initialState,
  action: AccountActionTypes,
) {
  switch (action.type) {
    case OP_GOLD:
      return {
        ...state,
        gold: state.gold + action.payload,
      }
    case ADD_ITEM:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      }
    default:
      return state
  }
}
