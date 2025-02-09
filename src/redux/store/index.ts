import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
// import CartReducer from './cart'

const store = configureStore({
  reducer: rootReducer,
  // cart: CartReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
