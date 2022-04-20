import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button, CssBaseline, Stack, Typography } from "@mui/material"
import { Container } from "@mui/material"

export default function ChangePassword() {
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
          Change Password
        </Typography>
      </Box>

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 5 }}>
        <Stack spacing={2}>
          <TextField
            id="current-password"
            label="Current Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <TextField
            id="new-password"
            label="New Password"
            type="password"
            autoComplete="password"
            required
          />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            type="password"
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
