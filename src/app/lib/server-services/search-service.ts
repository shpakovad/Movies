import { createAsyncThunk } from '@reduxjs/toolkit';

import { MOVIES_API } from '@/app/shared/constants';

export const getSearchMovies = createAsyncThunk(
    'search/getSearchMovies',
    async (searchString: string, { rejectWithValue }: any = {}) => {
        try {
            const response = await fetch(`${MOVIES_API}search/shows?q=${searchString}`);

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
