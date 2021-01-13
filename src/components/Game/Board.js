import Row from "./Row";
import React from "react";

export default function Board({ rowValues }) {
  return rowValues.map((values, index) => (
    <Row rowIndex={index} values={values} key={index} />
  ));
}
