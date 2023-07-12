import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adminDashBoradService,
  deleteUserService,
  editUserService,
} from "../utils/apiService";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "admin/dashboard",
  async (admin, thunkAPI) => {
    const token=thunkAPI.getState().admin.admin.token
  
    try {
      return await adminDashBoradService(admin,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editUSer = createAsyncThunk(
  "admin/edit-user",
  async (userData, thunkAPI) => {
    console.log("🚀 ~ file: usersReducer.js:36 ~ userData:", userData);
    try {
      return await editUserService(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/delete-user",
  async (userData, thunkAPI) => {
    try {
      return await deleteUserService(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.users = [];
      })
      .addCase(editUSer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUSer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(editUSer.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      }).addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        // state.users = state.users.filter((user)=>user._id!==action.payload.id) 
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
  },
});

export const { resetUsers } = usersReducer.actions;
export default usersReducer.reducer;
