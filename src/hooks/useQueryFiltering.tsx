import React, { useState, useEffect } from "react";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import queryString from "query-string";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";

import { changeCategoryValue } from "@/stores/slices/categoryFilterSlice";
import { changeCitiesValue } from "@/stores/slices/citiesValueFilterSlice";
import { changePriceValue } from "@/stores/slices/priceValueFilterSlice";
import { changeSoldOutValue } from "@/stores/slices/soldOutFilterSlice";
import { changeRenderNum } from "@/stores/slices/renderNumSlice";

import { init, filter } from "@/stores/slices/dataSlice";

interface category {
  value: string[];
  list: string[];
}

interface cityData {
  code: string;
  name: string;
}

interface cityValueObject {
  state: cityData | null;
  region: cityData | null;
  district: cityData | null;
}

interface price {
  max: string;
  min: string;
}

interface GoodsData {
  category: string | string[];
  state: string;
  region: string;
  image: string;
  link: string;
  name: string;
  price: string;
  soldOut: boolean;
  taxType: string;
}

interface initialState {
  value: GoodsData[] | undefined;
  filtered: GoodsData[] | undefined;
}

const _ = require("lodash");

const parseQueryString = (qs: string) => {
  let parseString = queryString.parse(qs, { arrayFormat: "comma" });
  console.log(parseString);
  return parseString;
};

const useQueryFiltering = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, search, key, state } = useLocation();

  const [newData, setNewData] = useState<GoodsData[]>([]);

  const data = useSelector((state: RootState) => {
    return state.rowData.value;
  });

  const categoryList = useSelector((state: RootState) => {
    return state.categoryFilter.category.list;
  });

  const renderNum = useSelector((state: RootState) => {
    return state.renderNum.value;
  });

  const soldOutList = [
    {
      code: "0",
      name: "구매가능",
    },
    {
      code: "1",
      name: "품절",
    },
  ];

  const setCategoryValue = (data: category) => {
    dispatch(changeCategoryValue(data));
  };

  const setCityValue = (data: cityValueObject) => {
    dispatch(changeCitiesValue(data));
  };

  const setPriceValue = (data: price) => {
    dispatch(changePriceValue(data));
  };

  const setSoldOutValue = (data: cityData | null) => {
    dispatch(changeSoldOutValue(data));
  };

  const setChangeRenderNum = (data: number) => {
    dispatch(changeRenderNum(data));
  };

  // // const queryList = [...searchParams]; // [['key1', 'test1'], ['key2', 'test2']
  // console.log("query", location, location.search, decodeURI(location.search), useNavigate());

  useEffect(() => {
    console.log("First search", renderNum);
    if (!pathname.includes("search") || renderNum) return;

    let parseString = parseQueryString(search);
    console.log("pass", parseString);
    let newCityValue: cityValueObject = { state: null, region: null, district: null };
    // let stateListCopy: cityData[] = [...stateList];
    // let regionListCopy: cityData[] = [...regionList];

    // console.log(stateList, stateListCopy);
    newCityValue.state =
      parseString?.state && parseString?.stateCode ? ({ code: parseString?.stateCode, name: parseString?.state } as cityData) : null; //stateListCopy.filter((item) => item.name.includes(parseString?.state as string))[0] ?? null;
    newCityValue.region =
      parseString?.region && parseString?.regionCode ? ({ code: parseString?.regionCode, name: parseString?.region } as cityData) : null; //regionListCopy.filter((item) => item.name.includes(parseString?.region as string))[0] ?? null;

    setCategoryValue({ value: parseString?.category == null ? [] : ([parseString?.category].flat() as string[]), list: [...categoryList] });

    setCityValue(newCityValue);

    setSoldOutValue(soldOutList.filter(({ name, code }) => code == parseString.soldOut)[0] ?? null);
    setPriceValue({ max: (parseString.maxPrice as string) ?? "", min: (parseString.minPrice as string) ?? "" });

    // navigate(
    //   {
    //     pathname: "/search",
    //     search: search,
    //   },
    //   { state: state }
    // );
    let newRenderNum = renderNum + 1;
    setChangeRenderNum(newRenderNum);
  }, [search]);

  return newData;
};

export default useQueryFiltering;
