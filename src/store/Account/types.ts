import { Entity } from '@/models/entity'

export interface Account {
  player: Entity
  gold: number
}

// Actions
// =============================================================================

export const OP_GOLD = 'OP_GOLD'

export interface OPGoldAction {
  type: typeof OP_GOLD
  payload: number
}

export type AccountActionTypes = OPGoldAction
