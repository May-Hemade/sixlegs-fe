import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import User from "../../types/User"
import { RootState } from "../store"

export interface UserState {
  token: string
  profile?: User
  isLoading: boolean
  isError: boolean
  isUpdateLoading: boolean
  isUpdateError: boolean
}

const initialState: UserState = {
  token: "",
  profile: undefined,
  isLoading: true,
  isError: false,
  isUpdateLoading: true,
  isUpdateError: false,
}

export const getUser = createAsyncThunk<User, void, { state: RootState }>(
  "user/getUser",
  async (arg, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      })
      if (response.ok) {
        let result = await response.json()
        return result
      } else {
        return rejectWithValue("error happened fetching the user")
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

export const updateUser = createAsyncThunk<User, User, { state: RootState }>(
  "user/updateUser",
  async (data, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/user/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        let result = await response.json()
        return result
      } else {
        return rejectWithValue("error happened updating the user")
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setUpdateUserError: (state) => {
      state.isUpdateError = true
    },
    stopUpdateUserLoading: (state) => {
      state.isUpdateLoading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.profile = action.payload
      state.isError = false
      state.isLoading = false
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.isError = true
      state.isLoading = false
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.profile = action.payload
      state.isUpdateError = false
      state.isUpdateLoading = false
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isUpdateError = true
      state.isUpdateLoading = false
    })
  },
})

export const { saveToken, setUpdateUserError, stopUpdateUserLoading } =
  userSlice.actions

export default userSlice.reducer
