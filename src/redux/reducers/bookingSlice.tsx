import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Booking } from "../../types/Booking"
import { SendBooking } from "../../types/SendBooking"

import { RootState } from "../store"

export interface BookinState {
  isCreateLoading: boolean
  isCreateError: boolean

  listingBookings: Booking[]
  isGetListingBookingsLoading: boolean
  isGetListingBookingsError: boolean
}

const initialState: BookinState = {
  isCreateError: false,
  isCreateLoading: false,
  listingBookings: [],
  isGetListingBookingsLoading: false,
  isGetListingBookingsError: false,
}

export const createBooking = createAsyncThunk<
  Booking,
  SendBooking,
  { state: RootState }
>("booking/createBooking", async (booking, { getState, rejectWithValue }) => {
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
      return result
    } else {
      return rejectWithValue("Couldn't create booking")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getListingBookings = createAsyncThunk<
  Booking[],
  number,
  { state: RootState }
>("booking/createBooking", async (listingId, { getState, rejectWithValue }) => {
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
})

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.isCreateError = false
      state.isCreateLoading = true
    })
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.isCreateError = false
      state.isCreateLoading = false
    })
    builder.addCase(createBooking.rejected, (state) => {
      state.isCreateError = true
      state.isCreateLoading = false
    })

    // builder.addCase(createBooking.pending, (state) => {
    //   state.isCreateError = false
    //   state.isCreateLoading = true
    // })
    // builder.addCase(createBooking.fulfilled, (state, action) => {
    //   state.isCreateError = false
    //   state.isCreateLoading = false
    // })
    // builder.addCase(createBooking.rejected, (state) => {
    //   state.isCreateError = true
    //   state.isCreateLoading = false
    // })
  },
})

export default bookingSlice.reducer
