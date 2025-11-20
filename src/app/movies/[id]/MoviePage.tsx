'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import { useGetMovieCastQuery, useGetMovieQuery } from '@/app/api/tvMazeApi';
import DescriptionMoviePage from '@/app/components/Description/DescriptionMoviePage';
import ErrorPage from '@/app/components/Error/ErrorPage';
import LoadingPage from '@/app/components/Loading/LoadingPage';
import { ICast } from '@/app/shared/types/movie.interface';

import styles from './movie.module.css';

export default function MoviePage() {
  const { id: movieId } = useParams<{ id: string }>();

  const {
    data: movieData,
    isError: movieError,
    isLoading: isMovieLoading,
  } = useGetMovieQuery(movieId, { skip: !movieId });
  const { data: catsData } = useGetMovieCastQuery(movieId, { skip: !movieId });

  const movie = useMemo(() => {
    if (!movieData) return null;
    return {
      main: movieData,
      cast: catsData ? catsData.map((item: ICast) => item.person.name) : [],
    };
  }, [movieData, catsData]);

  if (movieError) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.movieCardWrapper}>
      {isMovieLoading || !movie?.main ? <LoadingPage /> : <DescriptionMoviePage {...movie} />}
    </div>
  );
}
