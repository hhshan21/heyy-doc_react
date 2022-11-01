import React, { useState, useEffect } from "react";
import style from "./profilePage.module.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShowProfile = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/user/profile`, {
        headers: headerOptions,
      });
      const data = await res.data;
      // console.log("data: ", data);
      setProfile(data);
    };
    fetchApi();
  }, []);

  return (
    <div>
      <h1 className={style.showProfileHeader}>My Profile</h1>

      <div className={style.mainContainer}>
        <>
          <div className={style.profileContainer}>
            <div className="row p-2 ">
              <div className="col-md-3">
                <div className={style.imageBox}>
                  <div className="row">
                    <img
                      className={style.avatarImage}
                      src={profile.imageUrl}
                      alt={profile.firstName}
                    />
                  </div>
                  <div className="col-md-1 ms-2 mt-2"></div>
                </div>
              </div>

              <div className="col-md-9">
                <div className={style.profileHead}>
                  <h4>Welcome back {profile.firstName}</h4>

                  <div className="profileDetails ms-4 mt-4">
                    <div className="row">
                      <div className="col-md-4">
                        <h6>First Name: </h6>
                      </div>

                      <div className="col-md-6">
                        <p>{profile.firstName}</p>
                      </div>

                      <div className="col-md-4">
                        <h6>Last Name: </h6>
                      </div>

                      <div className="col-md-6">
                        <p>{profile.lastName}</p>
                      </div>

                      <div className="col-md-4">
                        <h6>Email: </h6>
                      </div>

                      <div className="col-md-6">
                        <p>{profile.email}</p>
                      </div>

                      <div className="col-md-4">
                        <h6>Drug Allergies:</h6>
                      </div>

                      <div className="col-md-6">
                        <p>{profile.drugAllergies}</p>
                      </div>
                      <Button
                        onClick={() => navigate("/my/profile/edit")}
                        variant="contained"
                        style={{
                          backgroundColor: "#0cb4ea",
                          fontFamily: "Lexend Deca",
                          fontWeight: "900",
                          width: "50%",
                          marginTop: "2%",
                          fontSize: "110%",
                          color: "white",
                        }}
                      >
                        EDIT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ShowProfile;
