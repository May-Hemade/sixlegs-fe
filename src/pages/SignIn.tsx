import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Divider, Link } from "@mui/material"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { FaGoogle } from "react-icons/fa"
import { useAppDispatch } from "../redux/hooks"
import { saveToken, setProfile } from "../redux/reducers/userSlice"
import AppSnackbar from "../components/AppSnackbar"
import { showErrorSnackbar } from "../redux/reducers/snackbarSlice"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link component={RouterLink} color="inherit" to="/"></Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    login({
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    })
  }

  interface UserLogin {
    email: string | undefined
    password: string | undefined
  }

  const login = async (data: UserLogin) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      })
      if (!res.ok) {
        dispatch(showErrorSnackbar("You entered wrong password or email"))
      } else {
        let result = await res.json()

        dispatch(saveToken(result.accessToken))
        dispatch(setProfile(result.profile))

        navigate("/")
      }
    } catch (error) {
      dispatch(showErrorSnackbar("Login failed"))
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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
              startIcon={<FaGoogle className="iconssRegister" />}
            >
              Continue with Google
            </Button>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
