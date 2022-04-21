import { initialState } from "../store"
import { AnyAction } from "redux"
import { GET_USER, SAVE_TOKEN } from "../actions/userActions"

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      }

    case GET_USER:
      return {
        ...state,
        profile: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
