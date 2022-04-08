import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Surname"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="email"
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField fullWidth label="fullWidth" id="fullWidth" />
      </div>
    </Box>
  )
}
