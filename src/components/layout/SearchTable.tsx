import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "@/css/SearchTable.scss";

import { parse, ParseResult } from "papaparse";

import { StyledTextField } from "@/components/shared/SearchBox";
import SearchTableFilters from "@/components/layout/SearchTableFilters";
import useWindowSize from "@/hooks/useWIndowSize";
import useFilterData from "@/hooks/useFilterData";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/stores/store";

import { init } from "@/stores/slices/dataSlice";
import { changeSearchInputValue } from "@/stores/slices/searchInputValueSlice";
import { changeFilterToggle } from "@/stores/slices/filterToggleSlice";

import { styled } from "@mui/material/styles";

import { Box, Typography, Divider, IconButton } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

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
  FirstDataRenderedEvent,
} from "ag-grid-community";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface styleProps {
  theme_mode: string;
}

const SearchContainer = styled(Box)<styleProps>(({ theme, theme_mode }) => {
  return {
    width: "100%",
    height: "calc(100vh - 20px)",
    // marginTop: "50px",
    background: theme_mode == "light" ? variables.emWhite : "#181a20",
    borderRadius: "15px",
    marginTop: "20px",
    padding: "calc(0.25*6rem) 2rem 0",
    "& .ag-theme-alpine": {
      height: "100%",
      width: "100%",
      position: "relative",
      color: "#fff",
    },
    [theme.breakpoints.down(1024)]: {
      padding: "calc(0.25*8rem) 0.1rem 0",
      height: "initial",
      marginTop: "0",
      "& .ag-theme-alpine": {
        height: "100vh",
      },
    },
  };
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

const headerFontSize = "13px";

const StyledDiv = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down(1024)]: {
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
    },
  };
});
const StyledBox = styled(Box)(({ theme }) => {
  return {
    width: "20%",
    marginBottom: "8px",
    [theme.breakpoints.down(1024)]: {
      "&": {
        width: "100%",
        marginTop: "40px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      },
    },
  };
});

const StyledTableTextField = styled(StyledTextField)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      width: "100%",
      marginTop: 0,

      "& .MuiInputBase-root": {
        borderRadius: 4,
        boxShadow: theme_mode == "light" ? "none" : "0 0 10px 3px #ababab10",
        paddingRight: 0,
        "& .MuiSvgIcon-root": {
          fontSize: "1.3rem",
        },

        "& .MuiInputBase-input": {
          fontSize: `calc(${headerFontSize} - 1px)`,
          padding: "4px 0 4px 15px",
        },

        "& .MuiButtonBase-root": {
          color: theme_mode == "light" ? variables.darkGrey : variables.coldGrey,
          padding: "0 10px",
        },
      },
    },
    [theme.breakpoints.down(1024)]: {
      "&": {
        width: "calc(100% - 50px)",
        justifyContent: "center",

        "& .MuiInputBase-root": {
          borderRadius: 4,
          boxShadow: theme_mode == "light" ? "none" : "0 0 10px 3px #ababab10",
          paddingRight: 0,
          "& .MuiSvgIcon-root": {
            fontSize: "1.3rem",
          },

          "& .MuiInputBase-input": {
            fontSize: `calc(${headerFontSize} + 1px)`,
            padding: "4px 0 4px 15px",
          },

          "& .MuiButtonBase-root": {
            color: theme_mode == "light" ? variables.darkGrey : variables.coldGrey,
            padding: "0 10px",
          },
        },
      },
    },
  };
});

const StyledIconButton = styled(IconButton)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      display: "none",
    },
    [theme.breakpoints.down(1024)]: {
      "&": {
        display: "flex",
        height: "28px",
        padding: " 3px 10px",
        /* border: solid 1px #fff; */
        borderRadius: "5px",
        background: theme_mode == "light" ? variables.graphite : variables.bgColor,
        boxSizing: "border-box",
        alignItems: "center",
        flexDirection: "column",

        "&:hover": {
          background: "#353940",
          "& .MuiSvgIcon-root": {
            color: theme_mode == "light" ? variables.navHovertColor : variables.emWhite,
          },
        },

        "& .MuiSvgIcon-root": {
          color: "#7e828b",
        },
      },
    },
  };
});

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

