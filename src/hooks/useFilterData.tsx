import { useEffect, useState } from "react";

import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

import { RootState } from "@/stores/store";
import { useDispatch, useSelector } from "react-redux";

import { filter } from "@/stores/slices/dataSlice";

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

interface location {
  searchInputValue?: string;
}

const _ = require("lodash");

const useFilterData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const navigateState = location.state as location;

  const mainSearchInputValue = navigateState?.searchInputValue ?? "";

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

  const renderNum = useSelector((state: RootState) => {
    return state.renderNum.value;
  });

  const setFilteredData = (data: GoodsData[]) => {
    dispatch(filter(data));
  };

  useEffect(() => {
    if (data == undefined) return;

    if (renderNum) {
      navigate(
        {
          pathname: "/search",
          search: createSearchParams({
            category: categoryValue.length > 1 ? categoryValue.join(",") : categoryValue,
            state: stateValue?.name === undefined ? [] : stateValue?.name,
            region: regionValue?.name === undefined ? [] : regionValue?.name,
            stateCode: stateValue?.code === undefined ? [] : stateValue?.code,
            regionCode: regionValue?.code === undefined ? [] : regionValue?.code,
            minPrice: minPriceValue.length ? String(minPriceValue) : [],
            maxPrice: maxPriceValue ? String(maxPriceValue) : [],
            soldOut: soldOutValue?.code !== undefined ? String(soldOutValue.code) : [],
          }).toString(),
        },
        { state: { searchInputValue: mainSearchInputValue } }
      );
    }

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
  }, [data, categoryValue, stateValue, regionValue, minPriceValue, maxPriceValue, soldOutValue]);

  return newData;
};

export default useFilterData;
