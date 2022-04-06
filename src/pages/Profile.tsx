import * as React from "react"

import "./profile.css"
import { margin } from "@mui/system"
import { green, pink } from "@mui/material/colors"
import PersonalProfile from "../components/PersonalInfo"
import PetProfile from "../components/PetInfo"
import PetListing from "../components/PetListing"
import PersonalListing from "../components/PersonalListing"
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
