import { ItemData, Item$Equip, ItemType, EquipSlot } from '@/models/item'
import { generator as generatorWand } from './wand'
import { createItemTemplateMap } from '..'

// 武器模板的起始 id
const startId = 10000

export const WeaponTemplateMap = createItemTemplateMap({
  Sword: {
    id: startId + 1,
    generator(itemData: ItemData): Item$Equip {
      // 根据 data 生成完整的物品数据，比如 material = Material.Wood 则 name: '木剑'

      return {
        type: ItemType.Equip,
        slot: EquipSlot.MainHead,
        name: '剑',
        level: 1,
        ...itemData,
        isItemData: false,
      }
    },
  },

  Wand: {
    id: startId + 2,
    // 代码较多的放到单独的文件
    generator: generatorWand,
  },
})
