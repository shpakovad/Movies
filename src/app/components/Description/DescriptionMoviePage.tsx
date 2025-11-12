'use client';

import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Image, Rate } from 'antd';

import noImage from '@/app/assests/images/no-image.png';
import { CurrentMovie } from '@/app/shared/types/movie.interface';
import { getYearFromString } from '@/app/utils/dateUtils';

import styles from './description.module.css';

export const DescriptionMoviePage = (props: CurrentMovie) => {
  const { main, cast } = props;
  const { name, image, rating, premiered, genres, network, summary, url } = main;

  const movieYear = getYearFromString(premiered);
  const ratingOutOf5 = rating.average ? rating.average / 2 : 0;

  return (
    <div className={styles.wrapper}>
      <section className={styles.heroWrapper}>
        {image?.original ? (
          <Image
            src={image?.original}
            alt={name}
            className={styles.heroImage}
            height="calc(100vh - 81px)"
          />
        ) : (
          <Image src={noImage.src} alt={name} width="auto" height="calc(100vh - 81px)" />
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
              <span className={styles.ratingTitle}>{rating.average || 0}</span>
            </div>
            <div className={styles.details}>
              {genres.map((item, index) => (
                <span key={`${name}-${item}`}>
                  <span>{item}</span>
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
          {url && (
            <div className={styles.watchBtn}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button type="primary" icon={<CaretRightOutlined />}>
                  Watch now
                </Button>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DescriptionMoviePage;
