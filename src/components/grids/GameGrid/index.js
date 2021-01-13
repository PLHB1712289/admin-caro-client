import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  PagingState,
  CustomPaging,
  SortingState,
  FilteringState,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";
import { Link } from "react-router-dom";

import config from "../../../config";
import useQuery from "../hooks/useGridQuery";
import Loading from "../../shared/loading";
import { Button, Chip, Input, MenuItem, Select } from "@material-ui/core";
import Moment from "react-moment";

const URL = `${config.URL_SERVER}/games`;

const StatusFormatter = ({ value }) => (
  <Chip
    label={typeof value === "undefined" ? "All" : value ? "Now" : "Finished"}
  />
);

const StatusEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={typeof value === "undefined" ? "All" : value ? "Now" : "Finished"}
    onChange={(event) =>
      onValueChange(
        event.target.value === "Now"
          ? true
          : event.target.value === "Finished"
          ? false
          : undefined
      )
    }
    style={{ width: "100%" }}
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="Now">Now</MenuItem>
    <MenuItem value="Finished">Finished</MenuItem>
  </Select>
);

const StatusTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={StatusFormatter}
    editorComponent={StatusEditor}
    {...props}
  />
);

const GoToFormatter = ({ value }) => (
  <Button
    variant="contained"
    color="primary"
    component={Link}
    to={`/game/${value}`}
  >
    GO TO
  </Button>
);

const GoToTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={GoToFormatter} {...props} />
);

const DateFormatter = ({ value }) => (
  <Moment format="HH:mm DD/MM/YYYY">{value}</Moment>
);

const DateTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={DateFormatter} {...props} />
);

export default function GameGrid() {
  // Du lieu co ban cho bang
  const [columns] = useState([
    { name: "_id", title: "ID" },
    {
      name: "player",
      title: "Players",
      getCellValue: (row) => `${row.playerX}, ${row.playerO}`,
    },
    { name: "created_at", title: "Started at" },
    { name: "status", title: "Status" },
    { name: "winner", title: "Winner" },
    { name: "goto", title: " ", getCellValue: (row) => row._id },
  ]);

  const [query, setQuery] = useQuery(URL, "games", "game", "idGame");
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
        <StatusTypeProvider for={["status"]} />
        <SortingState sorting={query.sorting} onSortingChange={setSorting} />
        <PagingState
          currentPage={query.page}
          onCurrentPageChange={setCurrentPage}
          pageSize={query.perpage}
          onPageSizeChange={setPageSize}
        />
        <CustomPaging totalCount={query.total} />
        <FilteringState
          onFiltersChange={setFilters}
          columnExtensions={[
            { columnName: "goto", filteringEnabled: false },
            { columnName: "_id", filteringEnabled: false },
            { columnName: "created_at", filteringEnabled: false },
          ]}
        />
        <DateTypeProvider for={["created_at"]} />
        <Table />
        <TableHeaderRow
          showSortingControls
          contentComponent={({ children }) => <b>{children}</b>}
        />
        <TableFilterRow />

        <PagingPanel pageSizes={[10, 20, 30]} />
      </Grid>
      {query.loading && <Loading />}
    </Paper>
  );
}
