import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";

import { Box, Paper, Typography, ButtonBase } from "@mui/material";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface styleProps {
  theme_mode: string;
}

const TopBannerText = styled(Typography)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      width: "100%",
      height: "20px",
      lineHeight: "20px",
      whiteSpace: "nowrap",
      display: "flex",
      justifyContent: "center",
      color: variables.emWhite,
      background: theme_mode == "light" ? variables.shallowBlack : variables.darkRed,
      fontSize: "0.8rem",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1100,
    },
    [theme.breakpoints.down(1024)]: {
      "&": {
        height: "16px",
        lineHeight: "21px",
        position: "absolute",
        fontSize: "0.55rem",
        zIndex: 500,
        top: 40,
      },
    },
  };
});

const Topbanner = () => {
  const themeMode = usePaletteMode();
  const location = useLocation();
  const [text, setText] = useState<string>("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setText("고향사랑 답례품을 편리하게 검색해보세요");
        break;
      case "/search":
        setText("고향사랑 답례품의 통계를 보여드려요");
        break;
    }
  }, [location]);

  return (
    <TopBannerText className={"noto600"} theme_mode={themeMode}>
      {text}
    </TopBannerText>
  );
};

export default Topbanner;
