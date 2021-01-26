import * as React from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import * as MyModels from 'Store/types';
import { register } from 'Store/user/actions';
import { IUser } from 'Entities/user-entities';

const RegisterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const isloggingIn = useSelector((state: MyModels.RootReducer) => {
    const { user: { loggingIn } } = state;
    return loggingIn;
  });
  const emailRef = useRef({ value: '' });
  const passwordRef = useRef({ value: '' });
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setValidated(true);

    const newUser: IUser = {
      id: Date.now(),
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(register(newUser));
  };

  return (
    <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          ref={emailRef}
          type="email"
          placeholder="Email"
          required
          name="email"
        />
        {
          submitted && !emailRef.current.value
          && <div className="invalid-feedback">Email is required or not valid.</div>
        }
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          ref={passwordRef}
          type="password"
          placeholder="Password"
          aria-describedby="passwordHelpBlock"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}"
          minLength={Number(6)}
          maxLength={Number(15)}
          name="password"
        />
        {
          submitted && !passwordRef.current.value
          && <div className="invalid-feedback">Password is required</div>
        }
        <Form.Text className="text-muted" id="passwordHelpBlock">
          Password must be at least 6 characters
          and contain at least one number and one uppercase letter.
        </Form.Text>
      </Form.Group>
      <Button disabled={isloggingIn} variant="primary" type="submit" className="text-uppercase">Sign up</Button>
    </Form>
  );
};

export default RegisterForm;
