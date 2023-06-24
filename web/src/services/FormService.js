import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const responsibilitiesAPI = createApi({
    reducerPath: 'responsibilitiesAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:5000'}),
    endpoints: (builder) => ({
        splitResponsibilities: builder.mutation({
            query: (text) => ({
                url: '/predict',
                method: 'POST',
                body: text,
            })
        })
    })
})