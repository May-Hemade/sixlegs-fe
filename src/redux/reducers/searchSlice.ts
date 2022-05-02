import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import Listing from "../../types/Listing"
import { Boundingbox, SearchLocation } from "../../types/SearchLocation"
import { RootState } from "../store"
import { Range } from "react-date-range"

export interface SearchState {
  searchCityResults: SearchLocation[]
  isCityLoading: boolean
  isCityError: boolean
  selectedLocation: SearchLocation | null
  searchListingsResult: Listing[]
  isSearchListingLoading: boolean
  isSearchListingError: boolean
  startDate?: number
  endDate?: number
}

const initialState: SearchState = {
  searchCityResults: [],
  isCityLoading: true,
  isCityError: false,
  selectedLocation: null,
  searchListingsResult: [],
  isSearchListingLoading: true,
  isSearchListingError: false,
  startDate: new Date().getTime(),
  endDate: new Date().getTime(),
}

export const searchCity = createAsyncThunk<
  SearchLocation[],
  string,
  { state: RootState }
>("search/searchCity", async (city, { rejectWithValue }) => {
  try {
    let response = await fetch(`https://geocode.maps.co/search?q=${city}`)
    if (response.ok) {
      let result = await response.json()
      return result
    } else {
      return rejectWithValue("error happened while searching for the city")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const searchListings = createAsyncThunk<
  Listing[],
  Boundingbox,
  { state: RootState }
>("search/searchListings", async (options, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/listing`, {
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

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelectedLocation: (
      state,
      action: PayloadAction<SearchLocation | null>
    ) => {
      state.selectedLocation = action.payload
    },
    setDateRange: (state, action: PayloadAction<Range>) => {
      state.startDate = action.payload.startDate?.getTime()
      state.endDate = action.payload.endDate?.getTime()
    },
  },

  extraReducers: (builder) => {
    builder.addCase(searchCity.fulfilled, (state, action) => {
      state.searchCityResults = action.payload
      state.isCityError = false
      state.isCityLoading = false
    })

    builder.addCase(searchCity.rejected, (state) => {
      state.isCityError = true
      state.isCityLoading = false
    })
    builder.addCase(searchCity.pending, (state) => {
      state.isCityError = false
      state.isCityLoading = true
    })
    builder.addCase(searchListings.fulfilled, (state, action) => {
      state.searchListingsResult = action.payload
      state.isSearchListingError = false
      state.isSearchListingLoading = false
    })

    builder.addCase(searchListings.rejected, (state) => {
      state.isSearchListingError = true
      state.isSearchListingLoading = false
    })
    builder.addCase(searchListings.pending, (state) => {
      state.isSearchListingError = false
      state.isSearchListingLoading = true
    })
  },
})

export const { setSelectedLocation, setDateRange } = searchSlice.actions

export default searchSlice.reducer
