import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://68.178.162.203:8080/application-test-v1.1/books";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (filterResponse) => {
    const response = await axios.get(
      `${API_BASE_URL}?title=${filterResponse.search}&page=${filterResponse.currentPage}&pageSize=${filterResponse.rowsPerPage}`
    );
    return response.data;
  }
);

export const createBooks = createAsyncThunk(
  "books/createBooks",
  async (booksBody) => {
    const response = await axios.post(`${API_BASE_URL}`, booksBody);
    return response.data;
  }
);

export const updateBooks = createAsyncThunk(
  "books/updateBooks",
  async ({id, booksBody}) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, booksBody);
    return response.data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    loadingBooks: false,
    rows: [],
    total: null,
    bookDetail: {},
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.loadingBooks = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loadingBooks = false;
        state.rows = action.payload.data;
        state.total = action.payload.pagination.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loadingBooks = false;
        state.error = action.error.message;
        state.success = null;
      })
      .addCase(createBooks.pending, (state, action) => {
        state.error = null;
        state.success = null;
      })
      .addCase(createBooks.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = action.payload.messages;
        } else if (action.payload.status === 200) {
          state.success = action.payload.messages;
        }
      })
      .addCase(createBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.success = null;
      })
      .addCase(updateBooks.pending, (state, action) => {
        state.error = null;
        state.success = null;
      })
      .addCase(updateBooks.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = action.payload.messages;
        } else if (action.payload.status === 200) {
          state.success = action.payload.messages;
        }
      })
      .addCase(updateBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.success = null;
      });
  },
});
export default booksSlice.reducer;
