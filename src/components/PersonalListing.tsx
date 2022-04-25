import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"

import { Stack } from "@mui/material"
import "../pages/profile.css"
import Box from "@mui/material/Box"

import Listing from "../types/Listing"
import { Divider, Link } from "@mui/material"

import { Add, Edit } from "@mui/icons-material"

import { Link as RouterLink, useNavigate } from "react-router-dom"

const label = { inputProps: { "aria-label": "Switch demo" } }

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
          <Link
            component={RouterLink}
            to={`/edit-listing/${props.listing.id}`}
            variant="body2"
          >
            <Edit />
          </Link>
          <Switch {...label} defaultChecked />
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
