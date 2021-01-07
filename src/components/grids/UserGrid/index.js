import React, { useState } from "react";
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
import config from "../../../config";
import useQuery from "./useGridQuery";
import Loading from "../../shared/loading";

const URL = `${config.URL_SERVER}/users`;

export default function UserGrid() {
  // Du lieu co ban cho bang
  const [columns] = useState([
    { name: "id", title: "ID" },
    { name: "username", title: "Username" },
    { name: "name", title: "Name" },
    { name: "email", title: "Email" },
  ]);
  const [query, setQuery] = useQuery(URL, "users");
  const setSorting = setQuery.setSorting;
  const setFilters = (filters) => {
    setQuery.setFiltering(filters);
    setQuery.setPage(0);
  };
  const setCurrentPage = setQuery.setPage;

  const commitChanges = console.log;
  return (
    <Paper style={{ position: "relative" }}>
      <Grid rows={query.data} columns={columns}>
        <SortingState sorting={query.sorting} onSortingChange={setSorting} />
        <PagingState
          currentPage={query.page}
          onCurrentPageChange={setCurrentPage}
          pageSize={query.perpage}
        />
        <CustomPaging totalCount={query.total} />
        <EditingState onCommitChanges={commitChanges} />
        <FilteringState onFiltersChange={setFilters} />
        <VirtualTable />
        <TableHeaderRow
          showSortingControls
          contentComponent={({ children }) => <b>{children}</b>}
        />
        <TableEditRow />
        <TableEditColumn showEditCommand showDeleteCommand />
        <TableFilterRow />

        <PagingPanel />
      </Grid>
      {query.loading && <Loading />}
    </Paper>
  );
}
