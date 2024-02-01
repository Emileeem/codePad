import Button from 'react-bootstrap/Button';
import { Login } from '../../components/Login';
import { Register } from '../../components/Register';

export function LoginPage()
{
  return(
    <>
      <Login/>
      <Register/>
      <Button variant='primary'>Olá Mundo!</Button>
    </>
  )
}