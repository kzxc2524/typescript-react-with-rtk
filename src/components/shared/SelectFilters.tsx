import React, { useState, useEffect, ReactNode } from "react";

import { NumericFormat, NumericFormatProps } from "react-number-format";

import { Theme, useTheme } from "@mui/material/styles";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  SelectProps,
  SelectChangeEvent,
  Chip,
  OutlinedInput,
  Paper,
  Autocomplete,
  AutocompleteProps,
  TextField,
  InputAdornment,
  Typography,
  Checkbox,
} from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { changeCategoryValue, changeCategoryList } from "@/stores/slices/categoryFilterSlice";
import { changeCitiesList } from "@/stores/slices/citiesListFilterSlice";
import { changeCitiesValue } from "@/stores/slices/citiesValueFilterSlice";
import { changePriceValue } from "@/stores/slices/priceValueFilterSlice";
import { changeSoldOutValue } from "@/stores/slices/soldOutFilterSlice";

const _ = require("lodash");

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import { alpha, styled } from "@mui/material/styles";

import axios from "axios";

const emWhite = "#e2e4e9";
const coldGrey = "#7e828b";
const darkGrey = "#3a3a3a";
const shallowBlack = "#101318";
const headerFontSize = "13px";

const StyledFormControl = styled(FormControl)(({ theme }) => {
  return {
    "&": {
      margin: "0 0 10px 0 ",
      "&:hover": {
        ".MuiFormLabel-root": {
          color: emWhite,
        },
      },
    },
  };
});

const StyledLabel = styled(InputLabel)(({ theme }) => {
  return {
    "&": {
      color: coldGrey,
      fontSize: `calc(${headerFontSize} - 1px)`,
      "&.Mui-focused": {
        color: emWhite,
      },
    },
  };
});

const StyledFilterBox = styled(Select)(({ theme }) => {
  return {
    "&": {
      fontSize: `calc(${headerFontSize} - 1px)`,
      "& .MuiSelect-select": {
        color: emWhite,
      },

      "&:before": {
        borderBottom: `2px solid ${coldGrey}`,
      },
      "&:after": {
        borderBottom: `2px solid ${emWhite}`,
      },

      "& .MuiSvgIcon-root": {
        color: coldGrey,
      },
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${coldGrey}`,
      },

      "&:hover": {
        "& .MuiSvgIcon-root": {
          color: emWhite,
        },
        "fieldset.MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${emWhite}`,
        },
      },
      "&.Mui-focused": {
        "& .MuiSvgIcon-root": {
          color: emWhite,
        },
        "fieldset.MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${emWhite}`,
        },
      },
    },
  };
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => {
  return {
    "&": {
      fontSize: `calc(${headerFontSize} - 1px)`,
      "&.MuiButtonBase-root.Mui-selected": {
        background: coldGrey,
        color: emWhite,
      },
      "&.Mui-selected, &.Mui-selected:hover": {
        background: coldGrey,
        color: emWhite,
      },
    },
  };
});

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => {
  return {
    "&": {
      "&.multiSelect .MuiInputBase-root": {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",

        "& .MuiTypography-root": {
          fontSize: `calc(${headerFontSize} - 1px)`,
          overflow: "hidden",
          whiteSpace: "nowrap",
          minWidth: "150px",
        },
      },
      "& .MuiFormLabel-root": {
        fontSize: `calc(${headerFontSize} - 1px)`,
        color: coldGrey,
        marginTop: "-16px",
        paddingLeft: "5px",

        "&.Mui-focused": {
          color: emWhite,
          "& .MuiSvgIcon-root": {
            color: emWhite,
          },
          "fieldset.MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${emWhite}`,
          },
        },
      },

      "& .MuiInputBase-root": {
        color: emWhite,
        fontSize: `calc(${headerFontSize} - 1px)`,
        marginTop: "0",
        width: "100%",
        paddingLeft: "5px",

        "&:hover:not(.Mui-disabled, .Mui-error):before": {
          borderBottom: `2px solid ${emWhite}`,
        },
        "&:before": {
          borderBottom: `2px solid ${coldGrey}`,
        },
        "&:after": {
          borderBottom: `2px solid ${emWhite}`,
        },
      },

      "& .MuiAutocomplete-endAdornment": {
        "& button.MuiAutocomplete-clearIndicator .MuiSvgIcon-root": {
          width: "0.9rem",
          height: "0.9rem",
        },
        "& .MuiSvgIcon-root": {
          color: emWhite,
        },
      },
    },
  };
});

