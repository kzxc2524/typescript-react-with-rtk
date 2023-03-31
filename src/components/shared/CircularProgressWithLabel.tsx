import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "@/css/SearchTable.scss";

import { parse, ParseResult } from "papaparse";

import { StyledTextField } from "@/components/shared/SearchBox";
import SearchTableFilters from "@/components/layout/SearchTableFilters";
import useWindowSize from "@/hooks/useWIndowSize";
import useFilterData from "@/hooks/useFilterData";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/stores/store";

import { init } from "@/stores/slices/dataSlice";
import { changeSearchInputValue } from "@/stores/slices/searchInputValueSlice";
import { changeFilterToggle } from "@/stores/slices/filterToggleSlice";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { Box, Typography, CircularProgress, CircularProgressProps, TextField, Paper, InputBase, Divider, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface styleProps {
  theme_mode: string;
}

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    neutral: true;
  }
}

const StyledCircularProgress = styled(CircularProgress)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      "& .MuiCircularProgress-svg": {
        "& .MuiCircularProgress-circle": {
          animation: "none",
          color: theme_mode == "light" ? variables.shallowBlack : variables.navHovertColor,
        },
      },
    },
  };
});

const CircularProgressWithLabel = (props: CircularProgressProps & { value?: number; style?: React.CSSProperties }) => {
  const themeMode = usePaletteMode();
  const dataLoading = useSelector((state: RootState) => {
    return state.dataLoading.value;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          zIndex: "100",
          alignItems: "center",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          margin: "0 auto",
          display: dataLoading ? "flex" : "none",
          background: themeMode == "light" ? variables.emWhite + "cc" : variables.graphite + "dd",
          cursor: "progress",
          ...props.style,
        }}
      >
        <StyledCircularProgress theme_mode={themeMode} />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            color: themeMode == "light" ? variables.shallowBlack : variables.navHovertColor,
            marginTop: "10px",
          }}
        >
          답례품 데이터를 가져오는 중입니다
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default CircularProgressWithLabel;
