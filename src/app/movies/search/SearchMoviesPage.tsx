'use client';

import { useSearchParams } from 'next/navigation';

import { useGetSearchListQuery } from '@/app/api/tvMazeApi';
import LoadingPage from '@/app/components/Loading/LoadingPage';
import NoResultsPage from '@/app/components/Noresults/NoResultsPage';
import MoviesPage from '@/app/movies/MoviesPage';
import { Movie, MovieGenres } from '@/app/shared/types/movie.interface';

export default function SearchMoviesPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const { data: resultSearchList, isLoading } = useGetSearchListQuery(query, {
    skip: !query || query.length === 0,
  });

  const renderedMovies = resultSearchList
    ? resultSearchList.map((item: MovieGenres | Movie) => item.show)
    : null;

  return (
    <div>
      {renderedMovies && renderedMovies.length > 0 ? (
        <MoviesPage readyMoviesList={renderedMovies} />
      ) : isLoading ? (
        <LoadingPage />
      ) : (
        <NoResultsPage />
      )}
    </div>
  );
}
