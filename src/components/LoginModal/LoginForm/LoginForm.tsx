import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { login } from 'Store/user/actions';

type TValue = string | undefined;

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<TValue>('');
  const [username, setUsername] = React.useState<TValue>('');
  const [password, setPassword] = React.useState<TValue>('');
  const [validated, setValidated] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitted(true);
    setValidated(true);

    if (validated && email && password && username) {
      const user = {
        username,
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
      <Form.Group controlId="formBasicUsername">
        <Form.Control
          value={username}
          onChange={handleUserNameChange}
          type="text"
          placeholder="Username"
          required
          pattern="([A-Za-z0-9_-]).{2,15}"
          name="username"
          minLength="2"
          maxLength="15"
        />
        {
          submitted && !username
          && <div className="invalid-feedback">User Name is required</div>
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
          minLength="6"
          maxLength="15"
          onChange={handlePasswordChange}
          name="password"
        />
        {
          submitted && !password
          && <div className="invalid-feedback">Password is required</div>
        }
      </Form.Group>
      <Button variant="primary" type="submit" className="text-uppercase">Login</Button>
    </Form>
  );
};

export default LoginForm;
