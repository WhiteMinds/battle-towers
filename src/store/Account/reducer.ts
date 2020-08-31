import { Account, AccountActionTypes, OP_GOLD } from './types'

const initialState: Account = {
  player: {
    name: 'WhiteMind',
    health: 10,
    currentHealth: 10,
    attack: 2,
  },
  gold: 0,
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
    default:
      return state
  }
}
