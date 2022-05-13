import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import User from "../../types/User"
import { RootState } from "../store"

export interface ChatState {
  currentChatUser?: User
}

const initialState: ChatState = {
  currentChatUser: undefined,
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChatUser: (state, action: PayloadAction<User>) => {
      state.currentChatUser = action.payload
    },
  },
})

export const { setCurrentChatUser } = chatSlice.actions
export default chatSlice.reducer
