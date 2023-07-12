import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signupService,
  logOutService,
  loginService,
  profileService,
} from "../utils/apiService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const signup = createAsyncThunk("/signup", async (user, thunkAPI) => {
  try {
    return await signupService(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
    
  }
});

export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    return await loginService(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const setProfile = createAsyncThunk(
  "/update-profile",
  async (fromData, thunkAPI) => {
    const token=thunkAPI.getState().user.user.token
    try {
      return await profileService(fromData,token);
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

export const logOut = createAsyncThunk("/logOut", () => {
  return logOutService();
});


const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetProfile: (state) => {
      state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(setProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(setProfile.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export const { reset, resetProfile } = userReducer.actions;
export default userReducer.reducer;
