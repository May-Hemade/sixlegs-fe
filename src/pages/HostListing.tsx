import { Grid, Stack } from "@mui/material"
import React from "react"
import SingleListing from "../components/SingleListing"
import "./hostListing.css"

function HostListing() {
  return (
    <div className="host-listing-container">
      <Stack spacing={1}>
        {Array.from(Array(6)).map((_, index) => (
          <SingleListing key={index}></SingleListing>
        ))}
      </Stack>
    </div>
  )
}

export default HostListing
