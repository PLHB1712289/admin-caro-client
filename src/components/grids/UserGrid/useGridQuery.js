import { useState, useEffect } from "react";
import httpClient from "../../../httpClient";

export default function useGridQuery(url, dataKey) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [perpage, setPerpage] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState([]);
  const [total, setTotal] = useState(0);

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
  }

  async function commitChanges(changes) {
    setLoading(true);
    if (changes.deleted) {
      for (let index of changes.deleted) {
        const response = await httpClient.delete(
          `${url}/${data[index].username}`
        );
        if (response.data && response.data.user) {
          // Da xoa ban ghi cuoi cung cua trang
          if (data.length === 1 && page >= 2) {
            setPage(page - 1);
          } else if (data.length > 1) {
            loadData();
          }
        }
      }
    } else if (changes.changed) {
      for (let key in changes.changed) {
        const response = await httpClient.put(
          `${url}/${data[key].username}`,
          changes.changed[key]
        );
        if (response.data && response.data.user) {
          setData([
            ...data.slice(0, +key),
            response.data.user,
            ...data.slice(+key + 1),
          ]);
        }
      }
    }
    setLoading(false);
  }

  useEffect(loadData, [url, dataKey, page, perpage, sorting, filtering]);

  return [
    { data, page, perpage, sorting, filtering, loading, total },
    { setData, setPage, setPerpage, setSorting, setFiltering },
    commitChanges,
  ];
}
