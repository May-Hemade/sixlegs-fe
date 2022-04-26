import * as React from "react"

import "./profile.css"

import PersonalProfile from "../components/PersonalInfo"

import PetListing from "../components/PetList"
import PersonalListingList from "../components/PersonalListingList"

export default function Profile() {
  return (
    <div>
      <PersonalProfile></PersonalProfile>
      <PetListing></PetListing>
      <PersonalListingList></PersonalListingList>
    </div>
  )
}
