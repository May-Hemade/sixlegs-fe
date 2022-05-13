import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {
  Avatar,
  Button,
  ButtonBase,
  CircularProgress,
  CssBaseline,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material"

import { Link as RouterLink, useParams } from "react-router-dom"
import { Container } from "@mui/material"
import UploadImageDialog from "../components/UploadImageDialog"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useEffect, useState } from "react"

import {
  addListing,
  clearListingById,
  deleteImage,
  getListingById,
  setListingById,
  updateListingById,
} from "../redux/reducers/listingSlice"
import Listing from "../types/Listing"
import AppSnackbar from "../components/AppSnackbar"
import { HighlightOff } from "@mui/icons-material"

export default function EditListing() {
  const listingState = useAppSelector((state) => state.listing)
  const [title, setTitle] = useState("")
  const dispatch = useAppDispatch()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      const listingId = parseInt(params.id)
      setTitle("Edit Listing")
      dispatch(getListingById(listingId))
    } else {
      setTitle("Add Listing")
      dispatch(clearListingById())
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
      images: listingState.listingById?.images ?? [],
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

      <AppSnackbar />

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
              {title}
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

            <Box sx={{ my: 4 }}>
              {listingState.listingById &&
                listingState.listingById.images &&
                listingState.listingById.images.length > 0 && (
                  <ImageList
                    sx={{ width: 500, height: 250 }}
                    cols={3}
                    rowHeight={164}
                  >
                    {listingState.listingById.images.map((image) => (
                      <ImageListItem key={image.id}>
                        <Box
                          sx={{ position: "relative", width: 150, height: 150 }}
                        >
                          <img
                            style={{
                              width: 150,
                              height: 150,
                              objectFit: "cover",
                            }}
                            src={image.url}
                            srcSet={image.url}
                            loading="lazy"
                          />
                          <IconButton
                            onClick={() => dispatch(deleteImage(image.id))}
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              zIndex: 1,
                            }}
                          >
                            <HighlightOff htmlColor="grey" />
                          </IconButton>
                        </Box>
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}

              <UploadImageDialog
                url={`${process.env.REACT_APP_BE_URL}/listing/${listingState.listingById?.id}/images`}
                property="listingImage"
                buttonTitle="Upload Image"
                onSuccess={(listing) => {
                  dispatch(setListingById(listing))
                }}
              ></UploadImageDialog>
            </Box>
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