interface anchorState {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
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

interface location {
  searchInputValue?: string;
}

const SearchTable = () => {
  const themeMode = usePaletteMode();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateState = location.state as location;

  const mainSearchInputValue = navigateState?.searchInputValue ?? "";
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

  const filterToggle = useSelector((state: RootState) => {
    return state.filterToggle.value;
  });

  const setFilterToggle = (data: boolean) => {
    dispatch(changeFilterToggle(data));
  };

  useFilterData();
  const { width, height } = useWindowSize();
  const [imageSize, setImageSize] = useState({
    width: 170,
    height: 170,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<AgGridReact<GoodsData>>(null);

  const [showClearIcon, setShowClearIcon] = useState<string>("none");
  // const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [gridApi, setGridApi] = useState<GridApi>();
  const [rowData, setRowData] = useState<GoodsData[] | undefined>();
  const [progress, setProgress] = useState(0);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "",
      field: "image",
      minWidth: imageSize.width,
      maxWidth: imageSize.width,
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
              <img style={{ width: "auto", height: "95%" }} src={params?.data?.image} alt={"상품 이미지"} />
            </div>
          </>
        );
      },
      getQuickFilterText: () => "",
    },
    {
      headerName: "",
      field: "name",
      minWidth: 250,
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
      getQuickFilterText: (params) => {
        return params.data.state + " " + params.data.region + " " + params.data.category + " " + params.data.name;
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
      getQuickFilterText: (params) => {
        let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/a-zA-Z ]/gim;

        return params.value.replace(reg, "");
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
      getQuickFilterText: (params) => (params.value ? "품절" : "구매 가능"),
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

  const onGridReady = useCallback((params: GridReadyEvent) => {
    if (data !== undefined && data.length) return;
    // setTableLoading(true);

    // save AgGrid api
    setGridApi(params.api);

    // Auto fit width to contents
    params.api.sizeColumnsToFit();

    params.api.showLoadingOverlay();

    // debugger;

    // csv localfile load an parse

    // const parsePromise = parseToCSV(filePath);

    // parsePromise
    //   .then((result) => {
    //     let oldData = result as GoodsData[];
    //     setData(oldData);
    //   })
    //   .then(() => {
    //     params.api!.hideOverlay();
    //     // setTableLoading(false);
    //   });
  }, []);

  const onFirstDataRendered = (e: FirstDataRenderedEvent<GoodsData>) => {
    // 페이지 재렌더링 마다 작동, 데이블 데이터 로드 후 한 번만 작동함
    let inputValue = mainSearchInputValue.length ? mainSearchInputValue : searchInputValue;

    if (inputValue !== "") {
      setShowClearIcon("flex");
    } else {
      setShowClearIcon("none");
    }

    if (inputValue == "") return;

    e.api.setQuickFilter(inputValue);
    setSearchInputValue(inputValue);
    searchInputRef.current?.focus();
    // navigate("/search", { replace: true }); //location 지우기
  };

  const isGoodsData = (arg: GoodsData[] | undefined): arg is GoodsData[] => {
    return true;
  };

  const onQuickFilterChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    gridRef.current!.api.setQuickFilter(e.target.value);
    setSearchInputValue(e.target.value);
    if (e.target.value !== "") {
      setShowClearIcon("flex");
    } else {
      setShowClearIcon("none");
    }
  }, []);

  const setRowHeight = useCallback(
    (params: RowHeightParams): number | undefined | null => {
      return imageSize.height;
    },
    [imageSize]
  );

  const onGridRowClick = (e: RowClickedEvent) => {
    // console.log("row clicked", e);
    window.open(e.data.link, "_blank");
  };

