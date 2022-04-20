import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ButtonBase from "@mui/material/ButtonBase"
import { Avatar, Container } from "@mui/material"
import "../pages/profile.css"

export default function PersonalProfile() {
  return (
    <Container
      component="main"
      maxWidth="md"
      className="profile-container"
      sx={{ mx: "200px" }}
    >
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase
              sx={{ width: 100, height: 100, mx: "20px" }}
              className="avatar-profile"
            >
              <Avatar
                className="avatar-profile"
                sx={{ width: 100, height: 100 }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={4}
              className="profile-info"
            >
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Name surname
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Email@gmai.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number : 1023245556
                </Typography>
                <Typography variant="body2" gutterBottom>
                  info Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque magnam suscipit nam accusamus non voluptatibus possimus
                  odit commodi provident enim! Eligendi iure libero dolore quis
                  ad aliquid facere, vitae inventore!
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ cursor: "pointer", my: "20px" }}
                  variant="body2"
                >
                  Logout
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ mx: "20px" }}
              >
                Owner
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
