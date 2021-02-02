import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import IUser from 'Entities/user-entities';
import * as MyModels from 'Store/types';
import { register } from 'Store/user/actions';

const RegisterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const isSignedUp = useSelector(
    ({ user: { isAuthorized } }: MyModels.RootState): boolean => isAuthorized,
  );
  const alert = useSelector(
    ({ user: { alertMessage } }: MyModels.RootState): string | undefined => alertMessage,
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
            && <div className="invalid-feedback">Email is required or not valid.</div>
          }
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            aria-describedby="passwordHelpBlock"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}"
            minLength={Number(6)}
            maxLength={Number(15)}
            name="password"
            autoComplete="off"
          />
          {
            submitted && !password
            && <div className="invalid-feedback">Password is required</div>
          }
          <Form.Text className="text-muted" id="passwordHelpBlock">
            Password must be at least 6 characters
            and contain at least one number and one uppercase letter.
          </Form.Text>
        </Form.Group>
        <Button disabled={isSignedUp} variant="primary" type="submit" className="text-uppercase">Sign up</Button>
      </Form>
    </>
  );
};

export default RegisterForm;
