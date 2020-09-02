import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import {
  GameMessageType,
  CombatMessageType,
  CombatResult,
} from '@/store/GameMessages/types'
import { addGameMessage } from '@/store/GameMessages/actions'
import { incrementGold } from '@/store/Account/actions'
import { Entity, Player } from '@/models/entity'
import View from './view'
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
      // dispatch(createItem({
      //  ...
      // }))
      // codes for calc combat drops
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
          item: {
            isItemData: true,
            id: 1,
            templateId: ItemTemplateMap.Sword.id,
          },
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
