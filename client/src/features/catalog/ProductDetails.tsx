import { useParams } from "react-router-dom"
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogAPI";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketAPI";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {
  const { id } = useParams();

  const [addBasketItem] = useAddBasketItemMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find(x => x.productId === +id!);

  const [Qty, setQty] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (item) setQty(item.quantity);
  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(id ? +id : 0);

  if (!product || isLoading) return <div>Loading...</div>;

  const handleUpdateBasket = () => {
    const updatedQty = item ? Math.abs(Qty - item?.quantity) : Qty;
    if (!item || Qty > item.quantity)
      addBasketItem({ product: product, quantity: updatedQty })
    else
      removeBasketItem({ productId: +id!, quantity: updatedQty });
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    if (value >= 0) setQty(value);
  }

  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Quantity In Stock', value: product.quantityInStock },
  ];

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: 'auto' }}>
      <Grid2 size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: '100%', borderRadius: 8 }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h5" color="secondary">${(product?.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{ '& td': { fontSize: '1rem' } }}>
            <TableBody>
              {
                productDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{detail.label}</TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in Basket'
              fullWidth
              value={Qty}
              onChange={handleInputChange}
            >
            </TextField>
          </Grid2>
          <Grid2 size={6}>
            <Button
              onClick={handleUpdateBasket}
              disabled={
                Qty === item?.quantity || !item && Qty === 0
              }
              sx={{ height: '100%' }}
              variant="contained" color="primary" size="large" fullWidth>
              {item ? "Update basket" : "Add to Basket"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}