import { Grid2 } from "@mui/material"
import type { Product } from "../../app/models/Product"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[],
}

export default function ProductList({ products }: Props) {
    return (
        <Grid2 container spacing={2}>
            {
                products.map(item =>
                (
                    <Grid2 size={3} display="flex" key={item.id}>
                        <ProductCard key={item.id} product={item}></ProductCard>
                    </Grid2>
                )
                )
            }
        </Grid2>
    )
}