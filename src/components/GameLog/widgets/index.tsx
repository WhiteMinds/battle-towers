import * as React from 'react'
import { FC } from 'react'
import { Entity } from '@/models/entity'
import MouseOverPopover from '../../MouseOverPopover'
import { EntityCard } from './EntityCard'

const MessageWidget$Entity: FC<{
  entity: Entity
}> = (props) => {
  return (
    <MouseOverPopover popupContent={<EntityCard entity={props.entity} />}>
      <span
        style={{
          color: 'red',
        }}
      >
        {props.entity.name}
      </span>
    </MouseOverPopover>
  )
}

export const MessageWidgets = {
  Entity: MessageWidget$Entity,
}
