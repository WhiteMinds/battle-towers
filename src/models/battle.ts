import { Entity, Entity$Player, Entity$Monster } from './entity'
import { Buff } from './buff'

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
