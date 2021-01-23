import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

type TValue = string | undefined;

const RegisterForm = (): JSX.Element => {
  const [username, setUserName] = React.useState<TValue>('');
  const [password, setPassword] = React.useState<TValue>('');
  const [firstName, setFirstName] = React.useState<TValue>('');
  const [lastName, setLastName] = React.useState<TValue>('');
  const [validated, setValidated] = React.useState<boolean>(false);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
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
      <Form.Group controlId="formBasicFirstName">
        <Form.Label className="text-center">First name</Form.Label>
        <Form.Control
          value={firstName}
          onChange={handleFirstNameChange}
          type="text"
          placeholder="Enter first name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicLastName">
        <Form.Label className="text-center">Last name</Form.Label>
        <Form.Control
          value={lastName}
          onChange={handleLastNameChange}
          type="text"
          placeholder="Enter last name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicUserName">
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
      <Button variant="primary" type="submit" className="text-uppercase">Sign up</Button>
    </Form>
  );
};

export default RegisterForm;
