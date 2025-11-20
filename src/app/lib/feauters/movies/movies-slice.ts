import { createSlice } from '@reduxjs/toolkit';

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
  totalPages: 350,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = moviesSlice.actions;

export default moviesSlice.reducer;
