import { createSlice } from '@reduxjs/toolkit';

import { getMoviesList } from '@/app/lib/movie-service';

import { Movie } from '@/app/shared/types/movie.interface';

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 50,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoviesList.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMoviesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage } = moviesSlice.actions;

export default moviesSlice.reducer;
