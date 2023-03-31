import { ReactNode } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";

import { styled } from "@mui/material/styles";

import { Box } from "@mui/material";

import CardContents from "@/components/layout/CardContents";
import SearchBox from "@/components/shared/SearchBox";

const StyledContainer = styled(Box)(({ theme, left, right }) => {
  return {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    // background: "#cfe8fc",
    margin: "0 auto",
    width: `calc(100vw - 110px*1.4)`,
    maxWidth: "calc(1800px - 110px)",
    minHeight: "100vh",
    [theme.breakpoints.between(1024, 2010)]: {
      width:
        left == "true" && right == "true"
          ? `calc(100vw - 400px)`
          : left == "true" || right == "true"
          ? `calc(100vw - 200px - 55px)`
          : `calc(100vw - 110px*1.4)`,
      margin: left == "true" && right == "true" ? "0 auto" : left == "true" ? "0 55px 0 200px" : right == "true" ? "0 200px 0 55px" : "0 auto",
    },
    [theme.breakpoints.down(1024)]: {
      width: "100vw",
      padding: "0 10px",
    },
  };
});

interface MainComponentProps {
  children?: ReactNode;
}

const MainContainer = ({ children }: MainComponentProps) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const drawerState = useSelector((state: RootState) => state.drawerAnchor.value);
  const dispatch = useDispatch();

  return (
    <>
      <StyledContainer left={String(drawerState.left)} right={String(drawerState.right)}>
        {children}
      </StyledContainer>
    </>
  );
};

export default MainContainer;
