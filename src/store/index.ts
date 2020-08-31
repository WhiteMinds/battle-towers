import { combineReducers, createStore } from 'redux'
import { AccountReducer } from './Account/reducer'
import { GameMessagesReducer } from './GameMessages/reducer'

export const rootReducer = combineReducers({
  account: AccountReducer,
  gameMessages: GameMessagesReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
