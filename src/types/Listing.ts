import { Booking } from "./Booking"
import ListingImage from "./ListingImage"
import User from "./User"

export default interface Listing {
  id?: number
  ownerId?: number
  longitude?: number
  latitude?: number
  address: string | null
  description: string | null
  listingName: string
  pricePerNight: number
  owner?: User
  bookings?: Booking[]
  images?: ListingImage[]
  rating?: number
}
