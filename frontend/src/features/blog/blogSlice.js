import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const BLOG_API_URL = "http://localhost:5000/api/blogs";

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
      });
  },
});

// Export actions & reducer
export const { resetBlog } = blogSlice.actions;
export default blogSlice.reducer;











// // features/blog/blogSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Set base URL
// const BLOG_API_URL = "http://localhost:5000/api/blogs";

// // =======================
// // Async Thunks
// // =======================

// // Fetch All Blogs
// export const fetchBlogs = createAsyncThunk(
//   "blog/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get(BLOG_API_URL);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch blogs"
//       );
//     }
//   }
// );

// // =======================
// // Blog Slice
// // =======================
// const blogSlice = createSlice({
//   name: "blog",
//   initialState: {
//     blogs: [],
//     isLoading: false,
//     isError: false,
//     isSuccess: false,
//     message: "",
//   },
//   reducers: {
//     resetBlog: (state) => {
//       state.isLoading = false;
//       state.isError = false;
//       state.isSuccess = false;
//       state.message = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Blogs
//       .addCase(fetchBlogs.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchBlogs.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.blogs = action.payload;
//       })
//       .addCase(fetchBlogs.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// // Export actions and reducer
// export const { resetBlog } = blogSlice.actions;
// export default blogSlice.reducer;
