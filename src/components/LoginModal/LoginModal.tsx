import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import * as MyModels from 'State/types';
import { alertClear } from 'State/user/alert-action-creators';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const isAuth = useSelector(
    ({ user: { isAuthorized } }: MyModels.RootState) => isAuthorized
  );
  const [registered, setRegistered] = React.useState<boolean>(true);

  const handleRegistered = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLSpanElement>
  ) => {
    event.preventDefault();
    setRegistered((prev) => !prev);
    dispatch(alertClear());
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="login-modal"
      onHide={() => null}
      show={!isAuth}
    >
      <Modal.Header>
        <Modal.Title className="text-center" id="contained-modal-title-vcenter">
          RSClone Tracking Time
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{registered ? <LoginForm /> : <RegisterForm />}</Modal.Body>
      <Modal.Footer className="pt-0 pb-0">
        {registered ? (
          <div className="block-signup block-login">
            <h6 className="pt-2">Don’t have an account?</h6>
            <span
              aria-labelledby="move-to-register-form"
              className="text-uppercase btn-signup btn-login"
              onClick={handleRegistered}
              onKeyDown={handleRegistered}
              role="button"
              tabIndex={0}
            >
              Sign up
            </span>
          </div>
        ) : (
          <div className="block-signup">
            <span
              aria-labelledby="move-to-register-form"
              className="text-uppercase btn-signup"
              onClick={handleRegistered}
              onKeyDown={handleRegistered}
              role="button"
              tabIndex={0}
            >
              Back to login
            </span>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
