import * as React from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Footer from 'Components/Footer';
import Header from 'Components/Header';
import LoginModal from 'Components/LoginModal';
import MainView from 'Components/MainView';
import { fetchProjects } from 'State/project/actions';
import { taskActions } from 'State/task';
import * as MyModels from 'State/types';
import { auth } from 'Utils/firebase';

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: MyModels.RootState) => {
    const {
      user: { isAuthorized },
    } = state;
    return isAuthorized;
  });
  const isStillLoading = useSelector((state: MyModels.RootState) => {
    const {
      projects: { isLoading },
    } = state;
    return isLoading;
  });

  useEffect(() => {
    if (isAuth && auth.currentUser) {
      auth.currentUser
        .getIdToken(true)
        .then((idToken) => {
          if (auth.currentUser) {
            dispatch(fetchProjects(idToken, String(auth.currentUser.uid)));
            dispatch(taskActions.getTasks(String(auth.currentUser.uid)));
          }
          return true;
        })
        .catch(() => {});
    }
  }, [isAuth, dispatch]);

  if (isAuth && isStillLoading) {
    return (
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <MainView />
      <LoginModal />
      <Footer />
    </>
  );
}
