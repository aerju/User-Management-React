import UserDashBoard from "./components/user/UserDashBoard";
import UserLogin from "./components/user/UserLogin";
import UserSignup from "./components/user/UserSignup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import AdminLogin from "./components/admin/AdminLogin";
import AdminHome from "./components/admin/AdminHome";

function App() {
  const { user } = useSelector((state) => state.user);
  console.log("🚀 ~ file: App.js:14 ~ App ~ user:", user)
  const { admin } = useSelector((state) => state.admin);
  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route
            path="/"
            element={user ? <UserDashBoard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={user?<Navigate to={'/'}/>: <UserLogin />} />
          <Route path="/signup" element={user?<Navigate to={'/'}/>: <UserSignup />} />
          <Route
            path="/admin/login"
            element={admin ? <Navigate to={"/admin"} /> : <AdminLogin />}
          />
          <Route
            path="/admin"
            element={admin ? <AdminHome /> : <Navigate to="/admin/login" />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
