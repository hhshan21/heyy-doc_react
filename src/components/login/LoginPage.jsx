import LoginForm from "../../components/login/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const [catchError, setCatchError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["auth_token"]);

  // useEffect(() => {
  //   console.log("current cookies: ", cookies);
  //   setCookies("auth_token", "love_mcspicy");
  //   console.log("cookies after setting: ", cookies);
  // }, []);

  const onSubmit = async (data) => {
    console.log("from loginpage:", data);
    setCatchError(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        data
      );
      console.log("Server Respond:", res);
      console.log("token", res.data.token);

      if (res.status === 200 || res.status === 201) {
        // store the token into localstorage / cookie
        localStorage.setItem("user_token", res.data.token);
        //navigate to home
        if (location.pathname === "/login") {
          location.length > 0 ? navigate(-1) : navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      // display an error
      console.log(error.response.data.error);
      setCatchError(error.response.data.error);
    }
  };
  return (
    <div className="login-page-div">
      <div className="login-modal-body">
        <div className="p-3 mb-2">
          {catchError && (
            <div>
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "1em",
                }}
              >
                {catchError}
              </p>
            </div>
          )}
          {/* --------insert component here------------- */}
          <LoginForm data={onSubmit} />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
