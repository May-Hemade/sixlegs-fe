import * as React from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import RestoreIcon from "@mui/icons-material/Restore"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { Search } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import SearchMap from "./SearchMap"

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          component={RouterLink}
          to="/search-city"
          label="Recents"
          icon={<Search />}
        />
        <SearchMap />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  )
}
