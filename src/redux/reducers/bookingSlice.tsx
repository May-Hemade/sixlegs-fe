import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Booking } from "../../types/Booking"
import Listing from "../../types/Listing"
import { SendBooking } from "../../types/SendBooking"

import { RootState } from "../store"
import { showErrorSnackbar, showSuccessSnackbar } from "./snackbarSlice"

export interface BookinState {
  isCreateLoading: boolean
  isCreateError: boolean

  listingBookings?: Listing
  isGetListingBookingsLoading: boolean
  isGetListingBookingsError: boolean
}

const initialState: BookinState = {
  isCreateError: false,
  isCreateLoading: false,
  listingBookings: undefined,
  isGetListingBookingsLoading: false,
  isGetListingBookingsError: false,
}

export const createBooking = createAsyncThunk<
  Booking,
  SendBooking,
  { state: RootState }
>(
  "booking/createBooking",
  async (booking, { getState, rejectWithValue, dispatch }) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/listing/${booking.listingId}/booking`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        }
      )
      if (response.ok) {
        let result = await response.json()
        dispatch(showSuccessSnackbar("Booking create successfully 😊"))
        return result
      } else {
        dispatch(
          showErrorSnackbar("An error occurred 😔. Please try again later.")
        )
        return rejectWithValue("Couldn't create booking")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getListingBookings = createAsyncThunk<
  Listing,
  number,
  { state: RootState }
>(
  "booking/getListingBookings",
  async (listingId, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/listing/${listingId}/booking`,
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      )
      if (response.ok) {
        let result = await response.json()
        return result
      } else {
        return rejectWithValue("Couldn't get bookings")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.isCreateError = false
      state.isCreateLoading = true
    })
    builder.addCase(createBooking.fulfilled, (state) => {
      state.isCreateError = false
      state.isCreateLoading = false
    })
    builder.addCase(createBooking.rejected, (state) => {
      state.isCreateError = true
      state.isCreateLoading = false
    })

    builder.addCase(getListingBookings.pending, (state) => {
      state.isCreateError = false
      state.isCreateLoading = true
    })
    builder.addCase(getListingBookings.fulfilled, (state, action) => {
      state.listingBookings = action.payload
      state.isCreateError = false
      state.isCreateLoading = false
    })
    builder.addCase(getListingBookings.rejected, (state) => {
      state.isGetListingBookingsLoading = false
      state.isGetListingBookingsError = true
    })
  },
})

export default bookingSlice.reducer
