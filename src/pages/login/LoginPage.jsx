import LoginForm from "../../components/loginForm/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// const BASE_API_URL = "http://localhost:8000";
const BASE_API_URL = window.BASE_API_URL;

const LoginPage = (props) => {
  // console.log("props.tokenState in Login Page: ", props.tokenState);
  // console.log("props.user in Login Page: ", props.user);

  const [catchError, setCatchError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // http://localhost:8000/api/v1/user/login
  //https://heyy-doc-backend.herokuapp.com/api/v1/user/login

  const onSubmit = async (data) => {
    // console.log("from loginpage:", data);
    setCatchError(null);

    try {
      const res = await axios.post(`${BASE_API_URL}/api/v1/user/login`, data);
      // console.log("Server Respond:", res);
      // props.tokenState = res.data.token;
      // props.user = res.data.user.isDoctor;
      // console.log("res.data", res.data);
      // setIsDoctor = res.data.user.isDoctor;
      // console.log("token - res.data.token", res.data.token);

      toast.success("Login successful!", {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate("/");
      if (res.status === 200 || res.status === 201) {
        // store the token into localstorage / cookie
        localStorage.setItem("user_token", res.data.token);
        if (location.pathname === "/login") {
          location.length > 0 ? navigate(-1) : navigate("/");
        }
      }
    } catch (error) {
      // display an error
      console.log("error: ", error);
      toast.error(error.response.data.error);

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
