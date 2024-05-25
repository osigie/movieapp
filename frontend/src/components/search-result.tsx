import { useGetRecentQuery } from "../api/api";
import { QueryHistoryT } from "../types";

export const SearchResult = ({
  goToSearchPage,
}: {
  goToSearchPage: (query: string) => void;
}) => {
  const { data } = useGetRecentQuery();

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
    </div>
  );
};
