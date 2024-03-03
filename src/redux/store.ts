import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./user";


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    users: persistedReducer
  },
})

const persistor = persistStore(store)


export {persistor};
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch