import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import Pet from "../../types/Pet"

import { RootState } from "../store"

export interface PetState {
  addedPet?: Pet
  isAddLoading: boolean
  isAddError: boolean
  myPets: Pet[]
  isGetLoading: boolean
  isGetError: boolean
  petById?: Pet
  isGetByIdLoading: boolean
  isGetByIdError: boolean
  petByIdUpdate?: Pet
  isUpdateByIdLoading: boolean
  isUpdateByIdError: boolean
}

const initialState: PetState = {
  addedPet: undefined,
  isAddLoading: true,
  isAddError: false,
  myPets: [],
  isGetLoading: true,
  isGetError: false,
  petById: undefined,
  isGetByIdLoading: false,
  isGetByIdError: false,
  petByIdUpdate: undefined,
  isUpdateByIdLoading: false,
  isUpdateByIdError: false,
}

export const addPet = createAsyncThunk<Pet, Pet, { state: RootState }>(
  "pet/addPet",
  async (pet, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/pet`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      })
      if (response.ok) {
        let result = await response.json()
        return result
      } else {
        return rejectWithValue("Couldn't create pet")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updatePetById = createAsyncThunk<Pet, Pet, { state: RootState }>(
  "pet/updatePetById",
  async (pet, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/pet/${pet.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pet),
        }
      )
      if (response.ok) {
        let result = await response.json()
        console.log(result)
        return result
      } else {
        return rejectWithValue("Couldn't update your pet")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getMyPets = createAsyncThunk<Pet[], void, { state: RootState }>(
  "pet/getMyPets",
  async (arg, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/pet/me`, {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      })
      if (response.ok) {
        let result = await response.json()
        return result
      } else {
        return rejectWithValue("error happened fetching your pets")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getPetById = createAsyncThunk<Pet, number, { state: RootState }>(
  "pet/getPetById",
  async (petId, { getState, rejectWithValue }) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/pet/${petId}`,
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
        return rejectWithValue("error happened fetching your pet")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPet.pending, (state) => {
      state.isAddError = false
      state.isAddLoading = true
    })
    builder.addCase(addPet.fulfilled, (state, action) => {
      state.addedPet = action.payload
      state.isAddError = false
      state.isAddLoading = false
    })
    builder.addCase(addPet.rejected, (state) => {
      state.isAddError = true
      state.isAddLoading = false
    })
    builder.addCase(getMyPets.pending, (state) => {
      state.isGetError = false
      state.isGetLoading = true
    })
    builder.addCase(getMyPets.fulfilled, (state, action) => {
      state.myPets = action.payload
      state.isGetError = false
      state.isGetLoading = false
    })
    builder.addCase(getMyPets.rejected, (state) => {
      state.isGetError = true
      state.isGetLoading = false
    })

    builder.addCase(getPetById.pending, (state) => {
      state.isGetByIdLoading = true
      state.isGetByIdError = false
    })
    builder.addCase(getPetById.fulfilled, (state, action) => {
      state.petById = action.payload
      state.isGetByIdError = false
      state.isGetByIdLoading = false
    })
    builder.addCase(getPetById.rejected, (state) => {
      state.isGetByIdError = true
      state.isGetByIdLoading = false
    })

    builder.addCase(updatePetById.pending, (state) => {
      state.isUpdateByIdLoading = true
      state.isUpdateByIdError = false
    })
    builder.addCase(updatePetById.fulfilled, (state, action) => {
      state.petById = action.payload
      state.isUpdateByIdError = false
      state.isUpdateByIdLoading = false
    })
    builder.addCase(updatePetById.rejected, (state) => {
      state.isUpdateByIdError = true
      state.isUpdateByIdLoading = false
    })
  },
})

export default petSlice.reducer
