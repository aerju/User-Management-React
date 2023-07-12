import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  logOut,
  reset,
  resetProfile,
  setProfile,
} from "../../redux/userReducer";
import SpinnerEffect from "../spinner/Spinner";

function UserDashBoard() {
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // dispatch(getAllUsers("123"));
    console.log("woking userdash borad");
  }, [dispatch, navigate, isError, message]);




  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(reset());
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file.size > 0) {
      setSelectedFile(file);
    }
  };

  const handleUpload = (userId) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

    dispatch(setProfile(formData, userId));
  };

  if (isLoading) {
    return <SpinnerEffect />;
  }
  return (
    <div>
      <nav className="navbar sticky-top navbar-light bg-light">
        <div className="container-fluid">
          <i>
            <Link className="navbar-brand" to={"/"}>
              Wellcome {user.name}
            </Link>
          </i>

          <button className="btn btn-danger" onClick={handleLogOut}>
            logout
          </button>
        </div>
      </nav>

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-md-9 col-lg-7 col-xl-5">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : user.imgUrl 
                          ? user.imgUrl
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="Not available"
                      className="img-fluid"
                      style={{ width: "180px", borderRadius: "10px" }}
                    ></img>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">{user.name}</h5>
                    <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}></p>
                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-4">{user.email}</p>
                        <p className="mb-0"></p>
                      </div>
                      {/* <div className="px-3">
                    <p className="small text-muted mb-1">Followers</p>
                    <p className="mb-0">976</p>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Rating</p>
                    <p className="mb-0">8.5</p>
                  </div> */}
                    </div>

                    {/* <div className="d-flex pt-1">
                      <input
                        type="file"
                        multiple
                        className="me-1 flex-grow-1 "
                        onChange={handleFileSelect}
                      />
                    </div>
                    <div className="d-flex pt-1">
                      
                      <button
                        className="me-1 flex-grow-1 btn btn-primary"
                        onClick={() => {
                          handleUpload(user._id);
                        }}
                      >
                        Upload
                      </button>
                    </div> */}
                    <div className="d-flex pt-1">
                      <input
                        type="file"
                        onChange={handleFileSelect}
                        className="form-control"
                        multiple
                      ></input>
                      {selectedFile ? (
                        <button
                          type="button"
                          className="btn btn-primary flex-grow-1"
                          onClick={() => {
                            handleUpload(user._id);
                          }}
                        >
                          Update
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
