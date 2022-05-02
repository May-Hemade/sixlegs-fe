export interface SearchLocation {
  place_id: number
  boundingbox: string[]
  lat: string
  lon: string
  display_name: string
  type: string
  importance: number
}
export interface Boundingbox {
  latStart: number
  lonStart: number
  latEnd: number
  lonEnd: number
}
