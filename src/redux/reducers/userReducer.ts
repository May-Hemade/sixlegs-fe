import { initialState } from "../store"
import { AnyAction } from "redux"
import {
  GET_USER,
  SAVE_TOKEN,
  SET_UPDATE_USER_ERROR,
  SET_USER_ERROR,
  STOP_UPDATE_USER_LOADING,
  STOP_USER_LOADING,
} from "../actions/userActions"

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
        isError: false,
      }

    case SET_USER_ERROR:
      return {
        ...state,
        isError: true,
      }
    case STOP_USER_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    case SET_UPDATE_USER_ERROR:
      return {
        ...state,
        isUpdateError: true,
      }
    case STOP_UPDATE_USER_LOADING:
      return {
        ...state,
        isUpdateLoading: false,
      }

    default:
      return state
  }
}

export default userReducer
