import { ReactNode, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";

import MainContainer from "@/components/layout/MainContainer";
import CardContents from "@/components/layout/CardContents";
import SearchBox from "@/components/shared/SearchBox";
import useLoadData from "@/hooks/useLoadData";

interface MainComponentProps {
  children?: ReactNode;
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

const Main = ({ children }: MainComponentProps) => {
  useLoadData();
  const data = useSelector((state: RootState) => state.rowData.value);
  const dispatch = useDispatch();

  const [randomData, setRandomData] = useState<GoodsData[]>([]);

  useEffect(() => {
    if (data == undefined || !data.length) return;

    let dataCopy = [...(data as GoodsData[])];

    let newRandomData = new Array(8).fill(undefined).map(() => {
      let randomI = Math.floor(Math.random() * (dataCopy.length + 1));
      return dataCopy[randomI];
    });
    setRandomData(newRandomData);
  }, [data]);

  return (
    <>
      <MainContainer>
        <SearchBox />
        <CardContents images={randomData} columnNum={4} spacing={1} />
        {/* <CardContents images={animals2} columnNum={5} spacing={1} /> */}
      </MainContainer>
    </>
  );
};

export default Main;
