import { GameDataActionTypes, CREATE_ITEM } from './types'
import { ItemData$Stored } from '@/models/item'

export function createStoredItem(
  itemData: ItemData$Stored,
): GameDataActionTypes {
  return {
    type: CREATE_ITEM,
    payload: itemData,
  }
}
