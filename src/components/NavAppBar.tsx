import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"

export default function NavAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={RouterLink} to="/" color="inherit">
              <Typography variant="h6" component="div">
                Six Legs
              </Typography>
            </Button>
          </Box>

          <Button component={RouterLink} to="/profile" color="inherit">
            Profile
          </Button>
          <Button component={RouterLink} to="/logout" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
