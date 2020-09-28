import {
  Account,
  AccountActionTypes,
  OP_GOLD,
  ADD_ITEM,
  SET_BATTLING,
  ADD_EXP,
} from './types'
import { createPlayer } from '@/models/entity'
import { produce } from 'immer'

const initialState: Account = {
  player: createPlayer({
    name: 'WhiteMind',
    health: 10,
    currentHealth: 10,
    attack: 2,
  }),
  gold: 0,
  inventory: [],

  inBattling: false,
}

export function AccountReducer(
  state = initialState,
  action: AccountActionTypes,
): Account {
  switch (action.type) {
    case OP_GOLD:
      return {
        ...state,
        gold: state.gold + action.payload,
      }
    case ADD_EXP:
      return produce(state, (state) => {
        state.player.exp += action.payload
        let nextEXP = getNextLevelEXP(state.player.level)
        while (state.player.exp >= nextEXP) {
          state.player.exp -= nextEXP
          state.player.level++
          // TODO: 提示等级提升，增加玩家属性等
          nextEXP = getNextLevelEXP(state.player.level)
        }
      })
    case ADD_ITEM:
      // TODO: 根据物品是否可叠加来决定是直接新增物品，还是修改旧有物品的堆叠数（这一步似乎
      // 不应该在这做，应该在 action 里）
      return {
        ...state,
        inventory: [...state.inventory, action.payload.itemId],
      }
    case SET_BATTLING:
      return {
        ...state,
        inBattling: action.payload,
      }
    default:
      return state
  }
}

function getNextLevelEXP(level: number) {
  return level * 100
}
