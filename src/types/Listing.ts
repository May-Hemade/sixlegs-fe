export default interface Listing {
  id?: number
  ownerId: number
  longitude: number
  latitude: number
  address: string | null
  description: string | null
}
