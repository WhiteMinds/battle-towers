import * as React from 'react'
import { Box } from '@material-ui/core'
import PlayerCard from '@/components/PlayerCard'
import GameLog from '@/components/GameLog'

export const GameScreen = (): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      boxSizing="border-box"
      p={2}
    >
      <Box width={300}>
        <PlayerCard />
      </Box>

      <Box display="flex" flexGrow={1} minHeight={0} mt={2}>
        <Box height="100%">map</Box>

        <Box height="100%" width="100%" ml={2}>
          <GameLog />
        </Box>
      </Box>
    </Box>
  )
}
