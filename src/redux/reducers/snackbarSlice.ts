import { createSlice } from "@reduxjs/toolkit"

export interface SnackbarState {}

const initialState: SnackbarState = {}

export const userSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {},
})
