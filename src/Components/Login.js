import React, { useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Center from './Center';
import useForm from '../hooks/useForm';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const getFreshModel = () => ({
  email: '',
  password: '',
});

export default function Login() {
  const navigate = useNavigate();

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  } = useForm(getFreshModel);

  useEffect(() => {
    // Reset the form values and errors on component mount
    setValues(getFreshModel());
    setErrors({});
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      // Send the login details to the specified URL
      axios
        .post('http://localhost:5180/api/User/login', values)
        .then((res) => {
          const { token, role } = res.data;

          // Store the token, expiration, and role ID in local storage
          localStorage.setItem('token', token);
          //localStorage.setItem('expirationMinutes', expirationMinutes);
          localStorage.setItem('role', role);

          // Redirect based on role ID
          if (role === 1) {
            navigate('/admin');
          } else if (role === 2) {
            navigate('/quiz');
          } else {
            // Handle unknown role ID
            navigate('/login'); // Redirect to login page
          }
        })
        .catch((err) => console.log('Login failed', err));
    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email)
      ? ''
      : 'Email is not valid.';
    temp.password = values.password !== '' ? '' : 'This field is required.';
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  // const checkTokenExpiration = () => {
  //   const expirationMinutes = localStorage.getItem('expirationMinutes');

  //   if (expirationMinutes) {
  //     const now = new Date();
  //     const expirationDate = new Date(expirationMinutes);

  //     if (now > expirationDate) {
  //       // Token has expired, perform logout or refresh token logic
  //       // ...
  //       // For example, you can clear the token, expiration, and role ID from local storage
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('expirationMinutes');
  //       localStorage.removeItem('role');
  //       navigate('/'); // Redirect to login page
  //     } else {
  //       // Token is still valid
  //       const role = localStorage.getItem('role');

  //       // Redirect based on role ID
  //       if (role === '1') {
  //         navigate('/admin');
  //       } else if (role === '2') {
  //         navigate('/quiz');
  //       } else {
  //         // Handle unknown role ID
  //         navigate('/'); // Redirect to login page
  //       }
  //     }
  //   } else {
  //     // No token or expiration found, user is not logged in
  //     navigate('/'); // Redirect to login page
  //   }
  // };

  // // Check token expiration on component mount
  // useEffect(() => {
  //   checkTokenExpiration();
  // }, []);

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              '& .MuiTextField-root': {
                m: 1,
                width: '90%',
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: '90%' }}
              >
                Start
              </Button>
              <div>
                <p>
                  not a member, Signup <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}