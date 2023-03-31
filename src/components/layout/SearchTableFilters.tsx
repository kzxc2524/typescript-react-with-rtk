import { Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";

import { CitiesAutoSelect, MultipleAutoSelectBox, PriceInputTextField, SoldOutAutoSelect } from "@/components/shared/SelectFilters";

import { styled } from "@mui/material/styles";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface SearchTableFiltersProps {
  style?: React.CSSProperties;
  filter_toggle?: boolean;
  theme_mode: string;
}

const SearchFilters = styled("ul")<SearchTableFiltersProps>(({ theme, filter_toggle, theme_mode }) => {
  return {
    "&": {
      display: "flex",
      width: "78%",

      "& li": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },

      [theme.breakpoints.up(1024)]: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 0,

        "& li:nth-of-type(1)": {
          width: "15%",
        },
        "& li:nth-of-type(n+2):nth-of-type(-n+3)": {
          width: "35%",
        },
        "& li:nth-of-type(4)": {
          width: "15%",
        },
      },
      [theme.breakpoints.down(1024)]: {
        width: "100%",
        flexDirection: "column",
        zIndex: 5,
        background: theme_mode == "light" ? variables.emWhite : variables.shallowBlack,
        boxSizing: "border-box",
        height: filter_toggle ? "initial" : "0",
        overflow: filter_toggle ? "initial" : "hidden",
        padding: filter_toggle ? "15px" : "0",

        transition: "padding 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "&& li": {
          width: "100%",
          "&:not(:last-child)": {
            marginBottom: "10px",
          },
        },
      },
    },
  };
});

const SearchTableFilters = () => {
  const themeMode = usePaletteMode();
  const filterToggle = useSelector((state: RootState) => {
    return state.filterToggle.value;
  });

  return (
    <SearchFilters id="searchTableFilterWrap" filter_toggle={filterToggle} theme_mode={themeMode}>
      <li>
        <MultipleAutoSelectBox style={{ width: "100%" }} />
      </li>
      <li>
        <CitiesAutoSelect />
      </li>
      <li>
        <PriceInputTextField />
      </li>

      <li>
        <SoldOutAutoSelect style={{ width: "100%" }} />
      </li>
    </SearchFilters>
  );
};

export default SearchTableFilters;
