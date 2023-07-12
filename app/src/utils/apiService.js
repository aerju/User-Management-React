import axios from "axios";

const SIGNUP_URL = "http://localhost:4000/signup";
const LOGIN_URL = "http://localhost:4000/login";
const USER_PROFILE_URL = "http://localhost:4000/change-profile-pic";
const ADMIN_LOGIN_URL = "http://localhost:4000/admin/login";
const ADMIN_DASHBOARD_URL = "http://localhost:4000/admin/dashboard";
const ADMIN_USER_EDIT_URL = "http://localhost:4000/admin/edit-user";
const ADMIN_USER_DELETE_URL = "http://localhost:4000/admin/delete-user";

export const signupService = async (userData) => {
  const response = await axios.post(SIGNUP_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const loginService = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const profileService = async (userData, token) => {
  console.log("🚀 ~ file: apiService.js:31 ~ profileService ~ token:", token)
  const response = await axios.post(`${USER_PROFILE_URL}`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  });
  if (response.data) {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const adminLoginService = async (adminData) => {
  const response = await axios.post(ADMIN_LOGIN_URL, adminData);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }
  return response.data;
};

export const adminDashBoradService = async (adminData, token) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`${ADMIN_DASHBOARD_URL}`, adminData,{
    headers: headers
  });
 
  return response.data;
};

export const editUserService = async (userData) => {
  const response = await axios.post(
    `${ADMIN_USER_EDIT_URL}/${userData._id}`,
    userData
  );
  return response.data;
};

export const deleteUserService = async (userData) => {
  const response = await axios.post(
    `${ADMIN_USER_DELETE_URL}/${userData._id}`,
    userData
  );
  console.log(
    
    "🚀 ~ file: apiService.js:79 ~ deleteUserService ~ response.data:",
    response.data.id
  );

  return response.data;
};

export const logOutService = async () => {
  localStorage.removeItem("user");
};
