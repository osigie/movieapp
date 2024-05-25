import { useNavigate } from "react-router-dom";

import { useGetSearchMoviesHistory } from "../api/api";
import { Card } from "../components/card";
import { Section } from "../components/section";
import { MovieDataT } from "../types";
import { CardLoader } from "../components/card-loader";
import { toast } from "react-toastify";

export const Home = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSearchMoviesHistory();

  if (data?.value?.length === 0) {
    return <div>no videos yet</div>;
  }

  if (isError) {
    toast("Error fetching movies");
    return
  }

  return (
    <>
      {/* in theaters */}
      <Section title="Your Movie Search">
        <div className="flex flex-wrap gap-2 justify-center">
          {isLoading && !data
            ? Array.of(1, 2, 3, 4).map((i) => {
                return <CardLoader key={i} />;
              })
            : data?.value?.map((film: MovieDataT) => (
                <Card
                  onClick={() => navigate(`detail/${film?.id}`)}
                  title={film?.title}
                  imageSrc={film?.poster}
                  key={film?.id}
                  className="cursor-pointer"
                ></Card>
              ))}
        </div>
      </Section>
    </>
  );
};
