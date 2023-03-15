import React, { useState, useEffect, ReactNode } from "react";

import { FormControl, MenuItem, InputLabel, Select, SelectChangeEvent, Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { alpha, styled } from "@mui/material/styles";

import axios from "axios";

import { CitiesAutoSelect, MultipleAutoSelectBox, SoldOutAutoSelect, PriceInputTextField } from "@/components/shared/SelectFilters";

interface SearchTableFiltersProps {
  width?: string;
}

const SearchTableFilters = ({ width }: SearchTableFiltersProps) => {
  return (
    <Box id="searchTableFilterWrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: width }}>
      <MultipleAutoSelectBox />

      <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <CitiesAutoSelect />
      </Box>

      <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <PriceInputTextField />
      </Box>

      <SoldOutAutoSelect />
    </Box>
  );
};

export default SearchTableFilters;
