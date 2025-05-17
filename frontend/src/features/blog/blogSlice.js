// features/blog/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set base URL
const BLOG_API_URL = "http://localhost:5000/api/blogs";

// =======================
// Async Thunks
// =======================

// Fetch All Blogs
export const fetchBlogs = createAsyncThunk(
  "blog/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(BLOG_API_URL);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);

// =======================
// Blog Slice
// =======================
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    resetBlog: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetBlog } = blogSlice.actions;
export default blogSlice.reducer;
