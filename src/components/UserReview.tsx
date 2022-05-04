import { Avatar, Grid, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { format } from "date-fns"
import React from "react"
import Review from "../types/Review"
import HoverRating from "./Rating"

interface UserReviewProps {
  review: Review
}

function UserReview(props: UserReviewProps) {
  return (
    <div>
      {props.review.owner && (
        <div>
          <Stack direction="row">
            <Avatar
              className="avatar-profile"
              sx={{ width: 40, height: 40 }}
              src={props.review.owner.avatar}
            />

            <Stack>
              <Typography
                component="span"
                variant="body1"
                sx={{ ml: 2, fontWeight: "600" }}
              >
                {props.review.owner.firstName} {props.review.owner.lastName}
              </Typography>
              <Box>
                <Box sx={{ pl: 1, width: 1 / 4 }}>
                  <HoverRating
                    showLabel={true}
                    value={props.review.rating}
                    readOnly={true}
                  />
                </Box>

                <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
                  {props.review.comment}
                </Typography>

                <Typography
                  color={"GrayText"}
                  variant="body1"
                  sx={{ ml: 2, mt: 4, fontSize: "1.4ch", fontWeight: "200" }}
                >
                  {format(
                    new Date(props.review.createdAt).getTime(),
                    "EEE d MMM yyyy"
                  )}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </div>
      )}
    </div>
  )
}

export default UserReview
