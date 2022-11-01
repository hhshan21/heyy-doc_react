import LoginForm from "../../components/loginForm/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
require("dotenv-webpack").config();

const LoginPage = (props) => {
  // props.tokenState
  const [catchError, setCatchError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // console.log("from loginpage:", data);
    setCatchError(null);

    // "http://localhost:8000/api/v1/user/login"
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`,
        data
      );
      // console.log("Server Respond:", res);
      // console.log("token", res.data.token);

      toast.success("Login successful!", {
        position: toast.POSITION.TOP_CENTER,
      });
      if (res.status === 200 || res.status === 201) {
        // store the token into localstorage / cookie
        localStorage.setItem("user_token", res.data.token);

        navigate("/");
      }
    } catch (error) {
      // display an error
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
