import User from "../../types/User"
import { AppThunk } from "../store"

export const SAVE_TOKEN = "SAVE_TOKEN"
export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const STOP_USER_LOADING = "STOP_USER_LOADING"
export const SET_USER_ERROR = "SET_USER_ERROR"
export const STOP_UPDATE_USER_LOADING = "STOP_UPDATE_USER_LOADING"
export const SET_UPDATE_USER_ERROR = "SET_UPDATE_USER_ERROR"

export const saveTokenAction = (token: string) => ({
  type: SAVE_TOKEN,
  payload: token,
})

export const getUserAction = (): AppThunk => async (dispatch, getState) => {
  setTimeout(async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      })
      if (response.ok) {
        let result = await response.json()
        console.log("hello user", result)
        dispatch({
          type: GET_USER,
          payload: result,
        })
        dispatch({
          type: STOP_USER_LOADING,
        })
      } else {
        console.log("error happened fetching the user")

        dispatch({
          type: SET_USER_ERROR,
        })
        dispatch({
          type: STOP_USER_LOADING,
        })
      }
    } catch (error) {
      console.log(error)

      dispatch({
        type: SET_USER_ERROR,
      })
      dispatch({
        type: STOP_USER_LOADING,
      })
    }
  }, 1000)
}

export const postUserAction =
  (data: User): AppThunk =>
  async (dispatch, getState) => {
    setTimeout(async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_BE_URL}/user/me`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        if (response.ok) {
          let result = await response.json()
          console.log("hello user", result)
          dispatch({
            type: UPDATE_USER,
            payload: result,
          })
          dispatch({
            type: STOP_UPDATE_USER_LOADING,
          })
        } else {
          console.log("error happened fetching the user")

          dispatch({
            type: SET_UPDATE_USER_ERROR,
          })
          dispatch({
            type: STOP_UPDATE_USER_LOADING,
          })
        }
      } catch (error) {
        console.log(error)

        dispatch({
          type: SET_UPDATE_USER_ERROR,
        })
        dispatch({
          type: STOP_UPDATE_USER_LOADING,
        })
      }
    }, 1000)
  }
