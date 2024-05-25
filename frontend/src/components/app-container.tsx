import { BrowserRouter } from "react-router-dom";

import { Body } from "../layouts/body";
import { Header } from "../layouts/header";

export const AppContainer = () => {
  return (
    <BrowserRouter>
      <Header />
      <Body />
    </BrowserRouter>
  );
};
