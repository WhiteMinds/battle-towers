import { AccountActionTypes, OP_GOLD, ADD_ITEM, SET_BATTLING } from './types'
import { ItemId } from '@/models/item'

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

export function addItem(itemId: ItemId): AccountActionTypes {
  return {
    type: ADD_ITEM,
    payload: itemId,
  }
}

export function setBattling(payload: boolean): AccountActionTypes {
  return {
    type: SET_BATTLING,
    payload,
  }
}
