import React from "react";
import "./index.css";
import Table from "./Table";
import { useDispatch } from "react-redux";
import { handleRowsPerPage } from "../Pagination/store";
import { Link } from "react-router-dom";

export default function Body() {
  const dispatch = useDispatch();
  const changeRowsPerPage = (e) => {
    dispatch(handleRowsPerPage(parseInt(e.target.value)));
  };
  
  return (
    <div>
      <div className="books__row">
        <select onChange={changeRowsPerPage}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <Link to="/add-book" className="button button-link">Add Book</Link>
      </div>
      <Table />
    </div>
  );
}
