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
import { Chip, Input, MenuItem, Select } from "@material-ui/core";

const URL = `${config.URL_SERVER}/admins`;

const RightFormatter = ({ value }) => (
  <Chip
    label={
      typeof value === "undefined" ? "All" : value ? "Super Admin" : "Admin"
    }
  />
);

const RightEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={
      typeof value === "undefined" ? "All" : value ? "Super Admin" : "Admin"
    }
    onChange={(event) =>
      onValueChange(
        event.target.value === "Super Admin"
          ? true
          : event.target.value === "Admin"
          ? false
          : undefined
      )
    }
    style={{ width: "100%" }}
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="Super Admin">Super Admin</MenuItem>
    <MenuItem value="Admin">Admin</MenuItem>
  </Select>
);

const RightTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={RightFormatter}
    editorComponent={RightEditor}
    {...props}
  />
);

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

  const [query, setQuery, commitChanges] = useQuery(
    URL,
    "admins",
    "admin",
    "username"
  );
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

  return (
    <Paper style={{ position: "relative" }}>
      <Grid rows={query.data} columns={columns}>
        <RightTypeProvider for={["isSuperAdmin"]} />
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
        <FilteringState onFiltersChange={setFilters} />
        <Table />
        <TableHeaderRow
          showSortingControls
          contentComponent={({ children }) => <b>{children}</b>}
        />
        <TableEditColumn showEditCommand showAddCommand showDeleteCommand />
        <TableFilterRow />
        <PopupEditing popupComponent={Popup} />

        <PagingPanel pageSizes={[10, 20, 30]} />
      </Grid>
      {query.loading && <Loading />}
    </Paper>
  );
}
