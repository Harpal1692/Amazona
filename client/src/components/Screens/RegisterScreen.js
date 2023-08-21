import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apihelper from "../ApiHelper";
import Input from "../Common/Input";
import Validator from "../Common/Validation";

export default function RegisterScreen({ setUserinfo, setToken }) {
  const navigate = useNavigate();
  const [RegisterError, setRegistererror] = useState([]);
  const [registerdetail, setregisterdetail] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });

  const RegisterHandler = async () => {
    try {
      const ValidationResult = Validator(registerdetail, "register");
      console.log(ValidationResult);
      setRegistererror(ValidationResult);

      const result = await apihelper.userRegister(registerdetail);
      if (result.data && result.data.token && result.data.userinfo) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userinfo", JSON.stringify(result.data.userinfo));
        setUserinfo(result.data.userinfo);
        setToken(result.data.token);
        navigate("/");
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image "></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Create your Account</h3>

                  <form>
                    <div className="form-floating mb-3">
                      <Input
                        isError={
                          RegisterError.find((x) => x.key === "FirstName")
                            ? true
                            : false
                        }
                        helperText={
                          RegisterError.find((x) => x.key === "FirstName")
                            ?.message
                        }
                        onChange={(e) => {
                          setregisterdetail({
                            ...registerdetail,
                            FirstName: e.target.value,
                          });
                          const ValidationResult = Validator(
                            {
                              ...registerdetail,
                              FirstName: e.target.value,
                            },
                            "register"
                          );
                          setRegistererror(ValidationResult);
                        }}
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="firstName"
                      />
                      <label htmlFor="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <Input
                        isError={
                          RegisterError.find((x) => x.key === "LastName")
                            ? true
                            : false
                        }
                        helperText={
                          RegisterError.find((x) => x.key === "LastName")
                            ?.message
                        }
                        onChange={(e) => {
                          setregisterdetail({
                            ...registerdetail,
                            LastName: e.target.value,
                          });
                          const ValidationResult = Validator(
                            {
                              ...registerdetail,
                              LastName: e.target.value,
                            },
                            "register"
                          );
                          setRegistererror(ValidationResult);
                        }}
                        type="text"
                        className="form-control"
                        id="LastName"
                        placeholder="LastName"
                      />
                      <label htmlFor="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <Input
                        isError={
                          RegisterError.find((x) => x.key === "email")
                            ? true
                            : false
                        }
                        helperText={
                          RegisterError.find((x) => x.key === "email")?.message
                        }
                        onChange={(e) => {
                          setregisterdetail({
                            ...registerdetail,
                            email: e.target.value,
                          });
                          const ValidationResult = Validator(
                            {
                              ...registerdetail,
                              email: e.target.value,
                            },
                            "register"
                          );
                          setRegistererror(ValidationResult);
                        }}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <Input
                        isError={
                          RegisterError.find((x) => x.key === "password")
                            ? true
                            : false
                        }
                        helperText={
                          RegisterError.find((x) => x.key === "password")
                            ?.message
                        }
                        onChange={(e) => {
                          setregisterdetail({
                            ...registerdetail,
                            password: e.target.value,
                          });
                          const ValidationResult = Validator(
                            {
                              ...registerdetail,
                              password: e.target.value,
                            },
                            "register"
                          );
                          setRegistererror(ValidationResult);
                        }}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>

                   

                    <div className="d-grid">
                      <button
                        onClick={RegisterHandler}
                        className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-2"
                        type="button"
                      >
                        Create an Account
                      </button>
                      <button
                        onClick={() => navigate("/Login")}
                        className="btn btn-lg bg-gradient w-100   border  btn-primary "
                        type="button"
                      >
                        Already have an Account
                      </button>
                      <div className="text-center">
                        <a className="small" href="##">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
