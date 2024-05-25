import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Container } from "../components/container";
import { SearchResult } from "../components/search-result";

export const Header = () => {
  const location = useLocation();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPathname] = useState("");
  const pathnameRef = useRef("");
  const defaultKeyword = useRef("");

  const [keyword, setKeyword] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword;
      navigate(`/search?q=${keyword}`);
      setSearchFocus(false);
      searchRef.current?.blur();
    }
  };

  const initKeyword = () => {
    if (pathnameRef.current === "/search") {
      setKeyword(defaultKeyword.current);
    } else {
      setKeyword("");
    }
  };

  const onWindowClick = () => {
    setSearchFocus(false);
    initKeyword();
  };

  useEffect(() => {
    setPathname(location.pathname);
    pathnameRef.current = location.pathname;
    defaultKeyword.current = params.get("q") || "";
    initKeyword();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, []);

  return (
    <div className="bg-header sticky top-0 z-[99]">
      <Container className="flex items-center justify-between gap-3">
        {/* brand & menu */}
        <div className="flex items-center gap-6">
          {/* brand */}
          <h1 className="text-2xl font-semibold">
            <Link to={"/"}>Movies</Link>
          </h1>
        </div>

        {/* search */}
        <div
          className="
          border-b-[1.5px] 
          border-white
          flex
          items-center
          p-1
          flex-[0.5]
          focus-within:border-primary
          relative
        "
        >
          <input
            onClick={(e) => {
              e.stopPropagation();
              setSearchFocus(true);
            }}
            onKeyDown={(e) => (e.key === "Enter" ? goToSearchPage() : "")}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            className="bg-transparent outline-0 flex-1"
            placeholder="search..."
          />
          <IoIosSearch size={18}></IoIosSearch>
          {isSearchFocus ? (
            <SearchResult
              goToSearchPage={(query) => {
                defaultKeyword.current = query;
                navigate(`/search?q=${query}`);
                setSearchFocus(false);
                searchRef.current?.blur();
              }}
            ></SearchResult>
          ) : null}
        </div>
      </Container>
    </div>
  );
};
