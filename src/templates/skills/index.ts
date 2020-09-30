/**
 * 分几个生命周期，大部分时候都是为被动技能服务的：
 *
 * Learned 主要是为被动技能提供的，比如永久提升某些属性，就是发生在这个阶段
 *
 * StartCombat
 * EndCombat
 *
 * BeforeAttack
 * Attack 主动技能一般都拥有这个阶段
 * AfterAttack
 *
 * BeforeUnderAttack 防御反击发生在这个阶段，返回一些数据来告知 attack 中断（或许应该发生
 *                   在 UnderAttack 阶段？）
 * UnderAttack
 * AfterUnderAttack
 *
 * 主动技能有 use 函数，签名大概是这样 use(combatInfo, source, target?): combatInfo
 *
 * 导出一个接口 useSkill(combatInfo, skillData, source, target?): combatInfo
 */

import { SkillData, Skill } from '@/models/skill'
import { CombatInfo } from '@/models/battle'
import { EntityId } from '@/models/entity'
import { memoize } from 'lodash'
import { NormalAttack } from './active/attack'
import { Thump } from './active/thump'
import { Cure } from './active/cure'

export const SkillTemplateMap = createSkillTemplateMap({
  NormalAttack,
  Thump,
  Cure,
})
export const SkillTemplates = Object.values(SkillTemplateMap)

function _transferSkillData(data: SkillData): Skill {
  const template = findTemplate(data)

  if (!template) {
    throw new Error('Incorrect skill data: ' + JSON.stringify(data))
  }

  return template.generator(data)
}
export const transferSkillData = memoize(_transferSkillData)

export function useSkill(
  data: SkillData,
  combatInfo: CombatInfo,
  sourceId: EntityId,
  targetId?: EntityId,
): CombatInfo {
  const template = findTemplate(data)

  if (!template) {
    // TODO: 可以用 assert 之类的来做这个判断
    throw new Error('Incorrect skill data: ' + JSON.stringify(data))
  }

  return (
    template.lifeCycle.onUse?.(
      transferSkillData(data),
      combatInfo,
      sourceId,
      targetId,
    ) || combatInfo
  )
}

function findTemplate(data: SkillData): SkillTemplate | undefined {
  return SkillTemplates.find((template) => template.id === data.templateId)
}

// types
// =============================================================================

/**
 * 该函数的作用是让类型范围缩小，使得创建后的 ItemTemplateMap 可以有更具体的 key
 */
export function createSkillTemplateMap<T extends SkillTemplateMap>(map: T): T {
  return map
}

export type SkillTemplateMap = Record<string, SkillTemplate>

export interface SkillTemplate {
  id: number
  generator: SkillGenerator
  lifeCycle: SkillLifeCycle
}

export type SkillGenerator = (data: SkillData) => Skill

export interface SkillLifeCycle {
  onUse?: (
    skill: Skill,
    combatInfo: CombatInfo,
    sourceId: EntityId,
    targetId?: EntityId,
  ) => CombatInfo
}
