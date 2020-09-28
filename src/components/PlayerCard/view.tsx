import * as React from 'react'
import { PropsFromRedux } from './index'
import { FC, useMemo } from 'react'
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { Account } from '@/store/Account/types'
import { GameData } from '@/store/GameData/types'
import { transferItemData } from '@/templates/items'
import { useSwitch } from '@/utils/hooks'

export type Props = PropsFromRedux & React.HTMLAttributes<HTMLDivElement>

export default (props: Props) => {
  const { account, itemMap, randomCombat, ...containerProps } = props
  const inventoryVisible = useSwitch()

  return (
    <div {...containerProps}>
      [LV.{account.player.level}] {account.player.name}{' '}
      <button onClick={randomCombat} disabled={account.inBattling}>
        combat
      </button>
      <button onClick={inventoryVisible.on}>inventory</button>
      <InventoryDialog
        account={account}
        itemMap={itemMap}
        open={inventoryVisible.state}
        onClose={inventoryVisible.off}
      />
    </div>
  )
}

const InventoryDialog: FC<{
  account: Account
  itemMap: GameData['itemMap']
  open: boolean
  onClose: () => void
}> = (props) => {
  const items = useMemo(
    () =>
      props.account.inventory.map((itemId: string) =>
        transferItemData(props.itemMap[itemId]),
      ),
    [],
  )

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Inventory</DialogTitle>
      <List>
        {items.map((item) => (
          <ListItem button onClick={props.onClose} key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
