'use client';

import CarouselPage from '@/app/components/Carousel/CarouselPage';
import { POPULAR_SERIES } from '@/app/shared/constants';

export function MainPage() {
  return (
    <div>
      <CarouselPage content={POPULAR_SERIES} title="Popular Series" />
    </div>
  );
}

export default MainPage;
