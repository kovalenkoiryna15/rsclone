import * as React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

type TLoginModalProps = {
  isVisible: boolean;
};

type TUserName = string | undefined;

const LoginModal = (props: TLoginModalProps): JSX.Element => {
  const [username, setUsername] = React.useState<TUserName>('');
  const [validated, setValidated] = React.useState<boolean>(false);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const { isVisible } = props;
  return (
    <Modal
      show={isVisible}
      className="login-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          Welcome to RSClone
          <br />
          <span className="text-uppercase">Tracking Time</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              type="password"
              placeholder="Password"
              aria-describedby="passwordHelpBlock"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            />
            <Form.Text className="text-muted" id="passwordHelpBlock">
              Password must be at least 6 characters
              and contain at least one number and one uppercase letter.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" className="text-uppercase">Login</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="block-signup">
          <h6 className="pt8">Don’t have an account?</h6>
          <span className="text-uppercase btn-signup">Sign up</span>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
