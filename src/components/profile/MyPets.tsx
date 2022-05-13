import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { Avatar, ButtonBase, Container, IconButton, Stack } from "@mui/material"
import "../../pages/profile.css"
import Box from "@mui/material/Box"

import { Add } from "@mui/icons-material"
import { useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getMyPets } from "../../redux/reducers/petSlice"

export default function MyPets() {
  const petState = useAppSelector((state) => state.pet)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMyPets())
  }, [])
  return (
    <Container component="main" maxWidth="md" className="profile-container">
      <Paper elevation={3}>
        <Box sx={{ justifyContent: "space-between", display: "flex", p: 3 }}>
          <Typography component="span" variant="h5">
            My Pets
          </Typography>
          <IconButton component={RouterLink} to="/add-pet">
            <Add />
          </IconButton>
        </Box>
        {petState.myPets.length === 0 &&
          !petState.isGetError &&
          !petState.isGetLoading && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography> Please add your pet</Typography>
            </Box>
          )}

        {petState.myPets.length > 0 && (
          <Grid container sx={{ p: 3, m: 3 }}>
            {petState.myPets.map((pet) => (
              <Stack key={pet.id} sx={{ textAlign: "center", p: 2 }}>
                <ButtonBase
                  sx={{ width: 80, height: 80 }}
                  href={`/edit-pet/${pet.id}`}
                >
                  <Avatar src={pet.avatar} sx={{ width: 80, height: 80 }} />
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
        )}
      </Paper>
    </Container>
  )
}
