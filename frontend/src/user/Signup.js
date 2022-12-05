import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, success: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("error in sighUp form ", err));
  };
  const signUpForm = () => {
    return (
      <div className="row form">
        <form>
          <label className="text-light">Name</label>
          <input onChange={handleChange("name")} type={"text"} value={name} />

          <label className="text-light">email</label>
          <input
            type={"email"}
            value={email}
            onChange={handleChange("email")}
          />

          <label className="text-light">Password</label>
          <input
            type={"Password"}
            value={password}
            onChange={handleChange("password")}
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
      <h1>sing up</h1>
      {signUpForm()}
      {success ? (
        <p>
          account create sucess <Link to="/signin">SignIn</Link>
        </p>
      ) : (
        ""
      )}
      {error ? <p>{error}</p> : ""}
      {JSON.stringify(values)}
    </Base>
  );
}

export default Signup;
