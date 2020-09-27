import { Entity$Player } from '@/models/entity'
import { ItemId } from '@/models/item'

export interface Account {
  player: Entity$Player
  gold: number
  inventory: ItemId[]

  // TODO: 在启动时检查这个状态，如果为 true，尝试清理 gameMsgs 里未正常结束的战斗的日志
  inBattling: boolean
}

// Actions
// =============================================================================

export const OP_GOLD = 'OP_GOLD'

export interface OPGoldAction {
  type: typeof OP_GOLD
  payload: number
}

export const ADD_EXP = 'ADD_EXP'

export interface AddEXPAction {
  type: typeof ADD_EXP
  payload: number
}

export const ADD_ITEM = 'ADD_ITEM'

export interface AddItemAction {
  type: typeof ADD_ITEM
  payload: ItemId
}

export const SET_BATTLING = 'SET_BATTLING'

export interface SetBattlingAction {
  type: typeof SET_BATTLING
  payload: boolean
}

export type AccountActionTypes =
  | OPGoldAction
  | AddEXPAction
  | AddItemAction
  | SetBattlingAction
