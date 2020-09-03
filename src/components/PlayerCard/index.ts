import { connect, ConnectedProps } from 'react-redux'
import { v4 } from 'uuid'
import { AppDispatch, RootState } from '@/store'
import {
  GameMessageType,
  CombatMessageType,
  CombatResult,
} from '@/store/GameMessages/types'
import { addGameMessage } from '@/store/GameMessages/actions'
import { incrementGold, addItem } from '@/store/Account/actions'
import { createItem } from '@/store/GameData/actions'
import { Entity, Player } from '@/models/entity'
import View from './view'
import { ItemData$Stored } from '@/models/item'
import { ItemTemplateMap } from '@/templates/items'
import { LootType, Loot } from '@/models/loot'

const mapStateToProps = (state: RootState) => ({
  player: state.account.player,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  randomCombat: (player: Player) => {
    // codes for random a monster to battle
    const monster: Entity = {
      name: 'Zombie',
      health: 2,
      currentHealth: 2,
      attack: 1,
    }

    // codes for battle
    dispatch(
      addGameMessage({
        type: GameMessageType.Combat,
        payload: {
          type: CombatMessageType.Start,
          source: player,
          target: monster,
        },
      }),
    )
    dispatch(
      addGameMessage({
        type: GameMessageType.Combat,
        payload: {
          type: CombatMessageType.Attack,
          source: monster,
          target: player,
          damage: monster.attack,
        },
      }),
    )
    dispatch(
      addGameMessage({
        type: GameMessageType.Combat,
        payload: {
          type: CombatMessageType.Attack,
          source: player,
          target: monster,
          damage: player.attack,
        },
      }),
    )

    // codes for calc combat result
    let result = CombatResult.SourceWin

    let dropped: Loot[] | undefined
    if (result === CombatResult.SourceWin) {
      // codes for calc and gen combat drops
      const newItem: ItemData$Stored = {
        isItemData: true,
        templateId: ItemTemplateMap.Sword.id,
        id: v4(),
      }
      dispatch(createItem(newItem))

      dropped = [
        {
          type: LootType.EXP,
          amount: 1,
        },
        {
          type: LootType.Gold,
          amount: 10,
        },
        {
          type: LootType.Item,
          amount: 1,
          item: newItem,
        },
      ]
    }

    dispatch(
      addGameMessage({
        type: GameMessageType.Combat,
        payload: {
          type: CombatMessageType.End,
          source: player,
          target: monster,
          result,
          dropped,
        },
      }),
    )

    // codes for give drops
    dropped?.forEach((drop) => {
      switch (drop.type) {
        case LootType.Gold:
          dispatch(incrementGold(10))
          break
        case LootType.Item:
          dispatch(addItem(drop.item.id))
          break
        // ... codes ...
      }
    })
  },
})

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    randomCombat() {
      return dispatchProps.randomCombat(stateProps.player)
    },
  }),
)

export type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(View)
