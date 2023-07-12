import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, signup } from "../../redux/userReducer";
import SpinnerEffect from "../spinner/Spinner";

function UserSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    console.log('working userr signup');

    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(signup(userData));
    }
  };
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
                      SIGNUP
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={onSubmit}>
                      <div id="errormessage" style={{ color: "red" }}></div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChange}
                          />
                          <span
                            id="name-error"
                            className="validation"
                            style={{ color: "red" }}
                          ></span>
                        </div>
                      </div>

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
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cc"
                          >
                            Confirm password
                          </label>
                          <input
                            type="password"
                            value={confirmPassword}
                            id="form3Example4cc"
                            className="form-control"
                            name="confirmPassword"
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          Already have an account -
                          <Link to={"/"} style={{ textDecoration: "none" }}>
                            Login
                          </Link>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <input
                          type="submit"
                          value={"Signup"}
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

export default UserSignup;
