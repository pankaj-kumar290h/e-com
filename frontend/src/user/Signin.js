import React, { useState } from "react";
import Base from "../core/Base";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";

import { signin, isAutheticated, authenticate } from "../auth/helper/index";

function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();
  const onSubmit = (eveent) => {
    eveent.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
  };
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return navigate("/admin/dashboard");
      } else {
        return navigate("/");
      }
    }
    if (isAutheticated()) {
      return navigate("/");
    }
  };
  const signINForm = () => {
    return (
      <div className="row form">
        <form>
          <label className="text-light">Email</label>
          <input
            onChange={handleChange("email")}
            type={"email"}
            value={email}
          />

          <label className="text-light">Password</label>
          <input
            onChange={handleChange("password")}
            type={"Password"}
            value={password}
          />

          <button className="submit-btn" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  };
  return (
    <Base title="Sign up Page">
      {signINForm()}
      {performRedirect()}
    </Base>
  );
}

export default Signin;