const StyledPaper = styled(Paper)(({ theme }) => {
  return {
    "&": {
      "&.MuiPaper-root": {
        background: darkGrey,
        "& ul.MuiAutocomplete-listbox li": {
          fontSize: `calc(${headerFontSize} - 1px)`,
          color: coldGrey,

          "&.MuiAutocomplete-option.Mui-focused": {
            background: darkGrey,
            color: emWhite,
          },
          "&.MuiAutocomplete-option[aria-selected='true'], &.MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
            background: shallowBlack,
            color: emWhite,
          },

          "& .MuiButtonBase-root.MuiCheckbox-root.Mui-checked, & .MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate": {
            color: emWhite,
          },
        },

        "&.MuiButtonBase-root.Mui-selected": {
          background: coldGrey,
          color: emWhite,
        },
        "&.Mui-selected, &.Mui-selected:hover": {
          background: coldGrey,
          color: emWhite,
        },

        "& .MuiAutocomplete-noOptions": {
          color: coldGrey,
          fontSize: `calc(${headerFontSize} - 1px)`,
          padding: "5px 10px",
        },
      },
    },
  };
});

const StyledTextField = styled(TextField)(({ theme }) => {
  return {
    "&": {
      "& .MuiFormLabel-root": {
        fontSize: `calc(${headerFontSize} - 1px)`,
        color: coldGrey,
        marginTop: "-16px",
        paddingLeft: "5px",
        "&.Mui-focused": {
          color: emWhite,
          "& .MuiSvgIcon-root": {
            color: emWhite,
          },
          "fieldset.MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${emWhite}`,
          },
        },
      },

      "& .MuiInputBase-root": {
        color: emWhite,
        fontSize: `calc(${headerFontSize} - 1px)`,
        marginTop: "0",
        width: "100%",
        paddingLeft: "5px",

        "&:hover:not(.Mui-disabled, .Mui-error):before": {
          borderBottom: `2px solid ${emWhite}`,
        },
        "&:before": {
          borderBottom: `2px solid ${coldGrey}`,
        },
        "&:after": {
          borderBottom: `2px solid ${emWhite}`,
        },
        "& .MuiInputAdornment-root": {
          "& .MuiTypography-root": {
            color: coldGrey,
            fontSize: `calc(${headerFontSize} - 4px)`,
          },
        },
      },
    },
  };
});

interface cityData {
  code: string;
  name: string;
}

interface cityList {
  state: cityData[];
  region: cityData[];
  district: cityData[];
}

interface style {
  [key: string]: string;
}

interface cityValueObject {
  state: cityData | null;
  region: cityData | null;
  district: cityData | null;
}

interface category {
  value: string[];
  list: string[];
}
interface minMaxValue {
  min: string | number;
  max: string | number;
}
interface GoodsData {
  image: string;
  link: string;
  name: string;
  price: string;
  soldOut: boolean;
  taxType: string;
}

