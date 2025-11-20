import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { MOVIES_API } from '@/app/shared/constants';

export const tvMazeApi = createApi({
  reducerPath: 'tvmazeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIES_API,
  }),
  tagTypes: ['MoviesList', 'SearchList', 'Movie'],
  endpoints: (builder) => ({
    getList: builder.query({
      query: (page = 1) => {
        return `shows?page=${page}`;
      },
      keepUnusedDataFor: 60,
    }),

    getSearchList: builder.query({
      query: (searchString = ''): string => {
        const query = encodeURIComponent(searchString);
        return `search/shows?q=${query}`;
      },
      keepUnusedDataFor: 60,
    }),

    getMovie: builder.query({
      query: (id: string) => {
        return `shows/${id}`;
      },
    }),
    getMovieCast: builder.query({
      query: (id: string) => {
        return `shows/${id}/cast`;
      },
    }),
  }),
});

export const { useGetListQuery, useGetSearchListQuery, useGetMovieQuery, useGetMovieCastQuery } =
  tvMazeApi;
