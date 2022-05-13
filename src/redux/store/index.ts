import localStorage from "redux-persist/lib/storage"

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import { encryptTransform } from "redux-persist-transform-encrypt"

import homeReducer from "../reducers/homeReducer"
import userReducer from "../reducers/userSlice"
import listingReducer from "../reducers/listingSlice"
import petReducer from "../reducers/petSlice"
import snackbarReducer from "../reducers/snackbarSlice"
import searchReducer from "../reducers/searchSlice"
import reviewReducer from "../reducers/reviewSlice"
import bookingReducer from "../reducers/bookingSlice"
import productReducer from "../reducers/productSlice"
import chatReducer from "../reducers/chatSlice"

import {
  configureStore,
  combineReducers,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit"

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
  listing: listingReducer,
  pet: petReducer,
  snackbar: snackbarReducer,
  search: searchReducer,
  review: reviewReducer,
  booking: bookingReducer,
  product: productReducer,
  chat: chatReducer,
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "user/logout") {
    state = {} as RootState
  }
  return bigReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof bigReducer>
export type AppDispatch = typeof store.dispatch

export { store, persistor }
