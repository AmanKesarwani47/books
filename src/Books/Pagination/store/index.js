import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    total: null,
    filterResponse: {
      search: "",
      sort: "name",
      order: "asc",
      currentPage: 1,
      totalPage: null,
      rowsPerPage: 10
    },
  },
  reducers: {
    resetPaginationState: (state) => {
      state.total = null;
      state.filterResponse = {
        search: "",
        sort: "name",
        order: "asc",
        currentPage: 1,
        totalPage: null,
        rowsPerPage: 10
      };
    },
    clearFilterResponse: (state) => {
      state.filterResponse = { ...state.filterResponse, search: "" };
    },
    handleCustomSort: (state, action) => {
      state.filterResponse.sort = action.payload;
    },
    handleSearchFilter: (state, action) => {
      state.filterResponse.search = action.payload;
    },
    handleRowsPerPage: (state, action) => {
      state.filterResponse.rowsPerPage = action.payload
    },
    handleTotalPageChange: (state, action) => {
      state.filterResponse.totalPage = action.payload
    },
    handleCurrentPageChange: (state, action) => {
      state.filterResponse.currentPage = action.payload
    },
    handleTotalElementsCount: (state, action) => {
      state.total = action.payload
    },
  },
});

export const {
  handleSearchFilter,
  handleCustomSort,
  clearFilterResponse,
  resetPaginationState,
  handleTotalPageChange,
  handleRowsPerPage,
  handleCurrentPageChange,
  handleTotalElementsCount
} = paginationSlice.actions;

export default paginationSlice.reducer;
