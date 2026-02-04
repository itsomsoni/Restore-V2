import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/Product";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";

export const catalogAPI = createApi({
    reducerPath: 'catalogAPI',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query: () => ({ url: '/products' }),
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId: number) => ({ url: `/products/${productId}` }),
        }),
    })
});

export const { useFetchProductsQuery, useFetchProductDetailsQuery } = catalogAPI;