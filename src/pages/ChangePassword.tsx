import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button, CssBaseline, Stack, Typography } from "@mui/material"
import { Container } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  changePassword,
  closeChangePasswordSuccess,
} from "../redux/reducers/userSlice"
import ChangePasswordData from "../types/ChangePasswordData"
import { useState } from "react"
import AppSnackbar from "../components/AppSnackbar"
import { showErrorSnackbar } from "../redux/reducers/snackbarSlice"

export default function ChangePassword() {
  const dispatch = useAppDispatch()
  const userState = useAppSelector((state) => state.user)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const currentPassword = data.get("currentPassword")!.toString()
    const newPassword = data.get("newPassword")!.toString()
    const confirmPassword = data.get("confirmPassword")!.toString()

    if (newPassword !== confirmPassword) {
      dispatch(showErrorSnackbar("Passwords don't match"))
      return
    }

    const changePasswordData: ChangePasswordData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    }

    dispatch(changePassword(changePasswordData))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <AppSnackbar />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        sx={{ mt: 5 }}
      >
        <Stack spacing={2}>
          <TextField
            id="current-password"
            label="Current Password"
            type="password"
            autoComplete="current-password"
            name="currentPassword"
            required
          />
          <TextField
            id="new-password"
            label="New Password"
            type="password"
            autoComplete="password"
            name="newPassword"
            required
          />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
          />
        </Stack>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  )
}
