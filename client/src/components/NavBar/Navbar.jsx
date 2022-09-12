import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: 'rgb(30, 29, 29)' }}
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand text-white"> <i className="fa fa-phone text-warning"></i> Phone Dictionary</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
