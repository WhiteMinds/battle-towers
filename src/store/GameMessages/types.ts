import { Entity } from '@/models/entity'
import { Loot } from '@/models/loot'
import { Skill } from '@/models/skill'

// Actions
// =============================================================================

export const ADD_GAME_MESSAGE = 'ADD_GAME_MESSAGE'

export interface AddGameMessageAction {
  type: typeof ADD_GAME_MESSAGE
  payload: GameMessage
}

export type GameMessagesActionTypes = AddGameMessageAction

// GameMessages
// =============================================================================

export enum GameMessageType {
  System,
  Combat,
}

export interface GameMessage$System {
  type: GameMessageType.System
  message: string
}

export interface GameMessage$Combat {
  type: GameMessageType.Combat
  payload: CombatMessage
}

export type GameMessage = GameMessage$System | GameMessage$Combat

// CombatMessages
// =============================================================================

export enum CombatMessageType {
  Start,
  End,
  UseSkill,
}

export interface CombatMessage$Start {
  type: CombatMessageType.Start
  source: Entity
  target: Entity
}

export interface CombatMessage$End {
  type: CombatMessageType.End
  source: Entity
  target: Entity
  result: CombatResult
  loots?: Loot[]
}

export enum CombatResult {
  SourceWin,
  TargetWin,
  SourceEscape,
  TargetEscape,
}

export interface CombatMessage$UseSkill {
  type: CombatMessageType.UseSkill
  skill: Skill
  source: Entity
  target: Entity
  damage?: number
  regen?: number
}

export type CombatMessage =
  | CombatMessage$Start
  | CombatMessage$End
  | CombatMessage$UseSkill
