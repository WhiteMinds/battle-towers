import { v4 } from 'uuid'
import { ItemId } from './item'

export type EntityId = ReturnType<typeof v4>

export interface Entity {
  id: EntityId
  name: string
  health: number
  currentHealth: number
  attack: number
  defense: number
}

export interface Player extends Entity {
  equips: ItemId[]
  // ... codes ...
}

export function isPlayer(entity: Entity): entity is Player {
  return 'equips' in entity
}

export function createEntity(data?: Partial<Entity>): Entity {
  return {
    id: v4(),
    name: 'base',
    health: 1,
    currentHealth: 1,
    attack: 0,
    defense: 0,
    ...data,
  }
}

export function createPlayer(data: Partial<Player>): Player {
  return {
    ...createEntity(),
    equips: [],
    ...data,
  }
}
