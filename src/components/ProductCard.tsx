import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Product from "../types/Product"
import { Link } from "@mui/material"

interface ProductCardProps {
  product: Product
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={props.product.productName}
        height="200"
        image={props.product.avatar}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.product.productName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          {props.product.shop}
        </Typography>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            variant="body2"
            sx={{ height: "100px", pt: 2 }}
            color="text.secondary"
          >
            {props.product.description}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          size="small"
          href={props.product.website}
          target="_blank"
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  )
}
