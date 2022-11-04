import React from "react";
import Banner from "../../components/banner/BannerMain";
import HealthIcon from "../../assets/images/healthIcon.png";
import Calender from "../../assets/images/calender.png";
import Healthcare from "../../assets/images/healthcare.png";
import Wordings from "./Wordings";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Homepage.css";
import "bootstrap";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Wordings></Wordings>
      <Container>
        <Row>
          <Col>
            <img className="healthIcon" src={HealthIcon} alt="HealthIcon" />
          </Col>
          <Col>
            <img className="calender" src={Calender} alt="HealthIcon" />
          </Col>
          <Col>
            <img className="healthcare" src={Healthcare} alt="HealthIcon" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
