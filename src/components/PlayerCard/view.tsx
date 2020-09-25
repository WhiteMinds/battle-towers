import * as React from 'react'
import { PropsFromRedux } from './index'

export type Props = PropsFromRedux & React.HTMLAttributes<HTMLDivElement>

export default (props: Props) => {
  const { account, randomCombat, ...containerProps } = props

  return (
    <div {...containerProps}>
      {account.player.name}{' '}
      <button onClick={randomCombat} disabled={account.inBattling}>
        combat
      </button>
    </div>
  )
}
