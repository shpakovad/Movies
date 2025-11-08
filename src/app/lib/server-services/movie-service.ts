import { createAsyncThunk } from '@reduxjs/toolkit';

import { MOVIES_API } from '@/app/shared/constants';
import { Movie, MovieGenres } from '@/app/shared/types/movie.interface';

export const getMoviesList = createAsyncThunk(
  'movies/getMoviesList',
  async ({ api, page }: { api: string; page?: number }, { rejectWithValue }: any = {}) => {
    const requestPage = page ?? 1;
    try {
      const response = await fetch(`${api}page=${requestPage}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return data.map((item: MovieGenres | Movie) => (item.show ? item.show : item));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMovie = createAsyncThunk(
  'movies/getMovie',
  async (id: string, { rejectWithValue }: any = {}) => {
    try {
      const movieResponse = await fetch(`${MOVIES_API}shows/${id}`);
      if (!movieResponse.ok) throw new Error('Movie fetch failed');
      const movie = await movieResponse.json();

      const castResponse = await fetch(`${MOVIES_API}shows/${id}/cast`);
      if (!castResponse.ok) throw new Error('Cast fetch failed');
      const castArray = await castResponse.json();
      const cast = castArray.map((item: any) => item.person.name);

      return {
        main: movie,
        cast,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMovieCast = createAsyncThunk(
  'movies/getMovieCast',
  async (id: string, { rejectWithValue }: any = {}) => {
    try {
      const response = await fetch(`${MOVIES_API}shows/${id}/cast`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
