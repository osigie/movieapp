import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { getDetail } from "../api/api";
import { useGlobalContext } from "../components/app-container";
import { Image } from "../components/image";
import { Loading } from "../components/loading";
import { Section } from "../components/section";
import { Film as FilmInterface } from "../interfaces";
import { MediaType } from "../types";
import { tmdbImageSrc } from "../utils";

interface Props {
  mediaType: MediaType;
}

export const Detail = (props: Props) => {
  const location = useLocation();
  const { id } = useParams<any>();

  const [film, setFilm] = useState<FilmInterface | null | undefined>(null);


  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string));

    if (film) {
      setFilm(film);
    }
  };

  useEffect(() => {
    setFilm(undefined);
    fetch();
  }, [location]);

  if (film === null) {
    // redirect to 404 page
    return <></>;
  } else if (film === undefined) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <>
      {/* background */}
      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image
          src={tmdbImageSrc(film.coverPath)}
          className="rounded-0 rounded-none"
        ></Image>
      </div>
      {/* poster and text */}
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src={tmdbImageSrc(film.posterPath)}
          className="w-[200px] min-w-[200px] h-[300px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col items-start gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          <ul className="flex items-center gap-3">
            {film.genreIds.map((id, i) => (
              <li
                key={id}
                className="px-3 py-1.5 bg-primary rounded-lg text-sm"
              >
                {
                  globalContext.genres[film.mediaType]?.find((g) => g.id === id)
                    ?.name
                }
              </li>
            ))}
          </ul>
          <p className="line-clamp-3 opacity-[0.9]">{film.description}</p>
        </div>
      </Section>
    </>
  );
};
