'use client';

import { useCallback, useEffect } from 'react';

import Error from '@/app/components/Error/ErrorPage';
import LoadingPage from '@/app/components/Loading/LoadingPage';
import PaginationPage from '@/app/components/Pagination/Pagination';
import { setCurrentPage } from '@/app/lib/feauters/movies/movies-slice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { useUrlParams } from '@/app/lib/hooks/useUrlParams';
import { getMoviesList } from '@/app/lib/server-services/movie-service';
import { IUrlParams } from '@/app/shared/types/url-params.interface';
import { getMovieListUrl } from '@/app/utils/apiUtils';

import CardPage from '../components/Card/CardPage';

import styles from './movies.module.css';
import {MOVIES_API} from "@/app/shared/constants";
import {IMoviesPageProps} from "@/app/shared/types/movie.interface";

export function MoviesPage({ readyMoviesList }: IMoviesPageProps) {
  const dispatch = useAppDispatch();

  const { urlPage, addToUrl } = useUrlParams({
    searchParam: 'page',
    additionalString: '?',
  });

  const { error, loading, movies, currentPage, totalPages } = useAppSelector(
    (state) => state.moviesState
  );
  const api = `${MOVIES_API}shows?`;

  useEffect(() => {
    if ( readyMoviesList )
    {
      return;
    }

    if (urlPage !== null)
    {
      const pageNum = parseInt(urlPage);
      dispatch(setCurrentPage(pageNum));
      dispatch(getMoviesList({ api, page: pageNum }));
    }
    else
    {
      dispatch(getMoviesList({ api }));
    }
  }, [dispatch,readyMoviesList]);

  const onPaginationHandle = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      addToUrl({ addedParameter: page });

      dispatch(getMoviesList({ api, page }));
    },
    [dispatch]
  );

  const isPagination = readyMoviesList ? readyMoviesList.length > 200 : movies.length > 200;
  const renderedList = readyMoviesList ?? movies;

  return loading || renderedList.length === 0 ? (
    <LoadingPage />
  ) : error ? (
    <Error />
  ) : (
    <div>
      <div className={styles.cardsWrapper}>
        {renderedList.map((movie) => (
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
