import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut, reset } from "../../redux/userReducer";

function UserHeader() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to={"/"}>USer Management</Link>
      <span>
        {user ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"} style={{ marginLeft: "20px" }}>
              Signup
            </Link>
          </>
        )}
      </span>
    </div>
  );
}

export default UserHeader;
