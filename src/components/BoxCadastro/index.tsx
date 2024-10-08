import Box from '@mui/material/Box';
import { Alert, Button, Collapse, Link, TextField, AlertColor } from '@mui/material';
import * as React from 'react';
import api from '../../services/api';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function BoxCadastro() {
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [messageAlert, setMessageAlert] = React.useState('');
  const [severityAlert, setSeverityAlert] = React.useState<AlertColor>('error');

  const context = React.useContext(UserContext);
  const navigate = useNavigate();

  const { setUser } = context || {};
  
  const senhaDivergente: boolean = password !== passwordAgain && password.length > 0 && passwordAgain.length > 0;

  const cleanTextFields = () => {
    setLogin('');
    setEmail('');
    setPassword('');
    setPasswordAgain('');
  };

  const sendToDataBase = () => {
    if (senhaDivergente) {
      setMessageAlert('As senhas não conferem');
      setSeverityAlert('error');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 10000);
      return;
    } else if (login.length === 0 || email.length === 0 || password.length === 0 || passwordAgain.length === 0) {
      setMessageAlert('Preencha todos os campos');
      setSeverityAlert('error');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 10000);
      return;
    }
    
    api
      .post('/user/register', {
        username: login,
        email,
        password,
      })
      .then((response) => {
        if (setUser) {
          setUser({
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            ativo: response.data.ativo,
            password: response.data.password,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updated,
            deletedAt: response.data.deletedAt,
          });
        }

        setMessageAlert('Usuário cadastrado com sucesso');
        setSeverityAlert('success');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 10000);

        navigate('/profile');
      })
      .catch((error) => {
        console.log(error.response);
        setMessageAlert(`Erro ao cadastrar usuário: ${error.response.data.message}`);
        setSeverityAlert('error');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 10000);
      });

    cleanTextFields();
  };

  return (
    <Box
      sx={{
        bgcolor: '#2A2A2A',
        height: '60vh',
        width: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1rem',
        border: '2px solid #3A3A3A',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Login"
        variant="outlined"
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        InputProps={{
          style: {
            backgroundColor: '#2E2E2E',
            color: '#E0E0E0',
            borderColor: '#4D4D4D',
          },
        }}
        InputLabelProps={{
          style: {
            color: '#E0E0E0',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4D4D4D',
            },
            '&:hover fieldset': {
              borderColor: '#E0E0E0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1E90FF',
            },
          },
        }}
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        InputProps={{
          style: {
            backgroundColor: '#2E2E2E',
            color: '#E0E0E0',
            borderColor: '#4D4D4D',
          },
        }}
        InputLabelProps={{
          style: {
            color: '#E0E0E0',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4D4D4D',
            },
            '&:hover fieldset': {
              borderColor: '#E0E0E0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1E90FF',
            },
          },
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        InputProps={{
          style: {
            backgroundColor: '#2E2E2E',
            color: '#E0E0E0',
            borderColor: '#4D4D4D',
          },
        }}
        InputLabelProps={{
          style: {
            color: '#E0E0E0',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4D4D4D',
            },
            '&:hover fieldset': {
              borderColor: '#E0E0E0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1E90FF',
            },
          },
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password Again"
        type="password"
        variant="outlined"
        onChange={(e) => setPasswordAgain(e.target.value)}
        value={passwordAgain}
        InputProps={{
          style: {
            backgroundColor: '#2E2E2E',
            color: '#E0E0E0',
            borderColor: '#4D4D4D',
          },
        }}
        InputLabelProps={{
          style: {
            color: '#E0E0E0',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4D4D4D',
            },
            '&:hover fieldset': {
              borderColor: '#E0E0E0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1E90FF',
            },
          },
        }}
      />
      <Collapse in={showAlert}>
        <Alert
          severity={severityAlert}
          sx={{ transition: 'opacity 0.5s ease-in-out' }}
        >
          {messageAlert}
        </Alert>
      </Collapse>
      <Link
        href="/"
        underline="hover"
        variant="body2"
        sx={{ color: '#1E90FF' }}
      >
        Já tem uma conta? Faça login
      </Link>
      <Button variant="contained" onClick={() => sendToDataBase()}>
        Cadastrar
      </Button>
    </Box>
  );
}

export default BoxCadastro;
