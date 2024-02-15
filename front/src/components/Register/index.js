import { useContext, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { AlertContext } from "../../context/Alert";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { i18n } from "../../translate/i18n";
import AlertComponent from "../AlertComponent";

export function Register({ registerHandle }) {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  var [name, setName] = useState("");
  var [nickname, setNickname] = useState("");
  var [email, setEmail] = useState("");
  var [birth, setBirth] = useState("");
  var [password, setPassword] = useState("");
  var [confirmPassword, setConfirmPass] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formValid()) return;
    console.log("teste");
    const json = {
      name,
      email,
      nickname,
      birth,
      password,
      confirmPassword,
    };

    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json),
      process.env.REACT_APP_SECRET
    ).toString();

    try {
      var res = await axios.post(process.env.REACT_APP_API_URL + "/register", {
        jsonCrypt,
      });
      console.log("res", res);

      setMessage(res.data.message);
      setVariant("sucess");
      setShow(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPass("");
      setNickname("");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }
  function formValid() {
    if (!name.includes(" ")) {
      setMessage(i18n.t("register.Surname"));
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (name.length < 5) {
      setMessage(i18n.t("register.ValidateSurname"));
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (!email.includes("@")) {
      setMessage(i18n.t("register.ValidateEmail"));
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (email.length < 5) {
      setMessage(i18n.t("register.ValidateEmail"));
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (confirmPassword !== password) {
      setMessage(i18n.t("register.ValidatePass"));
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (password.length < 6) {
      setMessage(i18n.t("register.ValidateLengthPass"));
      setShow(true);
      setVariant("danger");
      return false;
    }

    return true;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={"10"}>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              {i18n.t("register.name")}
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="text"
                placeholder={i18n.t("register.nameEnt")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              {i18n.t("register.email")}
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="email"
                placeholder={i18n.t("register.emailEnt")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              {i18n.t("register.nickname")}
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="text"
                placeholder={i18n.t("register.nicknameEnt")}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              {i18n.t("register.birth")}
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="date"
                placeholder={i18n.t("register.birthEnt")}
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              {i18n.t("register.pass")}
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="password"
                placeholder={i18n.t("register.passEnt")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              {i18n.t("register.confirmPass")}
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="password"
                placeholder={i18n.t("register.confirmPass")}
                value={confirmPassword}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col lg={"2"} className="my-3 ml-auto d-flex ">
          <Button className="w-100" type="submit">
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
