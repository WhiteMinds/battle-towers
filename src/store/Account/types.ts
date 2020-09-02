import { Player } from '@/models/entity'
import { ItemId } from '@/models/item'

export interface Account {
  player: Player
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

export type AccountActionTypes = OPGoldAction
