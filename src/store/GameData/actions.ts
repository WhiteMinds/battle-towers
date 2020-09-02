import { GameDataActionTypes, CREATE_ITEM } from './types'
import { ItemData } from '@/models/item'

export function createItem(itemData: ItemData): GameDataActionTypes {
  return {
    type: CREATE_ITEM,
    payload: itemData,
  }
}
