import * as React from 'react';
import { Modal } from 'react-bootstrap';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type TLoginModalProps = {
  isVisible: boolean;
};

const LoginModal = (props: TLoginModalProps): JSX.Element => {
  const [registered, setRegistered] = React.useState<boolean>(true);

  const handleRegistered = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLSpanElement>,
  ) => {
    event.preventDefault();
    setRegistered((prev) => !prev);
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
          <span className="text-uppercase">Tracking Time</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          registered
            ? <LoginForm />
            : <RegisterForm />
        }
      </Modal.Body>
      <Modal.Footer className="ptb0">
        {
          registered
            ? (
              <div className="block-signup">
                <h6 className="pt8">Don’t have an account?</h6>
                <span
                  role="button"
                  className="text-uppercase btn-signup"
                  onClick={handleRegistered}
                  tabIndex={0}
                  aria-labelledby="move-to-register-form"
                  onKeyDown={handleRegistered}
                >
                  Sign up
                </span>
              </div>
            )
            : (
              <div className="block-signup">
                <span
                  role="button"
                  className="text-uppercase btn-signup"
                  onClick={handleRegistered}
                  tabIndex={0}
                  aria-labelledby="move-to-register-form"
                  onKeyDown={handleRegistered}
                >
                  Back to login
                </span>
              </div>
            )
        }
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
