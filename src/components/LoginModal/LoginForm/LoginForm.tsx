import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import * as StateTypes from 'State/types';
import { login } from 'State/user/actions';

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(
    ({ user: { isAuthorized } }: StateTypes.RootState): boolean => isAuthorized
  );
  const alert = useSelector(
    ({ user: { alertMessage } }: StateTypes.RootState): string | undefined => alertMessage
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
      <Form
        className="login-form"
        noValidate
        onSubmit={handleSubmit}
        validated={validated}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            autoComplete="off"
            name="email"
            onChange={handleEmailChange}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
          {submitted && !email && (
            <div className="invalid-feedback">Email is required</div>
          )}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            aria-describedby="passwordHelpBlock"
            autoComplete="off"
            maxLength={Number(15)}
            minLength={Number(6)}
            name="password"
            onChange={handlePasswordChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}"
            placeholder="Password"
            required
            type="password"
            value={password}
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </Form.Group>
        <Button
          className="text-uppercase"
          disabled={isSignedIn}
          type="submit"
          variant="primary"
        >
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
