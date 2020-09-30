import { v4 } from 'uuid'
import { TemplatePartialData, TemplateFullData } from '@/templates'

export type ItemId = ReturnType<typeof v4>

export interface SkillData extends TemplatePartialData {
  templateId: number
}

export interface Skill extends TemplateFullData<SkillData> {
  type: SkillType
  name: string
  level: number
}

export enum SkillType {
  // 主动
  Active,
  // 被动
  Passive,
}
