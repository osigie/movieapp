import { useParams } from "react-router-dom";

import { useGetSingleMovie } from "../api/api";
import { Card } from "../components/card";
import { Loading } from "../components/loading";
import { RatingT } from "../types";
import { Ratings } from "../components/ratings";
import { toast } from "react-toastify";

export const Detail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetSingleMovie(Number(id));

  if (isLoading && !data) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading></Loading>
      </div>
    );
  }

  if (isError) {
    toast("Error fetching movie");
    return;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 animate-dropleft">
      <div className="">
        <div className="flex  gap-2">
          <Card title={data?.title} imageSrc={data?.poster}></Card>
          <Ratings ratings={data?.ratings as RatingT[]} />
        </div>
        <div className="pl-3 ">
          <p className="line-clamp-3  text-slate-50 font-bold mb-4">
            {data?.plot}
          </p>
          <div className="text-sm text-slate-50">
            <p>
              <span className="font-semibold">Year:</span> {data?.year}
            </p>
            <p>
              <span className="font-semibold">Rated:</span> {data?.rated}
            </p>
            <p>
              <span className="font-semibold">Released:</span> {data?.released}
            </p>
            <p>
              <span className="font-semibold">Runtime:</span> {data?.runtime}
            </p>
            <p>
              <span className="font-semibold">Genre:</span> {data?.genre}
            </p>
            <p>
              <span className="font-semibold">Director:</span> {data?.director}
            </p>
            <p>
              <span className="font-semibold">Writer:</span> {data?.writer}
            </p>
            <p>
              <span className="font-semibold">Actors:</span> {data?.actors}
            </p>
            <p>
              <span className="font-semibold">Language:</span> {data?.language}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {data?.country}
            </p>
            <p>
              <span className="font-semibold">Awards:</span> {data?.awards}
            </p>
            <p>
              <span className="font-semibold">Metascore:</span>{" "}
              {data?.metascore}
            </p>
            <p>
              <span className="font-semibold">IMDB Rating:</span>
              {data?.imdbRating}
            </p>
            <p>
              <span className="font-semibold">IMDB Votes:</span>
              {data?.imdbVotes}
            </p>
            <p>
              <span className="font-semibold">Box Office:</span>
              {data?.boxOffice}
            </p>
            <p>
              <span className="font-semibold">Production:</span>
              {data?.production}
            </p>
            <p>
              <span className="font-semibold">Website:</span>{" "}
              <a href={data?.website} className="text-blue-500">
                {data.website}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
