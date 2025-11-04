'use client';
import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { setCurrentPage } from '@/app/lib/feauters/movies/movies-slice';
import { useAppDispatch } from '@/app/lib/hooks';

import MainPage from '@/app/main/Main';

export default function Genre() {
  const params = useParams();
  const genre = params.genre;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [dispatch]);

  return <MainPage type="GENRE" param={`${genre}`} />;
}
