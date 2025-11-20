import { createAsyncThunk } from '@reduxjs/toolkit';

import { MOVIES_API, POPULAR_SERIES } from '@/app/shared/constants';

export const getMainContent = createAsyncThunk(
  'movies/getMainContent',
  async (index: number, { rejectWithValue }: any = {}) => {
    try {
      const selectedItem = POPULAR_SERIES[index];

      const response = await fetch(`${MOVIES_API}shows/${selectedItem}`);

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
