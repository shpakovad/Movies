import { MOVIES_API } from '@/app/shared/constants';
import { IUrlParams } from '@/app/shared/types/url-params.interface';

export const getMovieListUrl = ({ type, param }: IUrlParams) => {
  switch (type) {
    case 'SEARCH': {
      return `${MOVIES_API}search/shows?q=${param}`;
    }

    default: {
      return `${MOVIES_API}shows?`;
    }
  }
};
