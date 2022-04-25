import { Alert, AlertColor, Snackbar } from "@mui/material"

interface AppSnackbarProps {
  open: boolean
  message: string
  severity: AlertColor
  onClose: () => void
}

export default function AppSnackbar(props: AppSnackbarProps) {
  return (
    <Snackbar open={props.open} autoHideDuration={2000} onClose={props.onClose}>
      <Alert
        onClose={props.onClose}
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  )
}
