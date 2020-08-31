import { AccountActionTypes, OP_GOLD } from './types'

export function incrementGold(amount: number): AccountActionTypes {
  return {
    type: OP_GOLD,
    payload: amount,
  }
}

export function decrementGold(amount: number): AccountActionTypes {
  return {
    type: OP_GOLD,
    payload: -amount,
  }
}
