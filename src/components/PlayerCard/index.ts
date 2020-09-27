import { connect, ConnectedProps } from 'react-redux'
import { v4 } from 'uuid'
import { AppDispatch, RootState } from '@/store'
import {
  GameMessageType,
  CombatMessageType,
  CombatResult,
  GameMessage,
} from '@/store/GameMessages/types'
import { addGameMessage } from '@/store/GameMessages/actions'
import {
  incrementGold,
  addItem,
  setBattling,
  addEXP,
} from '@/store/Account/actions'
import { Account } from '@/store/Account/types'
import { createStoredItem } from '@/store/GameData/actions'
import { createMonster } from '@/models/entity'
import View from './view'
import { ItemTemplateMap } from '@/templates/items'
import { LootType, Loot } from '@/models/loot'
import { random } from 'lodash'
import { produce } from 'immer'
import {
  transToBattlingEntity,
  BattlingMonster,
  BattlingPlayer,
} from '@/models/battle'

const mapStateToProps = (state: RootState) => ({
  account: state.account,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  randomCombat: async (account: Account) => {
    // codes for battle state check
    if (account.inBattling) return

    // codes for random a monster to battle
    const monster = randomMonster()

    const { combatMsgs, loots } = combat(
      transToBattlingEntity(account.player),
      transToBattlingEntity(monster),
    )

    dispatch(setBattling(true))
    while (combatMsgs.length > 0) {
      dispatch(addGameMessage(combatMsgs.shift()!))
      if (combatMsgs.length === 0) break
      await new Promise((r) => setTimeout(r, 500))
    }
    dispatch(setBattling(false))

    // codes for give drop loots
    loots?.forEach((loot) => {
      switch (loot.type) {
        case LootType.Gold:
          dispatch(incrementGold(loot.amount))
          break
        case LootType.Item:
          // TODO: 需要妥善处理 loot.amount
          dispatch(createStoredItem(loot.item))
          dispatch(addItem(loot.item.id))
          break
        case LootType.EXP:
          dispatch(addEXP(loot.amount))
          break
        // ... codes ...
      }
    })
  },
})

function randomMonster() {
  const helath = random(1, 10)
  return createMonster({
    name: 'Zombie',
    health: helath,
    currentHealth: helath,
    attack: random(1, 2),
  })
}

function combat(
  player: BattlingPlayer,
  monster: BattlingMonster,
): {
  combatMsgs: GameMessage[]
  result: CombatResult
  loots?: Loot[]
} {
  const combatMsgs: GameMessage[] = [
    {
      type: GameMessageType.Combat,
      payload: {
        type: CombatMessageType.Start,
        source: player,
        target: monster,
      },
    },
  ]

  // codes for battle
  let nextRoundOwner: 'source' | 'target' = 'source'
  while (1) {
    if (nextRoundOwner === 'source') {
      // player round
      nextRoundOwner = 'target'
      // codes for calc attack damage
      const damage = player.attack
      combatMsgs.push({
        type: GameMessageType.Combat,
        payload: {
          type: CombatMessageType.Attack,
          source: player,
          target: monster,
          damage,
        },
      })
      monster = produce(monster, (monster) => {
        monster.currentHealth -= damage
      })

      if (monster.currentHealth <= 0) {
        // win
        const result = CombatResult.SourceWin
        // codes for calc and gen combat drop loots
        const loots: Loot[] = [
          {
            type: LootType.EXP,
            amount: 15,
          },
          {
            type: LootType.Gold,
            amount: random(1, 10),
          },
          {
            type: LootType.Item,
            amount: 1,
            item: {
              isItemData: true,
              templateId: ItemTemplateMap.Sword.id,
              id: v4(),
            },
          },
        ]

        combatMsgs.push({
          type: GameMessageType.Combat,
          payload: {
            type: CombatMessageType.End,
            source: player,
            target: monster,
            result,
            loots: loots,
          },
        })

        return {
          combatMsgs,
          result,
          loots,
        }
      }
    } else {
      // monster round
      nextRoundOwner = 'source'
      // codes for calc attack damage
      const damage = monster.attack
      combatMsgs.push({
        type: GameMessageType.Combat,
        payload: {
          type: CombatMessageType.Attack,
          source: monster,
          target: player,
          damage,
        },
      })
      player = produce(player, (player) => {
        player.currentHealth -= damage
      })

      if (player.currentHealth <= 0) {
        // lose
        const result = CombatResult.TargetWin
        combatMsgs.push({
          type: GameMessageType.Combat,
          payload: {
            type: CombatMessageType.End,
            source: player,
            target: monster,
            result,
          },
        })
        return {
          combatMsgs,
          result,
        }
      }
    }
  }

  player = produce(player, (player) => {
    player.currentHealth -= 1
  })

  return {
    combatMsgs,
    result: CombatResult.SourceWin,
    loots: [],
  }
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    randomCombat() {
      return dispatchProps.randomCombat(stateProps.account)
    },
  }),
)

export type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(View)
