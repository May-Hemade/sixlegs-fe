import User from "./User"

export default interface Review {
  id: number
  ownerId: number
  owner: User
  listingId: number
  comment?: string
  rating: number
  createdAt: string
}
