import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import IUser from 'Entities/user-entities';
import * as StateTypes from 'State/types';
import { register } from 'State/user/actions';

const RegisterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const isSignedUp = useSelector(
    ({ user: { isAuthorized } }: StateTypes.RootState): boolean => isAuthorized
  );
  const alert = useSelector(
    ({ user: { alertMessage } }: StateTypes.RootState): string | undefined => alertMessage
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setValidated(true);

    if (email && password) {
      const newUser: IUser = {
        id: '',
        email,
        password,
      };
      dispatch(register(newUser));
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
            <div className="invalid-feedback">Email is required or not valid.</div>
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
          <Form.Text className="text-muted" id="passwordHelpBlock">
            Password must be at least 6 characters and contain at least one number and one
            uppercase letter.
          </Form.Text>
        </Form.Group>
        <Button
          className="text-uppercase"
          disabled={isSignedUp}
          type="submit"
          variant="primary"
        >
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
