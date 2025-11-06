'use client';

import { useCallback, useEffect } from 'react';

import { setCurrentPage } from '@/app/lib/feauters/movies/movies-slice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { useUrlParams } from '@/app/lib/hooks/useUrlParams';
import { getMoviesList } from '@/app/lib/movie-service';

import { IUrlParams } from '@/app/shared/types/url-params.interface';

import { getMovieListUrl } from '@/app/utils/apiUtils';

import Error from '@/app/components/Error/ErrorPage';
import LoadingPage from '@/app/components/Loading/LoadingPage';
import PaginationPage from '@/app/components/Pagination/Pagination';

import CardPage from '../components/Card/CardPage';

import styles from './main.module.css';

export function MainPage({ type, param }: IUrlParams) {
  const dispatch = useAppDispatch();

  const { urlPage, addToUrl } = useUrlParams({
    searchParam: 'page',
    additionalString: '?',
  });

  const api = getMovieListUrl({ type, param });

  const { error, loading, movies, currentPage, totalPages } = useAppSelector(
    (state) => state.moviesState
  );

  useEffect(() => {
    if (urlPage !== null) {
      const pageNum = parseInt(urlPage);
      dispatch(setCurrentPage(pageNum));
      dispatch(getMoviesList({ api, page: pageNum }));
    } else {
      dispatch(getMoviesList({ api }));
    }
  }, [dispatch]);

  const onPaginationHandle = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      addToUrl({ addedParameter: page });

      dispatch(getMoviesList({ api, page }));
    },
    [dispatch]
  );

  return loading || movies.length === 0 ? (
    <LoadingPage />
  ) : error ? (
    <Error />
  ) : (
    <div className={styles.mainWrapper}>
      <div className={styles.cardsWrapper}>
        {movies.map((movie) => (
          <CardPage key={movie.id} {...movie} />
        ))}
      </div>
        {
            !type && <PaginationPage
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={onPaginationHandle}
            />
        }
    </div>
  );
}

export default MainPage;
