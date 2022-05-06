import User from "./User"

export interface Booking {
  id: number
  checkInDate: Date
  checkOutDate: Date
  listingId: number
  owner: User
}
