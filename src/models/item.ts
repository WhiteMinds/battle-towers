import { v4 } from 'uuid'

export type ItemId = ReturnType<typeof v4>

export interface ItemData {
  // 特殊的标示，用于表示这是一个道具数据而不是完整的道具对象
  isItemData: true
  templateId: number
  // 有 itemId 的代表它是一个实际存在的道具，比如玩家的库存道具是由 id 的，而商店的道具则没有
  id?: ItemId

  // 还有一些待考虑的数据，比如：
  // source: Loot | Shop
  // gotTime: Date
}

export interface ItemData$Stored extends ItemData {
  id: ItemId
}

export enum ItemType {
  // 材料
  Material,
  // 装备
  Equip,
  // 可使用道具
  Useable,
}

export interface BaseItem extends Omit<ItemData, 'isItemData'> {
  // Item 如果存在这个标示，则必须为 false，用于强制类型提示 ItemData 和 Item 的区别
  isItemData?: false
  type: ItemType
  name: string
  level: number
}

export interface Item$Material extends BaseItem {
  type: ItemType.Material
}

export interface Item$Equip extends BaseItem {
  type: ItemType.Equip
  slot: EquipSlot
  // ... equip attrs ...
  attack?: number
  defense?: number
}

export interface Item$Useable extends BaseItem {
  type: ItemType.Useable
}

export type Item = Item$Material | Item$Equip | Item$Useable

export enum EquipSlot {
  // 主手
  MainHead,
  // 副手
  OffHead,
  // 头部
  Head,
  // 身体
  Body,
  // 足部
  Foot,
  // 项链
  Amulet,
}
