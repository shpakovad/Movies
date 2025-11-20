import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { MOVIES_API } from '@/app/shared/constants';

export const tvMazeApi = createApi({
  reducerPath: 'tvmazeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIES_API,
  }),
  tagTypes: ['MoviesList'],
  endpoints: (builder) => ({
    getMoviesList: builder.query({
      query: ({ api, page }) => {
        const requestPage = page ?? 1;
        return `shows?page=${requestPage}`;
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetMoviesListQuery } = tvMazeApi;
