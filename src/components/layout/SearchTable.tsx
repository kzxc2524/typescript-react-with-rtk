import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "@/css/SearchTable.scss";

import { parse, ParseResult } from "papaparse";

import { useSelector, useDispatch } from "react-redux";

import SearchBox from "@/components/shared/SearchBox";
import SearchTableFilters from "@/components/layout/SearchTableFilters";
import useWindowSize from "@/hooks/useWIndowSize";
import useFilterData from "@/hooks/useFilterData";

import { RootState } from "@/stores/store";
import { init } from "@/stores/slices/dataSlice";
import { changeSearchInputValue } from "@/stores/slices/searchInputValueSlice";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { Box, Typography, CircularProgress, CircularProgressProps } from "@mui/material";

import {
  CheckboxSelectionCallbackParams,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridApi,
  GridReadyEvent,
  GridSizeChangedEvent,
  HeaderCheckboxSelectionCallbackParams,
  ICellRendererParams,
  RowHeightParams,
  RowClickedEvent,
  ColumnResizedEvent,
  StatusPanelDef,
} from "ag-grid-community";

const SearchContainer = styled(Box)({
  width: "100%",
  height: "100vh",
  // marginTop: "50px",
  background: "#181a20",
  borderRadius: "15px",
  padding: "calc(0.25*6rem) 2rem 0",
});

const StyledColumnTextWrap = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const StyledColumnText = styled(Typography)({
  fontSize: "inherit",
});

interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
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

interface Values {
  data: GoodsData[];
}

function isFirstColumn(params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

// HELPER FOR DATE COMPARISON
function dateComparator(date1: string, date2: string) {
  var date1Number = _monthToNum(date1);
  var date2Number = _monthToNum(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
}

// HELPER FOR PRICE COMPARISON

const priceComparator = (date1: string, date2: string) => {
  let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/a-zA-Z ]/gim;

  let price1: number | null = Number(date1.replace(reg, ""));

  let price2: number | null = Number(date2.replace(reg, ""));
  // console.log(date1, date2, "a", price1, "b", price2);

  if (isNaN(price1) && isNaN(price2)) {
    return 0;
  }
  if (isNaN(price1)) {
    return -1;
  }
  if (isNaN(price2)) {
    return 1;
  }

  if (price1 === null && price2 === null) {
    return 0;
  }
  if (price1 === null) {
    return -1;
  }
  if (price2 === null) {
    return 1;
  }

  return price1 - price2;
};

function _monthToNum(date: string) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  let splitDate = date.split("/");
  let year = Number(splitDate[2]);
  let month = Number(splitDate[1]);
  let day = Number(splitDate[0]);

  var result = year * 10000 + month * 100 + day;
  // 29/08/2004 => 20040829
  return result;
}

// PRICE DATA FORMATTING
function priceFormatter(params: { data: { price: string } }) {
  let priceData = params.data.price;
  let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/a-zA-Z ]/gim;

  let resultData = priceData.replace(reg, "");

  return resultData;
}

// DATE DATA FORMATTING
function dateFormatter(params: { data: { date: string } }) {
  var dateAsString = params.data.date;
  var dateParts = dateAsString.split("/");
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    neutral: true;
  }
}

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          zIndex: "100",
          alignItems: "center",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          margin: "auto",
        }}
      >
        <CircularProgress />
        {/* <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="#fff">{`${Math.round(props.value)}%`}</Typography>
        </Box> */}
      </Box>
    </ThemeProvider>
  );
};

const CircularStatic = () => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
};

const SearchTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => {
    return state.rowData.filtered;
  });

  const setData = (data: GoodsData[]) => {
    dispatch(init(data));
  };

  const searchInputValue = useSelector((state: RootState) => {
    return state.searchInputValue.value;
  });

  const setSearchInputValue = (data: string) => {
    dispatch(changeSearchInputValue(data));
  };

  useFilterData();
  const { width, height } = useWindowSize();
  const [imageSize, setImageSize] = useState({
    width: 150,
    height: 150,
  });

  const gridRef = useRef<AgGridReact<GoodsData>>(null);

  const [gridApi, setGridApi] = useState<GridApi>();
  const [rowData, setRowData] = useState<GoodsData[] | undefined>();
  const [progress, setProgress] = useState(0);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "",
      field: "image",
      maxWidth: imageSize.width + 20,
      sortable: false,
      cellRenderer: (params: ICellRendererParams<GoodsData, undefined>) => {
        // console.log(params);
        return (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img style={{ width: "auto", height: "95%" }} src={params?.data?.image} />
            </div>
          </>
        );
      },
    },
    {
      headerName: "",
      field: "name",
      sortable: false,
      cellStyle: { textAlign: "left" },
      cellRenderer: (params: ICellRendererParams<GoodsData, undefined>) => {
        // []를 포함해 안에 있는 글자와 바로 뒤에 오는 공백 제거
        return (
          <StyledColumnTextWrap>
            <StyledColumnText>
              [{params?.data?.state} {params?.data?.region}]
            </StyledColumnText>
            <StyledColumnText>{params?.data?.name.replace(/\[[^\]]*\]\s*/g, "")}</StyledColumnText>
          </StyledColumnTextWrap>
        );
      },
    },
    {
      headerName: "판매가",
      field: "price",
      maxWidth: 120,
      suppressMenu: false,
      comparator: priceComparator,
      cellRenderer: (params: ICellRendererParams<GoodsData, undefined>) => {
        return (
          <StyledColumnTextWrap>
            <StyledColumnText>{params?.data?.price}</StyledColumnText>
          </StyledColumnTextWrap>
        );
      },
    }, // filter: "agNumberColumnFilter"valueFormatter: priceFormatter,
    {
      headerName: "재고",
      field: "soldOut",
      maxWidth: 100,
      suppressMenu: false,
      comparator: (data1: boolean, data2: boolean) => {
        return Number(data1) - Number(data2);
      },
      cellRenderer: (params: ICellRendererParams<GoodsData, undefined>) => {
        return (
          <StyledColumnTextWrap>
            <StyledColumnText>{params?.data?.soldOut ? "품절" : "구매 가능"}</StyledColumnText>
          </StyledColumnTextWrap>
        );
      },
    }, //valueFormatter: dateFormatter, comparator: dateComparator ,
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      cellStyle: { textAlign: "center" },
      resizable: false,
      sortable: true,
      lockPosition: "left",
      headerComponentParams: {
        menuIcon: "fa-bars",
      },
      // headerCheckboxSelection: isFirstColumn,
      // checkboxSelection: isFirstColumn,
    };
  }, []);

  const statusBar = useMemo<{
    statusPanels: StatusPanelDef[];
  }>(() => {
    return {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "center" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    };
  }, []);

  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //     .then((resp) => resp.json())
  //     .then((data: IOlympicData[]) => setRowData(data));
  // }, []);

  const filePath: string = "../../data/data_20230314_094505.csv";

  const onGridReady = useCallback((params: GridReadyEvent) => {
    // save AgGrid api
    setGridApi(params.api);

    // Auto fit width to contents
    params.api.sizeColumnsToFit();

    params.api.showLoadingOverlay();

    // debugger;

    // csv localfile load an parse
    parse(filePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results: ParseResult<GoodsData>) {
        /* ...code stuff... */

        let oldData = results.data;
        if (!oldData.length) {
          // params.api!.showNoRowsOverlay();
          return;
        }

        let newData = oldData.reduce((acc, curr, idx) => {
          let duplIdx = acc.findIndex(({ name, price, soldOut }) => {
            return [name.replace(/\[[^\]]*\]\s*/g, ""), price, soldOut].every((elem) => {
              return [curr.name.replace(/\[[^\]]*\]\s*/g, ""), curr.price, curr.soldOut].includes(elem);
            });
          });

          if (duplIdx === -1) {
            acc = [...acc, curr];
          } else {
            let regionStr = acc[duplIdx].region + "," + curr.region;
            let cateStr = acc[duplIdx].category + "," + curr.category;

            acc[duplIdx] = {
              ...acc[duplIdx],
              region: Array.from(new Set(regionStr.split(","))).join(","),
              category: Array.from(new Set(cateStr.split(","))).join(","),
            };
          }

          return acc;
        }, [] as GoodsData[]);

        setData(newData);
        params.api!.hideOverlay();
      },
    });
  }, []);

  const isGoodsData = (arg: GoodsData[] | undefined): arg is GoodsData[] => {
    return true;
  };

  const onQuickFilterChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    gridRef.current!.api.setQuickFilter(e.target.value);
    setSearchInputValue(e.target.value);
  }, []);

  const setRowHeight = useCallback((params: RowHeightParams): number | undefined | null => {
    return imageSize.height;
  }, []);

  const onGridRowClick = (e: RowClickedEvent) => {
    // console.log("row clicked", e);
    window.open(e.data.link, "_blank");
  };

  // const onColumnResize = useCallback((e: ColumnResizedEvent) => {
  //   console.log("aaaa", gridRef, gridRef.current?.columnApi.getColumnState());
  // }, []);

  // Responsive Columns
  const onGridSizeChanged = (params: GridSizeChangedEvent) => {
    console.log(params);
    let imageColumnWidth = params.columnApi.getColumn("image")?.["actualWidth"];
    // console.log(imageColumnWidth);

    // let tableWidth = params.clientWidth;
    // let tableHeight = params.clientHeight;
    params.api.sizeColumnsToFit();
    // console.log(imageColumnWidth);
  };
  // const onSelectionChanged = useCallback(() => {
  //   var selectedRows = gridRef.current!.api.getSelectedRows();
  //   var selectedRowsString = "";
  //   var maxToShow = 5;
  //   selectedRows.forEach(function (selectedRow, index) {
  //     if (index >= maxToShow) {
  //       return;
  //     }
  //     if (index > 0) {
  //       selectedRowsString += ", ";
  //     }
  //     selectedRowsString += selectedRow.athlete;
  //   });
  //   if (selectedRows.length > maxToShow) {
  //     var othersCount = selectedRows.length - maxToShow;
  //     selectedRowsString += " and " + othersCount + " other" + (othersCount !== 1 ? "s" : "");
  //   }

  // console.log(document.querySelector("#selectedRows"));

  // (document.querySelector("#selectedRows") as any)?.innerHTML = selectedRowsString;
  // }, []);

  // useEffect(() => {
  //   const agBodyViewport: HTMLElement | null = document.querySelector(".ag-body-viewport");
  //   console.log("agBodyViewport", agBodyViewport);
  //   if (agBodyViewport) {
  //     const ps = new PerfectScrollbar(agBodyViewport);
  //     ps.update();
  //   }
  // }, []);

  return (
    <>
      <SearchContainer style={{ position: "relative" }}>
        {/* <CircularProgressWithLabel value={progress} /> */}
        <div className="example-wrapper" style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <input type="text" onInput={onQuickFilterChanged} id="quickFilter" placeholder="상품 검색" style={{ width: "20%" }} />
            <SearchTableFilters width={"75%"} />
          </div>

          <div style={{ height: "100%", width: "100%", position: "relative", color: "#fff" }} className="ag-theme-alpine">
            <AgGridReact<GoodsData>
              // statusBar={statusBar}
              headerHeight={25}
              ref={gridRef}
              rowData={data}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressMenuHide={false}
              // suppressRowClickSelection={false}
              // rowSelection={"multiple"}
              getRowHeight={setRowHeight}
              multiSortKey={"ctrl"}
              onGridReady={onGridReady}
              onRowClicked={onGridRowClick}
              // onColumnResized={onColumnResize}
              onGridSizeChanged={onGridSizeChanged}
              overlayLoadingTemplate={'<span class="ag-grid-laoding-overay">답례품 목록을 불러오는 중입니다</span>'}
              overlayNoRowsTemplate={`검색 결과가 없습니다.`}
              // onSelectionChanged={onSelectionChanged}
            ></AgGridReact>
          </div>
        </div>
      </SearchContainer>
    </>
  );
};

export default SearchTable;
