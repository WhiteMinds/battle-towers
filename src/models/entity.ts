import { v4 } from 'uuid'
import { ItemId } from './item'

export type EntityId = ReturnType<typeof v4>

export interface BaseEntity {
  id: EntityId
  name: string
  health: number
  currentHealth: number
  attack: number
  defense: number
}

export enum EntityType {
  Common,
  Player,
  Monster,
}

export interface Entity$Common extends BaseEntity {
  type: EntityType.Common
}

export interface Entity$Player extends BaseEntity {
  type: EntityType.Player
  equips: ItemId[]
  // ... codes ...
}

export interface Entity$Monster extends BaseEntity {
  type: EntityType.Monster
  // ... codes ...
}

export type Entity = Entity$Common | Entity$Player | Entity$Monster

export function isPlayer(entity: Entity): entity is Entity$Player {
  return entity.type === EntityType.Player
}

export function createBaseEntity(data?: Partial<BaseEntity>): BaseEntity {
  return {
    id: v4(),
    name: 'default',
    health: 1,
    currentHealth: 1,
    attack: 0,
    defense: 0,
    ...data,
  }
}

export function createPlayer(data?: Partial<Entity$Player>): Entity$Player {
  return {
    ...createBaseEntity(),
    type: EntityType.Player,
    equips: [],
    ...data,
  }
}

export function createMonster(data?: Partial<Entity$Monster>): Entity$Monster {
  return {
    ...createBaseEntity(),
    type: EntityType.Monster,
    ...data,
  }
}
