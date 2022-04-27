import { AlertColor } from "@mui/material"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SnackbarState {
  message: string
  severity: AlertColor
  isOpen: boolean
}

const initialState: SnackbarState = {
  message: "",
  severity: "success",
  isOpen: false,
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSuccessSnackbar: (state, action: PayloadAction<string>) => {
      state.severity = "success"
      state.message = action.payload
      state.isOpen = true
    },

    showErrorSnackbar: (state, action: PayloadAction<string>) => {
      state.severity = "error"
      state.message = action.payload
      state.isOpen = true
    },

    showInfoSnackbar: (state, action: PayloadAction<string>) => {
      state.severity = "info"
      state.message = action.payload
      state.isOpen = true
    },

    hideSnackbar: (state) => {
      state.isOpen = false
    },
  },
})

export const {
  showSuccessSnackbar,
  showErrorSnackbar,
  showInfoSnackbar,
  hideSnackbar,
} = snackbarSlice.actions

export default snackbarSlice.reducer
