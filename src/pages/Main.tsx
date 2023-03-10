import { ReactNode } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";

import { styled } from "@mui/material/styles";

import { Box } from "@mui/material";

import CardContents from "@/components/layout/CardContents";
import SearchBox from "@/components/shared/SearchBox";

const MainContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "flex-start",
  // background: "#cfe8fc",
  width: "60vw",
  margin: "0 auto",
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

const Main = ({ children }: MainComponentProps) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const drawerState = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch();

  return (
    <>
      <MainContainer>
        <SearchBox />
        <CardContents images={animals} columnNum={4} spacing={1} height={20} />
        <CardContents images={animals2} columnNum={3} spacing={1} height={25} />
      </MainContainer>
    </>
  );
};

export default Main;
