import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

function ListingBookings() {
  const bookingState = useAppSelector((state) => state.booking)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const listingId = parseInt(id ?? "0")

  useEffect(() => {
    //   dispatch()
  }, [])

  return <div>ListingBookings</div>
}

export default ListingBookings