  // const onColumnResize = useCallback((e: ColumnResizedEvent) => {
  //   console.log("aaaa", gridRef, gridRef.current?.columnApi.getColumnState());
  // }, []);

  // Responsive Columns
  const onGridSizeChanged = (params: GridSizeChangedEvent) => {
    // console.log(params.columnApi);
    let imageColumnWidth = params.columnApi.getColumn("image")?.["actualWidth"];
    // console.log(imageColumnWidth);

    let tableWidth = params.clientWidth;
    // let tableHeight = params.clientHeight;

    const columnDefsCopy = [...columnDefs];
    const imageSizeCopy = { ...imageSize };

    let newSize = 170;

    if (tableWidth <= 540) {
      newSize = 120;
      imageSizeCopy.width = newSize;
      imageSizeCopy.height = newSize;

      columnDefsCopy.forEach((colDef, index) => {
        if (colDef.field == "image") {
          colDef.minWidth = newSize;
          colDef.maxWidth = newSize;
        }
      });
    } else {
      newSize = 170;
      imageSizeCopy.width = newSize;
      imageSizeCopy.height = newSize;

      columnDefsCopy.forEach((colDef, index) => {
        if (colDef.field == "image") {
          colDef.minWidth = newSize;
          colDef.maxWidth = newSize;
        }
      });
    }

    params.api.setColumnDefs(columnDefsCopy);
    setImageSize(imageSizeCopy);

    params.api.forEachNode(function (rowNode) {
      if (rowNode.data) {
        rowNode.setRowHeight(newSize);
      }
    });
    params.api.onRowHeightChanged();

    params.api.sizeColumnsToFit();
  };

  const handleClearClick = (e: React.MouseEvent<HTMLElement>): void => {
    setSearchInputValue("");
    gridRef.current!.api.setQuickFilter("");
    setShowClearIcon("none");
  };

  const filterToggleClick = (e: React.MouseEvent<HTMLElement>): void => {
    setFilterToggle(!filterToggle);
  };

  useEffect(() => {
    if (width == undefined) return;
    if (width >= 1024) {
      setFilterToggle(true);
    }
  }, [width]);

  return (
    <>
      <SearchContainer style={{ position: "relative" }} theme_mode={themeMode}>
        <div className="example-wrapper" style={{ position: "relative" }}>
          <StyledDiv>
            <StyledBox>
              <StyledTableTextField
                theme_mode={themeMode}
                type="text"
                onInput={onQuickFilterChanged}
                placeholder="키워드를 입력하세요"
                value={searchInputValue}
                inputRef={searchInputRef}
                InputProps={{
                  endAdornment: (
                    <>
                      {/* <IconButton type="button" aria-label="search" onClick={handleClick}>
                      <SearchIcon className={"searchBoxClear"} />
                    </IconButton> */}
                      <Divider sx={{ display: showClearIcon, height: "85%" }} orientation="vertical" />
                      <IconButton type="button" sx={{ display: showClearIcon }} aria-label="search" onClick={handleClearClick}>
                        <ClearIcon className={"searchBoxClear"} />
                      </IconButton>
                    </>
                  ),
                }}
              />

              <StyledIconButton type="button" onClick={filterToggleClick} theme_mode={themeMode}>
                <FilterListIcon />
              </StyledIconButton>
            </StyledBox>
            <SearchTableFilters />
          </StyledDiv>

          <div className="ag-theme-alpine">
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
              overlayLoadingTemplate={'<span class="ag-grid-laoding-overay"></span>'}
              overlayNoRowsTemplate={`검색 결과가 없습니다.`}
              onFirstDataRendered={onFirstDataRendered}
              // onSelectionChanged={onSelectionChanged}
            ></AgGridReact>
          </div>
        </div>
      </SearchContainer>
    </>
  );
};

export default SearchTable;
