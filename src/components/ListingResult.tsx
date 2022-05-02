import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { searchListings } from "../redux/reducers/searchSlice"
import { Boundingbox } from "../types/SearchLocation"
import SingleListing from "./SingleListing"

function ListingResult() {
  const searchState = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const bounds: Boundingbox = {
      lonStart: 0,
      latStart: 0,
      lonEnd: 0,
      latEnd: 0,
    }
    dispatch(searchListings(bounds))
  }, [searchState.selectedLocation])

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
            <Stack divider={<Divider />}>
              {searchState.searchListingsResult.map((listing) => (
                <SingleListing key={listing.id} listing={listing} />
              ))}
            </Stack>
          </Box>
        )}
    </Box>
  )
}

export default ListingResult
