import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLoginService } from "../utils/apiService";

const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (admin, thunkAPI) => {
    try {
      return await adminLoginService(admin);
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

const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    adminLogout: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      });
  },
});
export const { resetAdmin,adminLogout } = adminReducer.actions;
export default adminReducer.reducer;
