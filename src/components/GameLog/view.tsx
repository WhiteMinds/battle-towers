import * as React from 'react'
import { PropsFromRedux } from './index'
import {
  GameMessageType,
  CombatMessageType,
  GameMessage,
  CombatResult,
} from '@/store/GameMessages/types'

export type Props = PropsFromRedux & React.HTMLAttributes<HTMLDivElement>

export default (props: Props) => {
  const { gameMessages, dispatch, ...containerProps } = props

  return (
    <div {...containerProps}>
      {gameMessages.map((item, idx) => (
        <div key={idx}>{getMessageString(item)}</div>
      ))}
    </div>
  )
}

function getMessageString(msg: GameMessage): string {
  if (msg.type === GameMessageType.System) return msg.message

  if (msg.type === GameMessageType.Combat) {
    const { source, target } = msg.payload

    switch (msg.payload.type) {
      case CombatMessageType.Start:
        return `${source.name} 向 ${target.name} 发起了挑战`

      case CombatMessageType.End:
        switch (msg.payload.result) {
          case CombatResult.SourceWin:
            return `${source.name} 挑战 ${target.name} 成功`
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
        return `${source.name} 攻击了 ${target.name}，造成伤害 ${msg.payload.damage}`

      default:
        return 'unknown combat message type'
    }
  }

  return 'unknown message type'
}