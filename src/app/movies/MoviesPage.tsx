'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { useGetListQuery } from '@/app/api/tvMazeApi';
import Error from '@/app/components/Error/ErrorPage';
import LoadingPage from '@/app/components/Loading/LoadingPage';
import PaginationPage from '@/app/components/Pagination/Pagination';
import { setCurrentPage } from '@/app/lib/feauters/movies/movies-slice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { useUrlParams } from '@/app/lib/hooks/useUrlParams';
import { IMoviesPageProps, Movie, MovieGenres } from '@/app/shared/types/movie.interface';

import CardPage from '../components/Card/CardPage';

import styles from './movies.module.css';

export function MoviesPage({ readyMoviesList }: IMoviesPageProps) {
  const dispatch = useAppDispatch();

  const { urlPage, addToUrl } = useUrlParams({
    searchParam: 'page',
    additionalString: '?',
  });

  const { data, isLoading, isError } = useGetListQuery(urlPage);
  const movies = useMemo(() => {
    if (!data) return null;
    return data.map((item: MovieGenres | Movie) => (item.show ? item.show : item));
  }, [data]);

  const { currentPage, totalPages } = useAppSelector((state) => state.moviesState);

  useEffect(() => {
    if (readyMoviesList) {
      return;
    }

    if (urlPage !== null) {
      const pageNum = parseInt(urlPage);
      dispatch(setCurrentPage(pageNum));
    }
  }, [dispatch, readyMoviesList]);

  const onPaginationHandle = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      addToUrl({ addedParameter: page });
    },
    [dispatch]
  );

  if (isLoading && !movies) {
    return <LoadingPage />;
  }

  const isPagination = readyMoviesList ? readyMoviesList.length > 200 : movies.length > 200;
  const renderedList = readyMoviesList ?? movies;

  return isError ? (
    <Error />
  ) : (
    <div>
      <div className={styles.cardsWrapper}>
        {renderedList.map((movie: Movie) => (
          <CardPage key={movie.id} {...movie} />
        ))}
      </div>
      {isPagination && (
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={onPaginationHandle}
        />
      )}
    </div>
  );
}

export default MoviesPage;
