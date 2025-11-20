import { configureStore } from '@reduxjs/toolkit';

import { tvMazeApi } from '@/app/api/tvMazeApi';

import moviesReducer from './feauters/movies/movies-slice';
import searchReducer from './feauters/search/search-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      moviesState: moviesReducer,
      search: searchReducer,
      [tvMazeApi.reducerPath]: tvMazeApi.reducer,
    },
    middleware: (gDM) => gDM().concat(tvMazeApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
