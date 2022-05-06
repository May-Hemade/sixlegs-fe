import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import Product from "../../types/Product"

import { RootState } from "../store"

export interface ProductState {
  products: Product[]
  isGetLoading: boolean
  isGetError: boolean
}

const initialState: ProductState = {
  products: [],
  isGetLoading: true,
  isGetError: false,
}

export const getProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("product/getProducts", async (arg, { getState, rejectWithValue }) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/product`, {
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isGetError = false
      state.isGetLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isGetError = false
      state.isGetLoading = false
    })
    builder.addCase(getProducts.rejected, (state) => {
      state.isGetError = true
      state.isGetLoading = false
    })
  },
})

export default productSlice.reducer
