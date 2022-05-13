import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import ProductCardsArray from "../components/ProductCardsArray"
import SearchBar from "../components/SearchBar"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setSelectedLocation } from "../redux/reducers/searchSlice"
import { saveToken } from "../redux/reducers/userSlice"

function Home() {
  const userState = useAppSelector((state) => state.user)
  const [searchParams] = useSearchParams()
  const accessToken = searchParams.get("accessToken")
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (userState.token.length === 0) {
      if (accessToken && accessToken.length > 0) {
        dispatch(saveToken(accessToken))
      } else {
        navigate("/signin")
      }
    }
    dispatch(setSelectedLocation(null))
  }, [])

  return (
    <div>
      <Box sx={{ py: "10vh" }}>
        <SearchBar />
      </Box>
      {userState.token.length > 0 && <ProductCardsArray />}
    </div>
  )
}

export default Home
