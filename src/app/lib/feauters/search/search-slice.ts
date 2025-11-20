import { createSlice } from '@reduxjs/toolkit';

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
  loading: true,
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
});

export const { setSearchParam } = searchSlice.actions;
export default searchSlice.reducer;
