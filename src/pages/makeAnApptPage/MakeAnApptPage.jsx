import React, { useEffect, useState } from "react";
import ApptForm from "../../components/appointments/apptForm/ApptForm";
import "./MakeAnApptPage.css";

const MakeAnApptPage = () => {
  const [catchError, setCatchError] = useState(null);

  return (
    <div>
      <div className="createBooking">
        <h1 className="text-center pb-3 mb-3 createBookingHeader">
          Book a Doc
        </h1>
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
          <ApptForm />
        </div>
      </div>
    </div>
  );
};

export default MakeAnApptPage;
