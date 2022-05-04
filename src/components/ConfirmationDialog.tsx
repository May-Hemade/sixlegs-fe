import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Slide, Typography } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ConfirmationDialogProps {
  open: boolean
  message: string
  onClose: (confirm: boolean) => void
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const confirm = () => {
    props.onClose(true)
  }

  const cancel = () => {
    props.onClose(false)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={cancel}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <Typography>{props.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirm} autoFocus>
            Confirm
          </Button>
          <Button onClick={cancel} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
