import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { IconButton } from "@mui/material"
import { Container, LinearProgress, Stack } from "@mui/material"
import "../../pages/profile.css"
import Box from "@mui/material/Box"
import { Add } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect } from "react"
import { getMyListings } from "../../redux/reducers/listingSlice"

import { Link as RouterLink } from "react-router-dom"
import PersonalListing from "./PersonalListing"

export default function MyListings() {
  const listingState = useAppSelector((state) => state.listing)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMyListings())
  }, [])
  return (
    <Container component="main" maxWidth="md" className="profile-container">
      <Paper elevation={3}>
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            p: 3,
          }}
        >
          <Typography component="span" variant="h5">
            My Listings
          </Typography>
          <div>
            <IconButton component={RouterLink} to="/add-listing">
              <Add />
            </IconButton>
          </div>
        </Box>
        <Box sx={{ p: 0 }}>
          {listingState.isGetLoading && !listingState.isGetError && (
            <Box sx={{ p: 4 }}>
              <LinearProgress color="secondary" />
            </Box>
          )}

          {listingState.myListings.length > 0 && !listingState.isGetError && (
            <Stack sx={{ px: 3, pb: 3 }} spacing={2}>
              {listingState.myListings.map((listing) => (
                <PersonalListing listing={listing} key={listing.id} />
              ))}
            </Stack>
          )}
          {listingState.myListings.length === 0 &&
            !listingState.isGetError &&
            !listingState.isGetLoading && (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography> Add a Listing to becaome a host :) </Typography>
              </Box>
            )}
        </Box>
      </Paper>
    </Container>
  )
}
