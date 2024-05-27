import { useGetRecentQuery } from "../api/api";
import { QueryHistoryT } from "../types";
import { HiOutlineEmojiSad } from "react-icons/hi";

export const SearchResult = ({
  goToSearchPage,
}: {
  goToSearchPage: (query: string) => void;
}) => {
  const { data, isLoading } = useGetRecentQuery();

  return (
    <div
      className="
            absolute
            top-[48px]
            left-0
            right-0
            rounded-md
            bg-header
            shadow-lg
            p-2
            animate-dropdown
        "
    >
      {isLoading ? (
        <ul>
          {Array.of(1, 2, 3, 4, 5).map((i) => {
            return (
              <li key={i}>
                <div className="h-3 mt-2 bg-gray-200  max-w-[200px] animate-pulse"></div>
              </li>
            );
          })}
        </ul>
      ) : data?.value.length === 0 ? (
        <div className="flex justify-center items-center gap-2">
          <span> Opps! you have no search query</span>
          <HiOutlineEmojiSad />
        </div>
      ) : (
        <ul>
          {data?.value?.map((history: QueryHistoryT) => {
            return (
              <li
                key={history.id}
                className="cursor-pointer"
                onClick={() => goToSearchPage(history.query)}
              >
                {history.query}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
