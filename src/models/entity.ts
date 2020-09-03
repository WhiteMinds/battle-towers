import { ItemId } from './item'

export interface Entity {
  name: string
  health: number
  currentHealth: number
  attack: number
}

export interface Player extends Entity {
  equips: ItemId[]
  // ... codes ...
}

export function isPlayer(entity: Entity): entity is Player {
  return 'equips' in entity
}
