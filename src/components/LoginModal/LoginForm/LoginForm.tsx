import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import * as MyModels from 'Store/types';
import { login } from 'Store/user/actions';

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(
    ({ user: { isAuthorized } }: MyModels.RootState): boolean => isAuthorized,
  );
  const alert = useSelector(
    ({ user: { alertMessage } }: MyModels.RootState): string | undefined => alertMessage,
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setValidated(true);
    const user = {
      id: '',
      email,
      password,
    };
    dispatch(login(user));
  };

  return (
    <>
      {alert ? <Alert className="text-warning text-center">{alert}</Alert> : null}
      <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="Email"
            required
            name="email"
            autoComplete="off"
          />
          {
            submitted && !email
            && <div className="invalid-feedback">Email is required</div>
          }
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            aria-describedby="passwordHelpBlock"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}"
            minLength={Number(6)}
            maxLength={Number(15)}
            onChange={handlePasswordChange}
            name="password"
            autoComplete="off"
          />
          {
            submitted && !password
            && <div className="invalid-feedback">Password is required</div>
          }
        </Form.Group>
        <Button
          disabled={isSignedIn}
          variant="primary"
          type="submit"
          className="text-uppercase"
        >
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
