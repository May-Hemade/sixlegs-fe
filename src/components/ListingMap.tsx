import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { useAppSelector } from "../redux/hooks"
import { LatLng, LatLngTuple } from "leaflet"

function ListingMap() {
  return (
    <div>
      <MapContainer
        center={[33.8969, 35.5271]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
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

  const getBounds = () => {
    if (!searchState.selectedLocation) {
      const center: LatLngTuple = [getLatitude(), getLongitude()]
      return [center]
    }

    const boundingbox = searchState.selectedLocation.boundingbox

    const latln1: LatLngTuple = [
      parseFloat(boundingbox[0]),
      parseFloat(boundingbox[2]),
    ]

    const latln2: LatLngTuple = [
      parseFloat(boundingbox[1]),
      parseFloat(boundingbox[3]),
    ]

    return [latln1, latln2]
  }

  useEffect(() => {
    console.log(getBounds())
    map.flyToBounds(getBounds(), {
      maxZoom: 18,
      duration: 2,
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

export default ListingMap
