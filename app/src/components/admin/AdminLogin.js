import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin, resetAdmin } from "../../redux/adminReducer";
import { toast } from "react-toastify";
import SpinnerEffect from "../spinner/Spinner";



function AdminLogin() {
  const dispatch =useDispatch()
  const navigate = useNavigate();

  const { admin, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || admin) {
      navigate("/");
    }
    console.log('working admin login');
    dispatch(resetAdmin());
  }, [admin, isSuccess, isError, message, dispatch, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  async function registerUser(event) {
    event.preventDefault();
    const adminData = {
      email,
      password, 
    };
    dispatch(adminLogin(adminData))
  }
  if (isLoading) {
    return <SpinnerEffect />;
  }
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-6">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-6 col-xl-12 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                     ADMIN LOGIN
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={registerUser}>
                      <div id="errormessage" style={{ color: "red" }}></div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            value={email}
                            id="form3Example3c"
                            className="form-control"
                            name="email"
                            onChange={onChange}
                            required
                          />
                          <span
                            id="email-error"
                            className="validation"
                            style={{ color: "red" }}
                          ></span>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            value={password}
                            id="form3Example4c"
                            className="form-control"
                            name="password"
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                      {/* <div className="form-check d-flex justify-content-center mb-5">
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          Create an account -
                          <Link
                            to={"/signup"}
                            style={{ textDecoration: "none" }}
                          >
                            Signup
                          </Link>
                        </label>
                      </div> */}
                      

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <input
                          type="submit"
                          value={"Login"}
                          className="btn btn-primary btn-lg"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
