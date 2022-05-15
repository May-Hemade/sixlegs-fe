import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Icon,
  IconButton,
  Typography,
} from "@mui/material"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  BookingState,
  getListingBookings,
} from "../redux/reducers/bookingSlice"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { differenceInCalendarDays, format } from "date-fns"
import { Booking } from "../types/Booking"
import { Forum } from "@mui/icons-material"
import User from "../types/User"
import { setCurrentChatUser } from "../redux/reducers/chatSlice"
import ChatButton from "../components/ChatButton"
import { Link as RouterLink } from "react-router-dom"

function ListingBookings() {
  const bookingState = useAppSelector((state) => state.booking)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const listingId = parseInt(id ?? "0")

  const getNumberOfNights = (booking: Booking) => {
    return differenceInCalendarDays(
      new Date(booking.checkOutDate),
      new Date(booking.checkInDate)
    )
  }

  const getTotalPrice = (booking: Booking) => {
    return (
      bookingState.listingBookings!.pricePerNight * getNumberOfNights(booking)
    )
  }

  useEffect(() => {
    console.log(listingId)

    dispatch(getListingBookings(listingId))
  }, [])

  return (
    <Container sx={{ p: 4 }}>
      {bookingState.isGetListingBookingsLoading && (
        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {!bookingState.isGetListingBookingsError &&
        !bookingState.isGetListingBookingsLoading &&
        bookingState.listingBookings && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography component="span" variant="h6">
                {bookingState.listingBookings?.listingName}
              </Typography>
            </Box>
          </Box>
        )}

      {!bookingState.isGetListingBookingsError &&
        !bookingState.isGetListingBookingsLoading &&
        bookingState.listingBookings &&
        bookingState.listingBookings.bookings && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Booked By</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Check In Date
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Check Out Date
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Total Nights
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Total Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingState.listingBookings.bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography component="span">
                        {booking.owner.firstName} {booking.owner.lastName}{" "}
                      </Typography>

                      <ChatButton user={booking.owner} />
                    </TableCell>
                    <TableCell align="right">
                      {format(new Date(booking.checkInDate), "EEE d MMM yyyy")}
                    </TableCell>
                    <TableCell align="right">
                      {format(new Date(booking.checkOutDate), "EEE d MMM yyyy")}
                    </TableCell>
                    <TableCell align="right">
                      {getNumberOfNights(booking)}
                    </TableCell>
                    <TableCell align="right">
                      {getTotalPrice(booking)}$
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
    </Container>
  )
}

export default ListingBookings
