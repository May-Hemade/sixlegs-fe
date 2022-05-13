import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { Avatar, Stack } from "@mui/material"
import Box from "@mui/material/Box"

import Pet from "../types/Pet"
import { differenceInMonths, differenceInYears } from "date-fns"

interface SinglePetProps {
  pet: Pet
}

export default function SinglePet(props: SinglePetProps) {
  const getAge = () => {
    if (!props.pet.dob) {
      return ""
    }
    const dob = new Date(props.pet.dob)
    const today = new Date()
    let age = differenceInYears(today, dob)
    if (age < 1) {
      age = differenceInMonths(today, dob)
      return `${age} months`
    }

    if (age === 1) {
      return `${age} year`
    }
    return `${age} years`
  }

  return (
    <Paper sx={{ m: 4 }}>
      <Stack sx={{ p: 3, width: "100%" }} spacing={2}>
        <Typography component="span" variant="h6" sx={{ fontWeight: "bold" }}>
          {props.pet.petName}
        </Typography>

        <Avatar
          className="avatar-profile"
          sx={{ width: 100, height: 100 }}
          src={props.pet.avatar}
        />

        {props.pet.dob && (
          <Box>
            <Typography variant="overline" gutterBottom>
              Species
            </Typography>
            <Typography variant="body1" fontSize="1.5ch">
              {props.pet.species}
            </Typography>
          </Box>
        )}

        <Box>
          <Typography variant="overline" gutterBottom>
            Breed
          </Typography>
          <Typography variant="body1" fontSize="1.5ch">
            {props.pet.breed}
          </Typography>
        </Box>

        <Box>
          <Typography variant="overline" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" fontSize="1.5ch">
            {props.pet.description}
          </Typography>
        </Box>

        {props.pet.dob && (
          <Box>
            <Typography variant="overline" gutterBottom>
              Age
            </Typography>
            <Typography variant="body1" fontSize="1.5ch">
              {getAge()}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  )
}
