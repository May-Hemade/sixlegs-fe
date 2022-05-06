import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { searchListings } from "../redux/reducers/searchSlice"
import { Boundingbox } from "../types/SearchLocation"
import SingleListing from "./SingleListing"

function ListingResult() {
  const searchState = useAppSelector((state) => state.search)
  const [listingFilter, setListingFilter] = useState("")
  const dispatch = useAppDispatch()

  useEffect(() => {
    const bounds: Boundingbox = {
      latStart: parseFloat(searchState.selectedLocation?.boundingbox[0] ?? "0"),
      lonStart: parseFloat(searchState.selectedLocation?.boundingbox[2] ?? "0"),
      latEnd: parseFloat(searchState.selectedLocation?.boundingbox[1] ?? "0"),
      lonEnd: parseFloat(searchState.selectedLocation?.boundingbox[3] ?? "0"),
    }
    console.log(searchState.selectedLocation?.boundingbox)
    console.log(bounds)
    dispatch(searchListings(bounds))
  }, [searchState.selectedLocation])

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingFilter(event.target.value)
  }

  return (
    <Box>
      {searchState.isSearchListingLoading && (
        <Box>
          <CircularProgress />
        </Box>
      )}

      {!searchState.isSearchListingLoading &&
        !searchState.isSearchListingError && (
          <Box>
            <Box sx={{ px: 3 }}>
              <TextField
                id="filter-results"
                label="Search listings"
                fullWidth
                onChange={handleFilter}
              />
            </Box>

            <Stack divider={<Divider />}>
              {searchState.searchListingsResult
                .filter((listing) =>
                  listing.listingName
                    .toLowerCase()
                    .includes(listingFilter.toLowerCase())
                )
                .map((listing) => (
                  <SingleListing key={listing.id} listing={listing} />
                ))}
            </Stack>
          </Box>
        )}
    </Box>
  )
}

export default ListingResult
