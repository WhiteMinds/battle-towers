import * as React from 'react'
import { FC } from 'react'
import { Entity, isPlayer } from '@/models/entity'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'

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

export const EntityCard: FC<{ entity: Entity }> = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {isPlayer(props.entity) ? '玩家' : '怪物'}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.entity.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          HP: {props.entity.currentHealth} / {props.entity.health}
        </Typography>
        <Typography variant="body2" component="p">
          Attack: {props.entity.attack}
        </Typography>
      </CardContent>
    </Card>
  )
}
