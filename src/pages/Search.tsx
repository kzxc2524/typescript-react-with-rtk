import { ReactNode } from "react";

import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

import MainContainer from "@/components/layout/MainContainer";
import SearchTable from "@/components/layout/SearchTable";
import useLoadData from "@/hooks/useLoadData";
import useQueryFiltering from "@/hooks/useQueryFiltering";

interface MainComponentProps {
  children?: ReactNode;
}

const Search = () => {
  useLoadData();
  useQueryFiltering();

  const navigate = useNavigate();
  const location = useLocation();

  console.log(navigate, location);

  return (
    <>
      <MainContainer>
        <SearchTable />
      </MainContainer>
    </>
  );
};

export default Search;
