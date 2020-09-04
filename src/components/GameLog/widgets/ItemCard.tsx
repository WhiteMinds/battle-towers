import * as React from 'react'
import { FC } from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import { ItemData, ItemType } from '@/models/item'
import { transferItemData } from '@/templates/items'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export const ItemCard: FC<{ item: ItemData }> = (props) => {
  const classes = useStyles()
  const item = transferItemData(props.item)
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {item.type === ItemType.Equip
            ? '装备'
            : item.type === ItemType.Material
            ? '材料'
            : item.type === ItemType.Useable
            ? '道具'
            : null}
        </Typography>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Level: {item.level}
        </Typography>
        {item.type === ItemType.Equip ? (
          <Typography variant="body2" component="p">
            Attack: {item.attack}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  )
}
