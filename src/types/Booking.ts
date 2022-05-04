import User from "./User"

export interface Booking {
  checkInDate: Date
  checkOutDate: Date
  listingId: number
  owner: User
}
