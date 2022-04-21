import { initialState } from "../store"
import { AnyAction } from "redux"

const homeReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state
  }
}

export default homeReducer
