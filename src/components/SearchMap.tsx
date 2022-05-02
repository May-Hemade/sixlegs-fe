import { Container } from "@mui/material"
import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { useAppSelector } from "../redux/hooks"
import { LatLng, LatLngTuple } from "leaflet"

function SearchMap() {
  return (
    <div>
      <MapContainer
        center={[33.8969, 35.5271]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
        {/* <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
      </MapContainer>
    </div>
  )
}

const Markers = () => {
  const searchState = useAppSelector((state) => state.search)
  const map = useMap()

  const getLatitude = () => {
    return parseFloat(searchState.selectedLocation?.lat ?? "33.8969")
  }

  const getLongitude = () => {
    return parseFloat(searchState.selectedLocation?.lon ?? "35.5271")
  }

  useEffect(() => {
    const center: LatLngTuple = [getLatitude(), getLongitude()]
    map.flyToBounds([center], {
      maxZoom: 18,
      duration: 4,
    })
  }, [searchState.selectedLocation])

  return (
    <div>
      {searchState.searchListingsResult.map(
        (listing) =>
          listing.latitude &&
          listing.longitude && (
            <Marker position={new LatLng(listing.latitude, listing.longitude)}>
              <Popup>{listing.listingName}</Popup>
            </Marker>
          )
      )}
    </div>
  )
}

export default SearchMap
