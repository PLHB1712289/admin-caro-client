import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  PagingState,
  CustomPaging,
  SortingState,
  FilteringState,
  EditingState,
  TableEditColumn,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";

import config from "../../../config";
import useQuery from "../hooks/useGridQuery";
import Loading from "../../shared/loading";
import Moment from "react-moment";

const DateFormatter = ({ value }) => (
  <Moment format="HH:mm:ss DD/MM/YYYY">{value}</Moment>
);

const DateTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={DateFormatter} {...props} />
);

export default function MessageGrid({ idGame }) {
  const URL = `${config.URL_SERVER}/games/${idGame}/messages`;
  // Du lieu co ban cho bang
  const [columns] = useState([
    { name: "username", title: "Username" },
    { name: "message", title: "Message" },
    { name: "created_at", title: "Sent at" },
  ]);

  const [query, setQuery] = useQuery(URL, "messages", "message", "_id");
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
