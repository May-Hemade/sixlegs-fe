import * as React from "react"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import Stack from "@mui/material/Stack"

export default function ResponsiveDatePickers() {
  const [value, setValue] = React.useState<Date | null>(new Date())

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        label="Responsive"
        openTo="year"
        views={["year", "month", "day"]}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
