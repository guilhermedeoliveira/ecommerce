import { configureStore } from "@reduxjs/toolkit"
import { productReducer } from "./product"
import { userReducer } from "./user"

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
