import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import UploadImage, { UploadImageProps } from "./UploadImage"

export default function UploadImageDialog(props: UploadImageProps) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change Image
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Upload Image"}</DialogTitle>
        <DialogContent>
          <UploadImage {...props}></UploadImage>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
