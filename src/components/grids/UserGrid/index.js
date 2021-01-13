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
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";
import config from "../../../config";
import useQuery from "../hooks/useGridQuery";
import Loading from "../../shared/loading";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const URL = `${config.URL_SERVER}/users`;

const GoToFormatter = ({ value }) => (
  <Button
    variant="contained"
    color="primary"
    component={Link}
    to={`/user/${value}`}
  >
    GO TO
  </Button>
);

const GoToTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={GoToFormatter}
    {...props}
    editorComponent={GoToEditor}
  />
);

const GoToEditor = ({ value }) =>
  value ? (
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={`/user/${value}`}
    >
      GO TO
    </Button>
  ) : null;

export default function UserGrid() {
  // Du lieu co ban cho bang
  const [columns] = useState([
    { name: "id", title: "ID" },
    { name: "username", title: "Username" },
    { name: "fullname", title: "Name" },
    { name: "email", title: "Email" },
    { name: "goto", title: " ", getCellValue: (row) => row.username },
  ]);
  const [editingStateColumnExtensions] = useState([
    { columnName: "id", editingEnabled: false },
    { columnName: "username", editingEnabled: false },
    { columnName: "goto", editingEnabled: false },
  ]);

  const [query, setQuery, commitChanges] = useQuery(
    URL,
    "users",
    "user",
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
    <Paper>
      <Grid rows={query.data} columns={columns}>
        <GoToTypeProvider for={["goto"]} />

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
        <TableEditRow />
        <TableEditColumn showEditCommand showDeleteCommand />
        <TableFilterRow />

        <PagingPanel pageSizes={[10, 20, 30]} />
      </Grid>
      {query.loading && <Loading />}
    </Paper>
  );
}
