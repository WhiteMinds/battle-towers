import { Entity$Player } from '@/models/entity'
import { ItemId } from '@/models/item'

export interface Account {
  player: Entity$Player
  gold: number
  inventory: ItemId[]
}

// Actions
// =============================================================================

export const OP_GOLD = 'OP_GOLD'

export interface OPGoldAction {
  type: typeof OP_GOLD
  payload: number
}

export const ADD_ITEM = 'ADD_ITEM'

export interface AddItemAction {
  type: typeof ADD_ITEM
  payload: ItemId
}

export type AccountActionTypes = OPGoldAction | AddItemAction
