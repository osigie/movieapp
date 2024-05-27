import { useNavigate } from "react-router-dom";

import { useGetSearchMoviesHistory } from "../api/api";
import { Card } from "../components/card";
import { Section } from "../components/section";
import { MovieDataT } from "../types";
import { CardLoader } from "../components/card-loader";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react";

export const Home = () => {
  const navigate = useNavigate();

  const { data, isError, fetchNextPage, hasNextPage, isLoading } =
    useGetSearchMoviesHistory();

  const movieData = useMemo(() => {
    return (data?.pages || []).reduce((acc, curr) => {
      return [...acc, ...curr.data];
    }, []);
  }, [data]);

  if (isError) {
    toast("Error fetching movies");
    return;
  }

  return (
    <>
      <Section title="Your Movie Search" className="animate-dropleft">
        {isLoading ? (
          <div className="flex flex-wrap gap-2">
            {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map((i) => {
              return <CardLoader key={i} />;
            })}
          </div>
        ) : movieData.length === 0 ? (
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
          <div id="scroll-div" className="overflow-auto">
            <InfiniteScroll
              dataLength={movieData.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<CardLoader />}
              scrollableTarget="scroll-div"
              height={600}
            >
              <div className="flex flex-wrap gap-2">
                {movieData.map((film: MovieDataT) => (
                  <Card
                    onClick={() => navigate(`detail/${film?.id}`)}
                    title={film?.title}
                    imageSrc={film?.poster}
                    key={film?.id}
                    className="cursor-pointer"
                  ></Card>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </Section>
    </>
  );
};
