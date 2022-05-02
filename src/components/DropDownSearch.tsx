import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { searchCity, setSelectedLocation } from "../redux/reducers/searchSlice"
import { debounce } from "lodash"

export default function DropDownSearch() {
  const searchState = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  const handleInput = debounce((_e, input) => {
    if (input.length > 0) dispatch(searchCity(input))
  }, 300)

  return (
    <Autocomplete
      id="search-destination"
      filterOptions={(x) => x}
      sx={{ width: 300 }}
      options={searchState.searchCityResults}
      autoHighlight
      getOptionLabel={(searchLocation) => searchLocation.display_name}
      renderOption={(props, searchLocation) => (
        <Box component="li" {...props} key={searchLocation.place_id}>
          {searchLocation.display_name}
        </Box>
      )}
      defaultValue={searchState.selectedLocation}
      popupIcon={""}
      onInputChange={handleInput}
      onChange={(_e, value) => {
        if (value) {
          dispatch(setSelectedLocation(value))
        }
      }}
      renderInput={(params) => (
        <TextField
          required
          {...params}
          label="Destination"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  )
}
