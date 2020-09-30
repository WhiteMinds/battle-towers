import { SkillTemplate } from '@/templates/skills'
import { SkillType } from '@/models/skill'
import { produce } from 'immer'
import { GameMessageType, CombatMessageType } from '@/store/GameMessages/types'

export const Thump: SkillTemplate = {
  id: 2,

  generator(data) {
    return {
      type: SkillType.Active,
      name: '重击',
      level: 1,
      ...data,
      isPartialData: false,
    }
  },

  lifeCycle: {
    onUse(skill, combatInfo, sourceId, targetId) {
      return produce(combatInfo, ({ combatMsgs, player, monster }) => {
        const source = sourceId === player.id ? player : monster
        const target = targetId === player.id ? player : monster

        const damage = source.attack * 2
        combatMsgs.push({
          type: GameMessageType.Combat,
          payload: {
            type: CombatMessageType.UseSkill,
            skill,
            source,
            target,
            damage,
          },
        })
        target.currentHealth -= damage
      })
    },
  },
}
