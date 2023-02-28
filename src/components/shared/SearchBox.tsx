import React, { FunctionComponent, useState } from "react";

import { FormControl, InputAdornment, TextField, makeStyles, Theme, createStyles } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";

// const useStyles = makeStyles((theme: Theme): Theme => {
//   return createStyles({
//     search: {
//       margin: "0",
//     },
//   });
// });

// const { search } = useStyles();

const SearchBox = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleClick = (): void => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
  };

  return (
    <>
      <FormControl className={"globalSearchBox"}>
        <TextField
          size="small"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
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
          }}
        />
      </FormControl>
    </>
  );
};

export default SearchBox;
