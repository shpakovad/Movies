'use client';

import { useParams } from 'next/navigation';

import MoviePage from '@/app/movies/[id]/MoviePage';

export default function Movie() {
  return <MoviePage />;
}
