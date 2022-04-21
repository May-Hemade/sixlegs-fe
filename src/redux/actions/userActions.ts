import { AppThunk } from "../store"

export const SAVE_TOKEN = "SAVE_TOKEN"
export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"

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
        //   dispatch({
        //     type: STOP_FORECAST_LOADING,
        //   })
      } else {
        console.log("error happened fetching the user")

        //   dispatch({
        //     type: SET_FORECAST_ERROR,
        //   })
        //   dispatch({
        //     type: STOP_FORECAST_LOADING,
        //   })
      }
    } catch (error) {
      console.log(error)

      // dispatch({
      //   type: SET_FORECAST_ERROR,
      // })
      // dispatch({
      //   type: STOP_FORECAST_LOADING,
      // })
    }
  }, 1000)
}
