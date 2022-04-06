import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"

import { Stack } from "@mui/material"
import "../pages/profile.css"
import Box from "@mui/material/Box"
import { Edit } from "@mui/icons-material"

const label = { inputProps: { "aria-label": "Switch demo" } }

export default function PersonalListing() {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="span" variant="h5">
          Tsvetna Gradina
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Edit />
          <Switch {...label} defaultChecked />
        </Box>
      </Box>
      <Stack spacing={2} sx={{ mt: 3 }}>
        <div>
          <Typography variant="overline" gutterBottom>
            Address
          </Typography>
          <Typography variant="body1">
            Tsvetna Gradina 47, Lozenets, Sofia 1421
          </Typography>
        </div>

        <div>
          <Typography variant="overline" gutterBottom>
            Price
          </Typography>
          <Typography variant="body1">Free</Typography>
        </div>

        <div>
          <Typography variant="overline" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            sapiente doloremque facilis! Cumque, expedita beatae laboriosam
            voluptates velit possimus nihil, harum perferendis nulla error
            distinctio cum facilis eaque earum dolor.
          </Typography>
        </div>
      </Stack>
    </Paper>
  )
}
