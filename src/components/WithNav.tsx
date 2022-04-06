import React from "react"
import { Outlet } from "react-router-dom"
import NavAppBar from "./NavAppBar"

export default () => {
  return (
    <>
      <NavAppBar />
      <Outlet />
    </>
  )
}
