// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/Product"
import ProductList from "./ProductList"
import { useFetchProductsQuery } from "./catalogAPI";

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  //     .catch(error => console.error('Error fetching products:', error));
  // }, []);

  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <>
      <ProductList products={data} />
    </>
  )
}