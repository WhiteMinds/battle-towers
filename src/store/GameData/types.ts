import { ItemData, ItemId } from '@/models/item'

export interface GameData {
  nextItemId: ItemId
  items: ItemData[]
}

// Actions
// =============================================================================

export const CREATE_ITEM = 'CREATE_ITEM'

export interface CreateItemAction {
  type: typeof CREATE_ITEM
  payload: ItemData
}

export type GameDataActionTypes = CreateItemAction
