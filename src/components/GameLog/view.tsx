import * as React from 'react'
import { PropsFromRedux } from './index'
import {
  GameMessageType,
  CombatMessageType,
  GameMessage,
  CombatResult,
} from '@/store/GameMessages/types'
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
            return (
              <>
                <MessageWidgets.Entity entity={source} /> 挑战{' '}
                <MessageWidgets.Entity entity={target} /> 成功
                {msg.payload.loots ? (
                  <>
                    ，获得 <MessageWidgets.Loots loots={msg.payload.loots} />
                  </>
                ) : null}
              </>
            )
          case CombatResult.TargetWin:
            return `${source.name} 挑战 ${target.name} 失败`
          case CombatResult.SourceEscape:
            return `${source.name} 在对战 ${target.name} 时逃走了`
          case CombatResult.TargetEscape:
            return `${target.name} 在对战 ${source.name} 时逃走了`
          default:
            return 'unknown combat result type'
        }

      case CombatMessageType.UseSkill:
        return (
          <>
            {source.id !== target.id ? (
              <>
                <MessageWidgets.Entity entity={source} /> 对{' '}
                <MessageWidgets.Entity entity={target} />{' '}
              </>
            ) : (
              <>
                <MessageWidgets.Entity entity={source} />{' '}
              </>
            )}
            使用 {msg.payload.skill.name}
            {msg.payload.damage ? (
              <>，造成伤害 {msg.payload.damage}</>
            ) : msg.payload.regen ? (
              <>，恢复生命 {msg.payload.regen}</>
            ) : null}
          </>
        )

      default:
        return 'unknown combat message type'
    }
  }

  return 'unknown message type'
}
