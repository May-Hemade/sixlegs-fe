import { initialState } from "../store"
import { AnyAction } from "redux"
import { SAVE_TOKEN } from "../actions/userActions"

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
