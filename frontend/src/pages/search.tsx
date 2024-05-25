import { useNavigate, useSearchParams } from "react-router-dom";

import { useGetSearchMovie } from "../api/api";
import { Card } from "../components/card";
import { Section } from "../components/section";
import { CardLoader } from "../components/card-loader";
import { toast } from "react-toastify";

export const Search = () => {
  const [params] = useSearchParams();
  const { data, isLoading, isError } = useGetSearchMovie(params.get("q") as string);
  const navigate = useNavigate();

  if (isError) {
    toast("Error fetching movie");
    return
  }

  return (
    <>
      {/* background */}
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>
      {/* PAGE TITLE */}
      <Section
        className="-mt-[90px] flex items-center relative z-10"
        title={params.get("q") || ""}
      ></Section>
      {/* Films */}
      <Section>
        <div className="">
          {isLoading && !data ? (
            <CardLoader />
          ) : (
            <Card
              onClick={() => navigate(`/detail/${data?.id}`)}
              imageSrc={data?.poster}
              title={data?.title}
              className="cursor-pointer"
            ></Card>
          )}
        </div>
      </Section>
    </>
  );
};
