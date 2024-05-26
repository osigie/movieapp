import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_API_URL;

export const useGetSearchMovie = (title: string) => {
  return useQuery({
    queryKey: ["movies-search", title],
    queryFn: async ({ signal }) => {
      const response = await fetch(baseUrl + "/movies/search?title=" + title, {
        signal,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetSingleMovie = (id: number) => {
  return useQuery({
    queryKey: ["single-movie", id],
    queryFn: async ({ signal }) => {
      const response = await fetch(baseUrl + "/movies/" + id, {
        signal,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetRecentQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async ({ signal }) => {
      const response = await fetch(baseUrl + "/movies/recent-query", {
        signal,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetSearchMoviesHistory = () => {
  return useInfiniteQuery({
    queryKey: ["search-movies-history"],
    queryFn: async ({ pageParam, signal }) => {
      const response = await fetch(
        baseUrl + `/movies/search-movies?pageNumber=${pageParam}&pageSize=10`,
        {
          signal,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.pageNumber + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPreviousPage ? firstPage.pageNumber - 1 : undefined;
    },
    initialPageParam: 1,
  });
};
