import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Login } from '../../components/Login';
import { Register } from '../../components/Register';
import { CardLoginRegister } from '../../components/CardLoginRegister';
import { useState } from 'react';

export function LoginPage()
{
  const [toggleCard, setToggleCard] = useState(false);

  const handleButton = () => setToggleCard(!toggleCard);
  
  return(
    <>
      <Container as={Row} fluid className='justify-content-center'>
        <Col sm={"6"} className='d-block justify-content-end'>
        <CardLoginRegister>
          {toggleCard ? <Login/> : <Register/>}
          <div className='d-flex justify-content-between'>
            <Button>{toggleCard ? "Login" : "Register"}</Button>
            <Button variant="warning" onClick={handleButton}>{toggleCard ? "Register" : "Login"}</Button>
          </div>
        </CardLoginRegister>
        </Col>
      </Container>
    </>
  )
}