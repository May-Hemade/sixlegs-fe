import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { Container, LinearProgress, Stack } from "@mui/material"
import "../pages/profile.css"
import Box from "@mui/material/Box"

import { Add } from "@mui/icons-material"
import PersonalListing from "./PersonalListing"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useEffect } from "react"
import { getMyListings } from "../redux/reducers/listingSlice"

export default function PersonalListingList() {
  const listingState = useAppSelector((state) => state.listing)
  console.log(listingState.myListings)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMyListings())
  }, [])
  return (
    <Container
      component="main"
      maxWidth="md"
      className="profile-container"
      sx={{ mx: "200px" }}
    >
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
            <Add />
          </div>
        </Box>
        <Box sx={{ p: 3 }}>
          {listingState.isGetLoading && !listingState.isGetError && (
            <Box sx={{ p: 4 }}>
              <LinearProgress color="secondary" />
            </Box>
          )}

          {listingState.myListings.length > 0 && !listingState.isGetError && (
            <Stack sx={{ p: 3 }} spacing={2}>
              {listingState.myListings.map((listing) => (
                <PersonalListing listing={listing} key={listing.id} />
              ))}
            </Stack>
          )}
          {listingState.myListings.length === 0 && !listingState.isGetError && (
            <Typography variant="body1">
              Add a Listing to become a host
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  )
}
