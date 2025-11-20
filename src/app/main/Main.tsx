'use client';

import { useCallback } from 'react';

import { useGetPopularShowsQuery } from '@/app/api/tvMazeApi';
import CarouselPage from '@/app/components/Carousel/CarouselPage';
import { POPULAR_MOVIES, POPULAR_SERIES } from '@/app/shared/constants';

export interface ICarousel {
  index: number;
  name: string;
}

export function MainPage() {
  const seriesQuery = useCallback(
    ({ index, name }: ICarousel) => useGetPopularShowsQuery({ index, key: name }),
    []
  );

  const moviesQuery = useCallback(
    ({ index, name }: ICarousel) => useGetPopularShowsQuery({ index, key: name }),
    []
  );

  return (
    <div>
      <CarouselPage
        content={POPULAR_SERIES}
        query={seriesQuery}
        title="Popular Series"
        name="series"
      />
      <CarouselPage
        content={POPULAR_MOVIES}
        query={moviesQuery}
        title="Popular Movies"
        name="movies"
      />
    </div>
  );
}

export default MainPage;
