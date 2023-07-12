import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, resetUsers } from "../../redux/usersReducer";
import { adminLogout } from "../../redux/adminReducer";
import { Link, useNavigate } from "react-router-dom";
import AdminUserEditModal from "./AdminUserEditModal";
import SpinnerEffect from "../spinner/Spinner";
import { toast } from "react-toastify";

function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.users
  );

  const { admin } = useSelector((state) => state.admin);

  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filterItem, setFilterItem] = useState(users);

  const filterData = (search, userData) => {
    const data = userData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return data;
  };




  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = (userData) => {
    dispatch(deleteUser(userData));
    // dispatch(getAllUsers("123"));
  };

  useEffect(() => {
    if (isSuccess) {
      setFilterItem(users);
      console.log("2nd");
    }
  }, [isSuccess, users]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess) {
    // setFilterItem(users);
    // }

    dispatch(getAllUsers("123"));
    console.log("woking this");
    // dispatch(resetUsers());
  }, [dispatch, navigate, isError, message, isSuccess]);

  const handleLogOut = () => {
    dispatch(adminLogout());
    navigate("/admin");
  };
  if (isLoading) {
    return <SpinnerEffect />;
  }
  return (
    <div>
      <nav className="navbar sticky-top navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/admin"}>
            ADMIN:{admin.name}
          </Link>

          <button className="btn btn-danger" onClick={handleLogOut}>
            logout
          </button>
        </div>
      </nav>

      <div className="container" style={{ marginTop: "60px" }}>
        <div className="d-flex justify-content-start col-md-2 mb-4 ">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="btn btn-dark"
              type="button"
              onClick={() => {
                const data = filterData(search, users);
                setFilterItem(data);
              }}
            >
              Search
            </button>
          </div>
        </div>

        <table className="table  table-hover">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Profile</th>
              <th>Email</th>
              <th>Options</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filterItem.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>
                  <img className="img-fluid" style={{width:'50px',height:'50px'}}
                    src={
                      user?.imgUrl
                        ? user.imgUrl
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="not available"
                  ></img>
                </td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="btn btn-primary "
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger "
                    onClick={() => {
                      handleDeleteUser(user);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <AdminUserEditModal user={selectedUser} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default AdminHome;
