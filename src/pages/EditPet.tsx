import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {
  Avatar,
  Button,
  ButtonBase,
  CircularProgress,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material"

import { Link as RouterLink, useParams } from "react-router-dom"
import { Container } from "@mui/material"
import UploadImageDialog from "../components/UploadImageDialog"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { useEffect, useState } from "react"
import {
  addPet,
  getPetById,
  setPetById,
  updatePetById,
} from "../redux/reducers/petSlice"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import Pet from "../types/Pet"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

export default function EditPet() {
  const petState = useAppSelector((state) => state.pet)
  const dispatch = useAppDispatch()
  const params = useParams()
  const [dobValue, setDobValue] = useState<Date | null>(new Date())

  useEffect(() => {
    if (params.id) {
      const petId = parseInt(params.id)
      dispatch(getPetById(petId))
    }
  }, [])

  useEffect(() => {
    if (petState.petById) {
      setDobValue(petState.petById.dob)
    }
  }, [petState.petById])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const pet: Pet = {
      id: petState.petById?.id,
      petName: data.get("petName")!.toString(),
      gender: data.get("gender")!.toString(),
      breed: data.get("breed")!.toString(),
      species: data.get("species")!.toString(),
      dob: dobValue,
      description: data.get("description")!.toString(),
    }

    if (!params.id) {
      dispatch(addPet(pet))
    } else {
      dispatch(updatePetById(pet))
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      {petState.isGetByIdLoading && (
        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {!petState.isGetByIdLoading && !petState.isGetByIdError && (
        <Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Edit Pet
            </Typography>

            <ButtonBase
              sx={{ width: 100, height: 100, m: 4 }}
              className="avatar-profile"
            >
              <Avatar
                className="avatar-profile"
                sx={{ width: 100, height: 100 }}
                src={petState.petById?.avatar}
              />
            </ButtonBase>
            <UploadImageDialog
              url={`${process.env.REACT_APP_BE_URL}/pet/${petState.petById?.id}/avatar`}
              property="petAvatar"
              onSuccess={(pet) => {
                dispatch(setPetById(pet))
              }}
            ></UploadImageDialog>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2}>
              <TextField
                required
                id="petName"
                name="petName"
                label="Pet Name"
                defaultValue={petState.petById?.petName}
              />
              <TextField
                required
                id="gender"
                name="gender"
                label="Gender"
                defaultValue={petState.petById?.gender}
              />
              <TextField
                required
                id="breed"
                name="breed"
                label="Breed"
                defaultValue={petState.petById?.breed}
              />
              <TextField
                required
                id="species"
                name="species"
                label="Species"
                defaultValue={petState.petById?.species}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  label="Date of birth"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={dobValue}
                  onChange={(newValue) => {
                    setDobValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                multiline
                minRows={2}
                maxRows={5}
                name="description"
                label="Description"
                id="fullWidth"
                defaultValue={petState.petById?.description}
              />
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  )
}
