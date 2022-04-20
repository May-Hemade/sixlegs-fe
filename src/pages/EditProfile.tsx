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

export default function EditProfile() {
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

      <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off">
        <Stack spacing={2}>
          <TextField
            required
            id="first-name"
            name="first-name"
            label="First Name"
          />
          <TextField
            required
            id="last-name"
            name="last-name"
            label="Last Name"
          />
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="email"
          />
          <TextField
            multiline
            minRows={2}
            maxRows={5}
            label="Description"
            id="fullWidth"
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
