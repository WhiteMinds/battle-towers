import { SkillTemplate } from '@/templates/skills'
import { SkillType } from '@/models/skill'
import { produce } from 'immer'
import { GameMessageType, CombatMessageType } from '@/store/GameMessages/types'

export const Cure: SkillTemplate = {
  id: 3,

  generator(data) {
    return {
      type: SkillType.Active,
      name: '治愈',
      level: 1,
      ...data,
      isPartialData: false,
    }
  },

  lifeCycle: {
    onUse(skill, combatInfo, sourceId, targetId) {
      return produce(combatInfo, ({ combatMsgs, player, monster }) => {
        const source = sourceId === player.id ? player : monster
        // 该技能只能对自己释放
        const target = source

        const regen = skill.level
        combatMsgs.push({
          type: GameMessageType.Combat,
          payload: {
            type: CombatMessageType.UseSkill,
            skill,
            source,
            target,
            regen,
          },
        })
        source.currentHealth += regen
      })
    },
  },
}
