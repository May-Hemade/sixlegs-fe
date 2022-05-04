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
  listingById?: Listing
  isGetByIdLoading: boolean
  isGetByIdError: boolean
  listingByIdUpdate?: Listing
  isUpdateByIdLoading: boolean
  isUpdateByIdError: boolean
}

const initialState: ListingState = {
  addedListing: undefined,
  isAddLoading: false,
  isAddError: false,
  myListings: [],
  isGetLoading: true,
  isGetError: false,
  listingById: undefined,
  isGetByIdLoading: false,
  isGetByIdError: false,
  listingByIdUpdate: undefined,
  isUpdateByIdLoading: false,
  isUpdateByIdError: false,
}

export const addListing = createAsyncThunk<
  Listing,
  Listing,
  { state: RootState }
>("listing/addListing", async (listing, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/listing`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getState().user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
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

export const updateListingById = createAsyncThunk<
  Listing,
  Listing,
  { state: RootState }
>(
  "listing/updateListingById",
  async (listing, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/listing/${listing.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listing),
        }
      )
      if (response.ok) {
        let result = await response.json()
        console.log(result)
        return result
      } else {
        return rejectWithValue("Couldn't update listing")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

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

export const getListingById = createAsyncThunk<
  Listing,
  number,
  { state: RootState }
>(
  "listing/getListingsById",
  async (listingId, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/listing/${listingId}`,
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
        return rejectWithValue("error happened fetching the listing")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const listingSlice = createSlice({
  name: "lisitng",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addListing.pending, (state) => {
      state.isAddError = false
      state.isAddLoading = true
    })
    builder.addCase(addListing.fulfilled, (state, action) => {
      state.addedListing = action.payload
      state.isAddError = false
      state.isAddLoading = false
    })
    builder.addCase(addListing.rejected, (state) => {
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
    builder.addCase(getListingById.pending, (state) => {
      state.isGetByIdLoading = true
      state.isGetByIdError = false
    })
    builder.addCase(getListingById.fulfilled, (state, action) => {
      state.listingById = action.payload
      state.isGetByIdError = false
      state.isGetByIdLoading = false
    })
    builder.addCase(getListingById.rejected, (state) => {
      state.isGetByIdError = true
      state.isGetByIdLoading = false
    })

    builder.addCase(updateListingById.pending, (state) => {
      state.isUpdateByIdLoading = true
      state.isUpdateByIdError = false
    })
    builder.addCase(updateListingById.fulfilled, (state, action) => {
      state.listingById = action.payload
      state.isUpdateByIdError = false
      state.isUpdateByIdLoading = false
    })
    builder.addCase(updateListingById.rejected, (state) => {
      state.isUpdateByIdError = true
      state.isUpdateByIdLoading = false
    })
  },
})

export default listingSlice.reducer
