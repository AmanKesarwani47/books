import React, { useCallback } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { handleSearchFilter } from "../Pagination/store";
import { debounce } from "../../reuseable";

export default function Header() {
  const dispatch = useDispatch()
  
  const handleSearchChange = useCallback(
    debounce((e) => {
      dispatch(handleSearchFilter(e.target.value));
    }, 500),
    []
  );
  return (
    <div className="header">
      <div className="header__logo">Books</div>
      <div className="header__search-bar">
        <input
          type="text"
          className="header__search-bar_input"
          placeholder="Search for books..."
          onChange={handleSearchChange}
        />
        {/* <button className="header__search-bar_button">Search</button> */}
      </div>
    </div>
  );
}
