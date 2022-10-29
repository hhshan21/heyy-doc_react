import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/LogoS.png";
import "./siteHeader.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/lexend-deca";
import RegisterPage from "../../../pages/register/RegisterPage";

const SiteHeader = () => {
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // const [navState, setNavState] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  // console.log("open siteheader ");

  const checkAuth = () => {
    const token = localStorage.getItem("user_token");
    if (token) {
      const user = jwt_decode(token);
      setIsAuth(true);
      setUsername(user.data.username);
      console.log("token: ", token);
    } else {
      setIsAuth(false);
    }
  };

  // const navStateToggle = () => {
  //   setNavState((prevState) => !prevState);
  //   checkAuth();
  // };

  // const handleLoginToggle = (value) => {
  //   setOpenLogin(value);
  //navStateToggle();
  // };

  // const handleRegisterToggle = (value) => {
  //   value ? handleOpenLogin() : setOpenRegister(value);
  //navStateToggle();
  // };

  // const handleOpenRegister = () => {
  //   if (location.pathname !== "/register" && location.pathname !== "/login") {
  //     setOpenRegister(true);
  //     setOpenLogin(false);
  //   } else {
  //     navigate("/register");
  //   }
  // navStateToggle();
  // };

  const handleLogin = () => {
    if (location.pathname !== "/register" && location.pathname !== "/login") {
      navigate("/");
      // setOpenLogin(true);
      // setOpenRegister(false);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem("user_token");
    if (token) {
      localStorage.removeItem("user_token");
      //console.log("log out");
      // navStateToggle();
      navigate("/");
    }
  };

  const handleAfterRegister = (value) => {
    toast.success("Account created, please login to continue", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/");
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
                DOCTORS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/myBookings"
                style={{ textDecoration: "none", color: "#0cb4ea" }}
              >
                MY BOOKINGS
              </Link>
            </li>
          </ul>
          {isAuth ? (
            <span className="navbar-text">
              <ul className="navbar-nav mr-auto ml-4">
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
                    to="/"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </Link>
                </li>
              </ul>
            </span>
          ) : (
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
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#0cb4ea" }}
                    onClick={handleLogin}
                  >
                    LOGIN
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
