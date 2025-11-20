'use client';

import { SyncOutlined } from '@ant-design/icons';
import { Carousel, Image } from 'antd';

import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { getMainContent } from '@/app/lib/server-services/main-content-service';

import styles from './CarouselPage.module.css';

interface IProps {
  content: string[];
  title: string;
}

export function CarouselPage({ content, title }: IProps) {
  const dispatch = useAppDispatch();
  const { movie, loading } = useAppSelector((state) => state.mainContentMovie);

  const onHandlingCarousel = useCallback(
    (index: number) => {
      dispatch(getMainContent(index));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getMainContent(0));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <Carousel
        arrows
        infinite={false}
        afterChange={(selectedIndex) => onHandlingCarousel(selectedIndex)}
        effect={'fade'}
      >
        {content.map((item) =>
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
