'use client';

import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { setCurrentPage } from '@/app/lib/feauters/movies/movies-slice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { getMoviesList } from '@/app/lib/movie-service';

import Error from '@/app/components/Error/ErrorPage';
import LoadingPage from '@/app/components/Loading/LoadingPage';
import PaginationPage from '@/app/components/Pagination/Pagination';

import CardPage from '../components/Card/CardPage';

import styles from './main.module.css';

export function MainPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlPage = searchParams.get('page');

  const { error, loading, movies, currentPage, totalPages } = useAppSelector(
    (state) => state.moviesState
  );

  useEffect(() => {
    if (urlPage !== null) {
      const pageNum = parseInt(urlPage);
      dispatch(setCurrentPage(pageNum));
      dispatch(getMoviesList(pageNum));
    } else {
      dispatch(getMoviesList());
    }
  }, [dispatch]);

  const onPaginationHandle = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`, { scroll: false });

      dispatch(getMoviesList(page));
    },
    [dispatch]
  );

  return loading || movies.length === 0 ? (
    <LoadingPage />
  ) : error ? (
    <Error />
  ) : (
    <div>
      <div className={styles.cardsWrapper}>
        {movies.map((movie) => (
          <CardPage key={movie.id} {...movie} />
        ))}
      </div>
      <PaginationPage
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onPaginationHandle}
      />
    </div>
  );
}

export default MainPage;
