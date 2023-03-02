import React, { useState, useEffect, useRef } from "react";

import { FormControl, FormControlProps, InputAdornment, TextField, TextFieldProps, OutlinedInputProps, useTheme } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";

import { alpha, styled } from "@mui/material/styles";

import "../../css/SearchBox.scss";

interface TextInputPorops {
  size: string;
  variant: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps: Partial<OutlinedInputProps>;
}

// Styled Component를 component 밖으로 빼지 않으면 state update 직후 element의 lose focusing이 발생함

const StyledTextInput = styled(TextField)(({ theme }) => {
  return {
    "&": {
      width: "60%",
      marginTop: "calc(0.25 * 26rem);",
      "& .MuiInputBase-root": {
        border: "none",
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: theme.palette.mode === "light" ? "#272a30" : "#272a30",
        transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),

        "&:hover": {
          backgroundColor: "#353940",
        },
        "&.Mui-focused": {
          backgroundColor: "#e2e4e9",
          // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
          // borderColor: theme.palette.primary.main,
          border: "none",
          outline: "none",

          "& input": {
            "&::placeholder": {
              color: "#474a52",
            },
          },
        },

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        "& .MuiInputAdornment-root": {
          color: "#999ca3",
        },
        "& input": {
          color: "#999ca3",
          padding: "16px 20px",

          "&::placeholder": {
            color: "#999ca3",
          },
        },
      },
    },
  };
});

const TextInput = ({ placeholder = "Search...", onChange, ...props }: TextFieldProps) => {
  const [showClearIcon, setShowClearIcon] = useState("none");

  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleClick = (): void => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
  };

  return (
    <StyledTextInput
      {...props}
      style={{ marginTop: props?.style?.marginTop }}
      size="small"
      variant="outlined"
      placeholder="상품명, 지역 등을 검색하세요"
      onChange={handleChange}
      InputProps={
        {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" style={{ display: showClearIcon }} onClick={handleClick}>
              <ClearIcon />
            </InputAdornment>
          ),
        } as Partial<OutlinedInputProps> // Partial<OutlinedInputProps> 타입 지정
      }
    />
  );
};

const SearchBox = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);

  function logit() {
    console.log(searchBoxRef?.current);
    // setScrollY(searchBoxRef?.current?.scrollTop);
    // if (searchBoxRef?.current?.scrollTop > 30) {
    //   setScrollActive(true);
    // } else {
    //   setScrollActive(false);
    // }
  }

  useEffect(() => {
    function watchScroll() {
      searchBoxRef?.current?.addEventListener("scroll", logit);
    }

    watchScroll();

    return () => {
      searchBoxRef?.current?.removeEventListener("scroll", logit);
    };
  }, []);

  return (
    <>
      <FormControl id={"globalSearchBox"} ref={searchBoxRef}>
        <TextInput />
      </FormControl>
    </>
  );
};

export default SearchBox;
