import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "@/css/SearchTable.scss";

import { parse, ParseResult } from "papaparse";

import {
  CheckboxSelectionCallbackParams,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
} from "ag-grid-community";

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

// const dateComparator = (date1: string, date2: string): number => {
//   var date1Number = new Date(dateFormatter(date1)).getTime();
//   var date2Number = new Date(dateFormatter(date2)).getTime();

//   console.log(date1Number, date2Number);

//   if (date1Number == null && date2Number == null) {
//     return 0;
//   }

//   if (date1Number == null) {
//     return -1;
//   } else if (date2Number == null) {
//     return 1;
//   }

//   return date1Number - date2Number;

//   function dateFormatter(date: string) {
//     let splitDate = date1.split("/");
//     let year = splitDate[2];
//     let month = splitDate[1];
//     let day = splitDate[0];
//     let dateTime = [year, month, day].join("-");
//     return dateTime;
//   }
// };

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

// HELPER FOR DATE COMPARISON
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

// DATA FORMATTING
function dateFormatter(params: { data: { date: string } }) {
  var dateAsString = params.data.date;
  var dateParts = dateAsString.split("/");
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}

const SearchTable = () => {
  const gridRef = useRef<AgGridReact<GoodsData>>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%", marginTop: "50px" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [parseData, setParseData] = useState<ParseResult<Record<string, unknown>>>();
  const [rowData, setRowData] = useState<GoodsData[] | undefined>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "image", minWidth: 180, cellStyle: { textAlign: "right" } },
    { field: "link" },
    { field: "name", minWidth: 150 },
    { field: "price" },
    { field: "soldOut", minWidth: 150 }, //valueFormatter: dateFormatter, comparator: dateComparator ,
    { field: "taxType", minWidth: 150 },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
      // headerCheckboxSelection: isFirstColumn,
      // checkboxSelection: isFirstColumn,
    };
  }, []);

  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //     .then((resp) => resp.json())
  //     .then((data: IOlympicData[]) => setRowData(data));
  // }, []);

  const filePath: string = "../../data/data_20230220_164450.csv";

  const onGridReady = useCallback((params: GridReadyEvent) => {
    parse(filePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results: ParseResult<GoodsData>) {
        /* ...code stuff... */
        console.log(results);
        setRowData(results.data);
      },
    });
  }, []);

  // useEffect(() => {
  //   setRowData(parseData?.data);
  // }, [parseData]);

  const onQuickFilterChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter((document.getElementById("quickFilter") as HTMLInputElement).value);
  }, []);

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

  return (
    <>
      <div style={containerStyle}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <input type="text" onInput={onQuickFilterChanged} id="quickFilter" placeholder="quick filter..." />
          </div>

          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact<GoodsData>
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              // suppressRowClickSelection={false}
              // rowSelection={"multiple"}
              multiSortKey={"ctrl"}
              onGridReady={onGridReady}
              // onSelectionChanged={onSelectionChanged}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchTable;
