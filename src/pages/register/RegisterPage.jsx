import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "../../components/registerForm/RegisterForm";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [catchError, setCatchError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("From reg form compononent in reg pg:", data);
    setCatchError(null);

    //https://heyy-doc-backend.herokuapp.com/api/v1/register
    //http://localhost:8000/api/v1/register

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/register",
        data
      );
      console.log("Server Respond:", res);

      toast.success("Welcome to Heyy Doc! Please login", {
        position: toast.POSITION.TOP_CENTER,
      });
      if (res.status === 200 || res.status === 201) {
        //navigate to home
        if (location.pathname === "/register") {
          navigate("/login");
        }
      }
    } catch (error) {
      // console.log("error: ", error);
      // display an error
      // console.log("error.response.data: ", error.response.data);
      toast.error(error.response.data);
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
