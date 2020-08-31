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

const mapStateToProps = (state: RootState) => ({
  player: state.account.player,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  randomCombat: (player: Player) => {
    // random a monster to battle
    const monster: Entity = {
      name: 'Zombie',
      health: 5,
      currentHealth: 5,
      attack: 1,
    }
    // ... codes ...
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
          source: player,
          target: monster,
          damage: monster.attack,
        },
      }),
    )
    dispatch(
      addGameMessage({
        type: GameMessageType.Combat,
        payload: {
          type: CombatMessageType.End,
          source: player,
          target: monster,
          result: CombatResult.SourceWin,
        },
      }),
    )
    dispatch(incrementGold(10))
    dispatch(
      addGameMessage({
        type: GameMessageType.System,
        // System$GetItem
        message: '获得金币 10',
      }),
    )
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
