/**
 * 与 Item 不同的是，Buff 存储在 Entity 上时，是完整的数据而不是 BuffData 之类的。
 * Buff 预期只会在运行过程中存在，不会被持久化存储。
 */
import { Buff } from '@/models/buff'
import { Burn } from './burn'
import { Entity } from '@/models/entity'

export const BuffMap = createBuffTemplateMap({
  Burn,
})

export function createBuff<T extends Buff>(
  template: BuffTemplate<T>,
  buffData: Parameters<BuffGenerator<T>>,
): T {
  return template.generator(...buffData)
}

// types
// =============================================================================

/**
 * 该函数的作用是让类型范围缩小，使得创建后的 TemplateMap 可以有更具体的 key
 */
export function createBuffTemplateMap<T extends BuffTemplateMap>(map: T): T {
  return map
}

export type BuffTemplateMap<T extends Buff = any> = Record<
  string,
  BuffTemplate<T>
>

export interface BuffTemplate<T extends Buff> {
  id: number
  generator: BuffGenerator<T>
  lifeCycle: BuffLifeCycle<T>
}

export type BuffGenerator<T extends Buff> = (data: Partial<T>) => T

export interface BuffLifeCycle<T extends Buff> {
  attached?: (buff: T, entity: Entity) => void
  beforeAttack?: (buff: T, entity: Entity) => void
  attack?: (buff: T, entity: Entity) => void
  detached?: (buff: T, entity: Entity) => void
}

export function isSpecificBuff<T extends Buff>(
  buff: Buff,
  template: BuffTemplate<T>,
): buff is T {
  return buff.templateId === template.id
}
