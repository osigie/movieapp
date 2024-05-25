import { useQuery } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_API_URL;

export const useGetSearchMovie = (title: string) => {
  return useQuery({
    queryKey: ["movies-search", title],
    queryFn: async () => {
      const response = await fetch(baseUrl + "/movies/search?title=" + title);
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
    queryFn: async () => {
      const response = await fetch(baseUrl + "/movies/" + id);
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
    queryFn: async () => {
      const response = await fetch(baseUrl + "/movies/recent-query");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetSearchMoviesHistory = () => {
  return useQuery({
    queryKey: ["search-movies-history"],
    queryFn: async () => {
      const response = await fetch(baseUrl + "/movies/search-movies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};
