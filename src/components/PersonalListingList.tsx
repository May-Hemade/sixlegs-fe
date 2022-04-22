import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { Container, Stack } from "@mui/material"
import "../pages/profile.css"
import Box from "@mui/material/Box"

import { Add } from "@mui/icons-material"
import PersonalListing from "./PersonalListing"

export default function PersonalListingList() {
  return (
    <Container
      component="main"
      maxWidth="md"
      className="profile-container"
      sx={{ mx: "200px" }}
    >
      <Paper elevation={3}>
        <Box
          sx={{ justifyContent: "space-between", display: "flex", m: 3, p: 3 }}
        >
          <Typography component="span" variant="h5">
            My Listings
          </Typography>
          <div>
            <Add />
          </div>
        </Box>
        <Stack sx={{ p: 3 }} spacing={2}>
          {/* <PersonalListing />
          <PersonalListing /> */}
        </Stack>
      </Paper>
    </Container>
  )
}
