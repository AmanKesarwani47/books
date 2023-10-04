import React from "react";
import "./../index.css";
import { useSelector } from "react-redux";
import { checkValidText } from "../../../reuseable";
import { Link } from "react-router-dom";

export function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Language</th>
        <th>Country</th>
        <th>Pages</th>
        <th>Year</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export function TableContent({ rows }) {
  return (
    <>
      {rows.map((row) => (
        <tr className="book-item">
          <td>{checkValidText(row.title)}</td>
          <td>{checkValidText(row.author)}</td>
          <td>{checkValidText(row.language)}</td>
          <td>{checkValidText(row.country)}</td>
          <td>{checkValidText(row.pages)}</td>
          <td>{checkValidText(row.year)}</td>
          <td>
            <Link
              to={`/edit-book/${row.id}`}
              className="button"
              onClick={() => {
                localStorage.setItem("editData", JSON.stringify(row));
              }}
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
}

export default function Table() {
  const { loadingBooks, rows, success, error } = useSelector(
    (state) => state.books
  );
  return (
    <div>
      <table className="books-table">
        <TableHeader />
        <tbody>
          {loadingBooks ? "loading..." : <TableContent rows={rows} />}
        </tbody>
      </table>
    </div>
  );
}
