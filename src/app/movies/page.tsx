import { Suspense } from 'react';

import MoviesPage from '@/app/movies/MoviesPage';

const Movies = () => {
  return (
    <Suspense>
      <MoviesPage />
    </Suspense>
  );
};

export default Movies;
