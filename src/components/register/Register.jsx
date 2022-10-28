import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";

const Register = () => {
  return (
    <div>
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        }}
      >
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-center mb-4 mt-2 text-info">
              Create an Account
            </h2>
            <MDBInput
              wrapperClass="mb-4"
              label="First Name: "
              size="lg"
              id="form1"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Last Name: "
              size="lg"
              id="form1"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email:"
              size="lg"
              id="form2"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password:"
              size="lg"
              id="form3"
              type="password"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm your password:"
              size="lg"
              id="form4"
              type="password"
            />

            <MDBTextArea
              wrapperClass="mb-4"
              label="Drug Allergies:"
              id="textAreaExample"
              rows={4}
              validation="Please provide a valid zip."
            />

            <MDBBtn
              className="mb-4 w-100 gradient-custom-4 bg-info shadow-1-strong"
              size="lg"
            >
              CREATE ACCOUNT
            </MDBBtn>
            <div className="d-flex flex-row justify-content-center mb-4">
              <div
                name="flexCheck"
                id="flexCheckDefault"
                label="Already have an account? Login here"
              />
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Register;
