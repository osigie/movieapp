import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { getGenres } from "../api/api";
import { Genre } from "../interfaces";
import { Body } from "../layouts/body";
import { Header } from "../layouts/header";
import { MediaType } from "../types";
import { Loading } from "./loading";





export const AppContainer = () => {
 

  // if (!genres?.movie?.length || !genres?.tv?.length) {
  //   return (
  //     <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
  //       <Loading></Loading>
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          genres,
        }}
      >
        {/* header */}
        <Header />
        {/* body */}
        <Body />
        {/* footer */}
      </GlobalContext.Provider>
    </BrowserRouter>
  );
};
