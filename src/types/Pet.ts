export default interface Pet {
  id?: number
  ownerId?: number
  petName: String
  gender: string
  avatar?: string
  description?: string
  species: string
  dob: Date | null
  breed?: string
}
