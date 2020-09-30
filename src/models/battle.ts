import { Entity, Entity$Player, Entity$Monster } from './entity'
import { Buff } from './buff'
import { Loot } from './loot'
import { GameMessage, CombatResult } from '@/store/GameMessages/types'

export interface EntityBattleState {
  hasBattleState: true
  buffs: Buff[]
}

export type BattlingPlayer = Entity$Player & EntityBattleState
export type BattlingMonster = Entity$Monster & EntityBattleState

export function isBattlingEntity<T extends Entity>(
  entity: T,
): entity is T & EntityBattleState {
  return 'hasBattleState' in entity && (entity as any).hasBattleState
}

export function transToBattlingEntity<T extends Entity>(
  entity: T,
): T & EntityBattleState {
  return {
    ...entity,
    hasBattleState: true,
    buffs: [],
  }
}

// 用于完整的描述一场战斗目前的状态
export interface CombatInfo {
  player: BattlingPlayer
  monster: BattlingMonster
  combatMsgs: GameMessage[]
  result?: CombatResult
  loots?: Loot[]
}
