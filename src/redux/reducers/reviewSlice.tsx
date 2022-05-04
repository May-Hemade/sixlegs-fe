import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Review from "../../types/Review"
import { SendReview } from "../../types/SendReview"

import { RootState } from "../store"

export interface ReviewState {
  addedReview?: Review
  isAddLoadingReview: boolean
  isAddErrorReview: boolean
  listingReviews: Review[]
  isGetLoadingReview: boolean
  isGetErrorReview: boolean
}

const initialState: ReviewState = {
  addedReview: undefined,
  isAddLoadingReview: false,
  isAddErrorReview: false,
  listingReviews: [],
  isGetLoadingReview: true,
  isGetErrorReview: false,
}

export const addReview = createAsyncThunk<
  Review,
  SendReview,
  { state: RootState }
>("review/addReview", async (review, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/listing/${review.listingId}/review`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    )
    if (response.ok) {
      let result = await response.json()
      return result
    } else {
      return rejectWithValue("Couldn't create review")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getReviews = createAsyncThunk<
  Review[],
  number,
  { state: RootState }
>("review/getReview", async (listingId, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/listing/${listingId}/review`,
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
      return rejectWithValue("Couldn't get reviews")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addReview.pending, (state) => {
      state.isAddErrorReview = false
      state.isAddLoadingReview = true
    })
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.listingReviews.push(action.payload)
      state.isAddErrorReview = false
      state.isAddLoadingReview = false
    })
    builder.addCase(addReview.rejected, (state) => {
      state.isAddErrorReview = true
      state.isAddLoadingReview = false
    })

    builder.addCase(getReviews.pending, (state) => {
      state.isGetErrorReview = false
      state.isGetLoadingReview = true
    })
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.listingReviews = action.payload
      state.isGetErrorReview = false
      state.isGetLoadingReview = false
    })
    builder.addCase(getReviews.rejected, (state) => {
      state.isGetErrorReview = true
      state.isGetLoadingReview = false
    })
  },
})

export default reviewSlice.reducer
