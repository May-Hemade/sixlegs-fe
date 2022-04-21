export const SAVE_TOKEN = "SAVE_TOKEN"

export const UPDATE_USER = "UPDATE_USER"

export const saveTokenAction = (token: string) => ({
  type: SAVE_TOKEN,
  payload: token,
})
