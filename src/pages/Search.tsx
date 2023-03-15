import { ReactNode } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";

import { styled } from "@mui/material/styles";

import { Box } from "@mui/material";

import CardContents from "@/components/layout/CardContents";
import SearchBox from "@/components/shared/SearchBox";
import SearchTable from "@/components/layout/SearchTable";

const MainContainer = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    // background: "#cfe8fc",
    width: `calc(100vw - 110px*1.4)`,
    margin: "0 auto",
  };
});

interface MainComponentProps {
  children?: ReactNode;
}

const animals = [
  {
    url: "/img/Peacock.jpg",
    title: "Peacock",
    width: "33.3333%",
  },
  {
    url: "/img/Koala.jpg",
    title: "Koala",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
];

const animals2 = [
  {
    url: "/img/Peacock.jpg",
    title: "Peacock",
    width: "33.3333%",
  },
  {
    url: "/img/Koala.jpg",
    title: "Koala",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/Peacock.jpg",
    title: "Peacock",
    width: "33.3333%",
  },
  {
    url: "/img/Koala.jpg",
    title: "Koala",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
];

const Main = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const drawerState = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch();

  return (
    <>
      <MainContainer>
        <SearchTable />
      </MainContainer>
    </>
  );
};

export default Main;
