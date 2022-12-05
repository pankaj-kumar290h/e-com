import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My Title",

  className = " text-white p-4 text-center",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron  text-white text-center">
        <h2 className="display-4">{title}</h2>
      </div>
      <div className={className}>{children}</div>
    </div>
    {/* <footer className="footer bg-dark mt-auto py-3 ft">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
    </footer> */}
  </div>
);

export default Base;
