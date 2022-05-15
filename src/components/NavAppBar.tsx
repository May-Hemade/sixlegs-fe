import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { logout } from "../redux/reducers/userSlice"
import { Forum } from "@mui/icons-material"

export default function NavAppBar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box sx={{ flexGrow: 1 }}>
            <Button component={RouterLink} to="/" color="inherit" sx={{ p: 0 }}>
              <Box component="img" src="/logo.png" sx={{ height: 32 }} />
            </Button>
            <Typography fontFamily="monospace">SIX LEGS</Typography>
          </Box>
          <IconButton onClick={() => navigate("/inbox")}>
            <Forum></Forum>
          </IconButton>
          <Button component={RouterLink} to="/profile" color="inherit">
            Profile
          </Button>
          <Button
            component={RouterLink}
            to="/signin"
            color="inherit"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
