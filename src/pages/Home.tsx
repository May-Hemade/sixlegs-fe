import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import ProductCard from "../components/ProductCard"
import ProductCardsArray from "../components/ProductCardsArray"
import SearchBar from "../components/SearchBar"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setSelectedLocation } from "../redux/reducers/searchSlice"

function Home() {
  const searchState = useAppSelector((state) => state.search)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setSelectedLocation(null))
  }, [])

  return (
    <div>
      <Box sx={{ py: "10vh" }}>
        <SearchBar />
      </Box>
      <ProductCardsArray></ProductCardsArray>
    </div>
  )
}

export default Home
