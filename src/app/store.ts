import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import rootReducer, { RootState } from './rootReducer'
import { persistStore } from 'redux-persist'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

if (process.env.NODE_ENV === 'development' && module.children) {
  module.hot.accept('./rootReducer', () => {
    store.replaceReducer(rootReducer)
  })
}

export type AppDispatch = typeof store.dispatch
export type AppThunk<T = void> = ThunkAction<T, RootState, unknown, Action<string>>

export const persistor = persistStore(store)

export default store
