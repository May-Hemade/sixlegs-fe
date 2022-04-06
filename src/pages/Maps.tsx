import { Container } from "@mui/material"
import React from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

function Maps() {
  return (
    <div>
      <Container>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Container>
    </div>
  )
}

export default Maps
