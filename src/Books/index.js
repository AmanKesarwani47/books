import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Body from "./Body";
import Header from "./Header";
import { fetchBooks } from "./store";
import Pagination from "./Pagination";
import { handleCurrentPageChange } from "./Pagination/store";

export default function Books() {
  const dispatch = useDispatch();

  const { total } = useSelector((state) => state.books);
  const { filterResponse } = useSelector((state) => state.pagination);

  const handlePageChange = (page) => {
    dispatch(handleCurrentPageChange(page));
  };

  useEffect(() => {
    dispatch(fetchBooks(filterResponse));
    localStorage.removeItem("editData");
  }, [
    filterResponse.currentPage,
    filterResponse.rowsPerPage,
    filterResponse.search,
  ]);

  return (
    <div>
      <Body />
      <Pagination
        currentPage={filterResponse.currentPage}
        totalPages={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
