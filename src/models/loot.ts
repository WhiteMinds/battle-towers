import { ItemData$Stored } from './item'

export enum LootType {
  EXP,
  Gold,
  Item,
}

export interface Loot$EXP {
  type: LootType.EXP
  amount: number
}

export interface Loot$Gold {
  type: LootType.Gold
  amount: number
}

export interface Loot$Item {
  type: LootType.Item
  amount: number
  item: ItemData$Stored
}

export type Loot = Loot$EXP | Loot$Gold | Loot$Item
