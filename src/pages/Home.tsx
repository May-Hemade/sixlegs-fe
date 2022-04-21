import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // check if logged in
    const token = localStorage.getItem("UserToken")
    if (!token) {
      navigate("/signin")
    }
  }, [])

  return <div>Home</div>
}

export default Home
