import * as React from 'react'
import { PropsFromRedux } from './index'

export type Props = PropsFromRedux & React.HTMLAttributes<HTMLDivElement>

export default (props: Props) => {
  const { player, randomCombat, ...containerProps } = props

  return (
    <div {...containerProps}>
      {player.name} <button onClick={randomCombat}>combat</button>
    </div>
  )
}
