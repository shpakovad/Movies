import { Suspense } from 'react';

import MainPage from '@/app/main/Main';

const Movies = () => {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
};

export default Movies;
