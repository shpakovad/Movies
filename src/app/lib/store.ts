import { configureStore } from '@reduxjs/toolkit';

import movieReducer from './feauters/movies/movie-slice';
import moviesReducer from './feauters/movies/movies-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      moviesState: moviesReducer,
      movieState: movieReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
