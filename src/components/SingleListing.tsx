import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"

import {
  Avatar,
  Button,
  ButtonBase,
  Divider,
  Grid,
  Grow,
  MobileStepper,
  Stack,
} from "@mui/material"
import "../pages/profile.css"
import Box from "@mui/material/Box"

import Listing from "../types/Listing"

import { Link as RouterLink, useNavigate } from "react-router-dom"
import HoverRating from "./Rating"
import { useState } from "react"
import { Feed, LocationOn, Pin } from "@mui/icons-material"
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

interface SingleListingProps {
  listing: Listing
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function PersonalListing(props: SingleListingProps) {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)

  const pricing = (listing: Listing) => {
    if (listing.pricePerNight === 0) {
      return "FREE"
    } else {
      return `${listing.pricePerNight} $/night`
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <ButtonBase
      onClick={() => navigate(`/listing-details/${props.listing.id}`)}
      sx={{ textAlign: "left" }}
    >
      <Stack sx={{ p: 3, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography component="span" variant="h6" sx={{ fontWeight: "bold" }}>
            {props.listing.listingName}
          </Typography>

          <HoverRating
            showLabel={false}
            value={getRandomArbitrary(1, 5)}
            readOnly={true}
            size="small"
          />
        </Box>
        <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
          <Box>
            {props.listing.images && props.listing.images.length > 0 && (
              <Box sx={{ width: 200 }}>
                <AutoPlaySwipeableViews
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {props.listing.images.map((image, index) => (
                    <Box
                      key={image.id}
                      sx={{
                        borderRadius: "5%",
                      }}
                    >
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                            display: "block",
                            objectFit: "cover",
                            maxWidth: 200,
                            overflow: "hidden",
                            width: "100%",
                            borderRadius: "5%",
                          }}
                          src={image.url}
                        />
                      ) : null}
                    </Box>
                  ))}
                </AutoPlaySwipeableViews>
              </Box>
            )}
          </Box>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <div>
              <Typography variant="overline" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1" fontSize="1.5ch">
                <LocationOn /> {props.listing.address}
              </Typography>
            </div>

            <div>
              <Typography variant="overline" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" fontSize="1.5ch">
                <Feed /> {props.listing.description}
              </Typography>
            </div>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Box>
            <Typography
              component="span"
              variant="body2"
              sx={{ mt: 3, fontWeight: "600" }}
            >
              Hosted by
            </Typography>
            <Box sx={{ py: 1, display: "flex", alignItems: "center" }}>
              <Avatar
                className="avatar-profile"
                sx={{ width: 40, height: 40 }}
                src={props.listing.owner?.avatar}
              />

              <Typography component="span" variant="body2" sx={{ ml: 2 }}>
                {props.listing.owner?.firstName} {props.listing.owner?.lastName}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="overline" gutterBottom>
              Price
            </Typography>
            <Typography variant="body1">{pricing(props.listing)}</Typography>
          </Box>
        </Box>
      </Stack>
    </ButtonBase>
  )
}
