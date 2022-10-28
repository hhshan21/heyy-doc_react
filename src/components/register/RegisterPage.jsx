import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  const [catchError, setCatchError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("from loginpage:", data);
    setCatchError(null);
    try {
      const res = await axios.post(
        "https://ourairbnb.herokuapp.com/api/v1/user/register",
        data
      );
      console.log("Server Respond:", res);

      if (res.status === 200 || res.status === 201) {
        //navigate to home
        if (location.pathname === "/Register") {
          navigate("/");
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
          <RegisterForm data={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
