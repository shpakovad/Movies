export interface MovieGenres {
  score: number;
  show: Movie;
}
export interface Movie {
  show?: Movie;
  averageRuntime: number;
  dvdCountry: string | null;
  ended: string;
  externals: { tvrage: number; thetvdb: number; imdb: string };
  genres: string[];
  id: number;
  image: { medium?: string; original?: string };
  language: string;
  name: string;
  network: Network;
  officialSite: string;
  premiered: string;
  rating: { average: null };
  runtime: number;
  schedule: { time: string; days: string[] };
  status: string;
  summary: string & { __html?: never };
  type: string;
  updated: number;
  url: string;
  webChannel: Network;
  weight: number;
  _links: Link;
}

interface Network {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
  officialSite: string | null;
}

interface Link {
  self: { href: string };
  previousepisode: {
    href: string;
    name: string;
  };
}
