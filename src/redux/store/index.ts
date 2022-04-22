import { createStore, combineReducers, compose, applyMiddleware } from "redux"

import thunk, { ThunkAction } from "redux-thunk"
import localStorage from "redux-persist/lib/storage"

import { persistReducer, persistStore } from "redux-persist"
import { encryptTransform } from "redux-persist-transform-encrypt"
import homeReducer from "../reducers/homeReducer"
import userReducer from "../reducers/userReducer"

import { AnyAction } from "redux"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  user: {
    token: "",
    profile: {},
    isLoading: true,
    isError: false,
    isUpdateLoading: true,
    isUpdateError: false,
  },
  home: {
    isLoading: true,
    isError: false,
  },
}

const encryptSecretKey = process.env.REACT_APP_SECRET_PERSIST_KEY
if (!encryptSecretKey) {
  throw "REACT_APP_SECRET_PERSIST_KEY is not set"
}

const persistConfig = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: encryptSecretKey,
    }),
  ],
}

const bigReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
})

const persistedReducer = persistReducer(persistConfig, bigReducer)

const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

const persistor = persistStore(configureStore)

export type RootState = ReturnType<typeof configureStore.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export { configureStore, persistor }
