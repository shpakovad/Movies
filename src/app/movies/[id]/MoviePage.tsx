'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import DescriptionMoviePage from '@/app/components/Description/DescriptionMoviePage';
import ErrorPage from '@/app/components/Error/ErrorPage';
import LoadingPage from '@/app/components/Loading/LoadingPage';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { getMovie } from '@/app/lib/server-services/movie-service';

import styles from './movie.module.css';

export default function MoviePage() {
  const { id: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { error, loading, movie } = useAppSelector((state) => state.movieState);

  useEffect(() => {
    if (movieId && typeof movieId === 'string') {
      dispatch(getMovie(movieId));
    }
  }, [dispatch, movieId]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.movieCardWrapper}>
      {loading || !movie?.main ? <LoadingPage /> : <DescriptionMoviePage {...movie} />}
    </div>
  );
}
