import * as React from 'react'
import { FC } from 'react'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
}))

const MouseOverPopover: FC<{
  popupContent: React.ReactNode
}> = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>()

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(undefined)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <span onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {props.children}
      </span>
      <Popover
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {props.popupContent}
      </Popover>
    </>
  )
}

export default MouseOverPopover
