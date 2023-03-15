import React, { ReactNode } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "flex-start",
  // background: "#cfe8fc",
  width: "60vw",
  margin: "0 auto",
});

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default MainContainer;
