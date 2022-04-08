import React, { useState } from "react"
import { Button, Form, FormControl } from "react-bootstrap"
import { GridLoader } from "react-spinners"
import { css } from "@emotion/react"

const UploadImage = ({ url, property, onSuccess }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadingStyle = css`
    display: block;
    margin: 0 auto;
    border-color: #70b5f9;
  `
  const upload = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append(property, selectedImage)

    const options = {
      method: "POST",

      body: formData,
    }

    try {
      setIsLoading(true)
      const response = await fetch(url, options)
      if (response.ok) {
        console.log("image uploaded")
        setIsLoading(false)
        onSuccess()
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
      <GridLoader
        size={10}
        loading={isLoading}
        color="#70b5f9"
        css={loadingStyle}
      />
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
        <Form onSubmit={(e) => upload(e)}>
          <FormControl
            className="menu_button_open"
            type="file"
            name={property}
            onChange={(event) => {
              console.log(event.target.files[0])
              setSelectedImage(event.target.files[0])
            }}
            className="pb-2 mt-3"
          />
          <FormControl
            value="Upload"
            type="submit"
            disabled={selectedImage === null}
          />
        </Form>
      )}
    </div>
  )
}

export default UploadImage
