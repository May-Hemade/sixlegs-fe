import "./profile.css"

import PetListing from "../components/profile/MyPets"
import PersonalProfile from "../components/profile/PersonalInfo"
import MyListings from "../components/profile/MyListings"

export default function Profile() {
  return (
    <div>
      <PersonalProfile></PersonalProfile>
      <PetListing></PetListing>
      <MyListings></MyListings>
    </div>
  )
}
