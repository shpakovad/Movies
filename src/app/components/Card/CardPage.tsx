'use client';

import { Card, Image, Rate } from 'antd';

import Link from 'next/link';

import { Movie } from '@/app/shared/types/movie.interface';

import { getYearFromString } from '@/app/utils/dateUtils';
import { convertToPathString } from '@/app/utils/pathUtils';

import styles from './card.module.css';
import noImage from '@/app/assests/images/no-image.png';

export const CardPage = (props: Movie) => {
  const { name, image, summary, rating, premiered, genres } = props;
  const { year, cardWrapper, description, ratingWrapper, ratingTitle, posterWrapper, genre } =
    styles;

  const ratingOutOf5 = rating.average ? rating.average / 2 : 0;
  const movieYear = getYearFromString(premiered);

  return (
    <Card className={cardWrapper} title={name} extra={<a href="#">More</a>}>
      <div className={year}>{movieYear}</div>
      <div className={posterWrapper}>
        {image?.medium ? (
          <Image alt={name} src={image?.medium} width="70%" height="70%" />
        ) : (
          <img src={noImage.src} alt={name} width="190px" height="245px" />
        )}
      </div>
      {/*<p className={description} dangerouslySetInnerHTML={{ __html: summary }}/>*/}
      <div className={genre}>
        {genres.map((item, index) =>
          index === genres.length - 1 ? (
            <Link href={`/${convertToPathString(item)}`} key={`${name}-${item}`}>
              {item}
            </Link>
          ) : (
            <Link href={`/${convertToPathString(item)}`} key={`${name}-${item}`}>
              {item},&nbsp;
            </Link>
          )
        )}
      </div>
      <div className={ratingWrapper}>
        <Rate allowHalf value={ratingOutOf5} disabled />
        <span className={ratingTitle}>{rating.average}</span>
      </div>
    </Card>
  );
};

export default CardPage;
