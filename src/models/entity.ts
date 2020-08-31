export interface Entity {
  name: string
  health: number
  currentHealth: number
  attack: number
}

export interface Player extends Entity {
  // ... codes ...
}
