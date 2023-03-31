import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";

import { init, filter } from "@/stores/slices/dataSlice";

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

const useFilterData = () => {
  const dispatch = useDispatch();

  const [newData, setNewData] = useState<GoodsData[]>([]);

  const data = useSelector((state: RootState) => {
    return state.rowData.value;
  });

  const categoryValue = useSelector((state: RootState) => {
    return state.categoryFilter.category.value;
  });
  const stateValue = useSelector((state: RootState) => {
    return state.citiesValueFilter.value.state;
  });
  const regionValue = useSelector((state: RootState) => {
    return state.citiesValueFilter.value.region;
  });
  const minPriceValue = useSelector((state: RootState) => {
    return state.priceValueFilter.value.min;
  });
  const maxPriceValue = useSelector((state: RootState) => {
    return state.priceValueFilter.value.max;
  });
  const soldOutValue = useSelector((state: RootState) => {
    return state.soldOutFilter.value;
  });

  const setFilteredData = (data: GoodsData[]) => {
    dispatch(filter(data));
  };

  useEffect(() => {
    if (data == undefined) return;
    // console.log("sBoolean", maxPriceValue, minPriceValue, categoryValue);
    let newData = data.filter((item) => {
      let { category, state, region, price, soldOut } = { ...item };

      let cateArray = typeof category == "string" ? category.split(",") : category;

      let cBoolean = cateArray.some((item) => (categoryValue.length ? categoryValue : cateArray).includes(item));

      let sBoolean = (stateValue?.name ?? state).includes(state);
      let rBoolean = (regionValue?.name ?? region).includes(region);

      let priceNum = Number(price.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/a-zA-Z ]/gim, ""));
      let pMaxBoolean = Number(priceNum) <= Number(maxPriceValue);
      let pMinBoolean = Number(minPriceValue) <= Number(priceNum);
      let pBoolean = maxPriceValue.length && minPriceValue.length ? pMaxBoolean && pMinBoolean : !maxPriceValue.length ? pMinBoolean : pMaxBoolean;
      let soBoolean = (soldOutValue?.code ?? soldOut) == soldOut;

      return cBoolean && sBoolean && rBoolean && pBoolean && soBoolean;
    });

    setNewData(newData);
    setFilteredData(newData as GoodsData[]);

    return () => {};
  }, [categoryValue, stateValue, regionValue, minPriceValue, maxPriceValue, soldOutValue]);

  return newData;
};

export default useFilterData;
