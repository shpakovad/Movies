'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import NoResultsPage from '@/app/components/Noresults/NoResultsPage';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { getSearchMovies } from '@/app/lib/server-services/search-service';
import MoviesPage from '@/app/movies/MoviesPage';

export default function SearchMoviesPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const { resultSearchList } = useAppSelector((state) => state.search);

  useEffect(() => {
    if (query && query.length !== 0) {
      dispatch(getSearchMovies(query));
    }
  }, [dispatch, query]);

  const renderedMovies = resultSearchList.map((item) => item.show);

  return (
    <div>
      {renderedMovies && renderedMovies.length > 0 ? (
        <MoviesPage readyMoviesList={renderedMovies} />
      ) : (
        <NoResultsPage />
      )}
    </div>
  );
}
