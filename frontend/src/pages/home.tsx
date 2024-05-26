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

  if (isError) {
    toast("Error fetching movies");
    return;
  }

  return (
    <>
      <Section title="Your Movie Search">
        {isLoading && !data ? (
          <div className="flex flex-wrap gap-2">
            {Array.of(1, 2, 3, 4).map((i) => {
              return <CardLoader key={i} />;
            })}
          </div>
        ) : data?.value?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-5  animate-dropdown">
            <img
              src="../public/nodata.jpg"
              alt="No data"
              className="w-[500px] rounded-lg "
            />
            <p className="text-center mt-5">
              Opps! You have no movies you should make a search
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data?.value?.map((film: MovieDataT) => (
              <Card
                onClick={() => navigate(`detail/${film?.id}`)}
                title={film?.title}
                imageSrc={film?.poster}
                key={film?.id}
                className="cursor-pointer"
              ></Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
};
