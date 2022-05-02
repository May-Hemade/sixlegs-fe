import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"

import { Avatar, Button, Divider, Grid, Stack } from "@mui/material"
import "../pages/profile.css"
import Box from "@mui/material/Box"

import Listing from "../types/Listing"

import { Edit } from "@mui/icons-material"

import { Link as RouterLink } from "react-router-dom"
import HoverRating from "./Rating"
import { display, flexbox } from "@mui/system"

const label = { inputProps: { "aria-label": "Switch demo" } }

interface SingleListingProps {
  listing: Listing
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function PersonalListing(props: SingleListingProps) {
  const pricing = (listing: Listing) => {
    if (listing.pricePerNight === 0) {
      return "FREE"
    } else {
      return `${listing.pricePerNight} $/night`
    }
  }

  return (
    <Stack sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="h6">
          {props.listing.listingName}
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={6}>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <div>
              <Typography variant="overline" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1">{props.listing.address}</Typography>
            </div>

            <div>
              <Typography variant="overline" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">
                {props.listing.description}
              </Typography>
            </div>
          </Stack>
        </Grid>
        <Grid xs={6}>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Box>
              <HoverRating
                showLabel={false}
                value={getRandomArbitrary(1, 5)}
                readOnly={true}
              />
            </Box>

            <Box>
              <Typography variant="overline" gutterBottom>
                Price
              </Typography>
              <Typography variant="body1">{pricing(props.listing)}</Typography>
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
          src={props.listing.owner?.avatar}
        />

        <Typography component="span" variant="body2" sx={{ ml: 2 }}>
          {props.listing.owner?.firstName} {props.listing.owner?.lastName}
        </Typography>
      </Box>
    </Stack>
  )
}
