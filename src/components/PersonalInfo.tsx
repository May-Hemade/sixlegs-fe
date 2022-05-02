import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ButtonBase from "@mui/material/ButtonBase"
import { Avatar, Button, Container, LinearProgress, Stack } from "@mui/material"
import "../pages/profile.css"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useEffect } from "react"
import { Box } from "@mui/system"
import { getUser } from "../redux/reducers/userSlice"
import { Edit } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"

export default function PersonalProfile() {
  const userState = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])
  return (
    <Container component="main" maxWidth="md" className="profile-container">
      <Paper elevation={3}>
        {userState.isLoading && (
          <Box sx={{ p: 4 }}>
            <LinearProgress color="secondary" />
          </Box>
        )}

        {userState.profile && (
          <Box>
            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
                p: 3,
              }}
            >
              <Typography component="span" variant="h5">
                Profile
              </Typography>
              <Button component={RouterLink} to="/edit-profile">
                <Edit />
              </Button>
            </Box>

            <Grid container spacing={2} sx={{ p: 4 }}>
              <Grid item xs={3}>
                <ButtonBase
                  sx={{ width: 100, height: 100 }}
                  className="avatar-profile"
                >
                  <Avatar
                    className="avatar-profile"
                    sx={{ width: 100, height: 100, mb: 4 }}
                    src={userState.profile.avatar}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={9} container>
                <Grid
                  item
                  xs
                  container
                  direction="column"
                  spacing={4}
                  className="profile-info"
                >
                  <Stack>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      {`${userState.profile.firstName} ${userState.profile.lastName}`}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {userState.profile.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userState.profile.gender}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {userState.profile.description}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  )
}
