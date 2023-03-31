import { ReactNode } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";

import MainContainer from "@/components/layout/MainContainer";
import SearchTable from "@/components/layout/SearchTable";
import useLoadData from "@/hooks/useLoadData";

interface MainComponentProps {
  children?: ReactNode;
}

const Search = () => {
  useLoadData();

  return (
    <>
      <MainContainer>
        <SearchTable />
      </MainContainer>
    </>
  );
};

export default Search;
