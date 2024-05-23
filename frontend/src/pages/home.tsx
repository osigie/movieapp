import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getInTheaters } from "../api/api";
import { Card } from "../components/card";
import { Section } from "../components/section";
import { Film } from "../interfaces";
import { tmdbImageSrc } from "../utils";

export const Home = () => {
  const navigate = useNavigate();

  const [inTheaters, setInTheaters] = useState<Film[]>([]);

  const goToDetailPage = (film: Film) => {
    navigate(`detail/${film.id}`);
  };

  const fetchInTheaters = async () => {
    setInTheaters(await getInTheaters());
  };

  useEffect(() => {
    fetchInTheaters();
  }, []);

  return (
    <>
      {/* in theaters */}
      <Section title="Your Movie Search" hidden={inTheaters.length === 0}>
        {inTheaters.map((film, i) => (
          <Card
            onClick={() => goToDetailPage(film)}
            title={film.title}
            imageSrc={tmdbImageSrc(film.posterPath)}
            key={i}
          ></Card>
        ))}
      </Section>
    </>
  );
};
