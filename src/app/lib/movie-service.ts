import { createAsyncThunk } from '@reduxjs/toolkit';

import { MOVIES_API } from '../../../constants';

export const getMoviesList = createAsyncThunk(
  'movies/getMoviesList',
  async (page?: number, { rejectWithValue }: any = {}) => {
    const requestPage = page ?? 1;
    try {
      const response = await fetch(`${MOVIES_API}?page=${requestPage}`);

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
