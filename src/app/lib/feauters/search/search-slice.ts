import { createSlice } from '@reduxjs/toolkit';

import { getSearchMovies } from '@/app/lib/server-services/search-service';
import { MovieGenres } from '@/app/shared/types/movie.interface';

interface SearchState {
  searchParam: string | null;
  resultSearchList: [] | MovieGenres[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchParam: null,
  resultSearchList: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.resultSearchList = action.payload;
      })
      .addCase(getSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchParam } = searchSlice.actions;
export default searchSlice.reducer;
