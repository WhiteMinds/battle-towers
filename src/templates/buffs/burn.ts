import { Buff } from '@/models/buff'
import { BuffTemplate } from '.'

export interface Buff$Burn extends Buff {
  combo: number
}

export const Burn: BuffTemplate<Buff$Burn> = {
  id: 1,

  generator(data) {
    return {
      templateId: Burn.id,
      sourceId: 'NONE',
      name: '灼烧',
      level: 1,
      stack: 1,
      combo: 0,
      ...data,
    }
  },

  lifeCycle: {
    attached(buff, entity) {
      console.log('burn attached', buff.combo)
    },
  },
}
