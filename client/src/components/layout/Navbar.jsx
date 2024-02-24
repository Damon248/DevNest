import React from "react";
import { Link } from "react-router-dom";
import { useLogoutUser } from "../../redux/actions/authAction";
import { useSelector } from "react-redux";

const Navbar = () => {
  const logOutUser = useLogoutUser();
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <span>Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <span>Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fa fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logOutUser} href="#!">
          <i className="fa fa-sign-out"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fa fa-solid fa-code"></i> DevNest
          </Link>
        </h1>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </div>
  );
};

export default Navbar;
