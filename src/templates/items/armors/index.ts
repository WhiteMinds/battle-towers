import { ItemData, Item$Equip, ItemType, EquipSlot } from '@/models/item'
import { createItemTemplateMap } from '..'

// 防具模板的起始 id
const startId = 20000

export const ArmorTemplateMap = createItemTemplateMap({
  Helmet: {
    id: startId + 1,
    generator(itemData: ItemData): Item$Equip {
      return {
        type: ItemType.Equip,
        slot: EquipSlot.Head,
        name: '头盔',
        level: 1,
        ...itemData,
        isItemData: false,
      }
    },
  },
})
