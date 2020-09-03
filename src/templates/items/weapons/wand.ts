import { ItemType, EquipSlot } from '@/models/item'
import { ItemGenerator } from '..'

export const generator: ItemGenerator = (itemData) => {
  return {
    type: ItemType.Equip,
    slot: EquipSlot.MainHead,
    name: '法杖',
    level: 1,
    ...itemData,
    isItemData: false,
  }
}
