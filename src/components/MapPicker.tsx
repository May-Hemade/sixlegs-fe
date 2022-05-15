import { useEffect, useMemo, useState } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import { LatLng, LatLngTuple, LeafletEvent, Map } from "leaflet"
import { Box } from "@mui/system"
import { Autocomplete, debounce, Stack, TextField } from "@mui/material"
import { Boundingbox, SearchLocation } from "../types/SearchLocation"

interface MapPickerProps {
  defaultAddress?: string
  locationChanged: (location: LatLng) => void
}

const MapPicker = (props: MapPickerProps) => {
  const [map, setMap] = useState<Map | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<LatLng | undefined>(
    undefined
  )
  const [searchResults, setSearchResults] = useState<SearchLocation[]>([])
  const [boundingBox, setBoundingBox] = useState<Boundingbox | undefined>(
    undefined
  )

  const eventHandlers = useMemo(
    () => ({
      dragend(e: LeafletEvent) {
        setSelectedLocation(e.target.getLatLng())
        props.locationChanged(e.target.getLatLng())
      },
    }),
    [selectedLocation]
  )

  //   const getBounds = () => {
  //     const latln1: LatLngTuple = [boundingBox.latStart, boundingBox.lonStart]
  //     const latln2: LatLngTuple = [boundingBox.latEnd, boundingBox.lonEnd]
  //     return [latln1, latln2]
  //   }

  const handleInput = debounce((_e, input) => {
    if (input.length > 0) searchLocation(input)
  }, 300)

  const searchLocation = async (city: string) => {
    try {
      let response = await fetch(`https://geocode.maps.co/search?q=${city}`)
      if (response.ok) {
        let result = await response.json()
        setSearchResults(result)
      } else {
        console.log("error happened while searching for the city")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // map?.flyToBounds(getBounds(), {
    //   maxZoom: 18,
    //   duration: 2,
    // })
  }, [boundingBox, map])

  return (
    <Stack>
      <Autocomplete
        id="search-destination"
        filterOptions={(x) => x}
        sx={{ width: 300 }}
        options={searchResults}
        autoHighlight
        getOptionLabel={(searchLocation) => searchLocation.display_name}
        renderOption={(props, searchLocation) => (
          <Box component="li" {...props} key={searchLocation.place_id}>
            {searchLocation.display_name}
          </Box>
        )}
        popupIcon={""}
        onInputChange={handleInput}
        onChange={(_e, value) => {
          if (value) {
            setSelectedLocation(
              new LatLng(parseFloat(value.lat), parseFloat(value.lon))
            )
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

      <MapContainer
        whenCreated={setMap}
        zoom={18}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedLocation && (
          <Marker
            eventHandlers={eventHandlers}
            draggable={true}
            autoPan={true}
            position={[selectedLocation.lat, selectedLocation.lng]}
          />
        )}
      </MapContainer>
    </Stack>
  )
}

export default MapPicker
