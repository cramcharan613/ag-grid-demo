import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight


interface RowData {
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

const Grid: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
  const [gridColumnApi, setGridColumnApi] = useState<agGrid.ColumnApi | null>(
    null
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, []);

  const columnDefs: agGrid.ColDef[] = [
    { field: "athlete", filter: "agTextColumnFilter", sortable: true },
    { field: "age", filter: "agNumberColumnFilter", sortable: true },
    { field: "country", filter: "agSetColumnFilter", sortable: true },
    { field: "year", filter: "agNumberColumnFilter", sortable: true },
    { field: "date", filter: "agDateColumnFilter", sortable: true },
    { field: "sport", filter: "agTextColumnFilter", sortable: true },
    { field: "gold", filter: "agNumberColumnFilter", sortable: true },
    { field: "silver", filter: "agNumberColumnFilter", sortable: true },
    { field: "bronze", filter: "agNumberColumnFilter", sortable: true },
    { field: "total", filter: "agNumberColumnFilter", sortable: true },
    {
      headerName: '',
      field: 'actions',
      width: 50,
      cellRenderer: () => (
        <button className="px-2 py-1 text-gray-600 hover:text-gray-900">
          ⋮
        </button>
      )
    }
  ];

  const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    filter: true,
    floatingFilter: true,
    sortable: true,
  };

  const onGridReady = (params: agGrid.GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onPaginationChanged = () => {
    console.log("onPaginationChanged");
  };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  };

  const exportToExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  return (
    <div className="ag-theme-alpine grid-container">
      <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563] ">
        <div>
          <button
            className="rounded bg-gray-200 px-3 py-1 mr-2"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
          <button
            className="rounded bg-gray-200 px-3 py-1"
            onClick={exportToExcel}
          >
            Export to CSV
          </button>
        </div>
      </div>
      <AgGridReact
        className="ag-grid"
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={50}
        onPaginationChanged={onPaginationChanged}
        enableRangeSelection={true}
        rowSelection="multiple"
        animateRows={true}
        suppressRowClickSelection={true}
        groupSelectsChildren={true}
        rowMultiSelectWithClick={true}
      ></AgGridReact>
      <style jsx global>{`
        .grid-container {
          height: 800px;
          width: 100%;
        }
        .ag-grid {
          font-family: 'Roboto', sans-serif;
        }
        .ag-grid .ag-cell {
          padding: 0.5rem;
          font-size: 1.0rem;
          color: #4b5563;
          border-color: #e5e7eb;
          line-height: 1.5;
        }
        .ag-grid .ag-header-cell {
          font-weight: 400;
          font-size: 1.1rem;
          color: #374151;
          background-color: #f9fafb;
          border-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default Grid;