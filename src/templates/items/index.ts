import { ItemData, Item } from '@/models/item'
import { WeaponTemplateMap } from './weapons'
import { ArmorTemplateMap } from './armors'
import { PotionTemplateMap } from './potions'
import { memoize } from 'lodash'

export const ItemTemplateMap = createItemTemplateMap({
  ...WeaponTemplateMap,
  ...ArmorTemplateMap,
  ...PotionTemplateMap,
})
export const ItemTemplates = Object.values(ItemTemplateMap)

/**
 * 将存储的 ItemData 通过模板转换为完整的 Item
 */
function _transferItemData(itemData: ItemData): Item {
  const template = ItemTemplates.find(
    (template) => template.id === itemData.templateId,
  )

  if (!template) {
    throw new Error('Incorrect item data: ' + JSON.stringify(itemData))
  }

  return template.generator(itemData)
}
export const transferItemData = memoize(_transferItemData)

// types
// =============================================================================

/**
 * 该函数的作用是让类型范围缩小，使得创建后的 ItemTemplateMap 可以有更具体的 key
 */
export function createItemTemplateMap<T extends ItemTemplateMap>(map: T): T {
  return map
}

export type ItemTemplateMap = Record<string, ItemTemplate>

export interface ItemTemplate {
  id: number
  generator: ItemGenerator
}

export type ItemGenerator = (itemData: ItemData) => Item
