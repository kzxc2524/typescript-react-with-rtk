import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainNav from "@/components/shared/MainNav";
import PersonalNav from "@/components/shared/PersonalNav";
import Main from "@/pages/Main";
import Search from "@/pages/Search";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <MainNav />
        <PersonalNav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
