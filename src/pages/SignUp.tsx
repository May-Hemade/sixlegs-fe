import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { FaGoogle } from "react-icons/fa"
import { Divider } from "@mui/material"
import { useAppDispatch } from "../redux/hooks"
import { showErrorSnackbar } from "../redux/reducers/snackbarSlice"
import AppSnackbar from "../components/AppSnackbar"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        SixLegs
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    register({
      firstName: data.get("firstName")?.toString(),
      lastName: data.get("lastName")?.toString(),
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    })
  }
  interface UserRegisteration {
    firstName: string | undefined
    lastName: string | undefined
    email: string | undefined
    password: string | undefined
  }

  const register = async (newUser: UserRegisteration) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json" },
      })
      if (res.status !== 200) {
        dispatch(showErrorSnackbar("Registration failed"))
      }
      if (res.ok) {
        navigate("/signin")
      }
    } catch (error) {
      dispatch(showErrorSnackbar("Registration failed"))
    }
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

          <Grid md={6}>
            <Divider sx={{ my: 5 }} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href={`${process.env.REACT_APP_BE_URL}/user/googleLogin`}
              startIcon={<FaGoogle />}
            >
              Continue with Google
            </Button>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
