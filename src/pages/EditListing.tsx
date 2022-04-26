import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {
  Avatar,
  Button,
  ButtonBase,
  CircularProgress,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material"

import { Link as RouterLink, useParams } from "react-router-dom"
import { Container } from "@mui/material"
import UploadImageDialog from "../components/UploadImageDialog"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useEffect } from "react"

import {
  addListing,
  getListingsById,
  updateListingById,
} from "../redux/reducers/listingSlice"
import Listing from "../types/Listing"

export default function EditListing() {
  const listingState = useAppSelector((state) => state.listing)
  const dispatch = useAppDispatch()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      const listingId = parseInt(params.id)
      dispatch(getListingsById(listingId))
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const listing: Listing = {
      id: listingState.listingById?.id,
      address: data.get("address")!.toString(),
      pricePerNight: parseFloat(data.get("pricePerNight")!.toString()),
      listingName: data.get("listingName")!.toString(),
      description: data.get("description")!.toString(),
    }

    if (!params.id) {
      dispatch(addListing(listing))
    } else {
      dispatch(updateListingById(listing))
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      {listingState.isGetByIdLoading && (
        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {!listingState.isGetByIdLoading && !listingState.isGetByIdError && (
        <Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Edit Listing
            </Typography>
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
                id="listingName"
                name="listingName"
                label="Listing Name"
                defaultValue={listingState.listingById?.listingName}
              />
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                defaultValue={listingState.listingById?.address}
              />
              <TextField
                required
                id="Price Per Night"
                name="pricePerNight"
                label="pricePerNight"
                type="number"
                defaultValue={listingState.listingById?.pricePerNight}
              />
              <TextField
                multiline
                minRows={2}
                maxRows={5}
                name="description"
                label="Description"
                id="fullWidth"
                defaultValue={listingState.listingById?.description}
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
        </Box>
      )}
    </Container>
  )
}
