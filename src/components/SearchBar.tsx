import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  Stack,
  TextField,
} from "@mui/material"
import React from "react"
import DropDownSearch from "./DropDownSearch"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { DateRange, Range } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { format } from "date-fns"

import { Link as RouterLink } from "react-router-dom"
import { Search } from "@mui/icons-material"
import { setDateRange } from "../redux/reducers/searchSlice"

function Home() {
  const searchState = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  const dateRanges = () => {
    return [
      {
        startDate: new Date(searchState.startDate ?? new Date()),
        endDate: new Date(searchState.endDate ?? new Date()),
        key: "selection",
      },
    ]
  }

  const handleDateRange = (ranges: Range[]) => {
    const dates: number[] = []
    dates.push(ranges[0].startDate?.getTime() ?? 0)
    dates.push(ranges[0].endDate?.getTime() ?? 0)
    dispatch(setDateRange(dates))
  }

  const [datePickerOpen, setDatePickerOpen] = React.useState(false)

  const openDatePicker = () => {
    setDatePickerOpen(true)
  }

  const closeDatePicker = () => {
    setDatePickerOpen(false)
  }

  const formatDate = (date?: number) => {
    if (date) {
      return format(date, "dd/MM/yyyy")
    }
    return ""
  }

  return (
    <div>
      <Container>
        <Stack
          direction="row"
          spacing={2}
          component="form"
          sx={{
            m: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DropDownSearch />

          <TextField
            required
            name="checkIn"
            label="Check In"
            id="checkin"
            value={formatDate(searchState.startDate)}
            onClick={openDatePicker}
          />

          <TextField
            required
            name="checkOut"
            label="Check Out"
            id="checkout"
            value={formatDate(searchState.endDate)}
            onClick={openDatePicker}
          />

          <Fab
            variant="extended"
            component={RouterLink}
            color="primary"
            to="/search-listings"
            sx={{ boxShadow: 0 }}
          >
            <Search /> Search
          </Fab>

          <Dialog
            open={datePickerOpen}
            onClose={closeDatePicker}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DateRange
                onChange={(item) => handleDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                direction="vertical"
                ranges={dateRanges()}
                fixedHeight={true}
                minDate={new Date()}
                showMonthAndYearPickers={true}
                showPreview={true}
                dateDisplayFormat={"dd/MM/yyyy"}
              />
              <DialogActions>
                <Button onClick={closeDatePicker} autoFocus>
                  Done
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Stack>
      </Container>
    </div>
  )
}

export default Home
