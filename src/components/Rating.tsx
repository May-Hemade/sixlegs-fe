import * as React from "react"
import Rating from "@mui/material/Rating"
import Box from "@mui/material/Box"
import StarIcon from "@mui/icons-material/Star"

const labels: { [index: string]: string } = {
  1: "Useless+",
  2: "Poor+",
  3: "😐",
  4: "😄",
  5: "😍",
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`
}

interface HoverRatingProps {
  showLabel: boolean
  value: number | null
  readOnly: boolean
  onChange?: (rating: number | null) => void
}

export default function HoverRating(props: HoverRatingProps) {
  const [value, setValue] = React.useState<number | null>(props.value)
  const [hover, setHover] = React.useState(-1)

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        readOnly={props.readOnly}
        onChange={(_event, newValue) => {
          setValue(newValue)
          if (props.onChange) {
            props.onChange(newValue)
          }
        }}
        onChangeActive={(_event, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && props.showLabel && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  )
}
