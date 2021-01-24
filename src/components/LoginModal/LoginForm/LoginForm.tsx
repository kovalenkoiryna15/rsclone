import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { login } from 'Store/user/actions';

type TValue = string | undefined;

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState<TValue>('');
  const [password, setPassword] = React.useState<TValue>('');
  const [validated, setValidated] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);

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

    if (validated && username && password) {
      const user = {
        username,
        password,
      };
      dispatch(login(user));
    }
  };

  return (
    <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Control
          value={username}
          onChange={handleUserNameChange}
          type="text"
          placeholder="User Name"
          required
          autoComplete="off"
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
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          onChange={handlePasswordChange}
          autoComplete="off"
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
