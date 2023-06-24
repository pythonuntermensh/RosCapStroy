import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const responsibilitiesAPI = createApi({
    reducerPath: 'responsibilitiesAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com'}),
    endpoints: (builder) => ({
        splitResponsibilities: builder.mutation({
            query: (text) => ({
                url: '/products/add',
                method: 'POST',
                // body: text,
                body: JSON.stringify({
                    title: 'BMW Pencil',
                    /* other product data */
                })
            })
        })
    })
})