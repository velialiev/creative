import { combineReducers } from '@reduxjs/toolkit'
import apartmentsReducer from '../features/Apartments/apartmentsSlice'

const rootReducer = combineReducers({
  apartments: apartmentsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
