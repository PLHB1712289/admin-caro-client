import { useState, useEffect } from "react";
import httpClient from "../../../httpClient";

export default function useGridQuery(url, dataKey) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [perpage, setPerpage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(
    function loadData() {
      setLoading(true);
      const sortingRequest =
        (sorting[0] && {
          sortby: sorting[0].columnName,
          sortmode: sorting[0].direction,
        }) ||
        {};
      const filteringRequest = filtering.reduce(
        (obj, request) => ({ ...obj, [request.columnName]: request.value }),
        {}
      );
      httpClient
        .get(url, {
          params: {
            ...sortingRequest,
            ...filteringRequest,
            page: page + 1,
            perpage: perpage,
          },
        })
        .then((response) => {
          if (response.data.error) {
            return console.log("Co loi xay ra");
          }
          setData(response.data[dataKey]);
          setLoading(false);
          setTotal(response.data.total);
        })
        .catch((error) => setLoading(false));
    },
    [url, dataKey, page, perpage, sorting, filtering]
  );

  return [
    { data, page, perpage, sorting, filtering, loading, total },
    { setData, setPage, setPerpage, setSorting, setFiltering },
  ];
}
