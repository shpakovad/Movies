import { createSlice } from '@reduxjs/toolkit';

import { getMainContent } from '@/app/lib/server-services/main-content-service';
import { Movie } from '@/app/shared/types/movie.interface';

interface MainContentState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MainContentState = {
  movie: null,
  loading: true,
  error: null,
};

const mainContentSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMainContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMainContent.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(getMainContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default mainContentSlice.reducer;
