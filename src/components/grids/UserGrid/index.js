import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  PagingState,
  CustomPaging,
  SortingState,
  EditingState,
  FilteringState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  PagingPanel,
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";

import Loading from "../../shared/loading";

const URL =
  "https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?requireTotalCount=true";
export default function UserGrid() {
  const [columns] = useState([
    { name: "OrderNumber", title: "Order Number" },
    { name: "OrderDate", title: "Order Date" },
    { name: "StoreCity", title: "Store City" },
    { name: "StoreState", title: "Store State" },
    { name: "Employee", title: "Employee" },
    { name: "SaleAmount", title: "Sale Amount" },
  ]);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [sorting] = useState([{ columnName: "OrderNumber", direction: "asc" }]);
  const setSorting = console.log;
  const setFilters = console.log;
  const getQueryString = () =>
    `${URL}&take=${pageSize}&skip=${pageSize * currentPage}`;

  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then((response) => response.json())
        .then(({ data, totalCount: newTotalCount }) => {
          setRows(data);
          setTotalCount(newTotalCount);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };
  useEffect(() => loadData());
  const commitChanges = console.log;
  return (
    <Paper style={{ position: "relative" }}>
      <Grid rows={rows} columns={columns}>
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging totalCount={totalCount} />
        <EditingState onCommitChanges={commitChanges} />
        <FilteringState onFiltersChange={setFilters} />
        <VirtualTable />
        <TableHeaderRow showSortingControls />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        <TableFilterRow />

        <PagingPanel />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
}
