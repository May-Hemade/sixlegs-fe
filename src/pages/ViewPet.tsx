import { Box, CircularProgress, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SinglePet from "../components/SinglePet"
import { useAppSelector } from "../redux/hooks"
import Pet from "../types/Pet"

function ViewPet() {
  const { id } = useParams()
  const { token } = useAppSelector((state) => state.user)
  const [pet, setPet] = useState<Pet | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)
  const [hasError, setError] = useState(false)

  useEffect(() => {
    getPet()
  }, [])

  const getPet = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/pet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        let result = await response.json()
        setLoading(false)
        setError(false)
        setPet(result)
      } else {
        setLoading(false)
        setError(true)
      }
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <Container maxWidth="md">
      {isLoading && !hasError && (
        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {hasError && <div></div>}

      {pet && <SinglePet pet={pet} />}
    </Container>
  )
}

export default ViewPet
