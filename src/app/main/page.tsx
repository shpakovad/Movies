import { Suspense } from 'react';

import MainPage from '@/app/main/Main';

export default function Main() {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
}
