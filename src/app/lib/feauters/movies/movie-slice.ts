import { createSlice } from '@reduxjs/toolkit';

import { CurrentMovie } from '@/app/shared/types/movie.interface';

interface MovieState {
  movie: CurrentMovie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movie: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
});

export default movieSlice.reducer;
