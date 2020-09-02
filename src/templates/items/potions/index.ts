import { ItemData, ItemType, Item$Useable } from '@/models/item'
import { cloneDeep } from 'lodash'
import { createItemTemplateMap } from '..'

// 药剂的起始 id
const startId = 30000

export const PotionTemplateMap = createItemTemplateMap({
  Helmet: {
    id: startId + 1,
    generator(itemData: ItemData): Item$Useable {
      return {
        type: ItemType.Useable,
        name: '力量药剂',
        level: 1,
        ...cloneDeep(itemData),
        isItemData: false,
      }
    },
  },
})
