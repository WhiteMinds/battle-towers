/**
 * Buff 仅用于战斗中，如果要实现常驻的 1小时内战斗经验值提升 50% 之类的道具效果，可以后续实现
 * 一个 Effect 模型，生命周期与 Buff 不同，比如 onBattleStart(entity: BattlingPlayer)
 */
import { EntityId } from './entity'

export interface Buff {
  templateId: number
  sourceId: EntityId
  name: string
  level: number
  // 堆叠的层数
  stack: number
}
