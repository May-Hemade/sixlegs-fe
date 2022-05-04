import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
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
      <SearchBar />
    </div>
  )
}

export default Home
