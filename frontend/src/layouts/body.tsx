import { Route, Routes } from "react-router-dom";

import { Detail } from "../pages/details";
import { Home } from "../pages/home";
import { Search } from "../pages/search";

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/search" element={<Search />}></Route>

      <Route path="/detail/:id" element={<Detail />}></Route>
      <Route path="/*" element={<div> Not found</div>}></Route>
    </Routes>
  );
};
