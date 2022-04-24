import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { add } from "lodash"
import ChangePasswordData from "../../types/ChangePasswordData"
import Listing from "../../types/Listing"
import User from "../../types/User"
import { RootState } from "../store"

export interface ListingState {
  addedListing?: Listing
  isAddLoading: boolean
  isAddError: boolean
  myListings: Listing[]
  isGetLoading: boolean
  isGetError: boolean
}

const initialState: ListingState = {
  addedListing: undefined,
  isAddLoading: true,
  isAddError: false,
  myListings: [],
  isGetLoading: true,
  isGetError: false,
}

export const addLisiting = createAsyncThunk<
  Listing,
  Listing,
  { state: RootState }
>("lisitng/addLisiting", async (lisitng, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/lisitng`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getState().user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lisitng),
    })
    if (response.ok) {
      let result = await response.json()
      return result
    } else {
      return rejectWithValue("Couldn't create listing")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getMyListings = createAsyncThunk<
  Listing[],
  void,
  { state: RootState }
>("listing/getMyListings", async (arg, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/listing/me`, {
      headers: {
        Authorization: `Bearer ${getState().user.token}`,
      },
    })
    if (response.ok) {
      let result = await response.json()
      return result
    } else {
      return rejectWithValue("error happened fetching the listings")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const listingSlice = createSlice({
  name: "lisitng",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLisiting.pending, (state) => {
      state.isAddError = false
      state.isAddLoading = true
    })
    builder.addCase(addLisiting.fulfilled, (state, action) => {
      state.addedListing = action.payload
      state.isAddError = false
      state.isAddLoading = false
    })
    builder.addCase(addLisiting.rejected, (state) => {
      state.isAddError = true
      state.isAddLoading = false
    })
    builder.addCase(getMyListings.pending, (state) => {
      state.isGetError = false
      state.isGetLoading = true
    })
    builder.addCase(getMyListings.fulfilled, (state, action) => {
      state.myListings = action.payload
      state.isGetError = false
      state.isGetLoading = false
    })
    builder.addCase(getMyListings.rejected, (state) => {
      state.isGetError = true
      state.isGetLoading = false
    })
  },
})

export default listingSlice.reducer
