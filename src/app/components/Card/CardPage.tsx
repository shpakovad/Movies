'use client';

import { Card, Image, Rate } from 'antd';

import { Movie } from '@/app/shared/types/movie.interface';

import { getYearFromString } from '@/app/utils/dateUtils';


import styles from './card.module.css';
import noImage from '@/app/assests/images/no-image.png';

export const CardPage = (props: Movie) => {
  const { name, image, rating, premiered, genres, id, network } = props;
  const { year, cardWrapper, ratingWrapper, ratingTitle, posterWrapper, genre } = styles;

  const ratingOutOf5 = rating.average ? rating.average / 2 : 0;
  const movieYear = getYearFromString(premiered);

  return (
    <Card className={cardWrapper} title={name} extra={<a href={`/movies/${id}`}>More</a>}>
      <div className={year}>
        {movieYear}
        {network?.country && <span>, {network.country.name}</span>}
      </div>
      <div className={posterWrapper}>
        {image?.medium ? (
          <Image alt={name} src={image?.medium} width="70%" height="70%" preview={false} />
        ) : (
          <img src={noImage.src} alt={name} width="190px" height="245px" />
        )}
      </div>
      <div className={genre}>
        {genres.map((item, index) => (
          <span key={`${name}-${item}`}>
            <span>{item}</span>
            {index < genres.length - 1 && ' • '}
          </span>
        ))}
      </div>
      <div className={ratingWrapper}>
        <Rate allowHalf value={ratingOutOf5} disabled />
        <span className={ratingTitle}>{rating.average}</span>
      </div>
    </Card>
  );
};

export default CardPage;
