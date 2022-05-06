import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { IconButton, Stack } from "@mui/material"
import "../../pages/profile.css"
import Box from "@mui/material/Box"

import { CalendarMonth, Edit } from "@mui/icons-material"

import { Link as RouterLink } from "react-router-dom"
import Listing from "../../types/Listing"

interface PersonalListingProps {
  listing: Listing
}

export default function PersonalListing(props: PersonalListingProps) {
  const pricing = (listing: Listing) => {
    if (listing.pricePerNight === 0) {
      return "FREE"
    } else {
      return `${listing.pricePerNight} $/night`
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="h5">
          {props.listing.listingName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={RouterLink}
            to={`/listing/${props.listing.id}/bookings`}
          >
            <CalendarMonth />
          </IconButton>
          <IconButton
            component={RouterLink}
            to={`/edit-listing/${props.listing.id}`}
          >
            <Edit />
          </IconButton>
          {/* <Switch {...label} defaultChecked /> */}
        </Box>
      </Box>
      <Stack spacing={2} sx={{ mt: 3 }}>
        <div>
          <Typography variant="overline" gutterBottom>
            Address
          </Typography>
          <Typography variant="body1">{props.listing.address}</Typography>
        </div>

        <div>
          <Typography variant="overline" gutterBottom>
            Price
          </Typography>
          <Typography variant="body1">{pricing(props.listing)}</Typography>
        </div>

        <div>
          <Typography variant="overline" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">{props.listing.description}</Typography>
        </div>
      </Stack>
    </Paper>
  )
}
