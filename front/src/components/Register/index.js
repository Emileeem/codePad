import { useContext, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { AlertContext } from "../../context/alert";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register({ registerHandle }) {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  var [name, setName] = useState('');
  var [nickname, setNickname] = useState('');
  var [email, setEmail] = useState('');
  var [birth, setBirth] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPass] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("teste")
    if (!formValid()) return;

    const json = {
      name,
      email,
      nickname,
      birth,
      password,
      confirmPassword
    };
    console.log(json)
    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json),
      process.env.REACT_APP_SECRET
    ).toString();

    try {
      var res = await axios.post("http://localhost:8080/api/register", {
        jsonCrypt,
      });
      console.log("res",res);
      
      setMessage(res.data.message);
      setVariant("sucess");
      setShow(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPass("");
      setNickname("");
      navigate("/project");
    } catch (error) {
      console.log(error);
    } 
  }
  function formValid() {
    if (!name.includes(" ")) {
      setMessage("Insira nome e sobrenome");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (name.length < 5) {
      setMessage("Insira um nome e sobrenome válidos");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (!email.includes("@")) {
      setMessage("Insira um e-mail válidos");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (email.length < 5) {
      setMessage("Insira um e-mail válido");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (confirmPassword !== password) {
      setMessage("As senhas não conferem");
      setShow(true);
      setVariant("danger");
      return false;
    }
    if (password.length < 6) {
      setMessage("Senha inferior a 6 caracteres");
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
              Name
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Nickname
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="text"
                placeholder="Enter nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Birthday
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="date"
                placeholder="Enter birth"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Confirm Pwd
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control
                type="password"
                placeholder="Confirm password"
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
