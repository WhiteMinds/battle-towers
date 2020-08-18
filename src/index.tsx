import 'react-hot-loader'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css } from 'astroturf'
import { GameScreen } from '@/views/GameScreen'

function renderApp(): void {
  ReactDOM.render(<GameScreen />, document.getElementById('app'))
}

renderApp()
;(module as any).hot.accept(renderApp)

css`
  body {
    margin: 0;
    background: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 0;
  }
`
