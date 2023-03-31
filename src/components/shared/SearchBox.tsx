import React, { useState, useEffect, useRef, ReactNode } from "react";

import { useNavigate } from "react-router-dom";

import {
  FormControl,
  FormControlProps,
  InputAdornment,
  TextField,
  TextFieldProps,
  OutlinedInputProps,
  useTheme,
  IconButton,
  InputBase,
  Divider,
  Paper,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import { alpha, styled } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { changeSearchInputValue } from "@/stores/slices/searchInputValueSlice";
import useScroll from "@/hooks/useScroll";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface TextInputPorops {
  size: string;
  variant: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps: Partial<OutlinedInputProps>;
}

interface styleProps {
  theme_mode: string;
}

// Styled Component를 component 밖으로 빼지 않으면 state update 직후 element의 lose focusing이 발생함

const StyledFormControl = styled(FormControl)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      width: "100%",
      margin: " 0 auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      top: "100px",
      left: 0,
      right: 0,
      background: theme_mode == "light" ? variables.emWhite : variables.shallowBlack,
      transition: theme.transitions.create(["width", "height"]),
      "& .MuiFormControl-root": {
        "& .MuiInputBase-root": {
          "& .MuiInputBase-input": {
            padding: "16px 20px",
            transition: theme.transitions.create(["padding"]),
          },
        },
      },

      "&.fixed": {
        width: "calc(100% - 100px)",
        height: "40px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        margin: "auto",
        zIndex: "600",
        "& .MuiFormControl-root": {
          marginTop: "0",
          "& .MuiInputBase-root": {
            boxShadow: "none",
            border: "none",

            "& .MuiInputBase-input": {
              padding: "8px 0",
            },
          },
        },
      },
    },
  };
});

export const StyledTextField = styled(TextField)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      width: "60%",
      // marginTop: "calc(0.25 * 26rem);",

      "& .MuiInputBase-root": {
        border: theme_mode == "light" ? "none" : "none",
        borderBottom: theme_mode == "light" ? `2px solid ${variables.coldGrey}` : "none",
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: theme_mode == "light" ? variables.emWhite : variables.shallowBlack,
        boxShadow: theme_mode == "light" ? "none" : "0px 1px 6px 0px #ffffff75",
        transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),

        "&:hover": {
          backgroundColor: theme_mode == "light" ? variables.emWhite : variables.navDarkColor,
          color: theme_mode == "light" ? variables.shallowBlack : variables.emWhite,

          "& .MuiInputBase-input": {
            "&::placeholder": {
              color: theme_mode == "light" ? variables.shallowBlack : variables.emWhite,
              fontWeight: "bold",
            },
          },
        },
        "&.Mui-focused": {
          backgroundColor: theme_mode == "light" ? variables.emWhite : variables.emWhite,
          // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
          // borderColor: theme.palette.primary.main,
          border: "none",
          borderBottom: theme_mode == "light" ? `2px solid ${variables.coldGrey}` : "none",
          outline: "none",

          "& .MuiInputBase-input": {
            color: variables.shallowBlack,
            fontWeight: "bold",
            "&::placeholder": {
              color: theme_mode == "light" ? variables.shallowBlack : variables.darkGrey,
              fontWeight: "bold",
            },
          },
        },

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        "& .MuiInputAdornment-root": {
          color: variables.coldGrey,
        },
        "& .MuiButtonBase-root": {
          background: "none",
        },
        "& .MuiInputBase-input": {
          color: theme_mode == "light" ? variables.shallowBlack : variables.emWhite,
          padding: "8px 20px",
          transition: theme.transitions.create(["paading"]),

          "&::placeholder": {
            color: theme_mode == "light" ? variables.darkGrey : variables.emWhite,
          },
        },
      },
    },
    [theme.breakpoints.down(1024)]: {
      width: "calc(100vw - 30px)",
      marginTop: "30px",
    },
  };
});

const TextInput = ({
  placeholder = "Search...",
  onChange,
  setPosition,
  ...props
}: TextFieldProps & { setPosition: React.Dispatch<React.SetStateAction<string>> }) => {
  const themeMode = usePaletteMode();

  const scroll = useScroll();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const searchBoxRef = useRef<HTMLInputElement>();

  const [showClearIcon, setShowClearIcon] = useState("none");

  const [inputValue, setInputValue] = useState<string>("");

  const searchInputValue = useSelector((state: RootState) => {
    return state.searchInputValue.value;
  });

  const setSearchInputValue = (data: string) => {
    dispatch(changeSearchInputValue(data));
  };

  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");

    setInputValue(event.target.value);
  };

  const handleClick = (): void => {
    if (searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
    setInputValue("");
    setShowClearIcon("none");
    // console.log(searchBoxRef);
  };

  const hadleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;

    // setSearchInputValue(inputValue);

    navigate("/search", { state: { searchInputValue: inputValue } });
  };

  useEffect(() => {
    if (searchBoxRef == null) return;
    let targetNode = searchBoxRef.current?.closest(".MuiInputBase-root");

    let targetTop = targetNode?.getBoundingClientRect().top;

    setPosition(() => {
      return (targetTop as number) <= 0 && scroll > 0 ? "fixed" : "relative";
    });
    // console.log(targetNode, targetTop, scroll);
  }, [scroll]);

  return (
    <StyledTextField
      {...props}
      theme_mode={themeMode}
      style={{ marginTop: props?.style?.marginTop }}
      size="small"
      variant="outlined"
      placeholder="상품, 도시, 가격 등을 검색해보세요"
      value={inputValue}
      inputRef={searchBoxRef}
      onChange={handleChange}
      onKeyPress={hadleKeyPress}
      InputProps={
        {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton type="button" sx={{ display: showClearIcon, color: "#999999" }} aria-label="search" onClick={handleClick}>
              <ClearIcon className={"searchBoxClear"} />
            </IconButton>
          ),
        } as Partial<OutlinedInputProps> // Partial<OutlinedInputProps> 타입 지정
      }
    />
  );
};

interface SearchBox {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CustomizedInputBase = () => {
  return (
    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Google Maps" inputProps={{ "aria-label": "search google maps" }} />
      <Divider sx={{ height: 28, m: 0.1 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

const SearchBoxInner = ({ style, children }: SearchBox) => {
  const themeMode = usePaletteMode();

  const searchBoxRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState("relative"); // relative, fixed

  return (
    <>
      {children !== null && children !== undefined ? (
        children
      ) : (
        <StyledFormControl id={"globalSearchBox"} className={position} theme_mode={themeMode}>
          <TextInput style={style} setPosition={setPosition} />
        </StyledFormControl>
      )}
    </>
  );
};

const SearchBox = () => {
  return <SearchBoxInner />;
};

export default SearchBox;