interface price {
  max: string;
  min: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface State {
  textmask: string;
  numberformat: string;
}

const apiBase: string = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true";

const fetchJuso = async (api: string = apiBase) => {
  const API_URL = api;
  const { data } = await axios.get(API_URL);
  return data;
};

// ************************************************ AutoComplete *******************************************

type Props<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = {
  autoCompleteProps?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;
  style: style;
  label: string;
  options: cityData[];
  value: cityData | null;
  keyName: string;
  onChange: (e: object, values: any, key: string) => void;
};

const AutoCompleteCustom = <T,>(props: Props<T>) => {
  const { style, label, options, value, keyName, onChange } = props;
  return (
    <StyledFormControl sx={{ ...{ m: 1 }, ...style }}>
      <StyledAutocomplete
        // multiple
        id={"tags-standard" + keyName}
        options={options}
        getOptionLabel={(option) => {
          let returnName = (option as cityData).name;
          let returnNameSplit = returnName.split(" ");
          let targetName = returnNameSplit[returnNameSplit.length - 1];

          return targetName;
        }}
        // defaultValue={undefined}
        value={value}
        PaperComponent={StyledPaper}
        noOptionsText={"지역을 선택해주세요"}
        onChange={(e, values) => onChange(e, values, keyName)}
        renderInput={(params) => <TextField {...params} variant="standard" label={label} />}
      />
    </StyledFormControl>
  );
};

const CitiesAutoSelect = () => {
  const dispach = useDispatch();
  // const [cityValue, setCityValue] = useState<cityValueObject>({
  //   state: null,
  //   region: null,
  //   district: null,
  // });
  // const [cityList, setCityList] = useState<cityList>({
  //   state: [],
  //   region: [],
  //   district: [],
  // });

  const cityValue = useSelector((state: RootState) => {
    return state.citiesValueFilter.value;
  });

  const setCityValue = (data: cityValueObject) => {
    dispach(changeCitiesValue(data));
  };

  const cityList = useSelector((state: RootState) => {
    return state.citiesListFilter.value;
  });

  const setCityList = (data: cityList) => {
    dispach(changeCitiesList(data));
  };

  useEffect(() => {
    const dataPromise = fetchJuso();
    dataPromise.then((data) => {
      console.log(data.regcodes);
      let cityListCopy = { ...cityList };
      cityListCopy = { ...cityListCopy, state: data.regcodes };
      setCityList(cityListCopy);
    });
  }, []);

  useEffect(() => {
    console.log("cityValue", cityValue);
  }, [cityValue]);

  useEffect(() => {
    console.log("cityList", cityList);
  }, [cityList]);

  const allStateCode = "*00000000";

  const makeRegionCode = (code: string) => {
    let targetCode = code.slice(0, 2) + "*";

    targetCode = String(targetCode).padEnd(9, "0");
    console.log(targetCode);

    // apiBase.replace("*00000000", targetCode);

    return targetCode;
  };

  const makeDistrictCode = (code: string) => {
    let targetCode = code.slice(0, 4) + "*";
    console.log(targetCode);

    // apiBase.replace("*00000000", targetCode);
    return targetCode;
  };

  const stateChange = (stateCode: string) => {
    let cityListCopy = { ...cityList };
    let code = allStateCode;
    let key = "region";
    let check = stateCode !== "" && stateCode !== undefined;
    if (check) {
      code = makeRegionCode(stateCode);
    } else {
      cityListCopy = { ...cityListCopy, [key]: [], district: [] };
      key = "state";
    }

    console.log("stateChange");
    const dataPromise = fetchJuso(apiBase.replace("*00000000", code));

    dataPromise.then((data) => {
      console.log(data.regcodes);

      if (check) {
        cityListCopy = { ...cityListCopy, [key]: [{ code: "본청", name: "본청" }, ...data.regcodes] };
      } else {
        cityListCopy = { ...cityListCopy, [key]: [...data.regcodes] };
      }

      setCityList(cityListCopy);
    });
    // + 데이터 필터
  };

  const regionChange = (regionCode: string) => {
    let cityListCopy = { ...cityList };
    let code = cityValue.state?.code as string;
    let key = "district";
    let check = regionCode !== "" && regionCode !== undefined;
    if (check) {
      // code = makeDistrictCode(regionCode); // district가 필요할 때 사용
    } else {
      code = makeRegionCode(code);
      cityListCopy = { ...cityListCopy, [key]: [] };
      key = "region";
    }

    // + 데이터 필터

    /* district가 필요할 때 사용 */
    // console.log("regionChange");
    // const dataPromise = fetchJuso(apiBase.replace("*00000000", code));

    // dataPromise.then((data) => {
    //   console.log(data.regcodes);

    //   cityListCopy = { ...cityListCopy, [key]: [{ code: "본청", name: "본청" }, ...data.regcodes] };
    //   setCityList(cityListCopy);
    // });
  };

  const districtChange = (districtCode: string) => {
    let code = cityValue.region?.code as string;
    if (districtCode !== "" && districtCode.length) {
      code = makeDistrictCode(districtCode);
    }

    // + 데이터 필터
  };

  interface codeChangeAfter {
    [key: string]: (code: string) => void;
  }
  const codeChangeAfter: codeChangeAfter = {
    state: stateChange,
    region: regionChange,
    district: districtChange,
  };

  const codeChange = (e: object, values: any, key: string) => {
    console.log(e, values, key);
    let cityValueCopy = { ...cityValue };

    cityValueCopy = { ...cityValueCopy, [key]: values };

    switch (key) {
      case "state":
        cityValueCopy = { ...cityValueCopy, region: null, district: null };
        break;

      case "region":
        cityValueCopy = { ...cityValueCopy, district: null };
        break;
    }

    console.log(cityValueCopy);
    setCityValue(cityValueCopy);

    let code = values?.code as string;
    console.log("code 12321", code);
    codeChangeAfter[key](code);

    // makeRegionCode(stateCode);
  };

  return (
    <>
      <AutoCompleteCustom
        style={{ ["minWidth"]: "150px" }}
        label={"시도"}
        options={cityList.state}
        value={cityValue.state}
        keyName="state"
        onChange={codeChange}
      />
      <AutoCompleteCustom
        style={{ ["minWidth"]: "150px" }} //["minWidth"]: "100px", ["maxWidth"]: "120px"
        label={"시군구"}
        options={cityList.region}
        value={cityValue.region}
        keyName="region"
        onChange={codeChange}
      />
      {/* <AutoCompleteCustom
        style={{ ["minWidth"]: "100px", ["maxWidth"]: "120px" }}
        label={"읍면동"}
        options={cityList.district}
        value={cityValue.district}
        keyName="district"
        onChange={codeChange}
      /> */}
    </>
  );
};

const SoldOutAutoSelect = () => {
  const displatch = useDispatch();

  // const [value, setValue] = useState<cityData | null>(null);
  const [list, setList] = useState<cityData[]>([
    {
      code: "0",
      name: "구매가능",
    },
    {
      code: "1",
      name: "품절",
    },
  ]);

  const value = useSelector((state: RootState) => {
    return state.soldOutFilter.value;
  });

  const setValue = (data: cityData | null) => {
    displatch(changeSoldOutValue(data));
  };

  const valueChange = (e: SelectChangeEvent<typeof value>, values: any) => {
    console.log(e, values);
    setValue(values);
  };

  return (
    <>
      <AutoCompleteCustom
        style={{ ["minWidth"]: "110px", ["maxWidth"]: "125px" }}
        label={"재고"}
        options={list}
        value={value}
        keyName=""
        onChange={(e, value) => valueChange(e as SelectChangeEvent<typeof value>, value)}
      />
    </>
  );
};

const MultipleAutoSelectBox = () => {
  const dispach = useDispatch();

  const theme = useTheme();
  const data = useSelector((state: RootState) => {
    return state.rowData.value;
  });
  const categoryList = useSelector((state: RootState) => {
    return state.categoryFilter.category.list;
  });
  const categoryValue = useSelector((state: RootState) => {
    return state.categoryFilter.category.value;
  });

  const setCategoryValue = (data: category) => {
    dispach(changeCategoryValue(data));
  };

  const setCategoryList = (data: category) => {
    dispach(changeCategoryList(data));
  };

  const [personName, setPersonName] = React.useState<string[]>([]);

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setPersonName(event.target.value as string[]);
  // };

  useEffect(() => {
    let newCategotyList: string[] = [];
    let dataCopy = data;
    if (dataCopy !== undefined) {
      newCategotyList = dataCopy.map(({ category }) => category) as string[];
      newCategotyList = Array.from(new Set(newCategotyList));
    }
    setCategoryList({ value: [], list: newCategotyList });
  }, [data]);

  const handleChange = (e: SelectChangeEvent<typeof personName>, values: any) => {
    console.log(values);

    setCategoryValue({ value: values, list: [...categoryList] });
  };

  return (
    <StyledFormControl sx={{ m: 1, width: 200 }}>
      <StyledAutocomplete
        className={"multiSelect"}
        multiple
        options={categoryList}
        // getOptionLabel={(option) => {
        //   return option;
        // }}
        // defaultValue={undefined}
        value={categoryValue}
        PaperComponent={StyledPaper}
        noOptionsText={"지역을 선택해주세요"}
        disableCloseOnSelect
        onChange={(e, values) => handleChange(e as SelectChangeEvent<typeof personName>, values)}
        renderInput={(params) => <TextField {...params} variant="standard" label={"분류"} />}
        // renderOption={(props, option, { selected }) => (
        //   <li {...props}>
        //     <span>
        //       <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 5, padding: 2 }} checked={selected} />
        //     </span>
        //     <span>{option as string}</span>
        //   </li>
        // )}
        renderTags={(value, getTagProps) => {
          // console.log("u8057yu082 h", value);
          const numTags = value.length;

          return (
            <Typography variant="body2" style={{ minWidth: "initial" }}>
              {/* {numTags + "  "} */}
              {value
                .slice(0, 2)
                .map((option, _) => {
                  let str = option as string;
                  if (numTags > 2) {
                    return str.length > 4 ? str.slice(0, 3) + "··" : str;
                  } else {
                    return str;
                  }
                })
                .join(", ")}
              {numTags > 2 && ` +${numTags - 2} more`}
            </Typography>
          );
        }}
      />
    </StyledFormControl>
  );
};

// Number to Currency Formatter
const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator // 1,000,000
      valueIsNumericString
      prefix=""
    />
  );
});

const PriceInputTextField = () => {
  const dispatch = useDispatch();
  // const [priceValue, setPriceValue] = useState<price>({ max: "", min: "" });

  const priceValue = useSelector((state: RootState) => {
    return state.priceValueFilter.value;
  });

  const setPriceValue = (data: price) => {
    dispatch(changePriceValue(data));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue({
      ...priceValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <StyledTextField
        label="최소 가격"
        value={priceValue.min}
        onChange={handleChange}
        name="min"
        id="formatted-numberformat-input-min"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
          endAdornment: <InputAdornment position="end">P ~</InputAdornment>,
        }}
        variant="standard"
      />
      <Typography sx={{ color: coldGrey }}></Typography>
      <StyledTextField
        label="최대 가격"
        value={priceValue.max}
        onChange={handleChange}
        name="max"
        id="formatted-numberformat-input-max"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
          endAdornment: <InputAdornment position="start">P</InputAdornment>,
        }}
        variant="standard"
      />
    </>
  );
};

export { CitiesAutoSelect, MultipleAutoSelectBox, SoldOutAutoSelect, PriceInputTextField };
