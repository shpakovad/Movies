import { createSlice } from '@reduxjs/toolkit';

import { getMovie } from '@/app/lib/server-services/movie-service';
import {CurrentMovie} from "@/app/shared/types/movie.interface";
import {getSearchMovies} from "@/app/lib/server-services/search-service";

interface SearchState {
    searchParam: string | null,
    loading: boolean,
    error: string | null,
}

const initialState: SearchState = {
    searchParam: null,
    loading: false,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSearchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSearchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.searchParam = action.payload;
            })
            .addCase(getSearchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default searchSlice.reducer;
