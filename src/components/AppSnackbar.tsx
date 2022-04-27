import { Alert, Snackbar } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { hideSnackbar } from "../redux/reducers/snackbarSlice"

export default function AppSnackbar() {
  const dispatch = useAppDispatch()
  const snackbarState = useAppSelector((state) => state.snackbar)

  return (
    <Snackbar
      open={snackbarState.isOpen}
      autoHideDuration={2000}
      onClose={() => dispatch(hideSnackbar())}
    >
      <Alert
        onClose={() => dispatch(hideSnackbar())}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  )
}
