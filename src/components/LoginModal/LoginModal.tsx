import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import * as MyModels from 'Store/types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginModal = (): JSX.Element => {
  const isAuth = useSelector(
    ({ user: { isAuthorized } }: MyModels.RootState) => isAuthorized,
  );
  const [registered, setRegistered] = React.useState<boolean>(true);

  const handleRegistered = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLSpanElement>,
  ) => {
    event.preventDefault();
    setRegistered((prev) => !prev);
  };

  return (
    <Modal
      show={!isAuth}
      className="login-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          RSClone Tracking Time
          &#8194;
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
      <Modal.Footer className="pt-0 pb-0">
        {
          registered
            ? (
              <div className="block-signup block-login">
                <h6 className="pt-2">Don’t have an account?</h6>
                <span
                  role="button"
                  className="text-uppercase btn-signup btn-login"
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
