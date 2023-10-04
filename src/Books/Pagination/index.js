import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { handleTotalPageChange } from "./store";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const dispatch = useDispatch();
  const { filterResponse } = useSelector((state) => state.pagination);

  const maxVisibleButtons = 5;
  const halfMaxVisibleButtons = Math.floor(maxVisibleButtons / 2);

  let startPage = Math.max(1, currentPage - halfMaxVisibleButtons);
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage < maxVisibleButtons - 1) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  useEffect(() => {
    if (totalPages !== null && totalPages !== undefined) {
      dispatch(handleTotalPageChange(totalPages));
    }
  }, [totalPages]);

  return (
    <div className="pagination">
      {startPage > 1 && (
        <button className="pagination-button" onClick={() => onPageChange(1)}>
          First
        </button>
      )}
      {currentPage > 1 && (
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < filterResponse.totalPage && (
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
      {endPage < filterResponse.totalPage && (
        <button
          className="pagination-button"
          onClick={() => onPageChange(filterResponse.totalPage)}
        >
          Last
        </button>
      )}
    </div>
  );
};

export default Pagination;
