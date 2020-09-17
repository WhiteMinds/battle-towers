import { Player } from './entity'
import { Buff } from './buff'

export interface EntityBattleState {
  buffs: Buff[]
}

export type BattlingPlayer = Player & EntityBattleState
