import React, { useState, useEffect } from "react";

import { parse, ParseResult } from "papaparse";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/stores/store";

import { changeLoading } from "@/stores/slices/dataLoadingSlice";

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

const useLoadData = () => {
  const dispatch = useDispatch();

  const [newData, setNewData] = useState<GoodsData[]>([]);

  const data = useSelector((state: RootState) => {
    return state.rowData.value;
  });

  const setData = (data: GoodsData[]) => {
    dispatch(init(data));
  };

  const setFilteredData = (data: GoodsData[]) => {
    dispatch(filter(data));
  };

  const setDataLoading = (data: boolean) => {
    dispatch(changeLoading(data));
  };

  const filePath: string = "../../data/data_20230314_094505.csv";

  const parseToCSV = async (filePath: string) => {
    return new Promise((resolve, reject) => {
      parse(filePath, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results: ParseResult<GoodsData>) {
          resolve(results.data);
        },
        error(err, file) {
          reject(err);
        },
      });
    });
  };

  useEffect(() => {
    if (data !== undefined && data.length) return;
    setDataLoading(true);

    const parsePromise = parseToCSV(filePath);

    parsePromise
      .then((result) => {
        let oldData = result as GoodsData[];
        setData(oldData);
      })
      .then(() => {
        setDataLoading(false);
      });

    return () => {};
  }, []);
};

export default useLoadData;
