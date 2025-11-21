'use client';

import { SyncOutlined } from '@ant-design/icons';
import { Carousel, Image } from 'antd';

import { useState } from 'react';

import { ICarousel } from '@/app/main/Main';
import { Movie } from '@/app/shared/types/movie.interface';

import styles from './CarouselPage.module.css';

interface QueryResult {
  data?: Movie;
  isLoading: boolean;
  isFetching: boolean;

}

interface IProps {
  content: string[];
  title: string;
  query: ({ index, name }: ICarousel) => QueryResult;
  name: string;
}

export function CarouselPage({ content, title, query, name }: IProps) {
  const [seriesIndex, setSeriesIndex] = useState(0);

  const { data: movie, isLoading, isFetching } = query({ index: seriesIndex, name } as ICarousel);

  const loading = isLoading && isFetching;
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <Carousel
        arrows
        infinite={false}
        afterChange={(selectedIndex) => setSeriesIndex(selectedIndex)}
        effect={'fade'}
      >
        {content.map((item: string) =>
          loading ? (
            <div className={styles.flexContainer} key={item}>
              <SyncOutlined spin />
            </div>
          ) : (
            <div>
              {loading ? (
                <SyncOutlined spin />
              ) : (
                <h3 className={styles.content}>
                  {movie ? (
                    <Image key={item} alt={movie.name} src={movie.image?.medium} preview={false} />
                  ) : null}
                </h3>
              )}
            </div>
          )
        )}
      </Carousel>
    </div>
  );
}

export default CarouselPage;
