import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Login } from "../../components/Login";
import { Register } from "../../components/Register";
import { CardLoginRegister } from "../../components/CardLoginRegister";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function LoginPage() {
  const [toggleCard, setToggleCard] = useState(false);
  const [loginClass, setLoginClass] = useState("");
  const [registerClass, setRegisterClass] = useState(styles.registerStart);
  const navigate = useNavigate();

  const handleButton = () => {
    // console.log(process.env.REACT_APP_SECRET)
    if (toggleCard) {
      setLoginClass(styles.loginOut);
      setRegisterClass(styles.registerIn);
    } else {
      setLoginClass(styles.loginIn);
      setRegisterClass(styles.registerOut);
    }
    setToggleCard(!toggleCard);
  };

  const loginHandle = () => {
    navigate("/project");
  };
  const registerHandle = () => {
    loginHandle();
  }

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL + "/home")
  })

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col sm={"6"} className="d-block">
            <Row className="py-2">
              <Col xs={"6"}>
                <Button
                  className="w-100"
                  variant={toggleCard ? "primary" : "outline-primary"}
                  onClick={handleButton}
                >
                  Register
                </Button>
              </Col>
              <Col xs={"6"}>
                <Button
                  className="w-100"
                  variant={toggleCard ? "outline-primary" : "primary"}
                  onClick={handleButton}
                >
                  Login
                </Button>
              </Col>
            </Row>
            <div className={loginClass}>
              <CardLoginRegister title="Login">
                <Login loginHandle={loginHandle}/>
              </CardLoginRegister>
            </div>
            <div className={registerClass}>
              <CardLoginRegister title="Register" >
                <Register registerHandle={registerHandle}/>
              </CardLoginRegister>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
