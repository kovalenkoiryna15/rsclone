import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { register } from 'Store/user/actions';

type TValue = string;

const RegisterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [username, setUserName] = React.useState<TValue>('');
  const [password, setPassword] = React.useState<TValue>('');
  const [firstName, setFirstName] = React.useState<TValue>('');
  const [lastName, setLastName] = React.useState<TValue>('');
  const [validated, setValidated] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);

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
    event.preventDefault();
    event.stopPropagation();
    setSubmitted(true);
    setValidated(true);

    if (validated && firstName && lastName && username && password) {
      const user = {
        id: Date.now(),
        firstName,
        lastName,
        username,
        password,
      };
      dispatch(register(user));
    }
  };

  return (
    <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicFirstName">
        <Form.Control
          value={firstName}
          onChange={handleFirstNameChange}
          type="text"
          placeholder="First Name"
          required
          pattern="(?=.*[A-Za-z]).{2,15}"
          autoComplete="off"
        />
        {
          submitted && !firstName
          && <div className="invalid-feedback">First Name is required</div>
        }
      </Form.Group>
      <Form.Group controlId="formBasicLastName">
        <Form.Control
          value={lastName}
          onChange={handleLastNameChange}
          type="text"
          placeholder="Last Name"
          required
          pattern="(?=.*[A-Za-z]).{2,15}"
          autoComplete="off"
        />
        {
          submitted && !lastName
          && <div className="invalid-feedback">Last Name is required</div>
        }
      </Form.Group>
      <Form.Group controlId="formBasicUserName">
        <Form.Control
          value={username}
          onChange={handleUserNameChange}
          type="text"
          placeholder="User Name"
          required
          pattern="([A-Za-z0-9_-]).{2,15}"
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
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}"
          onChange={handlePasswordChange}
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
      <Button variant="primary" type="submit" className="text-uppercase">Sign up</Button>
    </Form>
  );
};

export default RegisterForm;
