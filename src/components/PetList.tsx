import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { Avatar, ButtonBase, Container, Stack } from "@mui/material"
import "../pages/profile.css"
import Box from "@mui/material/Box"

import { Add } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useEffect } from "react"
import { getMyPets } from "../redux/reducers/petSlice"

export default function PetList() {
  const petState = useAppSelector((state) => state.pet)
  console.log(petState.myPets)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMyPets())
  }, [])
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
          {petState.myPets.map((pet) => (
            <Stack sx={{ textAlign: "center" }}>
              <ButtonBase sx={{ width: 80, height: 80 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={pet.avatar}
                  sx={{ width: 80, height: 80 }}
                />
              </ButtonBase>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ mt: 1 }}
              >
                {pet.petName}
              </Typography>
            </Stack>
          ))}

          <Grid item></Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
