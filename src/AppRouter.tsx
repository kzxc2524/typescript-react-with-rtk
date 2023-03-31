import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";

import MobileHeader from "@/components/layout/MobileHeader";
import MainNav from "@/components/shared/MainNav";
import PersonalNav from "@/components/shared/PersonalNav";
import CircularProgressWithLabel from "@/components/shared/CircularProgressWithLabel";
import Topbanner from "@/components/shared/Topbanner";
import usePaletteMode from "@/hooks/usePaletteMode";
// import Main from "@/pages/Main";
// import Search from "@/pages/Search";

const Main = React.lazy(() => import("@/pages/Main"));
const Search = React.lazy(() => import("@/pages/Search"));

const AppRouter = () => {
  usePaletteMode();
  return (
    <>
      <BrowserRouter>
        <Topbanner />
        <MobileHeader />
        <MainNav />
        <PersonalNav />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Main />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense>
                <Search />
              </Suspense>
            }
          />
        </Routes>
        <CircularProgressWithLabel />
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
