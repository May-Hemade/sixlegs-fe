import { ChangeEvent, FormEvent, useState } from "react"
import { Box, Button, CircularProgress, Input } from "@mui/material"
import { useAppSelector } from "../redux/hooks"

export interface UploadImageProps {
  url: string
  property: string
  buttonTitle?: string
  onSuccess: (result: any) => void
}

const UploadImage = (props: UploadImageProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const userState = useAppSelector((state) => state.user)

  const upload = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    if (!selectedImage) {
      return
    }

    formData.append(props.property, selectedImage)

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    }

    try {
      setIsLoading(true)
      const response = await fetch(props.url, options)
      if (response.ok) {
        console.log("image uploaded")
        setIsLoading(false)
        props.onSuccess(await response.json())
      } else {
        console.log("image could not be uploaded")
        setIsLoading(false)
      }
    } catch (e) {
      console.log(e)
      console.log("error occurred - image could not be uploaded")
      setIsLoading(false)
    }
  }

  return (
    <div className="linkedin-modal p-4">
      {isLoading && <CircularProgress />}

      {!isLoading && selectedImage && (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <Button
            className="mt-3 menu_button_open"
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </Button>
        </div>
      )}

      {!isLoading && (
        <Box component="form" onSubmit={(e: FormEvent) => upload(e)}>
          <label htmlFor="contained-button-file">
            <Input
              inputProps={{ accept: "image/*" }}
              id="contained-button-file"
              type="file"
              name={props.property}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                  setSelectedImage(event.target.files[0])
                }
              }}
            />
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={selectedImage === null}
          >
            Upload
          </Button>
        </Box>
      )}
    </div>
  )
}

export default UploadImage
