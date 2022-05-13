import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HoverRating from "../components/Rating"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getListingById } from "../redux/reducers/listingSlice"
import { setDateRange } from "../redux/reducers/searchSlice"
import { DateRange, Range } from "react-date-range"
import { SendReview } from "../types/SendReview"
import {
  addReview,
  getReviews,
  setCurrentComment,
} from "../redux/reducers/reviewSlice"
import CheckLoggedIn from "../components/CheckLoggedIn"
import UserReview from "../components/UserReview"
import { SendBooking } from "../types/SendBooking"
import { createBooking, getAlreadyBooked } from "../redux/reducers/bookingSlice"
import { addDays, differenceInCalendarDays } from "date-fns"
import ConfirmationDialog from "../components/ConfirmationDialog"
import AppSnackbar from "../components/AppSnackbar"
import { showErrorSnackbar } from "../redux/reducers/snackbarSlice"
import { _renderMatches } from "react-router/lib/hooks"
import ChatButton from "../components/ChatButton"

function ListingDetails() {
  const searchState = useAppSelector((state) => state.search)
  const listingState = useAppSelector((state) => state.listing)
  const reviewState = useAppSelector((state) => state.review)
  const bookingState = useAppSelector((state) => state.booking)
  const [ratingValue, setRatingValue] = useState<number | null>(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { id } = useParams()
  const listingId = parseInt(id ?? "0")
  const dispatch = useAppDispatch()

  const handleDateRange = (ranges: Range[]) => {
    const dates: number[] = []
    dates.push(ranges[0].startDate?.getTime() ?? 0)
    dates.push(ranges[0].endDate?.getTime() ?? 0)
    dispatch(setDateRange(dates))
  }

  const imagesGrid = [
    {
      cols: 2,
      rows: 2,
    },
    {
      cols: 1,
      rows: 1,
    },
    {
      cols: 1,
      rows: 1,
    },
    {
      cols: 2,
      rows: 1,
    },
    {
      cols: 2,
      rows: 1,
    },
    {
      cols: 2,
      rows: 2,
    },
    {
      cols: 1,
      rows: 1,
    },
    {
      cols: 1,
      rows: 1,
    },
  ]

  const checkBookedDates = () => {
    const dateArray: Date[] = []
    if (bookingState.alreadyBooked) {
      bookingState.alreadyBooked.forEach((booking) => {
        const start = new Date(booking.checkInDate)
        const end = new Date(booking.checkOutDate)
        let current = start
        while (current <= end) {
          dateArray.push(new Date(current))
          current = addDays(current, 1)
        }
      })
    }

    return dateArray
  }

  const handleSubmitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (ratingValue === null || ratingValue === 0) {
      dispatch(showErrorSnackbar("Please set a rating from 1 to 5"))
      return
    }

    const review: SendReview = {
      rating: ratingValue,
      comment: data.get("comment")!.toString(),
      listingId: listingId,
    }
    dispatch(addReview(review))
  }

  const bookingConfirm = (confirm: boolean) => {
    setConfirmOpen(false)

    if (confirm) {
      performBooking()
    }
  }

  const performBooking = () => {
    const booking: SendBooking = {
      checkInDate: new Date(searchState.startDate ?? 0),
      checkOutDate: new Date(searchState.endDate ?? 0),
      listingId: listingId,
    }

    dispatch(createBooking(booking))
  }

  const dateRanges = () => {
    return [
      {
        startDate: new Date(searchState.startDate ?? new Date().getTime()),
        endDate: new Date(searchState.endDate ?? new Date().getTime()),
        key: "selection",
      },
    ]
  }

  const getNumberOfNights = () => {
    return differenceInCalendarDays(
      searchState.endDate ?? 0,
      searchState.startDate ?? 0
    )
  }

  const getTotalPrice = () => {
    return (listingState.listingById?.pricePerNight ?? 0) * getNumberOfNights()
  }

  const getConfirmBookingMessage = () => {
    return `Would you like to book ${
      listingState.listingById?.listingName
    } (${getNumberOfNights()} nights) for a total of ${getTotalPrice()}$?`
  }

  useEffect(() => {
    if (listingId) {
      dispatch(getListingById(listingId))
      dispatch(getReviews(listingId))
      dispatch(getAlreadyBooked(listingId))
    }
  }, [])

  useEffect(() => {
    setRatingValue(reviewState.currentRating)
  }, [reviewState.currentRating])

  return (
    <div>
      <CheckLoggedIn />
      <AppSnackbar />
      <Container maxWidth="md">
        {listingState.isGetByIdLoading && (
          <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
            <CircularProgress color="secondary" />
          </Box>
        )}

        {!listingState.isGetByIdLoading && !listingState.isGetByIdError && (
          <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Stack sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography component="span" variant="h6">
                    {listingState.listingById?.listingName}
                  </Typography>
                </Box>
                <Grid container spacing={30}>
                  <Grid item xs={6}>
                    <Stack spacing={2} sx={{ mt: 3 }}>
                      <div>
                        <Typography variant="overline" gutterBottom>
                          Address
                        </Typography>
                        <Typography variant="body1">
                          {listingState.listingById?.address}
                        </Typography>
                      </div>

                      <div>
                        <Typography variant="overline" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body1">
                          {listingState.listingById?.description}
                        </Typography>
                      </div>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={2} sx={{ mt: 3 }}>
                      <Box>
                        <HoverRating
                          showLabel={false}
                          value={5}
                          readOnly={true}
                        />
                      </Box>
                      <Box>
                        <Typography variant="overline" gutterBottom>
                          Price
                        </Typography>
                        <Typography variant="body1">
                          {listingState.listingById?.pricePerNight} $
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>

                <Typography
                  component="span"
                  variant="body2"
                  sx={{ mt: 3, fontWeight: "600" }}
                >
                  Hosted by
                </Typography>
                <Box sx={{ py: 2, display: "flex", alignItems: "center" }}>
                  <Avatar
                    className="avatar-profile"
                    sx={{ width: 40, height: 40 }}
                    src={listingState.listingById?.owner?.avatar}
                  />

                  <Typography component="span" variant="body2" sx={{ ml: 2 }}>
                    {listingState.listingById?.owner?.firstName}
                    {listingState.listingById?.owner?.lastName}
                  </Typography>
                  <ChatButton user={listingState.listingById!.owner!} />
                </Box>
              </Stack>
            </Paper>
            {listingState.listingById &&
              listingState.listingById.images &&
              listingState.listingById.images.length > 0 && (
                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                  <ImageList
                    sx={{ width: "100%", height: 400 }}
                    variant="quilted"
                    cols={4}
                    rowHeight={121}
                  >
                    {listingState.listingById.images.map((image, index) => (
                      <ImageListItem
                        key={image.id}
                        rows={imagesGrid[index % 8].rows}
                        cols={imagesGrid[index % 8].cols}
                      >
                        <img src={image.url} loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Paper>
              )}
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Stack sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography component="span" variant="h6">
                    Make a Booking
                  </Typography>
                </Box>
                <Box sx={{ mx: "auto" }}>
                  <DateRange
                    onChange={(item) => handleDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    direction="horizontal"
                    ranges={dateRanges()}
                    fixedHeight={true}
                    minDate={new Date()}
                    showMonthAndYearPickers={true}
                    showPreview={true}
                    months={2}
                    dateDisplayFormat={"dd/MM/yyyy"}
                    disabledDates={checkBookedDates()}
                  />
                </Box>

                <Stack spacing={1}>
                  <Box>
                    <Typography variant="overline">Number of Nights</Typography>
                    <Typography variant="body2">
                      {getNumberOfNights()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline">Price per night</Typography>
                    <Typography variant="body2">
                      {listingState.listingById?.pricePerNight}$
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline">Total Price</Typography>
                    <Typography variant="body2">{getTotalPrice()}$</Typography>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => setConfirmOpen(true)}
                >
                  Book Now
                </Button>

                <ConfirmationDialog
                  open={confirmOpen}
                  message={getConfirmBookingMessage()}
                  onClose={bookingConfirm}
                />
              </Stack>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Stack sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography component="span" variant="h6">
                    Reviews
                  </Typography>
                </Box>
                <Box
                  component="form"
                  sx={{ mt: 2 }}
                  onSubmit={handleSubmitReview}
                >
                  <HoverRating
                    showLabel={true}
                    value={reviewState.currentRating}
                    readOnly={false}
                    onChange={setRatingValue}
                  />

                  <TextField
                    multiline
                    minRows={2}
                    maxRows={5}
                    name="comment"
                    label="Comment"
                    value={reviewState.currentComment}
                    onChange={(e) => {
                      dispatch(setCurrentComment(e.target.value))
                    }}
                    fullWidth
                  />

                  <Button type="submit" variant="contained" sx={{ mt: 1 }}>
                    Leave a review
                  </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2} divider={<Divider />}>
                  {reviewState.listingReviews.map((listingReview) => (
                    <UserReview review={listingReview} key={listingReview.id} />
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Box>
        )}
      </Container>
    </div>
  )
}

export default ListingDetails
