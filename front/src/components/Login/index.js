import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./styles.module.scss";
import { AlertContext } from "../../context/alert";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { i18n } from "../../translate/i18n"

export function Login({ loginHandle }) {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    if(!formValid()) return;

    const json = {
      email,
      password
    };
    console.log(json)
    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json),
      process.env.REACT_APP_SECRET
    ).toString();

    try {
      var res = await axios.post("http://localhost:8080/api/login", {jsonCrypt})

      setMessage(res.data.message)
      setVariant("success")
      setShow(true);
      setEmail("")
      setPassword("")
      navigate("/project")
    } catch (error){
      console.log(error)
    }
  }

  function formValid() {
    if(!email || !password) {
      setMessage("O usuário não existe")
      setShow(true)
      setVariant("danger")
      return false;
    }
    return true;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>{i18n.t("login.address")}</Form.Label>

        <Form.Control
          className={styles.inputEmail}
          type="email"
          placeholder={i18n.t("login.email")}
          variant="success"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          {i18n.t("login.text")}
        </Form.Text>
        <br/>
        <br/>
        <Form.Label>{i18n.t("login.password")}</Form.Label>

        <Form.Control
          className={styles.inputEmail}
          type="password"
          placeholder={i18n.t("login.pass")}
          variant="success"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="submit">{i18n.t("login.button")}</Button>
      </div>
    </Form>
  );
}
