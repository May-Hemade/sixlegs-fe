import * as React from "react"
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { Avatar, ButtonBase, Container, Stack } from "@mui/material"
import "../pages/profile.css"
import Box, { BoxProps } from "@mui/material/Box"

import { deepOrange, green, pink } from "@mui/material/colors"
import { Add } from "@mui/icons-material"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
})

export default function PetListing() {
  return (
    <Container
      component="main"
      maxWidth="md"
      className="profile-container"
      sx={{ mx: "200px" }}
    >
      <Paper elevation={3}>
        <Box sx={{ justifyContent: "space-between", display: "flex", p: 3 }}>
          <Typography component="span" variant="h5">
            My Pets
          </Typography>
          <Add />
        </Box>
        <Grid container spacing={2} sx={{ p: 3, m: 3 }}>
          <Stack sx={{ textAlign: "center" }}>
            <ButtonBase sx={{ width: 80, height: 80 }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 80, height: 80 }}
              />
            </ButtonBase>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ mt: 1 }}
            >
              Marby
            </Typography>
          </Stack>

          <Grid item></Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
