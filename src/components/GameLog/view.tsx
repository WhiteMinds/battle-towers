import * as React from 'react'
import { PropsFromRedux } from './index'
import {
  GameMessageType,
  CombatMessageType,
  GameMessage,
  CombatResult,
} from '@/store/GameMessages/types'
import { Loot, LootType } from '@/models/loot'
import { transferItemData } from '@/templates/items'
import { MessageWidgets } from './widgets'

export type Props = PropsFromRedux & React.HTMLAttributes<HTMLDivElement>

export default (props: Props) => {
  const { gameMessages, dispatch, ...containerProps } = props

  return (
    <div {...containerProps}>
      {gameMessages.map((msg, idx) => (
        <div key={idx}>{renderMessage(msg)}</div>
      ))}
    </div>
  )
}

function renderMessage(msg: GameMessage): React.ReactNode {
  if (msg.type === GameMessageType.System) return msg.message

  if (msg.type === GameMessageType.Combat) {
    const { source, target } = msg.payload

    switch (msg.payload.type) {
      case CombatMessageType.Start:
        return (
          <>
            <MessageWidgets.Entity entity={source} /> 向{' '}
            <MessageWidgets.Entity entity={target} /> 发起了挑战
          </>
        )

      case CombatMessageType.End:
        switch (msg.payload.result) {
          case CombatResult.SourceWin:
            let msgText = `${source.name} 挑战 ${target.name} 成功`
            if (msg.payload.dropped) {
              msgText += '，获得 ' + getDroppedString(msg.payload.dropped)
            }
            return msgText
          case CombatResult.TargetWin:
            return `${source.name} 挑战 ${target.name} 失败`
          case CombatResult.SourceEscape:
            return `${source.name} 在对战 ${target.name} 时逃走了`
          case CombatResult.TargetEscape:
            return `${target.name} 在对战 ${source.name} 时逃走了`
          default:
            return 'unknown combat result type'
        }

      case CombatMessageType.Attack:
        return (
          <>
            <MessageWidgets.Entity entity={source} /> 攻击了{' '}
            <MessageWidgets.Entity entity={target} />
            ，造成伤害 {msg.payload.damage}
          </>
        )

      default:
        return 'unknown combat message type'
    }
  }

  return 'unknown message type'
}

function getDroppedString(dropped: Loot[]) {
  return dropped
    .map((drop) => {
      switch (drop.type) {
        case LootType.EXP:
          return `[经验值 x${drop.amount}]`
        case LootType.Gold:
          return `[金币 x${drop.amount}]`
        case LootType.Item:
          return `[${transferItemData(drop.item).name} x${drop.amount}]`
      }
    })
    .join('、')
}
