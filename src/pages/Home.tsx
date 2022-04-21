import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"

function Home() {
  const navigate = useNavigate()

  const userState = useAppSelector((state) => state.user)

  useEffect(() => {
    // check if logged in
    const token = userState.token
    if (!token || token.length === 0) {
      navigate("/signin")
    }
  }, [])

  return <div>Home</div>
}

export default Home
