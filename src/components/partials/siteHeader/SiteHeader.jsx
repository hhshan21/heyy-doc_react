import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import logo from "../../../assets/images/LogoS.png";
import "./siteHeader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/lexend-deca";

const SiteHeader = (props) => {
  const navigate = useNavigate();

  const [tokenState, setTokenState] = useState();
  const [user, setUser] = useState();

  // const token = localStorage.getItem("user_token");
  // const tokenToSend = "Bearer " + token;

  // const getToken = async () => {
  //   setTokenState(token);
  //   if (tokenState) {
  //     setUser(jwt_decode(tokenState).data);
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, [tokenState]);

  // console.log("props.tokenState: ", props.tokenState);
  // console.log("props.user: ", props.user);

  const logout = () => {
    localStorage.removeItem("user_token");
    props.setTokenState(null);
    if (localStorage.getItem("user_token") !== null) {
      toast.error("Logout unsuccessful, please try again");
    } else {
      toast.success("You are now logged out", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    }
  };

  return (
    <div className="siteHeader">
      <nav className="navbar navbar-expand-lg bg-white">
        <Link to="/">
          <img className="header__icon" src={logo} alt="Heyy Doc" />
        </Link>

        <button
          className="navbar-toggler mr-3"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto ml-4">
            <li className="nav-item">
              <Link
                to="/doctors"
                style={{
                  textDecoration: "none",
                  color: "#0cb4ea",
                }}
              >
                OUR DOCTORS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/my/appointments/create"
                style={{ textDecoration: "none", color: "#0cb4ea" }}
              >
                MAKE AN APPOINTMENT
              </Link>
            </li>
          </ul>
          {!props.tokenState ? (
            <span className="navbar-text">
              <ul className="navbar-nav mr-auto ml-4">
                <li className="nav-item">
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                  >
                    REGISTER
                  </Link>
                </li>
                <li className="nav-item">
                  {user}
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                  >
                    LOGIN
                  </Link>
                </li>
              </ul>
            </span>
          ) : (
            <span className="navbar-text">
              <ul className="navbar-nav mr-auto ml-4">
                <li className="nav-item">
                  <Link
                    to="/my/patientappointments"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                  >
                    PATIENT APPOINTMENTS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/my/profile"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                  >
                    MY PROFILE
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/my/appointments"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                  >
                    MY APPOINTMENTS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                    onClick={logout}
                  >
                    LOGOUT
                  </Link>
                </li>
              </ul>
            </span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default SiteHeader;
