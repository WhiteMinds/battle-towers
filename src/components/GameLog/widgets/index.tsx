import * as React from 'react'
import { FC } from 'react'
import { Entity, isPlayer } from '@/models/entity'
import MouseOverPopover from '../../MouseOverPopover'
import { EntityCard } from './EntityCard'
import { Loot, LootType } from '@/models/loot'
import { transferItemData } from '@/templates/items'
import { ItemData } from '@/models/item'
import { ItemCard } from './ItemCard'

const MessageWidget$Entity: FC<{
  entity: Entity
}> = (props) => {
  return (
    <MouseOverPopover popupContent={<EntityCard entity={props.entity} />}>
      <span
        style={{
          color: isPlayer(props.entity) ? 'blue' : 'red',
        }}
      >
        {props.entity.name}
      </span>
    </MouseOverPopover>
  )
}

const MessageWidget$Loots: FC<{
  loots: Loot[]
}> = (props) => {
  return (
    <>
      {props.loots.map((loot, idx) => {
        return (
          <span key={idx}>
            [
            {loot.type === LootType.EXP ? (
              '经验值'
            ) : loot.type === LootType.Gold ? (
              <span style={{ color: '#999900' }}>金币</span>
            ) : loot.type === LootType.Item ? (
              <MessageWidget$Item item={loot.item} />
            ) : null}{' '}
            x{loot.amount}]
          </span>
        )
      })}
    </>
  )
}

const MessageWidget$Item: FC<{
  item: ItemData
}> = (props) => {
  const item = transferItemData(props.item)
  return (
    <MouseOverPopover popupContent={<ItemCard item={props.item} />}>
      <span
        style={{
          color: '#873688',
        }}
      >
        {item.name}
      </span>
    </MouseOverPopover>
  )
}

export const MessageWidgets = {
  Entity: MessageWidget$Entity,
  Loots: MessageWidget$Loots,
  Item: MessageWidget$Item,
}
