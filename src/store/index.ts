import { combineReducers, createStore, compose } from 'redux'
import { GameDataReducer } from './GameData/reducer'
import { AccountReducer } from './Account/reducer'
import { GameMessagesReducer } from './GameMessages/reducer'

export const rootReducer = combineReducers({
  gameData: GameDataReducer,
  account: AccountReducer,
  gameMessages: GameMessagesReducer,
})

// 用于支持 redux 的调试扩展
// https://github.com/zalmoxisus/redux-devtools-extension#11-basic-store
const composeEnhancers: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
