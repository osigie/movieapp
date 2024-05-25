

export type RatingT = {
  id?: number;
  source?: string;
  value?: string;
  movieId?: number;
};

export type MovieDataT = {
  id?: number;
  title?: string;
  year?: string;
  rated?: string;
  released?: string;
  runtime?: string;
  genre?: string;
  director?: string;
  writer?: string;
  actors?: string;
  plot?: string;
  language?: string;
  country?: string;
  awards?: string;
  poster?: string;
  ratings?: RatingT[];
  metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  type?: string;
  dvd?: string;
  boxOffice?: string;
  production?: string;
  website?: string;
  response?: string;
  timestamp?: string;
};


export type QueryHistoryT = {
  id:number
query: string
timestamp:string
}