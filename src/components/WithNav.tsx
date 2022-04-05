import React from "react"
import { Outlet } from "react-router-dom"
import NavAppBar from "../pages/NavAppBar"

export default () => {
  return (
    <>
      <NavAppBar />
      <Outlet />
    </>
  )
}
