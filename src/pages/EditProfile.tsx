import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {
  Avatar,
  Button,
  ButtonBase,
  CssBaseline,
  Link,
  Stack,
  Typography,
} from "@mui/material"

import { Link as RouterLink } from "react-router-dom"
import { Container } from "@mui/material"
import UploadImageDialog from "../components/UploadImageDialog"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/hooks"
import { useEffect } from "react"
import { getUserAction, postUserAction } from "../redux/actions/userActions"
import User from "../types/User"

export default function EditProfile() {
  const userState = useAppSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAction())
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const user: User = {
      firstName: data.get("firstName")!.toString(),
      lastName: data.get("lastName")!.toString(),
      email: data.get("email")!.toString(),
      description: data.get("description")!.toString(),
    }
    dispatch(postUserAction(user))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>

        <ButtonBase
          sx={{ width: 100, height: 100, m: 4 }}
          className="avatar-profile"
        >
          <Avatar className="avatar-profile" sx={{ width: 100, height: 100 }} />
        </ButtonBase>
        <UploadImageDialog
          url=""
          property=""
          onSuccess={() => {}}
        ></UploadImageDialog>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2 }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <TextField
            required
            id="first-name"
            name="firstName"
            label="First Name"
            defaultValue={userState.profile.firstName}
          />
          <TextField
            required
            id="last-name"
            name="lastName"
            label="Last Name"
            defaultValue={userState.profile.lastName}
          />
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            defaultValue={userState.profile.email}
          />
          <TextField
            multiline
            minRows={2}
            maxRows={5}
            name="description"
            label="Description"
            id="fullWidth"
            defaultValue={userState.profile.description}
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

        <Link component={RouterLink} to="/change-password" variant="body2">
          Change Password
        </Link>
      </Box>
    </Container>
  )
}
