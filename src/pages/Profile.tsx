import * as React from "react"

import "./profile.css"

import PersonalProfile from "../components/PersonalInfo"

import PetListing from "../components/MyPets"
import MyListings from "../components/MyListings"

export default function Profile() {
  return (
    <div>
      <PersonalProfile></PersonalProfile>
      <PetListing></PetListing>
      <MyListings></MyListings>
    </div>
  )
}
