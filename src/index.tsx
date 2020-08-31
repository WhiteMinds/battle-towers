import 'react-hot-loader'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { css } from 'astroturf'
import { GameScreen } from '@/components/GameScreen'
import { store } from './store'

function renderApp(): void {
  ReactDOM.render(
    <Provider store={store}>
      <GameScreen />
    </Provider>,
    document.getElementById('app'),
  )
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
