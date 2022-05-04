import { CssBaseline, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ListingResult from "../components/ListingResult"
import SearchMap from "../components/SearchMap"
import { useAppSelector } from "../redux/hooks"
import SearchBar from "../components/SearchBar"
import CheckLoggedIn from "../components/CheckLoggedIn"

function SearchLisitings() {
  const navigate = useNavigate()

  const userState = useAppSelector((state) => state.user)

  useEffect(() => {
    // check if logged in
    const token = userState.token
    if (!token || token.length === 0) {
      navigate("/signin")
    }
  }, [])

  return (
    <div>
      {/* <CheckLoggedIn /> */}
      <CssBaseline />

      <Box>
        <SearchBar />
        <Grid container spacing={0}>
          <Grid
            item
            xs={4}
            style={{
              paddingTop: "1ch",
              paddingBottom: "4ch",
              overflow: "auto",
              maxHeight: "100vh",
            }}
            className="hide-scroll"
          >
            <Box sx={{ mx: 3 }}></Box>
            <ListingResult />
          </Grid>
          <Grid item xs={8}>
            <SearchMap />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default SearchLisitings
