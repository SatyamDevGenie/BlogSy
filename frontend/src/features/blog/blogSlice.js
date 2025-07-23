import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const BLOG_API_URL = "https://blogsy-571e.onrender.com/api/blogs";

// =======================
// Async Thunks
// =======================

// 📥 Fetch All Blogs
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

// ✍️ Create a Blog
export const createBlog = createAsyncThunk(
  "blog/create",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; // Get token from state
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(`${BLOG_API_URL}/create`, formData, config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create blog"
      );
    }
  }
);

// ✏️ Update a Blog
export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(`${BLOG_API_URL}/${id}`, formData, config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update blog"
      );
    }
  }
);

// 💬 Comment on Blog
export const commentOnBlog = createAsyncThunk(
  "blog/comment",
  async ({ blogId, comment }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${BLOG_API_URL}/${id}/comment`,
        { comment },
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to comment on blog"
      );
    }
  }
);

// 📈 Fetch Trending Blogs
export const fetchTrendingBlogs = createAsyncThunk(
  "blog/fetchTrending",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BLOG_API_URL}/trending`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch trending blogs"
      );
    }
  }
);

// 🆕 Fetch Latest Blogs
export const fetchLatestBlogs = createAsyncThunk(
  "blog/fetchLatest",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BLOG_API_URL}/latest`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch latest blogs"
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
    trendingBlogs: [],
    latestBlogs: [],
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
      // 📥 Fetch Blogs
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
      })

      // ✍️ Create Blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.unshift(action.payload); // Add new blog at the top
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ✏️ Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 💬 Comment on Blog
      .addCase(commentOnBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(commentOnBlog.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      // 📈 Trending Blogs
      .addCase(fetchTrendingBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrendingBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trendingBlogs = action.payload;
      })
      .addCase(fetchTrendingBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 🆕 Fetch Latest Blogs
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.latestBlogs = action.payload;
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export actions & reducer
export const { resetBlog } = blogSlice.actions;
export default blogSlice.reducer;
