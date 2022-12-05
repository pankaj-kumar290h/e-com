import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccesss] = useState(false);

  const { user, token } = isAutheticated();

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setSuccesss(false);
    //backend
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setSuccesss(true);
        setName("");
      }
    });
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group form">
          <p className="lead">Enter the category</p>
          <input
            onChange={handleChange}
            value={name}
            type={"text"}
            className="form-control my-3"
            autoFocus
            required
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create category
          </button>
        </div>
        {success && <p className="bg-success">Succesfully create category</p>}
      </form>
    );
  };
  return (
    <Base title="Create a category">
      <div className="row bg-white rounded">
        <div className="col-mg-8  text-dark">{myCategoryForm()}</div>
      </div>
    </Base>
  );
}

export default AddCategory;
