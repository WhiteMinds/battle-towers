import { ItemType, EquipSlot } from '@/models/item'
import { cloneDeep } from 'lodash'
import { ItemGenerator } from '..'

export const generator: ItemGenerator = (itemData) => {
  return {
    type: ItemType.Equip,
    slot: EquipSlot.MainHead,
    name: '法杖',
    level: 1,
    ...cloneDeep(itemData),
    isItemData: false,
  }
}
