import { createAsyncThunk } from '@reduxjs/toolkit';

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
