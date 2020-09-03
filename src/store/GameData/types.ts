import { ItemId, ItemData$Stored } from '@/models/item'

export interface GameData {
  itemMap: Record<ItemId, ItemData$Stored>
}

// Actions
// =============================================================================

export const CREATE_ITEM = 'CREATE_ITEM'

export interface CreateItemAction {
  type: typeof CREATE_ITEM
  payload: ItemData$Stored
}

export type GameDataActionTypes = CreateItemAction
