import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  PagingState,
  CustomPaging,
  SortingState,
  EditingState,
  FilteringState,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableEditColumn,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";

import config from "../../../config";
import useQuery from "../hooks/useGridQuery";
import Loading from "../../shared/loading";
import PopupEditing from "./PopupEditing";
import Popup from "./Popup";

const URL = `${config.URL_SERVER}/admins`;

export default function AdminGrid() {
  // Du lieu co ban cho bang
  const [columns] = useState([
    { name: "username", title: "Username" },
    { name: "name", title: "Name" },
    { name: "email", title: "Email" },
    { name: "isSuperAdmin", title: "Right" },
  ]);
  const [editingStateColumnExtensions] = useState([
    { columnName: "username", editingEnabled: false },
  ]);
  const [filteringStateColumnExtensions] = useState([
    { columnName: "isSuperAdmin", filteringEnabled: false },
  ]);

  const [query, setQuery, commitChanges] = useQuery(URL, "admins");
  const setSorting = setQuery.setSorting;
  const setFilters = (filters) => {
    setQuery.setFiltering(filters);
    setQuery.setPage(0);
  };
  const setCurrentPage = setQuery.setPage;
  const setPageSize = (size) => {
    setQuery.setPerpage(size);
    setQuery.setPage(0);
  };

  const RightFormatter = ({ value }) => (
    <b
      style={{
        color: value ? "red" : "black",
      }}
    >
      {value ? "Super Admin" : "Admin"}
    </b>
  );

  const RightTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={RightFormatter} {...props} />
  );

  return (
    <Paper style={{ position: "relative" }}>
      <Grid rows={query.data} columns={columns}>
        <SortingState sorting={query.sorting} onSortingChange={setSorting} />
        <PagingState
          currentPage={query.page}
          onCurrentPageChange={setCurrentPage}
          pageSize={query.perpage}
          onPageSizeChange={setPageSize}
        />
        <CustomPaging totalCount={query.total} />
        <EditingState
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions}
        />
        <FilteringState
          onFiltersChange={setFilters}
          columnExtensions={filteringStateColumnExtensions}
        />
        <RightTypeProvider for={["isSuperAdmin"]} />
        <Table />
        <TableHeaderRow
          showSortingControls
          contentComponent={({ children }) => <b>{children}</b>}
        />
        <TableEditColumn showEditCommand showDeleteCommand />
        <TableFilterRow />
        <PopupEditing popupComponent={Popup} />

        <PagingPanel pageSizes={[10, 20, 30]} />
      </Grid>
      {query.loading && <Loading />}
    </Paper>
  );
}
