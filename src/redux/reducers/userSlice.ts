import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import ChangePasswordData from "../../types/ChangePasswordData"
import User from "../../types/User"
import { RootState } from "../store"

export interface UserState {
  token: string
  profile?: User
  isLoading: boolean
  isError: boolean
  isUpdateLoading: boolean
  isUpdateError: boolean
  isChangePasswordError: boolean
  isChangePasswordLoading: boolean
  isChangePasswordSuccessSnackBarOpen: boolean
}

const initialState: UserState = {
  token: "",
  profile: undefined,
  isLoading: true,
  isError: false,
  isUpdateLoading: false,
  isUpdateError: false,
  isChangePasswordError: false,
  isChangePasswordLoading: false,
  isChangePasswordSuccessSnackBarOpen: false,
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
      return rejectWithValue(error)
    }
  }
)

export const changePassword = createAsyncThunk<
  void,
  ChangePasswordData,
  { state: RootState }
>("user/changePassword", async (data, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/user/me/changePassword`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    if (response.ok) {
      return
    } else {
      return rejectWithValue("error happened updating the user")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

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
    closeChangePasswordSuccess: (state) => {
      state.isChangePasswordSuccessSnackBarOpen = false
    },
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload
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
    builder.addCase(updateUser.pending, (state, action) => {
      state.isUpdateError = false
      state.isUpdateLoading = true
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
    builder.addCase(changePassword.pending, (state, action) => {
      state.isChangePasswordError = false
      state.isChangePasswordLoading = true
    })
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isChangePasswordError = false
      state.isChangePasswordLoading = false
      state.isChangePasswordSuccessSnackBarOpen = true
    })
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isChangePasswordError = true
      state.isChangePasswordLoading = false
    })
  },
})

export const {
  saveToken,
  setUpdateUserError,
  stopUpdateUserLoading,
  closeChangePasswordSuccess,
  setProfile,
} = userSlice.actions

export default userSlice.reducer
