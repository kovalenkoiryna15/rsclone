import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

type TValue = string | undefined;

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = React.useState<TValue>('');
  const [password, setPassword] = React.useState<TValue>('');
  const [validated, setValidated] = React.useState<boolean>(false);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label className="text-center">User name</Form.Label>
        <Form.Control
          value={username}
          onChange={handleUserNameChange}
          type="text"
          placeholder="Enter user name"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="text-center">Password</Form.Label>
        <Form.Control
          value={password}
          type="password"
          placeholder="Password"
          aria-describedby="passwordHelpBlock"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          onChange={handlePasswordChange}
        />
        <Form.Text className="text-muted" id="passwordHelpBlock">
          Password must be at least 6 characters
          and contain at least one number and one uppercase letter.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" className="text-uppercase">Login</Button>
    </Form>
  );
};

export default LoginForm;
