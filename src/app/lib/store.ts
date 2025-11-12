import { configureStore } from '@reduxjs/toolkit';

import movieReducer from './feauters/movies/movie-slice';
import moviesReducer from './feauters/movies/movies-slice';
import searchReducer from './feauters/search/search-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      moviesState: moviesReducer,
      movieState: movieReducer,
      search: searchReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
