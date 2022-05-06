import { Container, Grid } from "@mui/material"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getProducts } from "../redux/reducers/productSlice"
import ProductCard from "./ProductCard"

function ProductCardsArray() {
  const productState = useAppSelector((state) => state.product)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <Container>
      <Grid container spacing={2}>
        {productState.products.slice(0, 4).map((product) => (
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductCardsArray
