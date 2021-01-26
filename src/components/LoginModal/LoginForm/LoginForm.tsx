import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import * as MyModels from 'Store/types';
import { login } from 'Store/user/actions';

type TValue = string | undefined;

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<TValue>('');
  const [password, setPassword] = React.useState<TValue>('');
  const [validated, setValidated] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const isloggingIn = useSelector((state: MyModels.RootReducer) => {
    const { user: { loggingIn } } = state;
    return loggingIn;
  });
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitted(true);
    setValidated(true);

    if (validated && email && password) {
      const user = {
        id: '',
        email,
        password,
      };
      dispatch(login(user));
    }
  };

  return (
    <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder="Email"
          required
          name="email"
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
        />
        {
          submitted && !password
          && <div className="invalid-feedback">Password is required</div>
        }
      </Form.Group>
      <Button disabled={isloggingIn} variant="primary" type="submit" className="text-uppercase">Login</Button>
    </Form>
  );
};

export default LoginForm;
