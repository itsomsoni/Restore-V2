import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/Product";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import type { ProductParams } from "../../app/models/ProductParams";
import { filterEmptyValues } from "../../lib/util";
import type { Pagination } from "../../app/models/Pagination";

export const catalogAPI = createApi({
    reducerPath: 'catalogAPI',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<{ items: Product[], pagination: Pagination }, ProductParams>({
            query: (productParams) => {
                return {
                    url: '/products',
                    params: filterEmptyValues(productParams),
                }
            },
            transformResponse: (items: Product[], meta) => {
                const paginationHeader = meta?.response?.headers.get('pagination');
                const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
                return { items, pagination };
            }
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId: number) => ({ url: `/products/${productId}` }),
        }),
        fetchFilters: builder.query<{ brands: string[], types: string[] }, void>({
            query: () => ({ url: '/products/filters' }),
        }),
    })
});

export const { useFetchProductsQuery, useFetchProductDetailsQuery, useFetchFiltersQuery } = catalogAPI;