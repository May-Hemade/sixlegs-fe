import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"

function CheckLoggedIn() {
  const userState = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (userState.token === "") {
      navigate("/signin")
    }
  }, [])

  return <div></div>
}

export default CheckLoggedIn
