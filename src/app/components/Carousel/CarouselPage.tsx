'use client';

import { SyncOutlined } from '@ant-design/icons';
import { Carousel, Image } from 'antd';

import { useState } from 'react';

import { useGetPopularSeriesQuery } from '@/app/api/tvMazeApi';

import styles from './CarouselPage.module.css';

interface IProps {
  content: string[];
  title: string;
}

export function CarouselPage({ content, title }: IProps) {
  const [seriesIndex, setSeriesIndex] = useState(0);

  const { data: movie, isLoading, isFetching } = useGetPopularSeriesQuery(seriesIndex);

  const loading = isLoading && isFetching;
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
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
