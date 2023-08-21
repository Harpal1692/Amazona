import React, { useState } from "react";
import "./Login.css";
import apihelper from "../ApiHelper";
import { useNavigate } from "react-router-dom";
import Input from "../Common/Input";
import Validator from "../Common/Validation";

export default function Login({ setUserinfo, setToken }) {
  const [logindetail, setlogindetail] = useState({
    email: "",
    password: "",
  });

  const [loginError, setloginError] = useState([]);

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const ValidationResult = Validator(logindetail);
      setloginError(ValidationResult);
      const result = await apihelper.userlogin(logindetail);

      if (result && result.data && result.data.userinfo && result.data.token) {
        localStorage.setItem("userinfo", JSON.stringify(result.data.userinfo));
        localStorage.setItem("token", result.data.token);
        setUserinfo(result.data.userinfo);
        setToken(result.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      if (error && error.response && error.response.status === 400) {
        setloginError(error.response.data.errors);
      }
    }
  };

  return (
    <div className="container ps-md-0" style={{height:"1px"}}>
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image "></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Welcome back!</h3>

                  <form>
                    <div className="form-floating mb-3" id="email">
                      <Input
                        isError={loginError.find((item) =>
                          item.key === "email" ? true : false
                        )}
                        helperText={
                          loginError.find((item) => item.key === "email")
                            ?.message
                        }
                        onChange={(e) => {
                          setlogindetail({
                            ...logindetail,
                            email: e.target.value,
                          });

                          const ValidationResult = Validator({
                            ...logindetail,
                            email: e.target.value,
                          });
                          setloginError(ValidationResult);
                        }}
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={logindetail.email}
                      />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3" id="password">
                      <Input
                        isError={loginError.find((item) =>
                          item.key === "password" ? true : false
                        )}
                        helperText={
                          loginError.find((item) => item.key === "password")
                            ?.message
                        }
                        onChange={(e) => {
                          setlogindetail({
                            ...logindetail,
                            password: e.target.value,
                          });

                          const ValidationResult = Validator({
                            ...logindetail,
                            password: e.target.value,
                          });
                          setloginError(ValidationResult);
                        }}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={logindetail.password}
                      />
                      <label for="floatingPassword">Password</label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberPasswordCheck"
                      />
                      <label
                        className="form-check-label"
                        for="rememberPasswordCheck"
                      >
                        Remember password
                      </label>
                    </div>

                    <div className="d-grid">
                      <button
                        onClick={loginHandler}
                        className="btn btn-lg btn-warning btn-login text-uppercase fw-bold mb-2"
                        type="button"
                      >
                        Sign in
                      </button>
                      <button
                        onClick={() => navigate("/register")}
                        className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        type="button"
                      >
                        Create An Account
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
