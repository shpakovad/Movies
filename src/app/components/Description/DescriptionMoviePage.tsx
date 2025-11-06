'use client';

import { Image, Rate } from 'antd';

import Link from 'next/link';

import { CurrentMovie, Movie } from '@/app/shared/types/movie.interface';

import { getYearFromString } from '@/app/utils/dateUtils';
import { convertToPathString } from '@/app/utils/pathUtils';

import styles from './description.module.css';
import noImage from '@/app/assests/images/no-image.png';

export const DescriptionMoviePage = (props: CurrentMovie) => {
  const { main, cast } = props;
  const { name, image, rating, premiered, genres, network, summary } = main;

  const movieYear = getYearFromString(premiered);
  const ratingOutOf5 = rating.average ? rating.average / 2 : 0;

  return (
    <div className={styles.wrapper}>
      <section className={styles.heroWrapper}>
        {image?.original ? (
          <Image src={image?.original} alt={name} className={styles.heroImage} height="100vh" />
        ) : (
          <img src={noImage.src} alt={name} width="auto" height="100vh" />
        )}

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.title}>{name}</h1>
          <h2 className={styles.subtitle}>
            {movieYear}
            {network?.country && <span>, {network.country.name}</span>}
          </h2>

          <div className={styles.divider} />
          <div className={styles.dividersContent}>
            <div>
              <Rate className={styles.rating} allowHalf value={ratingOutOf5} disabled />
              <span>{rating.average || 0}</span>
            </div>
            <div className={styles.details}>
              {genres.map((item, index) => (
                <span key={`${name}-${item}`}>
                  <Link href={`/${convertToPathString(item)}`}>{item}</Link>
                  {index < genres.length - 1 && ' • '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.divider} />
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: summary }} />
          {cast && cast.length > 0 && (
            <div className={styles.starring}>
              <b>
                <span>Starring: </span>
              </b>
              {cast.map((item, index) => (
                <span key={item}>
                  {item}
                  {index < cast.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DescriptionMoviePage;
